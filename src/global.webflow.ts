import { createElement, type CSSProperties, type PropsWithChildren } from 'react'
import { colors } from './shared/tokens'

type GlobalStyle = CSSProperties & Record<`--${string}`, string>

const globalWrapperStyle: GlobalStyle = {
  '--acg-color-nocturnal-forest': colors.nocturnalForest,
  '--acg-color-nocturnal-forest-30': colors.nocturnalForest30,
  '--acg-color-nocturnal-forest-40': colors.nocturnalForest40,
  '--acg-color-nocturnal-forest-50': colors.nocturnalForest50,
  '--acg-color-petal-mist': colors.petalMist,
  '--acg-color-signal-orange': colors.signalOrange,
  '--acg-color-signal-orange-30': colors.signalOrange30,
  '--acg-color-signal-orange-70': colors.signalOrange70,
  '--acg-nav-background': 'var(--acg-color-signal-orange)',
  '--acg-nav-compact-background': 'var(--acg-color-petal-mist)',
  '--acg-nav-menu-background': 'var(--acg-color-signal-orange)',
  '--acg-nav-menu-hover': 'var(--acg-color-nocturnal-forest)',
  '--acg-nav-menu-text': 'var(--acg-color-nocturnal-forest-50)',
  '--acg-nav-text': 'var(--acg-color-nocturnal-forest)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

export function GlobalWebflowProvider({ children }: PropsWithChildren) {
  return createElement('div', { style: globalWrapperStyle }, children)
}
