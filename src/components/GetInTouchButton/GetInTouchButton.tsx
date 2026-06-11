import { useEffect, useRef, useState } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import { colors as tokenColors, colorVars } from '../../shared/tokens'
import { getButtonStyle, getLabelStyle, outlineStyle, sizeStyles, toneStyles } from './GetInTouchButton.styles'

export type GetInTouchButtonTone = 'Olive' | 'Olive Light Hover' | 'Orange' | 'Light' | 'Auto'
export type GetInTouchButtonSize = 'Small' | 'Normal' | 'Large' | 'Big'

export interface GetInTouchButtonLink {
  href: string
  target?: string
  preload?: string
}

export interface GetInTouchButtonProps extends ComponentLayoutProps {
  label?: string
  link?: GetInTouchButtonLink
  tone?: GetInTouchButtonTone
  size?: GetInTouchButtonSize
  color?: string
  hoverColor?: string
  height?: number
  width?: number
  fontSize?: number
  fontWeight?: number
  strokeWidth?: number
  ariaLabel?: string
}

export function GetInTouchButton({
  ariaLabel,
  color,
  hoverColor,
  label = 'GET IN TOUCH',
  link = { href: '#contact' },
  size = 'Normal',
  tone = 'Olive',
  height,
  width,
  fontSize,
  fontWeight,
  strokeWidth,
  ...layoutProps
}: GetInTouchButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [autoHoverColor, setAutoHoverColor] = useState<string>(colorVars.signalOrange)
  const colors = toneStyles[tone]
  const sizeStyle = sizeStyles[size]
  const isAutoTone = tone === 'Auto'
  const baseColor = color || (isAutoTone ? colorVars.nocturnalForest : colors.color)
  const activeColor = hoverColor || (isAutoTone ? autoHoverColor : colors.hoverColor)
  const currentColor = isHovered || isPressed ? activeColor : baseColor
  const resolvePositiveNumber = (value: number | undefined, fallback: number) =>
    typeof value === 'number' && value > 0 ? value : fallback
  const style = getButtonStyle({
    color: currentColor,
    fontSize: resolvePositiveNumber(fontSize, sizeStyle.fontSize),
    fontWeight: resolvePositiveNumber(fontWeight, sizeStyle.fontWeight),
    height: resolvePositiveNumber(height, sizeStyle.height),
    isPressed,
    layoutProps,
    width: resolvePositiveNumber(width, sizeStyle.width),
  })

  useEffect(() => {
    if (!isAutoTone) return

    const updateAutoHoverColor = () => {
      const backgroundColor = findNearestBackgroundColor(buttonRef.current)
      setAutoHoverColor(isSignalOrange(backgroundColor) ? colorVars.petalMist : colorVars.signalOrange)
    }

    updateAutoHoverColor()
    const animationFrame = window.requestAnimationFrame(updateAutoHoverColor)
    window.addEventListener('resize', updateAutoHoverColor)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', updateAutoHoverColor)
    }
  }, [isAutoTone])

  return (
    <a
      aria-label={ariaLabel || label}
      href={link?.href}
      onMouseDown={() => setIsPressed(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseUp={() => setIsPressed(false)}
      ref={buttonRef}
      rel={link?.target === '_blank' ? 'noreferrer' : undefined}
      style={style}
      target={link?.target}
    >
      <svg aria-hidden="true" focusable="false" preserveAspectRatio="none" style={outlineStyle} viewBox="0 0 128 45">
        <path
          d="M5.2 23C4.7 13.3 18.9 5.2 51.7 4.5c38.4-.8 67.4 5.8 71.2 17.2 3.4 10.6-17.2 18.3-51.7 19.2C30.5 42 5.8 35.2 5.2 23Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={resolvePositiveNumber(strokeWidth, sizeStyle.strokeWidth)}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span style={getLabelStyle(sizeStyle.labelOffset)}>{label}</span>
    </a>
  )
}

function findNearestBackgroundColor(element: HTMLElement | null) {
  let currentElement = element?.parentElement ?? null

  while (currentElement) {
    const backgroundColor = window.getComputedStyle(currentElement).backgroundColor
    if (isVisibleColor(backgroundColor)) return backgroundColor
    currentElement = currentElement.parentElement
  }

  return ''
}

function isVisibleColor(color: string) {
  return color !== '' && color !== 'transparent' && !color.endsWith(', 0)') && !color.endsWith(',0)')
}

function isSignalOrange(color: string) {
  const rgb = parseRgb(color)
  return rgb?.r === 255 && rgb.g === 90 && rgb.b === 0
}

function parseRgb(color: string) {
  if (color.toLowerCase() === tokenColors.signalOrange.toLowerCase()) {
    return { r: 255, g: 90, b: 0 }
  }

  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (!match) return undefined

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  }
}
