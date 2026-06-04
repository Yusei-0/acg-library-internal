import { useEffect, useMemo, useRef, useState } from 'react'
import acgLogoDark from '../../assets/acg-logo-dark.png'
import acgLogoPrincipal from '../../assets/acg-logo-principal.png'
import type { ComponentLayoutProps } from '../../shared/layout'
import { GetInTouchButton } from '../GetInTouchButton/GetInTouchButton'
import {
  contactSlotStyle,
  defaultCompactBackground,
  defaultMenuBackground,
  defaultMenuHoverColor,
  defaultMenuTextColor,
  defaultNavBackground,
  defaultTextColor,
  getCloseButtonStyle,
  getCompactShellStyle,
  getHeroLinkStyle,
  getHeroShellStyle,
  getMenuButtonStyle,
  getOverlayHeaderStyle,
  getOverlayStyle,
  getRootStyle,
  heroLinksStyle,
  logoImageStyle,
  logoLinkStyle,
  menuIndexStyle,
  menuItemStyle,
  menuLabelStyle,
  menuScrollerStyle,
} from './ACGNavbar.styles'

export interface NavbarLink {
  href: string
  target?: string
  preload?: string
}

export interface ACGNavbarProps extends ComponentLayoutProps {
  logoText?: string
  contactLabel?: string
  contactLink?: NavbarLink
  firstLabel?: string
  firstLink?: NavbarLink
  secondLabel?: string
  secondLink?: NavbarLink
  thirdLabel?: string
  thirdLink?: NavbarLink
  fourthLabel?: string
  fourthLink?: NavbarLink
  scrollThreshold?: number
  navBackground?: string
  compactBackground?: string
  menuBackground?: string
  textColor?: string
  menuTextColor?: string
  menuHoverColor?: string
}

interface MenuItem {
  label: string
  link?: NavbarLink
}

export function ACGNavbar({
  compactBackground = defaultCompactBackground,
  contactLabel = 'GET IN TOUCH',
  contactLink = { href: '#contact' },
  firstLabel = 'WHAT WE DO',
  firstLink = { href: '#what-we-do' },
  fourthLabel = 'ABOUT',
  fourthLink = { href: '#about' },
  logoText = 'Logo',
  menuBackground = defaultMenuBackground,
  menuHoverColor = defaultMenuHoverColor,
  menuTextColor = defaultMenuTextColor,
  navBackground = defaultNavBackground,
  scrollThreshold = 24,
  secondLabel = 'HOW WE WORK',
  secondLink = { href: '#how-we-work' },
  textColor = defaultTextColor,
  thirdLabel = 'WORK',
  thirdLink = { href: '#work' },
  ...layoutProps
}: ACGNavbarProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const compactStateRef = useRef(false)

  const items = useMemo<MenuItem[]>(
    () => [
      { label: firstLabel, link: firstLink },
      { label: secondLabel, link: secondLink },
      { label: thirdLabel, link: thirdLink },
      { label: fourthLabel, link: fourthLink },
    ],
    [firstLabel, firstLink, fourthLabel, fourthLink, secondLabel, secondLink, thirdLabel, thirdLink],
  )

  useEffect(() => {
    const updateState = () => {
      const shouldCompact = compactStateRef.current
        ? window.scrollY > Math.max(0, scrollThreshold - 8)
        : window.scrollY > scrollThreshold + 8

      if (shouldCompact !== compactStateRef.current) {
        compactStateRef.current = shouldCompact
        setIsCompact(shouldCompact)
      }
    }

    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    return () => window.removeEventListener('scroll', updateState)
  }, [scrollThreshold])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const showCompact = isCompact || isMenuOpen
  const rootStyle = getRootStyle(layoutProps)

  return (
    <>
      <div style={rootStyle}>
        <header style={showCompact ? getCompactShellStyle(compactBackground) : getHeroShellStyle(navBackground)}>
          {showCompact ? (
            <button style={getMenuButtonStyle(textColor)} onClick={() => setIsMenuOpen(true)} type="button">
              MENU
            </button>
          ) : (
            <nav aria-label="Main navigation" style={heroLinksStyle}>
              {items.map((item) => (
                <MenuAnchor item={item} key={item.label} textColor={textColor} />
              ))}
            </nav>
          )}

          <LogoLink isOverlay={false} logoText={logoText} showCompact={showCompact} />

          <div style={contactSlotStyle}>
            <GetInTouchButton label={contactLabel} link={contactLink} tone="Olive" />
          </div>
        </header>
      </div>

      {isMenuOpen ? (
        <div style={getOverlayStyle(menuBackground)}>
          <header style={getOverlayHeaderStyle(menuBackground)}>
            <button style={getCloseButtonStyle()} onClick={() => setIsMenuOpen(false)} type="button">
              CLOSE
            </button>
            <LogoLink isOverlay logoText={logoText} showCompact />
            <div style={contactSlotStyle}>
              <GetInTouchButton label={contactLabel} link={contactLink} tone="Olive" />
            </div>
          </header>
          <div style={menuScrollerStyle}>
            {items.map((item, index) => (
              <MenuScrollerItem
                index={index}
                item={item}
                key={item.label}
                menuHoverColor={menuHoverColor}
                menuTextColor={menuTextColor}
                onClick={() => setIsMenuOpen(false)}
                totalItems={items.length}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

function MenuAnchor({ item, textColor }: { item: MenuItem; textColor: string }) {
  return (
    <a
      href={item.link?.href}
      rel={item.link?.target === '_blank' ? 'noreferrer' : undefined}
      style={getHeroLinkStyle(textColor)}
      target={item.link?.target}
    >
      {item.label}
    </a>
  )
}

function LogoLink({
  isOverlay,
  logoText,
  showCompact,
}: {
  isOverlay: boolean
  logoText: string
  showCompact: boolean
}) {
  const logoSrc = isOverlay ? acgLogoDark : showCompact ? acgLogoPrincipal : acgLogoDark

  return (
    <a aria-label={logoText} href="#top" style={logoLinkStyle}>
      <img alt="" src={logoSrc} style={logoImageStyle} />
    </a>
  )
}

function MenuScrollerItem({
  index,
  item,
  menuHoverColor,
  menuTextColor,
  onClick,
  totalItems,
}: {
  index: number
  item: MenuItem
  menuHoverColor: string
  menuTextColor: string
  onClick: () => void
  totalItems: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const color = isHovered ? menuHoverColor : menuTextColor

  return (
    <a
      href={item.link?.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      rel={item.link?.target === '_blank' ? 'noreferrer' : undefined}
      style={{ ...menuItemStyle, borderBottom: `1px solid ${menuTextColor}`, color }}
      target={item.link?.target}
    >
      <span style={{ ...menuIndexStyle, borderColor: color }}>{String((index % totalItems) + 1).padStart(2, '0')}</span>
      <span style={menuLabelStyle}>{item.label}</span>
    </a>
  )
}
