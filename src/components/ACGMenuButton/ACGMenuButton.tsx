import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import acgLogoDark from '../../assets/acg-logo-dark.png'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'
import {
  contactSlotStyle,
  defaultMenuBackground,
  defaultMenuHoverColor,
  defaultMenuTextColor,
  defaultTextColor,
  getCloseButtonStyle,
  getMenuButtonStyle,
  getMenuScrollerStyle,
  getOverlayHeaderStyle,
  getOverlayStyle,
  logoImageStyle,
  logoLinkStyle,
  menuIndexStyle,
  menuItemStyle,
  menuLabelStyle,
} from '../ACGNavbar/ACGNavbar.styles'
import { GetInTouchButton } from '../GetInTouchButton/GetInTouchButton'

export interface ACGMenuButtonLink {
  href: string
  target?: string
  preload?: string
}

export interface ACGMenuButtonImage {
  src: string
  alt?: string
}

export interface ACGMenuButtonProps extends ComponentLayoutProps {
  logoText?: string
  menuLogo?: ACGMenuButtonImage
  menuLogoHeight?: number
  hideOpenMenuLogo?: boolean
  contactLabel?: string
  contactLink?: ACGMenuButtonLink
  contactColor?: string
  contactHoverColor?: string
  menuLabel?: string
  closeLabel?: string
  firstLabel?: string
  firstLink?: ACGMenuButtonLink
  secondLabel?: string
  secondLink?: ACGMenuButtonLink
  thirdLabel?: string
  thirdLink?: ACGMenuButtonLink
  fourthLabel?: string
  fourthLink?: ACGMenuButtonLink
  menuBackground?: string
  textColor?: string
  menuTextColor?: string
  menuHoverColor?: string
  openMenuHeaderHeight?: number
  openMenuHeaderTopPadding?: number
}

interface MenuItem {
  label: string
  link?: ACGMenuButtonLink
}

export function ACGMenuButton({
  closeLabel = 'CLOSE',
  contactColor = colorVars.nocturnalForest,
  contactHoverColor = colorVars.petalMist,
  contactLabel = 'GET IN TOUCH',
  contactLink = { href: '#contact' },
  firstLabel = 'WHAT WE DO',
  firstLink = { href: '#what-we-do' },
  fourthLabel = 'ABOUT',
  fourthLink = { href: '#about' },
  hideOpenMenuLogo = false,
  logoText = 'Logo',
  menuBackground = defaultMenuBackground,
  menuHoverColor = defaultMenuHoverColor,
  menuLabel = 'MENU',
  menuLogo,
  menuLogoHeight = 39,
  menuTextColor = defaultMenuTextColor,
  openMenuHeaderHeight = 115,
  openMenuHeaderTopPadding = 28,
  secondLabel = 'HOW WE WORK',
  secondLink = { href: '#how-we-work' },
  textColor = defaultTextColor,
  thirdLabel = 'WORK',
  thirdLink = { href: '#work' },
  ...layoutProps
}: ACGMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const items = useMemo<MenuItem[]>(
    () =>
      [
        createMenuItem(firstLabel, firstLink),
        createMenuItem(secondLabel, secondLink),
        createMenuItem(thirdLabel, thirdLink),
        createMenuItem(fourthLabel, fourthLink),
      ].filter((item) => item.label.trim().length > 0),
    [firstLabel, firstLink, fourthLabel, fourthLink, secondLabel, secondLink, thirdLabel, thirdLink],
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

  const rootStyle: CSSProperties = {
    alignItems: 'center',
    display: 'inline-flex',
    ...getLayoutStyles(layoutProps),
  }
  const resolvedContactColor = resolveColor(contactColor, colorVars.nocturnalForest)
  const resolvedContactHoverColor = resolveColor(contactHoverColor, colorVars.petalMist)

  return (
    <>
      <div style={rootStyle}>
        <button style={getMenuButtonStyle(textColor)} onClick={() => setIsMenuOpen(true)} type="button">
          {menuLabel}
        </button>
      </div>

      {isMenuOpen ? (
        <div style={getOverlayStyle(menuBackground)}>
          <header style={getOverlayHeaderStyle(menuBackground, openMenuHeaderHeight, openMenuHeaderTopPadding)}>
            <button style={getCloseButtonStyle()} onClick={() => setIsMenuOpen(false)} type="button">
              {closeLabel}
            </button>
            <LogoLink
              logo={menuLogo ?? { src: acgLogoDark, alt: logoText }}
              logoHeight={menuLogoHeight}
              logoText={logoText}
              reveal={!hideOpenMenuLogo}
            />
            <div style={contactSlotStyle}>
              <GetInTouchButton
                color={resolvedContactColor}
                hoverColor={resolvedContactHoverColor}
                label={contactLabel}
                link={contactLink}
                tone="Olive"
              />
            </div>
          </header>
          <div ref={scrollerRef} style={getMenuScrollerStyle(openMenuHeaderHeight)}>
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

function createMenuItem(label: string, link?: ACGMenuButtonLink): MenuItem {
  return link ? { label, link } : { label }
}

function resolveColor(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function LogoLink({
  logo,
  logoHeight,
  logoText,
  reveal,
}: {
  logo: ACGMenuButtonImage
  logoHeight: number
  logoText: string
  reveal: boolean
}) {
  const revealStyle = {
    ...logoLinkStyle,
    opacity: reveal ? 1 : 0,
    pointerEvents: reveal ? 'auto' : 'none',
    transform: reveal ? 'translateY(0)' : 'translateY(-8px)',
  } as const

  return (
    <a aria-label={logoText} href="#top" style={revealStyle}>
      <img alt={logo.alt ?? ''} src={logo.src} style={{ ...logoImageStyle, height: logoHeight }} />
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
      <span style={{ ...menuIndexStyle, borderColor: color }}>
        {String((index % totalItems) + 1).padStart(2, '0')}
      </span>
      <span style={menuLabelStyle}>{item.label}</span>
    </a>
  )
}
