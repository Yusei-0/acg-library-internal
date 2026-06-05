import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'

export function getRootStyle({
  backgroundColor,
  height,
  isPressed,
  layoutProps,
  textColor,
  width,
}: {
  backgroundColor: string
  height: number | undefined
  isPressed: boolean
  layoutProps: ComponentLayoutProps
  textColor: string
  width: number | undefined
}): CSSProperties {
  return {
    alignItems: 'center',
    background: backgroundColor || 'transparent',
    boxSizing: 'border-box',
    color: textColor,
    cursor: 'pointer',
    display: 'inline-flex',
    height: typeof height === 'number' && height > 0 ? height : 'auto',
    maxWidth: '100%',
    textDecoration: 'none',
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    transition: 'color 160ms ease, background-color 160ms ease, transform 160ms ease',
    width: typeof width === 'number' && width > 0 ? width : 'auto',
    ...getLayoutStyles(layoutProps),
  }
}

export function getIconStyle({
  arrowAngle,
  borderWidth,
  circleColor,
  circleSize,
}: {
  arrowAngle: number
  borderWidth: number
  circleColor: string
  circleSize: number
}): CSSProperties {
  return {
    alignItems: 'center',
    border: `${Math.max(1, borderWidth)}px solid ${circleColor}`,
    borderRadius: '50%',
    boxSizing: 'border-box',
    color: circleColor,
    display: 'inline-flex',
    flex: '0 0 auto',
    height: circleSize,
    justifyContent: 'center',
    transform: `rotate(${-arrowAngle / 2}deg)`,
    transition: 'color 160ms ease, border-color 160ms ease, transform 160ms ease',
    width: circleSize,
  }
}

export function getLabelStyle({
  fontFamily,
  fontSize,
  fontWeight,
}: {
  fontFamily: string
  fontSize: number
  fontWeight: number
}): CSSProperties {
  return {
    color: 'currentColor',
    display: 'inline-block',
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing: 0,
    lineHeight: 1,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }
}
