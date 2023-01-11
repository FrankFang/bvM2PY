import { useState } from 'react'
import { emojis } from '../../lib/emojis'
import s from '../../pages/TagsNewPage.module.scss'

export const EmojiInput: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')
  return (
    <div b-1 b="#5C33BE" rounded-8px>
      <div flex p-8px gap-x-16px overflow-auto text="#999">
        {emojis.map(emoji =>
          <span whitespace-nowrap key={emoji.name}
            className={emoji.name === emojiKind ? s.selectedTag : ''}
            onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>
        )}
      </div>
      <div text-24px p-t-8px p-b-16px h-400px overflow-auto text-center>
        {emojis.map(emoji =>
          <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}
            grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
            justify-center>
            {emoji.chars.map(char => <span>{char}</span>)}
          </div>)}
      </div>
    </div>
  )
}
