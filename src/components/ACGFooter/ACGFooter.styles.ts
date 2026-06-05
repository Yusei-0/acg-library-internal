import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export function getRootStyle({
  backgroundColor,
  layoutProps,
  minHeight,
  paddingX,
  paddingY,
  textColor,
}: {
  backgroundColor: string
  layoutProps: ComponentLayoutProps
  minHeight: number
  paddingX: number
  paddingY: number
  textColor: string
}): CSSProperties {
  return {
    background: backgroundColor,
    boxSizing: 'border-box',
    color: textColor,
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    minHeight,
    overflow: 'hidden',
    padding: `${paddingY}px ${paddingX}px 28px`,
    width: '100%',
    ...getLayoutStyles(layoutProps),
  }
}

export const topRowStyle: CSSProperties = {
  alignItems: 'flex-start',
  display: 'grid',
  gap: 32,
  gridTemplateColumns: 'minmax(90px, 150px) minmax(90px, 130px) 1fr auto auto',
  width: '100%',
}

export const linkColumnStyle: CSSProperties = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}

export const smallLinkStyle: CSSProperties = {
  color: 'inherit',
  display: 'inline-flex',
  fontFamily: 'inherit',
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 0,
  lineHeight: 1,
  textDecoration: 'none',
  textTransform: 'uppercase',
}

export function getBackToTopStyle(accentColor: string): CSSProperties {
  return {
    ...smallLinkStyle,
    color: accentColor,
    fontSize: 11,
    fontWeight: 800,
    gap: 6,
    textTransform: 'none',
  }
}

export const headlineStyle: CSSProperties = {
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 40,
  fontWeight: 900,
  letterSpacing: 0,
  lineHeight: 1,
  margin: 0,
  textAlign: 'right',
  whiteSpace: 'nowrap',
}

export const brandRowStyle: CSSProperties = {
  alignItems: 'flex-end',
  display: 'grid',
  gap: 18,
  gridTemplateColumns: 'auto auto 1fr',
  marginTop: 80,
}

export function getBrandTextStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    display: 'block',
    fontFamily: 'inherit',
    fontSize: 'clamp(92px, 14vw, 190px)',
    fontWeight: 900,
    letterSpacing: 0,
    lineHeight: 0.78,
    margin: 0,
    textTransform: 'none',
    whiteSpace: 'nowrap',
  }
}

export function getMarkStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: 'clamp(112px, 13vw, 190px)',
    width: 'clamp(220px, 31vw, 420px)',
  }
}

export const markSliceStyle: CSSProperties = {
  background: 'currentColor',
  clipPath: 'ellipse(72% 50% at 100% 50%)',
  display: 'block',
}

export const bottomRowStyle: CSSProperties = {
  alignItems: 'end',
  display: 'grid',
  gap: 24,
  gridTemplateColumns: '1fr auto',
}

export const legalRowStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 28,
  justifyContent: 'flex-end',
}

export const finePrintStyle: CSSProperties = {
  color: colorVars.petalMist,
  fontFamily: 'inherit',
  fontSize: 9,
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: 1.3,
  margin: 0,
}

export const legalLinkStyle: CSSProperties = {
  ...finePrintStyle,
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'uppercase',
}

export const responsiveStyles = `
@media (max-width: 991px) {
  .acg-footer {
    min-height: 620px !important;
    padding-left: 32px !important;
    padding-right: 32px !important;
  }

  .acg-footer__top {
    grid-template-columns: 1fr 1fr;
  }

  .acg-footer__headline {
    grid-column: 1 / -1;
    text-align: left !important;
    white-space: normal !important;
  }

  .acg-footer__cta {
    justify-self: start;
  }

  .acg-footer__brand {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (max-width: 767px) {
  .acg-footer {
    min-height: 720px !important;
    padding: 32px 22px 24px !important;
  }

  .acg-footer__top {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .acg-footer__brand {
    margin-top: 44px !important;
  }

  .acg-footer__bottom {
    grid-template-columns: 1fr;
  }

  .acg-footer__legal {
    justify-content: flex-start !important;
  }
}
`
