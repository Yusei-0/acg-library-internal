import type { CSSProperties } from 'react'
import { getLayoutStyles, type ComponentLayoutProps } from '../../shared/layout'
import { colorVars } from '../../shared/tokens'

export const defaultNavBackground = `var(--acg-nav-background, ${colorVars.signalOrange})`
export const defaultCompactBackground = `var(--acg-nav-compact-background, ${colorVars.petalMist})`
export const defaultMenuBackground = `var(--acg-nav-menu-background, var(--acg-nav-background, ${colorVars.signalOrange}))`
export const defaultTextColor = `var(--acg-nav-text, ${colorVars.nocturnalForest})`
export const defaultMenuTextColor = `var(--acg-nav-menu-text, ${colorVars.nocturnalForest50})`
export const defaultMenuHoverColor = `var(--acg-nav-menu-hover, ${colorVars.nocturnalForest})`

const navbarHeight = 115

export function getRootStyle(layoutProps: ComponentLayoutProps): CSSProperties {
  return {
    display: 'flex',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 30,
    ...getLayoutStyles(layoutProps),
  }
}

export function getHeroShellStyle(background: string): CSSProperties {
  return {
    alignItems: 'center',
    background,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    height: navbarHeight,
    minHeight: navbarHeight,
    padding: '0 28px',
    width: '100%',
  }
}

export function getCompactShellStyle(background: string): CSSProperties {
  return {
    alignItems: 'center',
    background,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    height: navbarHeight,
    minHeight: navbarHeight,
    padding: '0 28px',
    width: '100%',
  }
}

export const heroLinksStyle: CSSProperties = {
  alignItems: 'flex-start',
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  height: 68,
  justifyContent: 'space-between',
  justifySelf: 'start',
  lineHeight: 1.05,
}

export function getHeroLinkStyle(color: string): CSSProperties {
  return {
    color,
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: '-0.06em',
    lineHeight: '100%',
    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }
}

export function getMenuButtonStyle(color: string): CSSProperties {
  return {
    background: 'transparent',
    border: 0,
    color,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 16,
    fontWeight: 900,
    justifySelf: 'start',
    padding: 0,
    textUnderlineOffset: 3,
  }
}

export function getCloseButtonStyle(): CSSProperties {
  return {
    ...getMenuButtonStyle(colorVars.petalMist),
    fontSize: 16,
    fontWeight: 800,
    textDecoration: 'none',
  }
}

export function getOverlayStyle(background: string): CSSProperties {
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

export function getOverlayHeaderStyle(background: string): CSSProperties {
  return {
    ...getCompactShellStyle(background),
    position: 'sticky',
    top: 0,
    zIndex: 2,
  }
}

export const menuScrollerStyle: CSSProperties = {
  height: 'calc(100svh - 84px)',
  overflowY: 'auto',
  padding: '26px 64px 80px',
  scrollbarWidth: 'none',
}

export const menuItemStyle: CSSProperties = {
  alignItems: 'center',
  display: 'grid',
  gap: 24,
  gridTemplateColumns: '150px minmax(0, 1fr)',
  minHeight: 138,
  textDecoration: 'none',
  transition: 'color 140ms ease',
}

export const menuIndexStyle: CSSProperties = {
  alignItems: 'center',
  border: `2px solid ${defaultMenuTextColor}`,
  borderRadius: '50%',
  boxSizing: 'border-box',
  display: 'inline-flex',
  fontSize: 42,
  fontWeight: 900,
  height: 72,
  justifyContent: 'center',
  lineHeight: 1,
  width: 72,
}

export const logoLinkStyle: CSSProperties = {
  alignItems: 'center',
  display: 'inline-flex',
  justifySelf: 'center',
  textDecoration: 'none',
}

export const logoImageStyle: CSSProperties = {
  display: 'block',
  height: 39,
  width: 'auto',
}

export const contactSlotStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  justifySelf: 'end',
  width: 128,
}

export const menuLabelStyle: CSSProperties = {
  fontSize: 'clamp(52px, 8vw, 104px)',
  fontWeight: 900,
  lineHeight: 0.95,
  textAlign: 'center',
}
