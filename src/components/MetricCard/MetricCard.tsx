import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export type MetricCardTone = 'Light' | 'Dark' | 'Accent'
export type MetricCardAlignment = 'Left' | 'Center'

export interface MetricCardProps extends ComponentLayoutProps {
  eyebrow?: string
  value?: string
  suffix?: string
  label?: string
  description?: string
  tone?: MetricCardTone
  alignment?: MetricCardAlignment
  showAccentBar?: boolean
  radius?: number
}

const toneStyles: Record<MetricCardTone, CSSProperties> = {
  Light: {
    background: colorVars.petalMist,
    borderColor: colorVars.nocturnalForest30,
    color: colorVars.nocturnalForest,
  },
  Dark: {
    background: colorVars.nocturnalForest,
    borderColor: colorVars.nocturnalForest,
    color: colorVars.petalMist,
  },
  Accent: {
    background: colorVars.signalOrange30,
    borderColor: colorVars.signalOrange70,
    color: colorVars.nocturnalForest,
  },
}

const mutedColor: Record<MetricCardTone, string> = {
  Light: colorVars.nocturnalForest50,
  Dark: colorVars.petalMist,
  Accent: colorVars.nocturnalForest50,
}

export function MetricCard({
  eyebrow = 'Performance',
  value = '42',
  suffix = '%',
  label = 'Conversion lift',
  description = 'Measured across the latest campaign cycle.',
  tone = 'Light',
  alignment = 'Left',
  showAccentBar = true,
  radius = 8,
  ...layoutProps
}: MetricCardProps) {
  const textAlign = alignment === 'Center' ? 'center' : 'left'
  const alignItems = alignment === 'Center' ? 'center' : 'flex-start'
  const cardStyle: CSSProperties = {
    ...toneStyles[tone],
    alignItems,
    borderRadius: Math.max(0, Math.min(radius, 24)),
    borderStyle: 'solid',
    borderWidth: 1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'inherit',
    gap: 14,
    maxWidth: 420,
    minWidth: 220,
    padding: 24,
    textAlign,
    width: '100%',
    ...getLayoutStyles(layoutProps),
  }

  return (
    <article style={cardStyle}>
      {showAccentBar ? (
        <span
          aria-hidden="true"
          style={{
            background: tone === 'Dark' ? colorVars.signalOrange : colorVars.nocturnalForest,
            borderRadius: 999,
            display: 'block',
            height: 4,
            width: alignment === 'Center' ? 56 : 72,
          }}
        />
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p
          style={{
            color: mutedColor[tone],
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 1.2,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </p>
        <p
          style={{
            color: 'inherit',
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1,
            margin: 0,
          }}
        >
          {value}
          <span style={{ fontSize: 28, lineHeight: 1 }}>{suffix}</span>
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ color: 'inherit', fontSize: 20, lineHeight: 1.25, margin: 0 }}>
          {label}
        </h3>
        <p style={{ color: mutedColor[tone], fontSize: 15, lineHeight: 1.55, margin: 0 }}>
          {description}
        </p>
      </div>
    </article>
  )
}
