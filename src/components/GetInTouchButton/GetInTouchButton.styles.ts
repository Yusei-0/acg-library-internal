import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import type { GetInTouchButtonTone } from './GetInTouchButton'

export const toneStyles: Record<GetInTouchButtonTone, { color: string; hoverColor: string }> = {
  Olive: {
    color: '#13240a',
    hoverColor: '#ff4f00',
  },
  Orange: {
    color: '#ff4f00',
    hoverColor: '#13240a',
  },
  Light: {
    color: '#ffffff',
    hoverColor: '#13240a',
  },
}

export function getButtonStyle({
  color,
  isPressed,
  layoutProps,
}: {
  color: string
  isPressed: boolean
  layoutProps: ComponentLayoutProps
}): CSSProperties {
  return {
    alignItems: 'center',
    color,
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: 12,
    fontWeight: 900,
    height: 45,
    justifyContent: 'center',
    lineHeight: 1,
    maxWidth: 128,
    minWidth: 128,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transform: isPressed ? 'scale(0.97)' : 'scale(1)',
    transition: 'color 140ms ease, transform 140ms ease',
    whiteSpace: 'nowrap',
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

export const labelStyle: CSSProperties = {
  position: 'relative',
  top: -1,
}
