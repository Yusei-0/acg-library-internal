import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export const marqueeTitleKeyframes = `
@keyframes acg-marquee-title-left {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@keyframes acg-marquee-title-right {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}
`

export function getRootStyle({ edgeFade, layoutProps }: { edgeFade: number; layoutProps: ComponentLayoutProps }): CSSProperties {
  const fade = Math.max(0, edgeFade)
  const mask = fade > 0 ? `linear-gradient(90deg, transparent 0, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent 100%)` : undefined

  return {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    maskImage: mask,
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    WebkitMaskImage: mask,
    ...getLayoutStyles(layoutProps),
  }
}

export function getTrackStyle({
  direction,
  speed,
}: {
  direction: 'Left' | 'Right'
  speed: number
}): CSSProperties {
  return {
    alignItems: 'center',
    animationDuration: `${Math.max(1, speed)}s`,
    animationIterationCount: 'infinite',
    animationName: direction === 'Left' ? 'acg-marquee-title-left' : 'acg-marquee-title-right',
    animationTimingFunction: 'linear',
    display: 'flex',
    flex: '0 0 auto',
    minWidth: 'max-content',
    willChange: 'transform',
  }
}

export function getGroupStyle(gap: number): CSSProperties {
  return {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    gap,
    paddingRight: gap,
    whiteSpace: 'nowrap',
  }
}

export function getTextStyle({
  color,
  fontFamily,
}: {
  color: string
  fontFamily: string
}): CSSProperties {
  return {
    color,
    display: 'inline-block',
    fontFamily,
    letterSpacing: 0,
    lineHeight: 1,
    textTransform: 'none',
  }
}

export function getResponsiveStyles({
  desktopFontSize,
  desktopFontWeight,
  desktopHeight,
  desktopWidth,
  instanceId,
  mobileFontSize,
  mobileFontWeight,
  mobileHeight,
  mobileWidth,
  tabletFontSize,
  tabletFontWeight,
  tabletHeight,
  tabletWidth,
}: {
  desktopFontSize: number
  desktopFontWeight: number
  desktopHeight: number
  desktopWidth: number
  instanceId: string
  mobileFontSize: number
  mobileFontWeight: number
  mobileHeight: number
  mobileWidth: number
  tabletFontSize: number
  tabletFontWeight: number
  tabletHeight: number
  tabletWidth: number
}) {
  const selector = `[data-acg-marquee-title="${instanceId}"]`

  return `
${selector} {
  height: ${Math.max(32, desktopHeight)}px;
  width: ${Math.max(120, desktopWidth)}px;
}

${selector} .acg-marquee-title__text {
  font-size: ${Math.max(8, desktopFontSize)}px;
  font-weight: ${Math.max(100, desktopFontWeight)};
}

@media (max-width: 991px) {
  ${selector} {
    height: ${Math.max(32, tabletHeight)}px;
    width: ${Math.max(120, tabletWidth)}px;
  }

  ${selector} .acg-marquee-title__text {
    font-size: ${Math.max(8, tabletFontSize)}px;
    font-weight: ${Math.max(100, tabletFontWeight)};
  }
}

@media (max-width: 767px) {
  ${selector} {
    height: ${Math.max(32, mobileHeight)}px;
    width: ${Math.max(120, mobileWidth)}px;
  }

  ${selector} .acg-marquee-title__text {
    font-size: ${Math.max(8, mobileFontSize)}px;
    font-weight: ${Math.max(100, mobileFontWeight)};
  }
}
`
}

export const defaultOrange = colorVars.signalOrange
export const defaultForest = colorVars.nocturnalForest
