import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'

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

const defaultNavBackground = 'var(--acg-nav-background, #ff4f00)'
const defaultCompactBackground = 'var(--acg-nav-compact-background, #f4ede9)'
const defaultMenuBackground = 'var(--acg-nav-menu-background, var(--acg-nav-background, #ff4f00))'
const defaultTextColor = 'var(--acg-nav-text, #0b0b0b)'
const defaultMenuTextColor = 'var(--acg-nav-menu-text, #9d3400)'
const defaultMenuHoverColor = 'var(--acg-nav-menu-hover, #0b0b0b)'

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
  const scrollerRef = useRef<HTMLDivElement>(null)

  const items = useMemo<MenuItem[]>(
    () => [
      { label: firstLabel, link: firstLink },
      { label: secondLabel, link: secondLink },
      { label: thirdLabel, link: thirdLink },
      { label: fourthLabel, link: fourthLink },
    ],
    [firstLabel, firstLink, fourthLabel, fourthLink, secondLabel, secondLink, thirdLabel, thirdLink],
  )

  const repeatedItems = useMemo(
    () =>
      Array.from({ length: 8 }, (_, groupIndex) =>
        items.map((item, itemIndex) => ({ ...item, key: `${groupIndex}-${itemIndex}` })),
      ).flat(),
    [items],
  )

  useEffect(() => {
    const updateState = () => setIsCompact(window.scrollY > scrollThreshold)
    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    return () => window.removeEventListener('scroll', updateState)
  }, [scrollThreshold])

  useEffect(() => {
    if (!isMenuOpen || !scrollerRef.current) return
    const scroller = scrollerRef.current
    scroller.scrollTop = scroller.scrollHeight / 3

    const handleScroll = () => {
      const lowLimit = scroller.scrollHeight * 0.18
      const highLimit = scroller.scrollHeight * 0.64

      if (scroller.scrollTop < lowLimit) scroller.scrollTop += scroller.scrollHeight / 3
      if (scroller.scrollTop > highLimit) scroller.scrollTop -= scroller.scrollHeight / 3
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const showCompact = isCompact || isMenuOpen
  const rootStyle: CSSProperties = {
    display: 'flex',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 30,
    ...getLayoutStyles(layoutProps),
  }

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

          <a href="#top" style={showCompact ? getCompactLogoStyle(navBackground) : getHeroLogoStyle(textColor)}>
            {logoText}
          </a>

          <PillLink label={contactLabel} link={contactLink} textColor={textColor} />
        </header>
      </div>

      {isMenuOpen ? (
        <div style={getOverlayStyle(menuBackground)}>
          <header style={getOverlayHeaderStyle(menuBackground)}>
            <button style={getCloseButtonStyle()} onClick={() => setIsMenuOpen(false)} type="button">
              CLOSE
            </button>
            <a href="#top" style={overlayLogoStyle}>
              {logoText}
            </a>
            <PillLink label={contactLabel} link={contactLink} textColor={textColor} />
          </header>
          <div ref={scrollerRef} style={menuScrollerStyle}>
            {repeatedItems.map((item, index) => (
              <MenuScrollerItem
                index={index}
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

function PillLink({ label, link, textColor }: { label: string; link?: NavbarLink; textColor: string }) {
  return (
    <a
      href={link?.href}
      rel={link?.target === '_blank' ? 'noreferrer' : undefined}
      style={getPillStyle(textColor)}
      target={link?.target}
    >
      {label}
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

function getHeroShellStyle(background: string): CSSProperties {
  return {
    alignItems: 'flex-start',
    background,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    minHeight: 116,
    padding: '22px 22px',
    width: '100%',
  }
}

function getCompactShellStyle(background: string): CSSProperties {
  return {
    alignItems: 'center',
    background,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    minHeight: 78,
    padding: '18px 24px',
    width: '100%',
  }
}

const heroLinksStyle: CSSProperties = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  justifySelf: 'start',
  lineHeight: 1.05,
}

function getHeroLinkStyle(color: string): CSSProperties {
  return {
    color,
    fontSize: 12,
    fontWeight: 900,
    lineHeight: 1.1,
    textDecoration: 'none',
  }
}

function getMenuButtonStyle(color: string): CSSProperties {
  return {
    background: 'transparent',
    border: 0,
    color,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 12,
    fontWeight: 900,
    justifySelf: 'start',
    padding: 0,
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  }
}

function getCloseButtonStyle(): CSSProperties {
  return {
    ...getMenuButtonStyle('#ffffff'),
  }
}

function getHeroLogoStyle(color: string): CSSProperties {
  return {
    alignSelf: 'center',
    color,
    fontSize: 13,
    fontWeight: 900,
    justifySelf: 'center',
    textDecoration: 'none',
  }
}

function getCompactLogoStyle(background: string): CSSProperties {
  return {
    ...getHeroLogoStyle(defaultTextColor),
    background,
    color: '#ffffff',
    padding: '6px 10px',
  }
}

const overlayLogoStyle: CSSProperties = {
  ...getCompactLogoStyle(defaultTextColor),
  background: defaultTextColor,
}

function getPillStyle(color: string): CSSProperties {
  return {
    alignItems: 'center',
    border: `2px solid ${color}`,
    borderRadius: 999,
    color,
    display: 'inline-flex',
    fontSize: 12,
    fontWeight: 900,
    justifyContent: 'center',
    justifySelf: 'end',
    lineHeight: 1,
    padding: '8px 13px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  }
}

function getOverlayStyle(background: string): CSSProperties {
  return {
    background,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 80,
  }
}

function getOverlayHeaderStyle(background: string): CSSProperties {
  return {
    ...getCompactShellStyle(background),
    position: 'sticky',
    top: 0,
    zIndex: 2,
  }
}

const menuScrollerStyle: CSSProperties = {
  height: 'calc(100svh - 84px)',
  overflowY: 'auto',
  padding: '0 52px 80px',
  scrollbarWidth: 'none',
}

const menuItemStyle: CSSProperties = {
  alignItems: 'center',
  display: 'grid',
  gap: 24,
  gridTemplateColumns: '150px 1fr',
  minHeight: 122,
  textDecoration: 'none',
  transition: 'color 140ms ease',
}

const menuIndexStyle: CSSProperties = {
  border: `2px solid ${defaultMenuTextColor}`,
  borderRadius: '50%',
  display: 'inline-flex',
  fontSize: 42,
  fontWeight: 900,
  height: 72,
  justifyContent: 'center',
  lineHeight: 1,
  width: 72,
}

const menuLabelStyle: CSSProperties = {
  fontSize: 'clamp(52px, 8vw, 104px)',
  fontWeight: 900,
  lineHeight: 0.95,
  textAlign: 'center',
}
