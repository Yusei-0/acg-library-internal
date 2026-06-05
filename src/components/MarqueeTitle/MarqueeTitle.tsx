import { useId, type CSSProperties } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import {
  defaultForest,
  defaultOrange,
  getGroupStyle,
  getResponsiveStyles,
  getRootStyle,
  getTextStyle,
  getTrackStyle,
  marqueeTitleKeyframes,
} from './MarqueeTitle.styles'

export type MarqueeTitleDirection = 'Left' | 'Right'

export interface MarqueeTitleProps extends ComponentLayoutProps {
  text?: string
  className?: string
  direction?: MarqueeTitleDirection
  speed?: number
  fontSize?: number
  tabletFontSize?: number
  mobileFontSize?: number
  fontWeight?: number
  tabletFontWeight?: number
  mobileFontWeight?: number
  fontFamily?: string
  width?: number
  tabletWidth?: number
  mobileWidth?: number
  height?: number
  tabletHeight?: number
  mobileHeight?: number
  textGap?: number
}

export function MarqueeTitle({
  className = '',
  direction = 'Left',
  fontFamily = 'Ppneueyork, Georgia, serif',
  fontSize = 40,
  fontWeight = 800,
  height = 120,
  mobileFontSize,
  mobileFontWeight,
  mobileHeight,
  mobileWidth,
  speed = 14,
  tabletFontSize,
  tabletFontWeight,
  tabletHeight,
  tabletWidth,
  textGap = 12,
  text = 'How we work',
  width = 720,
  ...layoutProps
}: MarqueeTitleProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const rootStyle = getRootStyle(layoutProps)
  const trackStyle = getTrackStyle({ direction, speed })
  const groupStyle = getGroupStyle(Math.max(0, textGap))
  const orangeTextStyle = getTextStyle({
    color: defaultOrange,
    fontFamily,
  })
  const forestTextStyle = getTextStyle({
    color: defaultForest,
    fontFamily,
  })
  const responsiveStyles = getResponsiveStyles({
    desktopFontSize: fontSize,
    desktopFontWeight: fontWeight,
    desktopHeight: height,
    desktopWidth: width,
    instanceId,
    mobileFontSize: mobileFontSize ?? tabletFontSize ?? fontSize,
    mobileFontWeight: mobileFontWeight ?? tabletFontWeight ?? fontWeight,
    mobileHeight: mobileHeight ?? tabletHeight ?? height,
    mobileWidth: mobileWidth ?? tabletWidth ?? width,
    tabletFontSize: tabletFontSize ?? fontSize,
    tabletFontWeight: tabletFontWeight ?? fontWeight,
    tabletHeight: tabletHeight ?? height,
    tabletWidth: tabletWidth ?? width,
  })
  const repeatedIndexes = Array.from({ length: 16 }, (_, index) => index)
  const rootClassName = ['acg-marquee-title', className].filter(Boolean).join(' ')

  return (
    <div aria-label={text} className={rootClassName} data-acg-marquee-title={instanceId} style={rootStyle}>
      <style>{`${marqueeTitleKeyframes}\n${responsiveStyles}`}</style>
      <div aria-hidden="true" style={trackStyle}>
        {repeatedIndexes.map((index) => (
          <MarqueeGroup
            forestTextStyle={forestTextStyle}
            groupStyle={groupStyle}
            key={index}
            orangeTextStyle={orangeTextStyle}
            text={text}
          />
        ))}
      </div>
    </div>
  )
}

function MarqueeGroup({
  forestTextStyle,
  groupStyle,
  orangeTextStyle,
  text,
}: {
  forestTextStyle: CSSProperties
  groupStyle: CSSProperties
  orangeTextStyle: CSSProperties
  text: string
}) {
  return (
    <div style={groupStyle}>
      <span className="acg-marquee-title__text" style={orangeTextStyle}>
        {text}
      </span>
      <span className="acg-marquee-title__text" style={forestTextStyle}>
        {text}
      </span>
    </div>
  )
}
