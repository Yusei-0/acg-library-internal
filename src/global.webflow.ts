import { createElement, type CSSProperties, type PropsWithChildren } from 'react'

const globalWrapperStyle: CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

export function GlobalWebflowProvider({ children }: PropsWithChildren) {
  return createElement('div', { style: globalWrapperStyle }, children)
}
