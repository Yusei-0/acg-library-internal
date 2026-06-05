import type { CSSProperties } from 'react'
import type { ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'
import { GetInTouchButton } from '../GetInTouchButton/GetInTouchButton'
import {
  bottomRowStyle,
  brandRowStyle,
  finePrintStyle,
  getBackToTopStyle,
  getBrandTextStyle,
  getMarkStyle,
  getRootStyle,
  headlineStyle,
  legalLinkStyle,
  legalRowStyle,
  linkColumnStyle,
  markSliceStyle,
  responsiveStyles,
  smallLinkStyle,
  topRowStyle,
} from './ACGFooter.styles'

export interface FooterLink {
  href: string
  target?: string
  preload?: string
}

export interface ACGFooterProps extends ComponentLayoutProps {
  firstLabel?: string
  firstLink?: FooterLink
  secondLabel?: string
  secondLink?: FooterLink
  thirdLabel?: string
  thirdLink?: FooterLink
  fourthLabel?: string
  fourthLink?: FooterLink
  firstSocialLabel?: string
  firstSocialLink?: FooterLink
  secondSocialLabel?: string
  secondSocialLink?: FooterLink
  backToTopLabel?: string
  backToTopLink?: FooterLink
  headline?: string
  contactLabel?: string
  contactLink?: FooterLink
  copyright?: string
  firstLegalLabel?: string
  firstLegalLink?: FooterLink
  secondLegalLabel?: string
  secondLegalLink?: FooterLink
  thirdLegalLabel?: string
  thirdLegalLink?: FooterLink
  brandPrefix?: string
  brandSuffix?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  minHeight?: number
  paddingX?: number
  paddingY?: number
  className?: string
}

export function ACGFooter({
  accentColor = colorVars.signalOrange,
  backgroundColor = colorVars.nocturnalForest,
  backToTopLabel = 'Back to top',
  backToTopLink = { href: '#top' },
  brandPrefix = 'ACG',
  brandSuffix = 'studio',
  className = '',
  contactLabel = 'GET IN TOUCH',
  contactLink = { href: '#contact' },
  copyright = '© 2026 ACG STUDIO, a division of ALLGRAPHICSINC. All rights reserved.',
  firstLabel = 'WHAT WE DO',
  firstLegalLabel = 'PRIVACY POLICY',
  firstLegalLink = { href: '#privacy' },
  firstLink = { href: '#what-we-do' },
  firstSocialLabel = 'LINKEDIN',
  firstSocialLink = { href: '#linkedin' },
  fourthLabel = 'ABOUT',
  fourthLink = { href: '#about' },
  headline = 'How can we help you?',
  minHeight = 820,
  paddingX = 28,
  paddingY = 52,
  secondLabel = 'HOW WE WORK',
  secondLegalLabel = 'COOKIE POLICY',
  secondLegalLink = { href: '#cookies' },
  secondLink = { href: '#how-we-work' },
  secondSocialLabel = 'INSTAGRAM',
  secondSocialLink = { href: '#instagram' },
  textColor = colorVars.petalMist,
  thirdLabel = 'WORK',
  thirdLegalLabel = 'TERMS & CONDITIONS',
  thirdLegalLink = { href: '#terms' },
  thirdLink = { href: '#work' },
  ...layoutProps
}: ACGFooterProps) {
  const rootClassName = ['acg-footer', className].filter(Boolean).join(' ')

  return (
    <footer
      className={rootClassName}
      style={getRootStyle({
        backgroundColor,
        layoutProps,
        minHeight,
        paddingX,
        paddingY,
        textColor,
      })}
    >
      <style>{responsiveStyles}</style>
      <div className="acg-footer__top" style={topRowStyle}>
        <nav aria-label="Footer navigation" style={linkColumnStyle}>
          <FooterAnchor label={firstLabel} link={firstLink} />
          <FooterAnchor label={secondLabel} link={secondLink} />
          <FooterAnchor label={thirdLabel} link={thirdLink} />
          <FooterAnchor label={fourthLabel} link={fourthLink} />
        </nav>
        <nav aria-label="Social links" style={linkColumnStyle}>
          <FooterAnchor label={firstSocialLabel} link={firstSocialLink} />
          <FooterAnchor label={secondSocialLabel} link={secondSocialLink} />
        </nav>
        <FooterAnchor label={`ⓘ ${backToTopLabel}`} link={backToTopLink} style={getBackToTopStyle(accentColor)} />
        <h2 className="acg-footer__headline" style={headlineStyle}>
          {headline}
        </h2>
        <div className="acg-footer__cta">
          <GetInTouchButton color={accentColor} hoverColor={textColor} label={contactLabel} link={contactLink} tone="Orange" />
        </div>
      </div>

      <div className="acg-footer__brand" style={brandRowStyle}>
        <p style={getBrandTextStyle(accentColor)}>{brandPrefix}</p>
        <span aria-hidden="true" style={getMarkStyle(accentColor)}>
          <span style={markSliceStyle} />
          <span style={markSliceStyle} />
          <span style={markSliceStyle} />
        </span>
        <p style={getBrandTextStyle(accentColor)}>{brandSuffix}</p>
      </div>

      <div className="acg-footer__bottom" style={bottomRowStyle}>
        <p style={finePrintStyle}>{copyright}</p>
        <nav aria-label="Legal links" className="acg-footer__legal" style={legalRowStyle}>
          <FooterAnchor label={firstLegalLabel} link={firstLegalLink} style={legalLinkStyle} />
          <FooterAnchor label={secondLegalLabel} link={secondLegalLink} style={legalLinkStyle} />
          <FooterAnchor label={thirdLegalLabel} link={thirdLegalLink} style={legalLinkStyle} />
        </nav>
      </div>
    </footer>
  )
}

function FooterAnchor({
  label,
  link,
  style = smallLinkStyle,
}: {
  label: string
  link?: FooterLink
  style?: CSSProperties
}) {
  if (!label.trim()) return null

  return (
    <a href={link?.href} rel={link?.target === '_blank' ? 'noreferrer' : undefined} style={style} target={link?.target}>
      {label}
    </a>
  )
}
