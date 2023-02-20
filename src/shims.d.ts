import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    left?: string
    truncate?: boolean
    absolute?: boolean
    flex?: boolean
    relative?: boolean
    top?: string
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean
    w?: string
    h?: string
    bg?: string
    rounded?: string
    fixed?: boolean
    b?: string
    z?: string
    block?: boolean
    'focus:shadow'?: boolean
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}
