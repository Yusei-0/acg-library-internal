import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export function getRootStyle(layoutProps: ComponentLayoutProps): CSSProperties {
  return {
    color: colorVars.nocturnalForest,
    display: 'block',
    textDecoration: 'none',
    ...getLayoutStyles(layoutProps),
  }
}

function normalizeSize(value: string, fallback: string) {
  return value.trim() || fallback
}

export const mediaWrapStyle: CSSProperties = {
  background: colorVars.signalOrange30,
  borderRadius: 4,
  display: 'block',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
}

export const imageBaseStyle: CSSProperties = {
  display: 'block',
  height: '100%',
  inset: 0,
  objectFit: 'cover',
  position: 'absolute',
  transition: 'opacity 260ms ease, transform 420ms ease',
  width: '100%',
}

export const imageFallbackStyle: CSSProperties = {
  ...imageBaseStyle,
  background:
    `linear-gradient(135deg, ${colorVars.nocturnalForest} 0%, ${colorVars.signalOrange} 52%, ${colorVars.petalMist} 100%)`,
}

export const hoverFallbackStyle: CSSProperties = {
  ...imageBaseStyle,
  background:
    `linear-gradient(135deg, ${colorVars.signalOrange} 0%, ${colorVars.signalOrange30} 42%, ${colorVars.nocturnalForest} 100%)`,
}

export const metaStyle: CSSProperties = {
  alignItems: 'center',
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'auto auto minmax(0, 1fr)',
  width: '100%',
}

export const metaTextStyle: CSSProperties = {
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: 1,
  margin: 0,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const categoryStyle: CSSProperties = {
  ...metaTextStyle,
  color: colorVars.nocturnalForest50,
  justifySelf: 'end',
  textAlign: 'right',
}

export function getResponsiveStyles({
  desktopImageHeight,
  desktopMaxWidth,
  desktopMetaGap,
  desktopMinWidth,
  desktopWidth,
  instanceId,
  mobileImageHeight,
  mobileMaxWidth,
  mobileMetaGap,
  mobileMinWidth,
  mobileWidth,
  tabletImageHeight,
  tabletMaxWidth,
  tabletMetaGap,
  tabletMinWidth,
  tabletWidth,
}: {
  desktopImageHeight: number
  desktopMaxWidth: string
  desktopMetaGap: number
  desktopMinWidth: string
  desktopWidth: string
  instanceId: string
  mobileImageHeight: number
  mobileMaxWidth: string
  mobileMetaGap: number
  mobileMinWidth: string
  mobileWidth: string
  tabletImageHeight: number
  tabletMaxWidth: string
  tabletMetaGap: number
  tabletMinWidth: string
  tabletWidth: string
}) {
  const selector = `[data-acg-project-card="${instanceId}"]`
  const resolvedDesktopWidth = normalizeSize(desktopWidth, '100%')
  const resolvedDesktopMinWidth = normalizeSize(desktopMinWidth, '0')
  const resolvedDesktopMaxWidth = normalizeSize(desktopMaxWidth, 'none')
  const resolvedTabletWidth = normalizeSize(tabletWidth, resolvedDesktopWidth)
  const resolvedTabletMinWidth = normalizeSize(tabletMinWidth, resolvedDesktopMinWidth)
  const resolvedTabletMaxWidth = normalizeSize(tabletMaxWidth, resolvedDesktopMaxWidth)
  const resolvedMobileWidth = normalizeSize(mobileWidth, resolvedTabletWidth)
  const resolvedMobileMinWidth = normalizeSize(mobileMinWidth, resolvedTabletMinWidth)
  const resolvedMobileMaxWidth = normalizeSize(mobileMaxWidth, resolvedTabletMaxWidth)

  return `
${selector} {
  max-width: ${resolvedDesktopMaxWidth};
  min-width: ${resolvedDesktopMinWidth};
  width: ${resolvedDesktopWidth};
}

${selector} .acg-project-card__media {
  height: ${Math.max(120, desktopImageHeight)}px;
}

${selector} .acg-project-card__meta {
  margin-top: ${Math.max(0, desktopMetaGap)}px;
}

@media (max-width: 991px) {
  ${selector} {
    max-width: ${resolvedTabletMaxWidth};
    min-width: ${resolvedTabletMinWidth};
    width: ${resolvedTabletWidth};
  }

  ${selector} .acg-project-card__media {
    height: ${Math.max(120, tabletImageHeight)}px;
  }

  ${selector} .acg-project-card__meta {
    margin-top: ${Math.max(0, tabletMetaGap)}px;
  }
}

@media (max-width: 767px) {
  ${selector} {
    max-width: ${resolvedMobileMaxWidth};
    min-width: ${resolvedMobileMinWidth};
    width: ${resolvedMobileWidth};
  }

  ${selector} .acg-project-card__media {
    height: ${Math.max(120, mobileImageHeight)}px;
  }

  ${selector} .acg-project-card__meta {
    margin-top: ${Math.max(0, mobileMetaGap)}px;
  }
}
`
}
