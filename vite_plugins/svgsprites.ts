import path from 'path'
import fs from 'fs'
import store from 'svgstore'
import { optimize } from 'svgo'
import type { Plugin, ViteDevServer } from 'vite'

interface Options {
  id?: string
  inputFolder?: string
  inline?: boolean
}
export const svgsprites = (options: Options = {}): Plugin => {
  const virtualModuleId = `virtual:svgsprites${options.id ? `-${options.id}` : ''}`
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  const { inputFolder = 'src/assets/icons', inline = false } = options

  const generateCode = () => {
    const sprites = store(options)
    const iconsDir = path.resolve(inputFolder)
    for (const file of fs.readdirSync(iconsDir)) {
      if (!file.endsWith('.svg')) { continue }
      const filepath = path.join(iconsDir, file)
      const svgId = path.parse(file).name
      const code = fs.readFileSync(filepath, { encoding: 'utf-8' })
      sprites.add(svgId, code)
    }
    const { data: code } = optimize(sprites.toString({ inline }), {
      plugins: [
        'cleanupAttrs', 'removeDoctype', 'removeComments', 'removeTitle', 'removeDesc', 'removeEmptyAttrs',
        { name: 'removeAttrs', params: { attrs: '(data-name|fill)' } },
      ],
    })
    return code
  }
  const handleFileCreationOrUpdate = (file: string, server: ViteDevServer) => {
    if (!file.includes(inputFolder)) { return }
    const code = generateCode()
    server.ws.send('svgsprites:change', { code })
    const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
    if (!mod) { return }
    server.moduleGraph.invalidateModule(mod, undefined, Date.now())
  }

  return {
    name: 'svgsprites',
    configureServer(server) {
      server.watcher.on('add', (file) => {
        handleFileCreationOrUpdate(file, server)
      })
      server.watcher.on('change', (file) => {
        handleFileCreationOrUpdate(file, server)
      })
    },
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const code = generateCode()
        return `!function(){
  const div = document.createElement('div')
  div.innerHTML = \`${code}\`
  const svg = div.getElementsByTagName('svg')[0]
  const updateSvg = (svg) => {
    if (!svg) { return }
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    svg.setAttribute("aria-hidden", "true")
  }
  const insert = () => {
    if (document.body.firstChild) {
      document.body.insertBefore(div, document.body.firstChild)
    } else {
      document.body.appendChild(div)
    }
  }
  updateSvg(svg)
  if (document.body){
    insert()
  } else {
    document.addEventListener('DOMContentLoaded', insert)
  }
  if (import.meta.hot) {
    import.meta.hot.on('svgsprites:change', (data) => {
      const code = data.code
      div.innerHTML = code
      const svg = div.getElementsByTagName('svg')[0]
      updateSvg(svg)
    })
  }
}()`
      }
    },
  }
}
