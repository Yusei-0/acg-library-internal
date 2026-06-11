import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
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

export type ACGMenuButtonVariant = 'Button' | 'Links To Button'

export interface ACGMenuButtonProps extends ComponentLayoutProps {
  variant?: ACGMenuButtonVariant
  scrollTrigger?: number
  triggerAlignItems?: string
  triggerJustifyItems?: string
  triggerAlignContent?: string
  triggerJustifyContent?: string
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
  menuButtonHoverColor?: string
  menuButtonFontFamily?: string
  menuButtonFontSize?: number
  menuButtonFontWeight?: number
  menuButtonLineHeight?: number
  menuButtonLetterSpacing?: string
  menuButtonTextTransform?: string
  menuButtonAlignSelf?: string
  menuButtonJustifySelf?: string
  linksColor?: string
  linksHoverColor?: string
  linksFontFamily?: string
  linksFontSize?: number
  linksFontWeight?: number
  linksLetterSpacing?: string
  linksLineHeight?: number
  linksTextTransform?: string
  linksGap?: number
  linksAlignItems?: string
  linksJustifyItems?: string
  linksAlignSelf?: string
  linksJustifySelf?: string
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
  linksAlignItems = 'start',
  linksAlignSelf = 'start',
  linksColor = colorVars.nocturnalForest,
  linksFontFamily,
  linksFontSize = 14,
  linksFontWeight = 800,
  linksGap = 0,
  linksHoverColor = colorVars.signalOrange,
  linksLetterSpacing = '-0.06em',
  linksLineHeight = 1,
  linksJustifyItems = 'start',
  linksJustifySelf = 'start',
  linksTextTransform = 'uppercase',
  logoText = 'Logo',
  menuBackground = defaultMenuBackground,
  menuButtonAlignSelf = 'start',
  menuButtonFontFamily,
  menuButtonFontSize = 16,
  menuButtonFontWeight = 900,
  menuButtonHoverColor,
  menuButtonLetterSpacing = '0',
  menuButtonLineHeight = 1,
  menuButtonJustifySelf = 'start',
  menuButtonTextTransform = 'none',
  menuHoverColor = defaultMenuHoverColor,
  menuLabel = 'MENU',
  menuLogo,
  menuLogoHeight = 39,
  menuTextColor = defaultMenuTextColor,
  openMenuHeaderHeight = 115,
  openMenuHeaderTopPadding = 28,
  secondLabel = 'HOW WE WORK',
  secondLink = { href: '#how-we-work' },
  scrollTrigger = 24,
  textColor = defaultTextColor,
  thirdLabel = 'WORK',
  thirdLink = { href: '#work' },
  triggerAlignContent = 'start',
  triggerAlignItems = 'start',
  triggerJustifyContent = 'start',
  triggerJustifyItems = 'start',
  variant = 'Button',
  ...layoutProps
}: ACGMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const resolvedCloseLabel = resolveText(closeLabel, 'CLOSE')
  const resolvedContactLabel = resolveText(contactLabel, 'GET IN TOUCH')
  const resolvedFirstLabel = resolveText(firstLabel, 'WHAT WE DO')
  const resolvedSecondLabel = resolveText(secondLabel, 'HOW WE WORK')
  const resolvedThirdLabel = resolveText(thirdLabel, 'WORK')
  const resolvedFourthLabel = resolveText(fourthLabel, 'ABOUT')
  const resolvedLogoText = resolveText(logoText, 'Logo')
  const resolvedMenuLabel = resolveText(menuLabel, 'MENU')
  const resolvedMenuBackground = resolveColor(menuBackground, defaultMenuBackground)
  const resolvedMenuHoverColor = resolveColor(menuHoverColor, defaultMenuHoverColor)
  const resolvedMenuTextColor = resolveColor(menuTextColor, defaultMenuTextColor)
  const resolvedTextColor = resolveColor(textColor, defaultTextColor)

  const items = useMemo<MenuItem[]>(
    () =>
      [
        createMenuItem(resolvedFirstLabel, firstLink),
        createMenuItem(resolvedSecondLabel, secondLink),
        createMenuItem(resolvedThirdLabel, thirdLink),
        createMenuItem(resolvedFourthLabel, fourthLink),
      ].filter((item) => item.label.trim().length > 0),
    [
      firstLink,
      fourthLink,
      resolvedFirstLabel,
      resolvedFourthLabel,
      resolvedSecondLabel,
      resolvedThirdLabel,
      secondLink,
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
    if (variant !== 'Links To Button') {
      setHasTriggered(false)
      return
    }

    const updateState = () => {
      setHasTriggered(window.scrollY >= Math.max(0, scrollTrigger))
    }

    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    return () => {
      window.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [scrollTrigger, variant])

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
    alignItems: 'flex-start',
    display: variant === 'Links To Button' ? 'inline-grid' : 'inline-flex',
    justifyItems: 'start',
    minWidth: 0,
    position: 'relative',
    ...getLayoutStyles(layoutProps),
  }
  const resolvedContactColor = resolveColor(contactColor, colorVars.nocturnalForest)
  const resolvedContactHoverColor = resolveColor(contactHoverColor, colorVars.petalMist)
  const buttonStyle = getStyledMenuButtonStyle({
    color: resolvedTextColor,
    fontFamily: menuButtonFontFamily,
    fontSize: menuButtonFontSize,
    fontWeight: menuButtonFontWeight,
    hoverColor: menuButtonHoverColor,
    letterSpacing: menuButtonLetterSpacing,
    lineHeight: menuButtonLineHeight,
    textTransform: menuButtonTextTransform,
  })
  const linksStyle = getAnimatedLinksStyle({
    color: resolveColor(linksColor, colorVars.nocturnalForest),
    fontFamily: linksFontFamily,
    fontSize: linksFontSize,
    fontWeight: linksFontWeight,
    letterSpacing: linksLetterSpacing,
    lineHeight: linksLineHeight,
    textTransform: linksTextTransform,
  })

  const overlay = isMenuOpen ? (
    <div style={{ ...getOverlayStyle(resolvedMenuBackground), zIndex: 2147483000 }}>
      <header style={getOverlayHeaderStyle(resolvedMenuBackground, openMenuHeaderHeight, openMenuHeaderTopPadding)}>
        <button style={getCloseButtonStyle()} onClick={() => setIsMenuOpen(false)} type="button">
          {resolvedCloseLabel}
        </button>
        <LogoLink
          logo={menuLogo ?? { src: acgLogoDark, alt: resolvedLogoText }}
          logoHeight={menuLogoHeight}
          logoText={resolvedLogoText}
          reveal={!hideOpenMenuLogo}
        />
        <div style={contactSlotStyle}>
          <GetInTouchButton
            color={resolvedContactColor}
            hoverColor={resolvedContactHoverColor}
            label={resolvedContactLabel}
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
            menuHoverColor={resolvedMenuHoverColor}
            menuTextColor={resolvedMenuTextColor}
            onClick={() => setIsMenuOpen(false)}
            totalItems={items.length}
          />
        ))}
      </div>
    </div>
  ) : null

  return (
    <>
      <div style={rootStyle}>
        {variant === 'Links To Button' ? (
          <AnimatedLinksTrigger
            buttonStyle={buttonStyle}
            hasTriggered={hasTriggered}
            items={items}
            linksAlignItems={linksAlignItems}
            linksAlignSelf={linksAlignSelf}
            linksJustifyItems={linksJustifyItems}
            linksJustifySelf={linksJustifySelf}
            linkGap={linksGap}
            linkHoverColor={resolveColor(linksHoverColor, colorVars.signalOrange)}
            linkStyle={linksStyle}
            menuButtonAlignSelf={menuButtonAlignSelf}
            menuButtonJustifySelf={menuButtonJustifySelf}
            menuLabel={resolvedMenuLabel}
            onOpen={() => setIsMenuOpen(true)}
            triggerAlignContent={triggerAlignContent}
            triggerAlignItems={triggerAlignItems}
            triggerJustifyContent={triggerJustifyContent}
            triggerJustifyItems={triggerJustifyItems}
          />
        ) : (
          <MenuTriggerButton label={resolvedMenuLabel} onClick={() => setIsMenuOpen(true)} style={buttonStyle} />
        )}
      </div>

      {overlay ? createPortal(overlay, document.body) : null}
    </>
  )
}

function createMenuItem(label: string, link?: ACGMenuButtonLink): MenuItem {
  return link ? { label, link } : { label }
}

function resolveColor(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function resolveText(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function getStyledMenuButtonStyle({
  color,
  fontFamily,
  fontSize,
  fontWeight,
  hoverColor,
  letterSpacing,
  lineHeight,
  textTransform,
}: {
  color: string
  fontFamily: string | undefined
  fontSize: number
  fontWeight: number
  hoverColor: string | undefined
  letterSpacing: string
  lineHeight: number
  textTransform: string
}) {
  return {
    ...getMenuButtonStyle(color),
    fontFamily: fontFamily?.trim() || 'inherit',
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textTransform,
    '--acg-menu-button-color': color,
    '--acg-menu-button-hover-color': hoverColor?.trim() || color,
  } as CSSProperties
}

function getAnimatedLinksStyle({
  color,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textTransform,
}: {
  color: string
  fontFamily: string | undefined
  fontSize: number
  fontWeight: number
  letterSpacing: string
  lineHeight: number
  textTransform: string
}) {
  return {
    color,
    fontFamily: fontFamily?.trim() || 'inherit',
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textDecoration: 'none',
    textTransform,
    whiteSpace: 'nowrap',
  } as CSSProperties
}

function MenuTriggerButton({ label, onClick, style }: { label: string; onClick: () => void; style: CSSProperties }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        color: isHovered ? 'var(--acg-menu-button-hover-color)' : 'var(--acg-menu-button-color)',
        transition: 'color 160ms ease, opacity 220ms ease, transform 320ms cubic-bezier(0.76, 0, 0.24, 1)',
      }}
      type="button"
    >
      {label}
    </button>
  )
}

function AnimatedLinksTrigger({
  buttonStyle,
  hasTriggered,
  items,
  linksAlignItems,
  linksAlignSelf,
  linksJustifyItems,
  linksJustifySelf,
  linkGap,
  linkHoverColor,
  linkStyle,
  menuButtonAlignSelf,
  menuButtonJustifySelf,
  menuLabel,
  onOpen,
  triggerAlignContent,
  triggerAlignItems,
  triggerJustifyContent,
  triggerJustifyItems,
}: {
  buttonStyle: CSSProperties
  hasTriggered: boolean
  items: MenuItem[]
  linksAlignItems: string
  linksAlignSelf: string
  linksJustifyItems: string
  linksJustifySelf: string
  linkGap: number
  linkHoverColor: string
  linkStyle: CSSProperties
  menuButtonAlignSelf: string
  menuButtonJustifySelf: string
  menuLabel: string
  onOpen: () => void
  triggerAlignContent: string
  triggerAlignItems: string
  triggerJustifyContent: string
  triggerJustifyItems: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        alignContent: triggerAlignContent,
        alignItems: triggerAlignItems,
        display: 'grid',
        justifyContent: triggerJustifyContent,
        justifyItems: triggerJustifyItems,
        position: 'relative',
      }}
    >
      <div
        aria-hidden={hasTriggered}
        style={{
          alignItems: linksAlignItems,
          alignSelf: linksAlignSelf,
          display: 'grid',
          gap: linkGap,
          justifyItems: linksJustifyItems,
          justifySelf: linksJustifySelf,
          opacity: hasTriggered ? 0 : 1,
          pointerEvents: hasTriggered ? 'none' : 'auto',
          transition: 'opacity 180ms ease 320ms',
        }}
      >
        {items.map((item, index) => (
          <a
            href={item.link?.href}
            key={item.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            rel={item.link?.target === '_blank' ? 'noreferrer' : undefined}
            style={{
              ...linkStyle,
              color: hoveredIndex === index ? linkHoverColor : linkStyle.color,
              transform: hasTriggered ? `translateY(calc(-100% * ${index} - ${linkGap * index}px))` : 'translateY(0)',
              transition:
                'color 140ms ease, opacity 180ms ease 320ms, transform 420ms cubic-bezier(0.76, 0, 0.24, 1)',
            }}
            target={item.link?.target}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div
        style={{
          left: 0,
          opacity: hasTriggered ? 1 : 0,
          pointerEvents: hasTriggered ? 'auto' : 'none',
          position: 'absolute',
          top: 0,
          alignSelf: menuButtonAlignSelf,
          justifySelf: menuButtonJustifySelf,
          transition: 'opacity 180ms ease 430ms',
        }}
      >
        <MenuTriggerButton label={menuLabel} onClick={onOpen} style={buttonStyle} />
      </div>
    </div>
  )
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
