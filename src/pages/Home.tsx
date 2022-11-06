import p from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'
export const Home: React.FC = () => {
  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="128" height="130" src={p} />
    </div>
    <div px-16px>
      <button h-48px w="100%" bg="#5C33BE" b-none text-white
        rounded-8px
      >开始记账</button>
    </div>
    <button p-4px w-56px h-56px bg="#5C33BE" rounded="50%" b-none text-white
      text-6xl fixed bottom-16px right-16px>
      <img src={add} max-w="100%" max-h="100%" />
    </button>
  </div>
}
