import * as React from 'react'
export const Welcome3: React.FC = () => {
  return (
    <div flex justify-center items-center
      after="content-[hi] b-1 b-red"
      before="content-[hi] b-1 b-red"
      shadow
    >
      <header hover:bg-red w-100px b-1 b-red h-40px></header>
      <main grow-1 b-1 b-blue h-100px></main>
      <footer w-200px b-1 b-black h-55px></footer>
    </div>
  )
}
