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
  getHeroLinksWrapStyle,
  getMenuScrollerStyle,
  getMenuButtonStyle,
  getMenuButtonWrapStyle,
  getOverlayHeaderStyle,
  getOverlayStyle,
  getRootStyle,
  heroLinksStyle,
  logoImageStyle,
  logoLinkStyle,
  menuIndexStyle,
  menuItemStyle,
  menuLabelStyle,
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
  hideInitialLogo?: boolean
  hideScrollLogo?: boolean
  hideOpenMenuLogo?: boolean
  initialNavbarHeight?: number
  scrollNavbarHeight?: number
  openMenuNavbarHeight?: number
  initialNavbarTopPadding?: number
  scrollNavbarTopPadding?: number
  openMenuNavbarTopPadding?: number
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
  logoRevealScroll?: number
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
  hideInitialLogo = true,
  hideOpenMenuLogo = false,
  hideScrollLogo = false,
  heroLogo,
  heroLogoHeight = 39,
  initialNavbarHeight = 115,
  initialNavbarTopPadding = 28,
  logoText = 'Logo',
  logoRevealScroll,
  menuLabel = 'MENU',
  menuBackground = defaultMenuBackground,
  menuHoverColor = defaultMenuHoverColor,
  menuLogo,
  menuLogoHeight = 39,
  menuTextColor = defaultMenuTextColor,
  navBackground = defaultNavBackground,
  openMenuNavbarHeight = 115,
  openMenuNavbarTopPadding = 28,
  scrollThreshold = 24,
  scrollNavbarHeight = 92,
  scrollNavbarTopPadding = 18,
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
  const [hasLogoRevealed, setHasLogoRevealed] = useState(() => !isPositiveNumber(logoRevealScroll))
  const scrollerRef = useRef<HTMLDivElement>(null)
  const compactStateRef = useRef(false)
  const logoRevealStateRef = useRef(!isPositiveNumber(logoRevealScroll))

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
      const currentScroll = window.scrollY
      const shouldCompact = compactStateRef.current
        ? currentScroll > Math.max(0, scrollThreshold - 8)
        : currentScroll > scrollThreshold + 8
      const shouldRevealLogo = isPositiveNumber(logoRevealScroll) ? currentScroll >= (logoRevealScroll ?? 0) : true

      if (shouldCompact !== compactStateRef.current) {
        compactStateRef.current = shouldCompact
        setIsCompact(shouldCompact)
      }

      if (shouldRevealLogo !== logoRevealStateRef.current) {
        logoRevealStateRef.current = shouldRevealLogo
        setHasLogoRevealed(shouldRevealLogo)
      }
    }

    logoRevealStateRef.current = !isPositiveNumber(logoRevealScroll)
    setHasLogoRevealed(!isPositiveNumber(logoRevealScroll))
    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    return () => window.removeEventListener('scroll', updateState)
  }, [logoRevealScroll, scrollThreshold])

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
  const resolvedContactColor = resolveColor(contactColor, colorVars.nocturnalForest)
  const resolvedContactHoverColor = resolveColor(contactHoverColor, colorVars.signalOrange)
  const resolvedContactOrangeHoverColor = resolveColor(contactOrangeHoverColor, colorVars.petalMist)
  const headerContactHoverColor = isCompact && !isMenuOpen ? resolvedContactHoverColor : resolvedContactOrangeHoverColor
  const headerLogoHidden = showCompact ? hideScrollLogo : hideInitialLogo

  return (
    <>
      <div style={rootStyle}>
        <header
          style={
            showCompact
              ? getCompactShellStyle(compactBackground, scrollNavbarHeight, scrollNavbarTopPadding)
              : getHeroShellStyle(navBackground, initialNavbarHeight, initialNavbarTopPadding)
          }
        >
          <div aria-hidden={showCompact} style={getHeroLinksWrapStyle(showCompact)}>
            <nav aria-label="Main navigation" style={heroLinksStyle}>
              {items.map((item) => (
                <MenuAnchor item={item} key={item.label} tabIndex={showCompact ? -1 : undefined} textColor={textColor} />
              ))}
            </nav>
          </div>
          <div style={getMenuButtonWrapStyle(showCompact)}>
            <button style={getMenuButtonStyle(textColor)} onClick={() => setIsMenuOpen(true)} tabIndex={showCompact ? 0 : -1} type="button">
              {menuLabel}
            </button>
          </div>

          <LogoLink
            compactLogo={compactLogo}
            compactLogoHeight={compactLogoHeight}
            heroLogo={heroLogo}
            heroLogoHeight={heroLogoHeight}
            isOverlay={false}
            logoText={logoText}
            menuLogo={menuLogo}
            menuLogoHeight={menuLogoHeight}
            reveal={hasLogoRevealed && !headerLogoHidden}
            showCompact={showCompact}
          />

          <div style={contactSlotStyle}>
            <GetInTouchButton
              color={resolvedContactColor}
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
          <header style={getOverlayHeaderStyle(menuBackground, openMenuNavbarHeight, openMenuNavbarTopPadding)}>
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
              reveal={!hideOpenMenuLogo}
              showCompact
            />
            <div style={contactSlotStyle}>
              <GetInTouchButton
                color={resolvedContactColor}
                hoverColor={resolvedContactOrangeHoverColor}
                label={contactLabel}
                link={contactLink}
                tone="Olive"
              />
            </div>
          </header>
          <div ref={scrollerRef} style={getMenuScrollerStyle(openMenuNavbarHeight)}>
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

function resolveColor(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function isPositiveNumber(value: number | undefined) {
  return typeof value === 'number' && value > 0
}

function MenuAnchor({ item, tabIndex, textColor }: { item: MenuItem; tabIndex: number | undefined; textColor: string }) {
  return (
    <a
      href={item.link?.href}
      rel={item.link?.target === '_blank' ? 'noreferrer' : undefined}
      style={getHeroLinkStyle(textColor)}
      tabIndex={tabIndex}
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
  reveal,
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
  reveal: boolean
  showCompact: boolean
}) {
  const logo = isOverlay
    ? { height: menuLogoHeight, image: menuLogo ?? { src: acgLogoDark, alt: logoText } }
    : showCompact
      ? { height: compactLogoHeight, image: compactLogo ?? { src: acgLogoPrincipal, alt: logoText } }
      : { height: heroLogoHeight, image: heroLogo ?? { src: acgLogoDark, alt: logoText } }

  const revealStyle = {
    ...logoLinkStyle,
    opacity: reveal ? 1 : 0,
    pointerEvents: reveal ? 'auto' : 'none',
    transform: reveal ? 'translateY(0)' : 'translateY(-8px)',
  } as const

  return (
    <a aria-label={logoText} href="#top" style={revealStyle}>
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
