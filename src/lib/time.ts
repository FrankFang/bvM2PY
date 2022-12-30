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
export class Time {
  date: Date
  constructor(p?: number | string | Date) {
    this.date = p ? new Date(p) : new Date()
  }
  /**
   * 格式化输出
   * @param pattern 目前只支持 yyyy MM dd HH mm ss fff
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
  get parts(): Parts {
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hours = this.date.getHours()
    const minutes = this.date.getMinutes()
    const seconds = this.date.getSeconds()
    const ms = this.date.getMilliseconds()
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
      this.date[methodName](value)
    })
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
}
