type Parts = {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  ms: number
}
type Unit =
  | 'year' | 'years' | 'month' | 'months' | 'day' | 'days'
  | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds'
  | 'ms'

export const time = (p?: number | string | Date) => {
  return new Time(p)
}

export class Time {
  static DAY = 24 * 60 * 60 * 1000
  #date: Date
  constructor(p?: number | string | Date) {
    this.#date = p ? new Date(p) : new Date()
  }
  set(parts: Partial<Parts>) {
    this.parts = parts
    return this
  }
  get lastDayOfMonth() {
    return new Time(new Date(this.year, this.month - 1 + 1, 0))
  }
  get firstDayOfMonth() {
    return new Time(new Date(this.year, this.month - 1, 1))
  }
  get dayCountOfMonth() {
    return this.lastDayOfMonth.day
  }
  /**
   * 格式化输出
   * @param pattern 目前只支持 yyyy MM dd HH mm ss fff，默认值为 'yyyy-MM-dd'
   */
  format(pattern = 'yyyy-MM-dd') {
    return pattern
      .replace(/yyyy/g, this.year.toString())
      .replace(/MM/g, this.month.toString().padStart(2, '0'))
      .replace(/dd/g, this.day.toString().padStart(2, '0'))
      .replace(/HH/g, this.hours.toString().padStart(2, '0'))
      .replace(/mm/g, this.minutes.toString().padStart(2, '0'))
      .replace(/ss/g, this.seconds.toString().padStart(2, '0'))
      .replace(/fff/g, this.ms.toString().padStart(3, '0'))
  }
  add(n: number, unit: Unit) {
    const table = {
      year: 'year',
      years: 'year',
      month: 'month',
      months: 'month',
      day: 'day',
      days: 'day',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      ms: 'ms'
    } as const
    this[table[unit]] += n
    return this
  }
  get date() {
    return new Date(this.#date)
  }
  get timestamp() {
    return this.#date.getTime()
  }
  get parts(): Parts {
    const year = this.#date.getFullYear()
    const month = this.#date.getMonth() + 1
    const day = this.#date.getDate()
    const hours = this.#date.getHours()
    const minutes = this.#date.getMinutes()
    const seconds = this.#date.getSeconds()
    const ms = this.#date.getMilliseconds()
    return {
      year, month, day, hours, minutes, seconds, ms
    }
  }
  set parts(p: Partial<Parts>) {
    const table = {
      year: 'setFullYear',
      month: 'setMonth',
      day: 'setDate',
      hours: 'setHours',
      minutes: 'setMinutes',
      seconds: 'setSeconds',
      ms: 'setMilliseconds'
    } as const
    Object.entries(p).forEach(([key, value]) => {
      const k = key as keyof typeof p
      const methodName = table[k]
      value = k === 'month' ? value - 1 : value
      this.#date[methodName](value)
    })
  }
  removeTime() {
    this.set({ hours: 0, minutes: 0, seconds: 0, ms: 0 })
    return this
  }
  get year() {
    return this.parts.year
  }
  set year(v) {
    this.parts = { year: v }
  }
  get month() {
    return this.parts.month
  }
  set month(v) {
    this.parts = { month: v }
  }
  get day() {
    return this.parts.day
  }
  set day(v) {
    this.parts = { day: v }
  }
  get hours() {
    return this.parts.hours
  }
  set hours(v) {
    this.parts = { hours: v }
  }
  get minutes() {
    return this.parts.minutes
  }
  set minutes(v) {
    this.parts = { minutes: v }
  }
  get seconds() {
    return this.parts.seconds
  }
  set seconds(v) {
    this.parts = { seconds: v }
  }
  get ms() {
    return this.parts.ms
  }
  set ms(v) {
    this.parts = { ms: v }
  }
  get clone() {
    return new Time(this.#date)
  }
  get isoString() {
    // FIXME: 时区获取有问题，只能获取整数时区，如 +08:00；不能获取非整数时区，如 -07:30
    // 如果你有时间，就解决一下吧
    const timezone = Math.round(-this.#date.getTimezoneOffset() / 60)
    const absolute = Math.abs(timezone)
    const sign = timezone > 0 ? '+' : '-'
    const pad = absolute.toString().padStart(2, '0')
    return `${this.format('yyyy-MM-ddTHH:mm:ss.fff') + sign + pad}:00`
  }
}
