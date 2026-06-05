import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export type ActionButtonVariant = 'Primary' | 'Secondary' | 'Ghost'
export type ActionButtonSize = 'Small' | 'Medium' | 'Large'

export interface ActionButtonLink {
  href: string
  target?: string
  preload?: string
}

export interface ActionButtonProps extends ComponentLayoutProps {
  label?: string
  variant?: ActionButtonVariant
  size?: ActionButtonSize
  fullWidth?: boolean
  disabled?: boolean
  link?: ActionButtonLink
  ariaLabel?: string
}

const variantStyles: Record<ActionButtonVariant, CSSProperties> = {
  Primary: {
    background: colorVars.nocturnalForest,
    borderColor: colorVars.nocturnalForest,
    color: colorVars.petalMist,
  },
  Secondary: {
    background: colorVars.petalMist,
    borderColor: colorVars.nocturnalForest30,
    color: colorVars.nocturnalForest,
  },
  Ghost: {
    background: 'transparent',
    borderColor: 'transparent',
    color: colorVars.nocturnalForest,
  },
}

const sizeStyles: Record<ActionButtonSize, CSSProperties> = {
  Small: {
    fontSize: 14,
    minHeight: 36,
    padding: '8px 14px',
  },
  Medium: {
    fontSize: 16,
    minHeight: 44,
    padding: '10px 18px',
  },
  Large: {
    fontSize: 18,
    minHeight: 52,
    padding: '13px 22px',
  },
}

export function ActionButton({
  label = 'Get started',
  variant = 'Primary',
  size = 'Medium',
  fullWidth = false,
  disabled = false,
  link,
  ariaLabel,
  ...layoutProps
}: ActionButtonProps) {
  const isDisabled = disabled || !link?.href
  const style: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    boxSizing: 'border-box',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontWeight: 700,
    gap: 8,
    justifyContent: 'center',
    lineHeight: 1.2,
    opacity: isDisabled ? 0.48 : 1,
    textDecoration: 'none',
    transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
    width: fullWidth ? '100%' : 'auto',
    ...getLayoutStyles(layoutProps),
  }

  return (
    <a
      aria-disabled={isDisabled}
      aria-label={ariaLabel || label}
      href={isDisabled ? undefined : link?.href}
      rel={link?.target === '_blank' ? 'noreferrer' : undefined}
      style={style}
      target={link?.target}
    >
      {label}
    </a>
  )
}
