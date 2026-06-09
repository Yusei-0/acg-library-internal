import { useState } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import { getButtonStyle, getLabelStyle, outlineStyle, sizeStyles, toneStyles } from './GetInTouchButton.styles'

export type GetInTouchButtonTone = 'Olive' | 'Olive Light Hover' | 'Orange' | 'Light'
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
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const colors = toneStyles[tone]
  const sizeStyle = sizeStyles[size]
  const baseColor = color || colors.color
  const activeColor = hoverColor || colors.hoverColor
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
