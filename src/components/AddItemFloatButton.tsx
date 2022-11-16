export const AddItemFloatButton: React.FC = () => {
  return (
    <button p-4px w-56px h-56px bg="#5C33BE" rounded="50%" b-none text-white
      fixed bottom-16px right-16px>
      <svg style={{ fill: 'red', width: '1.2em', height: '1.2em' }}>
        <use xlinkHref='#menu'></use>
      </svg>
    </button>
  )
}
