import { useState } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import { getIconStyle, getLabelStyle, getRootStyle } from './ArrowButton.styles'

export interface ArrowButtonLink {
  href: string
  target?: string
  preload?: string
}

export interface ArrowButtonProps extends ComponentLayoutProps {
  label?: string
  link?: ArrowButtonLink
  ariaLabel?: string
  className?: string
  textColor?: string
  hoverTextColor?: string
  circleColor?: string
  hoverCircleColor?: string
  backgroundColor?: string
  hoverBackgroundColor?: string
  width?: number
  height?: number
  fontFamily?: string
  fontSize?: number
  fontWeight?: number
  circleSize?: number
  borderWidth?: number
  buttonGap?: number
  arrowSize?: number
  arrowAngle?: number
}

export function ArrowButton({
  ariaLabel,
  arrowAngle = 0,
  arrowSize = 42,
  backgroundColor = 'transparent',
  borderWidth = 7,
  buttonGap = 32,
  circleColor = '#152304',
  circleSize = 88,
  className = '',
  fontFamily = 'Ppneueyork, Georgia, serif',
  fontSize = 64,
  fontWeight = 900,
  height,
  hoverBackgroundColor = 'transparent',
  hoverCircleColor = '#FF5A00',
  hoverTextColor = '#FF5A00',
  label = 'VIEW ALL WORK',
  link = { href: '#' },
  textColor = '#152304',
  width,
  ...layoutProps
}: ArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const hasLabel = label.trim().length > 0
  const currentTextColor = isHovered || isPressed ? hoverTextColor : textColor
  const currentCircleColor = isHovered || isPressed ? hoverCircleColor : circleColor
  const currentBackgroundColor = isHovered || isPressed ? hoverBackgroundColor : backgroundColor

  return (
    <a
      aria-label={ariaLabel || label || 'Arrow link'}
      className={className}
      href={link?.href}
      onMouseDown={() => setIsPressed(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseUp={() => setIsPressed(false)}
      rel={link?.target === '_blank' ? 'noreferrer' : undefined}
      style={getRootStyle({
        backgroundColor: currentBackgroundColor,
        height,
        isPressed,
        layoutProps: { ...layoutProps, gap: buttonGap },
        textColor: currentTextColor,
        width,
      })}
      target={link?.target}
    >
      <span
        aria-hidden="true"
        style={getIconStyle({
          arrowAngle,
          borderWidth,
          circleColor: currentCircleColor,
          circleSize,
        })}
      >
        <svg fill="none" height={arrowSize} viewBox="0 0 48 48" width={arrowSize}>
          <path d="M6 24H38" stroke="currentColor" strokeLinecap="square" strokeWidth="8" />
          <path d="M26 12L40 24L26 36" fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="8" />
        </svg>
      </span>
      {hasLabel ? (
        <span
          style={getLabelStyle({
            fontFamily,
            fontSize,
            fontWeight,
          })}
        >
          {label}
        </span>
      ) : null}
    </a>
  )
}
