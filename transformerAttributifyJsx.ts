import type { SourceCodeTransformer } from '@unocss/core'
import { toArray } from '@unocss/core'

export type FilterPattern = Array<string | RegExp> | string | RegExp | null

function createFilter(
  include: FilterPattern,
  exclude: FilterPattern,
): (id: string) => boolean {
  const includePattern = toArray(include || [])
  const excludePattern = toArray(exclude || [])
  return (id: string) => {
    if (excludePattern.some(p => id.match(p)))
      return false
    return includePattern.some(p => id.match(p))
  }
}

export interface TransformerAttributifyJsxOptions {
  /**
   * the list of attributes to ignore
   * @default []
   */
  blocklist?: (string | RegExp)[]

  /**
   * Regex of modules to be included from processing
   * @default [/\.[jt]sx$/, /\.mdx$/]
   */
  include?: FilterPattern

  /**
   * Regex of modules to exclude from processing
   *
   * @default []
   */
  exclude?: FilterPattern
}

const elementRE = /<>|<([^>\s]+\s)((?:'.*?'|".*?"|`.*?`|\{.*?\}|[^>]*?)*)/g
const attributeRE = /([a-zA-Z()#][\[?a-zA-Z0-9-_:()#%\]?]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g
const valuedAttributeRE = /((?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:!%-.~<]+)=(?:["]([^"]*)["]|[']([^']*)[']|[{]((?:[`(](?:[^`)]*)[`)]|[^}])+)[}])/gms

export default function transformerAttributifyJsx(options: TransformerAttributifyJsxOptions = {}): SourceCodeTransformer {
  const {
    blocklist = [],
  } = options

  const isBlocked = (matchedRule: string) => {
    for (const blockedRule of blocklist) {
      if (blockedRule instanceof RegExp) {
        if (blockedRule.test(matchedRule))
          return true
      }
      else if (matchedRule === blockedRule) {
        return true
      }
    }

    return false
  }

  const idFilter = createFilter(
    options.include || [/\.[jt]sx$/, /\.mdx$/],
    options.exclude || [],
  )

  return {
    name: '@unocss/transformer-attributify-jsx',
    enforce: 'pre',
    idFilter,
    async transform(code, _, { uno }) {
      const tasks: Promise<void>[] = []

      for (const item of Array.from(code.original.matchAll(elementRE))) {
        // Get the length of the className part, and replace it with the equal length of empty string
        let attributifyPart = item[2]
        if (attributifyPart === undefined) { continue }
        if (valuedAttributeRE.test(attributifyPart))
          attributifyPart = attributifyPart.replace(valuedAttributeRE, match => ' '.repeat(match.length))
        for (const attr of attributifyPart.matchAll(attributeRE)) {
          const matchedRule = attr[0].replace(/\:/i, '-')
          if (matchedRule.includes('=') || isBlocked(matchedRule))
            continue

          tasks.push(uno.parseToken(matchedRule).then((matched) => {
            if (matched) {
              const tag = item[1]
              const startIdx = (item.index || 0) + (attr.index || 0) + tag.length + 1
              const endIdx = startIdx + matchedRule.length
              code.overwrite(startIdx, endIdx, `${matchedRule}=""`)
            }
          }))
        }
      }

      await Promise.all(tasks)
    },
  }
}
