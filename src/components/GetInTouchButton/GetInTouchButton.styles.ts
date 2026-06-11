import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'
import type { GetInTouchButtonSize, GetInTouchButtonTone } from './GetInTouchButton'

export const toneStyles: Record<GetInTouchButtonTone, { color: string; hoverColor: string }> = {
  Olive: {
    color: colorVars.nocturnalForest,
    hoverColor: colorVars.signalOrange,
  },
  'Olive Light Hover': {
    color: colorVars.nocturnalForest,
    hoverColor: colorVars.petalMist,
  },
  Orange: {
    color: colorVars.signalOrange,
    hoverColor: colorVars.nocturnalForest,
  },
  Light: {
    color: colorVars.petalMist,
    hoverColor: colorVars.nocturnalForest,
  },
  Auto: {
    color: colorVars.nocturnalForest,
    hoverColor: colorVars.signalOrange,
  },
}

interface ButtonSizeStyle {
  fontSize: number
  fontWeight: number
  height: number
  labelOffset: number
  strokeWidth: number
  width: number
}

export const sizeStyles: Record<GetInTouchButtonSize, ButtonSizeStyle> = {
  Small: {
    fontSize: 10,
    fontWeight: 900,
    height: 38,
    labelOffset: -1,
    strokeWidth: 1.75,
    width: 108,
  },
  Normal: {
    fontSize: 12,
    fontWeight: 900,
    height: 45,
    labelOffset: -1,
    strokeWidth: 2,
    width: 128,
  },
  Large: {
    fontSize: 16,
    fontWeight: 900,
    height: 60,
    labelOffset: -1,
    strokeWidth: 2.25,
    width: 171,
  },
  Big: {
    fontSize: 24,
    fontWeight: 900,
    height: 94,
    labelOffset: -2,
    strokeWidth: 3,
    width: 267,
  },
}

export function getButtonStyle({
  color,
  fontSize,
  fontWeight,
  height,
  isPressed,
  layoutProps,
  width,
}: {
  color: string
  fontSize: number
  fontWeight: number
  height: number
  isPressed: boolean
  layoutProps: ComponentLayoutProps
  width: number
}): CSSProperties {
  return {
    alignItems: 'center',
    boxSizing: 'border-box',
    color,
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize,
    fontWeight,
    height,
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transform: isPressed ? 'scale(0.97)' : 'scale(1)',
    transition: 'color 140ms ease, transform 140ms ease',
    whiteSpace: 'nowrap',
    width,
    ...getLayoutStyles(layoutProps),
  }
}

export const outlineStyle: CSSProperties = {
  height: '100%',
  inset: 0,
  overflow: 'visible',
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
}

export function getLabelStyle(labelOffset: number): CSSProperties {
  return {
    position: 'relative',
    top: labelOffset,
  }
}
