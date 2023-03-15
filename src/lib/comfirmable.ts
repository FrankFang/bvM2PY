export const comfirmable = (title: string, fn: () => void) => () => {
  const result = window.confirm(title)
  if (result) { fn() }
}
