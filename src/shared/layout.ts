import type { CSSProperties } from 'react'

export type FlexDirection = 'Row' | 'Column'
export type HorizontalAlignment = 'Start' | 'Center' | 'End' | 'Stretch'
export type VerticalAlignment = 'Start' | 'Center' | 'End' | 'Stretch'

export interface ComponentLayoutProps {
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  gap?: number
  flexDirection?: FlexDirection
  horizontalAlignment?: HorizontalAlignment
  verticalAlignment?: VerticalAlignment
}

const horizontalAlignmentMap: Record<HorizontalAlignment, CSSProperties['alignItems']> = {
  Start: 'flex-start',
  Center: 'center',
  End: 'flex-end',
  Stretch: 'stretch',
}

const verticalAlignmentMap: Record<VerticalAlignment, CSSProperties['justifyContent']> = {
  Start: 'flex-start',
  Center: 'center',
  End: 'flex-end',
  Stretch: 'stretch',
}

export function getLayoutStyles(layout: ComponentLayoutProps): CSSProperties {
  const styles: CSSProperties = {}

  if (typeof layout.marginTop === 'number') styles.marginTop = layout.marginTop
  if (typeof layout.marginRight === 'number') styles.marginRight = layout.marginRight
  if (typeof layout.marginBottom === 'number') styles.marginBottom = layout.marginBottom
  if (typeof layout.marginLeft === 'number') styles.marginLeft = layout.marginLeft
  if (typeof layout.paddingTop === 'number') styles.paddingTop = layout.paddingTop
  if (typeof layout.paddingRight === 'number') styles.paddingRight = layout.paddingRight
  if (typeof layout.paddingBottom === 'number') styles.paddingBottom = layout.paddingBottom
  if (typeof layout.paddingLeft === 'number') styles.paddingLeft = layout.paddingLeft
  if (typeof layout.gap === 'number') styles.gap = layout.gap
  if (layout.flexDirection) styles.flexDirection = layout.flexDirection === 'Row' ? 'row' : 'column'
  if (layout.horizontalAlignment) styles.alignItems = horizontalAlignmentMap[layout.horizontalAlignment]
  if (layout.verticalAlignment) styles.justifyContent = verticalAlignmentMap[layout.verticalAlignment]

  return styles
}
