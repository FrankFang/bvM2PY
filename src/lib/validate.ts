interface Data {
  [k: string]: JSONValue
}
type Rule<T> = {
  key: keyof T
  message: string
} & (
  { type: 'required' } |
  { type: 'chinese' } |
  { type: 'equalField'; field: keyof T } |
  { type: 'pattern'; regex: RegExp } |
  { type: 'notEqual'; value: JSONValue } |
  { type: 'length'; min?: number; max?: number }
)
type Rules<T> = Rule<T>[]

type FormError<T> = {
  [k in keyof T]?: string[]
}
export type { Rules, Rule, Data, FormError }

export const validate = <T extends Data>(formData: T, rules: Rules<T>): FormError<T> => {
  const error: FormError<T> = {}
  rules.forEach((rule) => {
    const { key, type, message } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          error[key] = error[key] ?? []
          error[key]?.push(message)
        }
        break
      case 'pattern':
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          error[key] = error[key] ?? []
          error[key]?.push(message)
        }
        break
      case 'notEqual':
        if (!isEmpty(value) && value === rule.value) {
          error[key] = error[key] ?? []
          error[key]?.push(message)
        }
        break
      case 'length':
        if (!isEmpty(value)) {
          if (rule.min && value!.toString().length < rule.min) {
            error[key] = error[key] ?? []
            error[key]?.push(message)
          }
          if (rule.max && value!.toString().length > rule.max) {
            error[key] = error[key] ?? []
            error[key]?.push(message)
          }
        }
        break
      case 'chinese':
        if (!isEmpty(value) && !/^[\u4E00-\u9FA5]+$/.test(value!.toString())) {
          error[key] = error[key] ?? []
          error[key]?.push(message)
        }
        break
      case 'equalField':
        if (!isEmpty(value) && value !== formData[rule.field]) {
          error[key] = error[key] ?? []
          error[key]?.push(message)
        }
        break
      default:
        break
    }
  })
  return error
}

function isEmpty(value: undefined | JSONValue | Data) {
  return value === null || value === undefined || value === ''
}

export function hasError(errors?: Record<string, string[]>) {
  // return Object.values(errors)
  // .reduce((result, value) => result + value.length, 0) > 0
  if (!errors) { return false }
  let result = false
  for (const key in errors) {
    if (errors[key]?.length > 0) {
      result = true
      break
    }
  }
  return result
}
