import { emojiList } from './emojiList'

export const emojis: { name: string; chars: string[] }[] = [
  { name: '表情', chars: [] },
  { name: '手势', chars: [] }
]
emojiList.forEach(([name, chars]) => {
  if (name.startsWith('face')) {
    emojis.find(item => item.name === '表情')?.chars.push(...chars)
  } else if (name.startsWith('hand')) {
    emojis.find(item => item.name === '手势')?.chars.push(...chars)
  }
})
