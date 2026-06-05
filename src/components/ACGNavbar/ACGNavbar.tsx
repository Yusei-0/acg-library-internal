import { useEffect, useMemo, useRef, useState } from 'react'
import acgLogoDark from '../../assets/acg-logo-dark.png'
import acgLogoPrincipal from '../../assets/acg-logo-principal.png'
import type { ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'
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

export interface NavbarImage {
  src: string
  alt?: string
}

export interface ACGNavbarProps extends ComponentLayoutProps {
  logoText?: string
  heroLogo?: NavbarImage
  compactLogo?: NavbarImage
  menuLogo?: NavbarImage
  heroLogoHeight?: number
  compactLogoHeight?: number
  menuLogoHeight?: number
  contactLabel?: string
  contactLink?: NavbarLink
  contactColor?: string
  contactHoverColor?: string
  contactOrangeHoverColor?: string
  menuLabel?: string
  closeLabel?: string
  firstLabel?: string
  firstLink?: NavbarLink
  secondLabel?: string
  secondLink?: NavbarLink
  thirdLabel?: string
  thirdLink?: NavbarLink
  fourthLabel?: string
  fourthLink?: NavbarLink
  fifthLabel?: string
  fifthLink?: NavbarLink
  sixthLabel?: string
  sixthLink?: NavbarLink
  seventhLabel?: string
  seventhLink?: NavbarLink
  eighthLabel?: string
  eighthLink?: NavbarLink
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
  closeLabel = 'CLOSE',
  compactLogo,
  compactLogoHeight = 39,
  contactColor = colorVars.nocturnalForest,
  contactHoverColor = colorVars.signalOrange,
  contactLabel = 'GET IN TOUCH',
  contactLink = { href: '#contact' },
  contactOrangeHoverColor = colorVars.petalMist,
  eighthLabel = '',
  eighthLink,
  fifthLabel = '',
  fifthLink,
  firstLabel = 'WHAT WE DO',
  firstLink = { href: '#what-we-do' },
  fourthLabel = 'ABOUT',
  fourthLink = { href: '#about' },
  heroLogo,
  heroLogoHeight = 39,
  logoText = 'Logo',
  menuLabel = 'MENU',
  menuBackground = defaultMenuBackground,
  menuHoverColor = defaultMenuHoverColor,
  menuLogo,
  menuLogoHeight = 39,
  menuTextColor = defaultMenuTextColor,
  navBackground = defaultNavBackground,
  scrollThreshold = 24,
  secondLabel = 'HOW WE WORK',
  secondLink = { href: '#how-we-work' },
  textColor = defaultTextColor,
  thirdLabel = 'WORK',
  thirdLink = { href: '#work' },
  seventhLabel = '',
  seventhLink,
  sixthLabel = '',
  sixthLink,
  ...layoutProps
}: ACGNavbarProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const compactStateRef = useRef(false)

  const items = useMemo<MenuItem[]>(
    () => [
      createMenuItem(firstLabel, firstLink),
      createMenuItem(secondLabel, secondLink),
      createMenuItem(thirdLabel, thirdLink),
      createMenuItem(fourthLabel, fourthLink),
      createMenuItem(fifthLabel, fifthLink),
      createMenuItem(sixthLabel, sixthLink),
      createMenuItem(seventhLabel, seventhLink),
      createMenuItem(eighthLabel, eighthLink),
    ].filter((item) => item.label.trim().length > 0),
    [
      eighthLabel,
      eighthLink,
      fifthLabel,
      fifthLink,
      firstLabel,
      firstLink,
      fourthLabel,
      fourthLink,
      secondLabel,
      secondLink,
      seventhLabel,
      seventhLink,
      sixthLabel,
      sixthLink,
      thirdLabel,
      thirdLink,
    ],
  )

  const repeatedItems = useMemo(
    () =>
      Array.from({ length: 5 }, (_, groupIndex) =>
        items.map((item, itemIndex) => ({
          ...item,
          key: `${groupIndex}-${itemIndex}`,
          visibleIndex: itemIndex,
        })),
      ).flat(),
    [items],
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

  useEffect(() => {
    if (!isMenuOpen || !scrollerRef.current) return

    const scroller = scrollerRef.current
    const repeatCount = 5

    const setMiddleBlock = () => {
      const blockHeight = scroller.scrollHeight / repeatCount
      scroller.scrollTop = blockHeight * 2
    }

    const animationFrame = window.requestAnimationFrame(setMiddleBlock)

    const handleScroll = () => {
      const blockHeight = scroller.scrollHeight / repeatCount
      const lowLimit = blockHeight
      const highLimit = blockHeight * 3

      if (scroller.scrollTop < lowLimit) scroller.scrollTop += blockHeight * 2
      if (scroller.scrollTop > highLimit) scroller.scrollTop -= blockHeight * 2
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(animationFrame)
      scroller.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen])

  const showCompact = isCompact || isMenuOpen
  const rootStyle = getRootStyle(layoutProps)
  const headerContactHoverColor = showCompact ? contactHoverColor : contactOrangeHoverColor

  return (
    <>
      <div style={rootStyle}>
        <header style={showCompact ? getCompactShellStyle(compactBackground) : getHeroShellStyle(navBackground)}>
          {showCompact ? (
            <button style={getMenuButtonStyle(textColor)} onClick={() => setIsMenuOpen(true)} type="button">
              {menuLabel}
            </button>
          ) : (
            <nav aria-label="Main navigation" style={heroLinksStyle}>
              {items.map((item) => (
                <MenuAnchor item={item} key={item.label} textColor={textColor} />
              ))}
            </nav>
          )}

          <LogoLink
            compactLogo={compactLogo}
            compactLogoHeight={compactLogoHeight}
            heroLogo={heroLogo}
            heroLogoHeight={heroLogoHeight}
            isOverlay={false}
            logoText={logoText}
            menuLogo={menuLogo}
            menuLogoHeight={menuLogoHeight}
            showCompact={showCompact}
          />

          <div style={contactSlotStyle}>
            <GetInTouchButton
              color={contactColor}
              hoverColor={headerContactHoverColor}
              label={contactLabel}
              link={contactLink}
              tone="Olive"
            />
          </div>
        </header>
      </div>

      {isMenuOpen ? (
        <div style={getOverlayStyle(menuBackground)}>
          <header style={getOverlayHeaderStyle(menuBackground)}>
            <button style={getCloseButtonStyle()} onClick={() => setIsMenuOpen(false)} type="button">
              {closeLabel}
            </button>
            <LogoLink
              compactLogo={compactLogo}
              compactLogoHeight={compactLogoHeight}
              heroLogo={heroLogo}
              heroLogoHeight={heroLogoHeight}
              isOverlay
              logoText={logoText}
              menuLogo={menuLogo}
              menuLogoHeight={menuLogoHeight}
              showCompact
            />
            <div style={contactSlotStyle}>
              <GetInTouchButton
                color={contactColor}
                hoverColor={contactOrangeHoverColor}
                label={contactLabel}
                link={contactLink}
                tone="Olive"
              />
            </div>
          </header>
          <div ref={scrollerRef} style={menuScrollerStyle}>
            {repeatedItems.map((item) => (
              <MenuScrollerItem
                index={item.visibleIndex}
                item={item}
                key={item.key}
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

function createMenuItem(label: string, link?: NavbarLink): MenuItem {
  return link ? { label, link } : { label }
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
  compactLogo,
  compactLogoHeight,
  heroLogo,
  heroLogoHeight,
  isOverlay,
  logoText,
  menuLogo,
  menuLogoHeight,
  showCompact,
}: {
  compactLogo: NavbarImage | undefined
  compactLogoHeight: number
  heroLogo: NavbarImage | undefined
  heroLogoHeight: number
  isOverlay: boolean
  logoText: string
  menuLogo: NavbarImage | undefined
  menuLogoHeight: number
  showCompact: boolean
}) {
  const logo = isOverlay
    ? { height: menuLogoHeight, image: menuLogo ?? { src: acgLogoDark, alt: logoText } }
    : showCompact
      ? { height: compactLogoHeight, image: compactLogo ?? { src: acgLogoPrincipal, alt: logoText } }
      : { height: heroLogoHeight, image: heroLogo ?? { src: acgLogoDark, alt: logoText } }

  return (
    <a aria-label={logoText} href="#top" style={logoLinkStyle}>
      <img alt={logo.image.alt ?? ''} src={logo.image.src} style={{ ...logoImageStyle, height: logo.height }} />
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
