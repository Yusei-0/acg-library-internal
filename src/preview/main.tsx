import { StrictMode, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ACGFooter, ACGMenuButton, ACGNavbar, ArrowButton, GetInTouchButton, MarqueeTitle, ProjectCard } from '../components'
import type {
  GetInTouchButtonSize,
  GetInTouchButtonTone,
  MarqueeTitleDirection,
} from '../components'
import '../../devlink/css/global.css'
import './styles.css'

type ComponentKey = 'navbar' | 'menuButton' | 'footer' | 'arrowButton' | 'getInTouch' | 'marqueeTitle' | 'projectCard'
type CanvasMode = 'Contained' | 'Full width'
type LayoutDirectionControl = '' | 'Row' | 'Column'
type LayoutAlignmentControl = '' | 'Start' | 'Center' | 'End' | 'Stretch'

interface NavbarPreviewControls {
  logoText: string
  heroLogoUrl: string
  compactLogoUrl: string
  menuLogoUrl: string
  heroLogoHeight: number
  compactLogoHeight: number
  menuLogoHeight: number
  initialNavbarHeight: number
  scrollNavbarHeight: number
  openMenuNavbarHeight: number
  initialNavbarTopPadding: number
  scrollNavbarTopPadding: number
  openMenuNavbarTopPadding: number
  hideInitialLogo: boolean
  hideScrollLogo: boolean
  hideOpenMenuLogo: boolean
  contactLabel: string
  contactHref: string
  contactColor: string
  contactHoverColor: string
  contactOrangeHoverColor: string
  menuLabel: string
  closeLabel: string
  firstLabel: string
  firstHref: string
  secondLabel: string
  secondHref: string
  thirdLabel: string
  thirdHref: string
  fourthLabel: string
  fourthHref: string
  fifthLabel: string
  fifthHref: string
  sixthLabel: string
  sixthHref: string
  seventhLabel: string
  seventhHref: string
  eighthLabel: string
  eighthHref: string
  scrollThreshold: number
  logoRevealScroll: number
  navBackground: string
  compactBackground: string
  menuBackground: string
  textColor: string
  menuTextColor: string
  menuHoverColor: string
  layoutWidth: number
  layoutHeight: number
  layoutMaxWidth: number
  layoutMaxHeight: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  gap: number
  flexDirection: LayoutDirectionControl
  horizontalAlignment: LayoutAlignmentControl
  verticalAlignment: LayoutAlignmentControl
}

type NavbarStringControlKey = {
  [Key in keyof NavbarPreviewControls]: NavbarPreviewControls[Key] extends string ? Key : never
}[keyof NavbarPreviewControls]

type NavbarNumberControlKey = {
  [Key in keyof NavbarPreviewControls]: NavbarPreviewControls[Key] extends number ? Key : never
}[keyof NavbarPreviewControls]

type UpdateNavbarControl = <Key extends keyof NavbarPreviewControls>(
  key: Key,
  value: NavbarPreviewControls[Key],
) => void

const componentTabs: Array<{ key: ComponentKey; label: string }> = [
  { key: 'navbar', label: 'ACG Navbar' },
  { key: 'menuButton', label: 'ACG Menu Button' },
  { key: 'footer', label: 'ACG Footer' },
  { key: 'arrowButton', label: 'Arrow Button' },
  { key: 'getInTouch', label: 'Get In Touch' },
  { key: 'marqueeTitle', label: 'Marquee Title' },
  { key: 'projectCard', label: 'Project Card' },
]

const defaultNavbarPreviewControls: NavbarPreviewControls = {
  logoText: 'ACG',
  heroLogoUrl: '',
  compactLogoUrl: '',
  menuLogoUrl: '',
  heroLogoHeight: 39,
  compactLogoHeight: 39,
  menuLogoHeight: 39,
  initialNavbarHeight: 115,
  scrollNavbarHeight: 92,
  openMenuNavbarHeight: 115,
  initialNavbarTopPadding: 28,
  scrollNavbarTopPadding: 18,
  openMenuNavbarTopPadding: 28,
  hideInitialLogo: true,
  hideScrollLogo: false,
  hideOpenMenuLogo: false,
  contactLabel: 'GET IN TOUCH',
  contactHref: '#contact',
  contactColor: 'var(--acg-color-nocturnal-forest, #152304)',
  contactHoverColor: 'var(--acg-color-signal-orange, #FF5A00)',
  contactOrangeHoverColor: 'var(--acg-color-petal-mist, #F9F0ED)',
  menuLabel: 'MENU',
  closeLabel: 'CLOSE',
  firstLabel: 'WHAT WE DO',
  firstHref: '#strategy',
  secondLabel: 'HOW WE WORK',
  secondHref: '#systems',
  thirdLabel: 'WORK',
  thirdHref: '#work',
  fourthLabel: 'ABOUT',
  fourthHref: '#studio',
  fifthLabel: '',
  fifthHref: '',
  sixthLabel: '',
  sixthHref: '',
  seventhLabel: '',
  seventhHref: '',
  eighthLabel: '',
  eighthHref: '',
  scrollThreshold: 24,
  logoRevealScroll: 0,
  navBackground: 'var(--acg-nav-background, var(--acg-color-signal-orange, #FF5A00))',
  compactBackground: 'var(--acg-nav-compact-background, var(--acg-color-petal-mist, #F9F0ED))',
  menuBackground: 'var(--acg-nav-menu-background, var(--acg-nav-background, var(--acg-color-signal-orange, #FF5A00)))',
  textColor: 'var(--acg-nav-text, var(--acg-color-nocturnal-forest, #152304))',
  menuTextColor: 'var(--acg-nav-menu-text, var(--acg-color-nocturnal-forest-50, rgba(21, 35, 4, 0.5)))',
  menuHoverColor: 'var(--acg-nav-menu-hover, var(--acg-color-nocturnal-forest, #152304))',
  layoutWidth: 0,
  layoutHeight: 0,
  layoutMaxWidth: 0,
  layoutMaxHeight: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  gap: 0,
  flexDirection: '',
  horizontalAlignment: '',
  verticalAlignment: '',
}

function PreviewApp() {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>('navbar')
  const [arrowAngle, setArrowAngle] = useState(0)
  const [arrowFontSize, setArrowFontSize] = useState(64)
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('Contained')
  const [getInTouchSize, setGetInTouchSize] = useState<GetInTouchButtonSize>('Normal')
  const [getInTouchTone, setGetInTouchTone] = useState<GetInTouchButtonTone>('Olive')
  const [navbarControls, setNavbarControls] = useState<NavbarPreviewControls>(defaultNavbarPreviewControls)
  const [pageScrollPosition, setPageScrollPosition] = useState(0)
  const [pageScrollTotal, setPageScrollTotal] = useState(0)
  const [marqueeDirection, setMarqueeDirection] = useState<MarqueeTitleDirection>('Left')
  const [marqueeSpeed, setMarqueeSpeed] = useState(14)
  const [marqueeFontSize, setMarqueeFontSize] = useState(40)
  const [marqueeFontWeight, setMarqueeFontWeight] = useState(800)
  const [marqueeWidth, setMarqueeWidth] = useState(720)
  const [marqueeHeight, setMarqueeHeight] = useState(120)
  const isFullWidth = canvasMode === 'Full width'

  useEffect(() => {
    if (!isFullWidth) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCanvasMode('Contained')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullWidth])

  useEffect(() => {
    if (!isFullWidth || activeComponent !== 'navbar') return

    const updateScrollMetrics = () => {
      const total = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      setPageScrollTotal(Math.round(total))
      setPageScrollPosition(Math.round(window.scrollY))
    }

    updateScrollMetrics()
    window.addEventListener('resize', updateScrollMetrics)
    window.addEventListener('scroll', updateScrollMetrics, { passive: true })
    return () => {
      window.removeEventListener('resize', updateScrollMetrics)
      window.removeEventListener('scroll', updateScrollMetrics)
    }
  }, [activeComponent, isFullWidth])

  const updatePageScrollPosition = (value: number) => {
    const nextValue = Math.max(0, Math.min(value, pageScrollTotal))
    setPageScrollPosition(nextValue)
    window.scrollTo({ top: nextValue, behavior: 'smooth' })
  }

  const updateNavbarControl = <Key extends keyof NavbarPreviewControls>(
    key: Key,
    value: NavbarPreviewControls[Key],
  ) => {
    setNavbarControls((currentControls) => ({
      ...currentControls,
      [key]: value,
    }))
  }

  return (
    <main className={isFullWidth ? 'preview-shell full-width-mode' : 'preview-shell'}>
      {isFullWidth ? (
        <button className="full-width-exit-button" onClick={() => setCanvasMode('Contained')} type="button">
          Exit
        </button>
      ) : null}

      {isFullWidth && activeComponent === 'navbar' ? (
        <details className="full-width-control-panel" open>
          <summary>
            <span>Navbar inputs</span>
            <strong>{pageScrollTotal}px scroll</strong>
          </summary>

          <div className="full-width-control-body" aria-label="Navbar full width controls">
            <ControlSection title="Scroll">
              <ControlGroup label="Scroll Total">
                <output className="metric-output">{pageScrollTotal}px</output>
              </ControlGroup>
              <ControlGroup label="Scrolled">
                <NumberControl max={Math.max(1, pageScrollTotal)} min={0} step={10} value={pageScrollPosition} onChange={updatePageScrollPosition} />
              </ControlGroup>
              <ControlGroup label="Menu At">
                <NumberControl max={500} min={0} step={4} value={navbarControls.scrollThreshold} onChange={(value) => updateNavbarControl('scrollThreshold', value)} />
              </ControlGroup>
              <ControlGroup label="Logo Fade At">
                <NumberControl max={Math.max(5000, pageScrollTotal)} min={0} step={10} value={navbarControls.logoRevealScroll} onChange={(value) => updateNavbarControl('logoRevealScroll', value)} />
              </ControlGroup>
            </ControlSection>

            <ControlSection title="Brand">
              <ControlGroup label="Logo Text">
                <TextControl value={navbarControls.logoText} onChange={(value) => updateNavbarControl('logoText', value)} />
              </ControlGroup>
              <ControlGroup label="Initial Logo URL">
                <TextControl value={navbarControls.heroLogoUrl} onChange={(value) => updateNavbarControl('heroLogoUrl', value)} />
              </ControlGroup>
              <ControlGroup label="Scroll Logo URL">
                <TextControl value={navbarControls.compactLogoUrl} onChange={(value) => updateNavbarControl('compactLogoUrl', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Logo URL">
                <TextControl value={navbarControls.menuLogoUrl} onChange={(value) => updateNavbarControl('menuLogoUrl', value)} />
              </ControlGroup>
              <ControlGroup label="Initial Height">
                <NumberControl max={160} min={8} value={navbarControls.heroLogoHeight} onChange={(value) => updateNavbarControl('heroLogoHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Scroll Height">
                <NumberControl max={160} min={8} value={navbarControls.compactLogoHeight} onChange={(value) => updateNavbarControl('compactLogoHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Height">
                <NumberControl max={160} min={8} value={navbarControls.menuLogoHeight} onChange={(value) => updateNavbarControl('menuLogoHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Initial Nav Height">
                <NumberControl max={320} min={64} value={navbarControls.initialNavbarHeight} onChange={(value) => updateNavbarControl('initialNavbarHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Scroll Nav Height">
                <NumberControl max={320} min={64} value={navbarControls.scrollNavbarHeight} onChange={(value) => updateNavbarControl('scrollNavbarHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Nav Height">
                <NumberControl max={320} min={64} value={navbarControls.openMenuNavbarHeight} onChange={(value) => updateNavbarControl('openMenuNavbarHeight', value)} />
              </ControlGroup>
              <ControlGroup label="Initial Top Pad">
                <NumberControl max={120} min={0} value={navbarControls.initialNavbarTopPadding} onChange={(value) => updateNavbarControl('initialNavbarTopPadding', value)} />
              </ControlGroup>
              <ControlGroup label="Scroll Top Pad">
                <NumberControl max={120} min={0} value={navbarControls.scrollNavbarTopPadding} onChange={(value) => updateNavbarControl('scrollNavbarTopPadding', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Top Pad">
                <NumberControl max={120} min={0} value={navbarControls.openMenuNavbarTopPadding} onChange={(value) => updateNavbarControl('openMenuNavbarTopPadding', value)} />
              </ControlGroup>
              <ControlGroup label="Initial Logo">
                <BooleanControl checked={!navbarControls.hideInitialLogo} label="Show" onChange={(checked) => updateNavbarControl('hideInitialLogo', !checked)} />
              </ControlGroup>
              <ControlGroup label="Scroll Logo">
                <BooleanControl checked={!navbarControls.hideScrollLogo} label="Show" onChange={(checked) => updateNavbarControl('hideScrollLogo', !checked)} />
              </ControlGroup>
              <ControlGroup label="Menu Logo">
                <BooleanControl checked={!navbarControls.hideOpenMenuLogo} label="Show" onChange={(checked) => updateNavbarControl('hideOpenMenuLogo', !checked)} />
              </ControlGroup>
            </ControlSection>

            <ControlSection title="Contact">
              <ControlGroup label="Contact Label">
                <TextControl value={navbarControls.contactLabel} onChange={(value) => updateNavbarControl('contactLabel', value)} />
              </ControlGroup>
              <ControlGroup label="Contact Link">
                <TextControl value={navbarControls.contactHref} onChange={(value) => updateNavbarControl('contactHref', value)} />
              </ControlGroup>
              <ControlGroup label="Contact Color">
                <TextControl value={navbarControls.contactColor} onChange={(value) => updateNavbarControl('contactColor', value)} />
              </ControlGroup>
              <ControlGroup label="Contact Hover">
                <TextControl value={navbarControls.contactHoverColor} onChange={(value) => updateNavbarControl('contactHoverColor', value)} />
              </ControlGroup>
              <ControlGroup label="Orange Hover">
                <TextControl value={navbarControls.contactOrangeHoverColor} onChange={(value) => updateNavbarControl('contactOrangeHoverColor', value)} />
              </ControlGroup>
            </ControlSection>

            <ControlSection title="Menu">
              <ControlGroup label="Menu Label">
                <TextControl value={navbarControls.menuLabel} onChange={(value) => updateNavbarControl('menuLabel', value)} />
              </ControlGroup>
              <ControlGroup label="Close Label">
                <TextControl value={navbarControls.closeLabel} onChange={(value) => updateNavbarControl('closeLabel', value)} />
              </ControlGroup>
            </ControlSection>

            <ControlSection title="Links">
              <LinkControls hrefKey="firstHref" labelKey="firstLabel" labelNumber="First" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="secondHref" labelKey="secondLabel" labelNumber="Second" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="thirdHref" labelKey="thirdLabel" labelNumber="Third" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="fourthHref" labelKey="fourthLabel" labelNumber="Fourth" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="fifthHref" labelKey="fifthLabel" labelNumber="Fifth" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="sixthHref" labelKey="sixthLabel" labelNumber="Sixth" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="seventhHref" labelKey="seventhLabel" labelNumber="Seventh" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <LinkControls hrefKey="eighthHref" labelKey="eighthLabel" labelNumber="Eighth" navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
            </ControlSection>

            <ControlSection title="Variables">
              <ControlGroup label="Hero Background">
                <TextControl value={navbarControls.navBackground} onChange={(value) => updateNavbarControl('navBackground', value)} />
              </ControlGroup>
              <ControlGroup label="Compact Background">
                <TextControl value={navbarControls.compactBackground} onChange={(value) => updateNavbarControl('compactBackground', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Background">
                <TextControl value={navbarControls.menuBackground} onChange={(value) => updateNavbarControl('menuBackground', value)} />
              </ControlGroup>
              <ControlGroup label="Text Color">
                <TextControl value={navbarControls.textColor} onChange={(value) => updateNavbarControl('textColor', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Text">
                <TextControl value={navbarControls.menuTextColor} onChange={(value) => updateNavbarControl('menuTextColor', value)} />
              </ControlGroup>
              <ControlGroup label="Menu Hover">
                <TextControl value={navbarControls.menuHoverColor} onChange={(value) => updateNavbarControl('menuHoverColor', value)} />
              </ControlGroup>
            </ControlSection>

            <ControlSection title="Layout">
              <LayoutNumberControls navbarControls={navbarControls} updateNavbarControl={updateNavbarControl} />
              <ControlGroup label="Flex Direction">
                <SelectControl
                  options={['', 'Row', 'Column']}
                  value={navbarControls.flexDirection}
                  onChange={(value) => updateNavbarControl('flexDirection', value as LayoutDirectionControl)}
                />
              </ControlGroup>
              <ControlGroup label="Horizontal Align">
                <SelectControl
                  options={['', 'Start', 'Center', 'End', 'Stretch']}
                  value={navbarControls.horizontalAlignment}
                  onChange={(value) => updateNavbarControl('horizontalAlignment', value as LayoutAlignmentControl)}
                />
              </ControlGroup>
              <ControlGroup label="Vertical Align">
                <SelectControl
                  options={['', 'Start', 'Center', 'End', 'Stretch']}
                  value={navbarControls.verticalAlignment}
                  onChange={(value) => updateNavbarControl('verticalAlignment', value as LayoutAlignmentControl)}
                />
              </ControlGroup>
            </ControlSection>
          </div>
        </details>
      ) : null}

      <aside className="preview-sidebar" aria-label="Component library">
        <div>
          <p className="eyebrow">Webflow Studio</p>
          <h1>ACG Components Internal</h1>
        </div>

        <nav className="component-tabs" aria-label="Preview components">
          {componentTabs.map((tab) => (
            <button
              className={activeComponent === tab.key ? 'tab-button active' : 'tab-button'}
              key={tab.key}
              onClick={() => setActiveComponent(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className={isFullWidth ? 'preview-stage full-width-stage' : 'preview-stage'} aria-label="Component preview">
        <header className="stage-header">
          <div>
            <p className="eyebrow">Local Preview</p>
            <h2>{componentTabs.find((tab) => tab.key === activeComponent)?.label}</h2>
          </div>
          <div className="status-pill">Ready for Webflow</div>
        </header>

        <div className={isFullWidth ? 'canvas-band full-width-canvas' : 'canvas-band'}>
          {renderPreview(activeComponent, {
            arrowAngle,
            arrowFontSize,
            canvasMode,
            getInTouchSize,
            getInTouchTone,
            navbarControls,
            marqueeDirection,
            marqueeFontSize,
            marqueeFontWeight,
            marqueeHeight,
            marqueeSpeed,
            marqueeWidth,
          })}
        </div>

        <section className="control-band" aria-label="Component controls">
          <ControlGroup label="Canvas">
            <SegmentedControl
              options={['Contained', 'Full width']}
              value={canvasMode}
              onChange={(value) => setCanvasMode(value as CanvasMode)}
            />
          </ControlGroup>

          {activeComponent === 'arrowButton' ? (
            <>
              <ControlGroup label="Arrow Angle">
                <NumberControl max={360} min={-360} step={15} value={arrowAngle} onChange={setArrowAngle} />
              </ControlGroup>
              <ControlGroup label="Font Size">
                <NumberControl max={120} min={16} value={arrowFontSize} onChange={setArrowFontSize} />
              </ControlGroup>
            </>
          ) : null}

          {activeComponent === 'getInTouch' ? (
            <>
              <ControlGroup label="Tone">
                <SegmentedControl
                  options={['Olive', 'Olive Light Hover', 'Orange', 'Light', 'Auto']}
                  value={getInTouchTone}
                  onChange={(value) => setGetInTouchTone(value as GetInTouchButtonTone)}
                />
              </ControlGroup>
              <ControlGroup label="Size">
                <SegmentedControl
                  options={['Small', 'Normal', 'Large', 'Big']}
                  value={getInTouchSize}
                  onChange={(value) => setGetInTouchSize(value as GetInTouchButtonSize)}
                />
              </ControlGroup>
            </>
          ) : null}

          {activeComponent === 'marqueeTitle' ? (
            <>
              <ControlGroup label="Direction">
                <SegmentedControl
                  options={['Left', 'Right']}
                  value={marqueeDirection}
                  onChange={(value) => setMarqueeDirection(value as MarqueeTitleDirection)}
                />
              </ControlGroup>
              <ControlGroup label="Speed">
                <NumberControl max={60} min={1} value={marqueeSpeed} onChange={setMarqueeSpeed} />
              </ControlGroup>
              <ControlGroup label="Font Size">
                <NumberControl max={140} min={16} value={marqueeFontSize} onChange={setMarqueeFontSize} />
              </ControlGroup>
              <ControlGroup label="Weight">
                <NumberControl max={1000} min={100} step={100} value={marqueeFontWeight} onChange={setMarqueeFontWeight} />
              </ControlGroup>
              <ControlGroup label="Width">
                <NumberControl max={1200} min={220} step={10} value={marqueeWidth} onChange={setMarqueeWidth} />
              </ControlGroup>
              <ControlGroup label="Height">
                <NumberControl max={260} min={48} step={4} value={marqueeHeight} onChange={setMarqueeHeight} />
              </ControlGroup>
            </>
          ) : null}

          {activeComponent === 'navbar' ? (
            <div className="quiet-note">Use Full width for the closest page-level navbar test.</div>
          ) : null}
        </section>
      </section>
    </main>
  )
}

function renderPreview(
  activeComponent: ComponentKey,
  options: {
    arrowAngle: number
    arrowFontSize: number
    canvasMode: CanvasMode
    getInTouchSize: GetInTouchButtonSize
    getInTouchTone: GetInTouchButtonTone
    navbarControls: NavbarPreviewControls
    marqueeDirection: MarqueeTitleDirection
    marqueeFontSize: number
    marqueeFontWeight: number
    marqueeHeight: number
    marqueeSpeed: number
    marqueeWidth: number
  },
) {
  if (activeComponent === 'arrowButton') {
    return (
      <div className="button-preview">
        <ArrowButton
          arrowAngle={options.arrowAngle}
          fontSize={options.arrowFontSize}
          label="VIEW ALL WORK"
          link={{ href: '#work' }}
        />
      </div>
    )
  }

  if (activeComponent === 'getInTouch') {
    return (
      <div className={options.getInTouchTone === 'Light' ? 'button-preview dark-button-preview' : 'button-preview'}>
        <GetInTouchButton
          label="GET IN TOUCH"
          link={{ href: '#contact' }}
          size={options.getInTouchSize}
          tone={options.getInTouchTone}
        />
      </div>
    )
  }

  if (activeComponent === 'marqueeTitle') {
    return (
      <div className="marquee-title-preview">
        <MarqueeTitle
          direction={options.marqueeDirection}
          fontSize={options.marqueeFontSize}
          fontWeight={options.marqueeFontWeight}
          height={options.marqueeHeight}
          speed={options.marqueeSpeed}
          text="How we work"
          width={options.marqueeWidth}
        />
      </div>
    )
  }

  if (activeComponent === 'projectCard') {
    return (
      <div className="project-card-preview">
        <ProjectCard
          category="(Branding)"
          clientName="Client Name"
          imageHeight={520}
          link={{ href: '#project' }}
          maxWidth="520px"
          projectTitle="Project Title"
          tabletImageHeight={360}
          tabletWidth="360px"
          width="100%"
        />
        <ProjectCard
          category="(Editorial)"
          clientName="Client Name"
          imageHeight={520}
          link={{ href: '#project-alt' }}
          maxWidth="520px"
          projectTitle="Project Title"
          tabletImageHeight={360}
          tabletWidth="360px"
          width="100%"
        />
      </div>
    )
  }

  if (activeComponent === 'menuButton') {
    return (
      <div className="button-preview">
        <ACGMenuButton
          firstLabel="WHAT WE DO"
          firstLink={{ href: '#strategy' }}
          fourthLabel="ABOUT"
          fourthLink={{ href: '#studio' }}
          secondLabel="HOW WE WORK"
          secondLink={{ href: '#systems' }}
          thirdLabel="WORK"
          thirdLink={{ href: '#work' }}
        />
      </div>
    )
  }

  if (activeComponent === 'footer') {
    return (
      <div className="footer-preview">
        <ACGFooter />
      </div>
    )
  }

  const navbarControls = options.navbarControls
  const compactLogo = getPreviewImage(navbarControls.compactLogoUrl, navbarControls.logoText)
  const heroLogo = getPreviewImage(navbarControls.heroLogoUrl, navbarControls.logoText)
  const menuLogo = getPreviewImage(navbarControls.menuLogoUrl, navbarControls.logoText)
  const flexDirection = getOptionalValue(navbarControls.flexDirection)
  const horizontalAlignment = getOptionalValue(navbarControls.horizontalAlignment)
  const verticalAlignment = getOptionalValue(navbarControls.verticalAlignment)

  return (
    <div className={options.canvasMode === 'Full width' ? 'navbar-preview full-width-navbar' : 'navbar-preview'}>
      <ACGNavbar
        closeLabel={navbarControls.closeLabel}
        compactBackground={navbarControls.compactBackground}
        compactLogoHeight={navbarControls.compactLogoHeight}
        contactColor={navbarControls.contactColor}
        contactHoverColor={navbarControls.contactHoverColor}
        contactLabel={navbarControls.contactLabel}
        contactLink={getPreviewLink(navbarControls.contactHref)}
        contactOrangeHoverColor={navbarControls.contactOrangeHoverColor}
        eighthLabel={navbarControls.eighthLabel}
        eighthLink={getPreviewLink(navbarControls.eighthHref)}
        fifthLabel={navbarControls.fifthLabel}
        fifthLink={getPreviewLink(navbarControls.fifthHref)}
        firstLabel={navbarControls.firstLabel}
        firstLink={getPreviewLink(navbarControls.firstHref)}
        fourthLabel={navbarControls.fourthLabel}
        fourthLink={getPreviewLink(navbarControls.fourthHref)}
        gap={navbarControls.gap}
        heroLogoHeight={navbarControls.heroLogoHeight}
        hideInitialLogo={navbarControls.hideInitialLogo}
        hideOpenMenuLogo={navbarControls.hideOpenMenuLogo}
        hideScrollLogo={navbarControls.hideScrollLogo}
        initialNavbarHeight={navbarControls.initialNavbarHeight}
        initialNavbarTopPadding={navbarControls.initialNavbarTopPadding}
        layoutHeight={navbarControls.layoutHeight}
        layoutMaxHeight={navbarControls.layoutMaxHeight}
        layoutMaxWidth={navbarControls.layoutMaxWidth}
        layoutWidth={navbarControls.layoutWidth}
        logoRevealScroll={navbarControls.logoRevealScroll}
        logoText={navbarControls.logoText}
        marginBottom={navbarControls.marginBottom}
        marginLeft={navbarControls.marginLeft}
        marginRight={navbarControls.marginRight}
        marginTop={navbarControls.marginTop}
        menuBackground={navbarControls.menuBackground}
        menuHoverColor={navbarControls.menuHoverColor}
        menuLabel={navbarControls.menuLabel}
        menuLogoHeight={navbarControls.menuLogoHeight}
        menuTextColor={navbarControls.menuTextColor}
        navBackground={navbarControls.navBackground}
        openMenuNavbarHeight={navbarControls.openMenuNavbarHeight}
        openMenuNavbarTopPadding={navbarControls.openMenuNavbarTopPadding}
        paddingBottom={navbarControls.paddingBottom}
        paddingLeft={navbarControls.paddingLeft}
        paddingRight={navbarControls.paddingRight}
        paddingTop={navbarControls.paddingTop}
        scrollThreshold={navbarControls.scrollThreshold}
        scrollNavbarHeight={navbarControls.scrollNavbarHeight}
        scrollNavbarTopPadding={navbarControls.scrollNavbarTopPadding}
        secondLabel={navbarControls.secondLabel}
        secondLink={getPreviewLink(navbarControls.secondHref)}
        seventhLabel={navbarControls.seventhLabel}
        seventhLink={getPreviewLink(navbarControls.seventhHref)}
        sixthLabel={navbarControls.sixthLabel}
        sixthLink={getPreviewLink(navbarControls.sixthHref)}
        textColor={navbarControls.textColor}
        thirdLabel={navbarControls.thirdLabel}
        thirdLink={getPreviewLink(navbarControls.thirdHref)}
        {...(compactLogo ? { compactLogo } : {})}
        {...(heroLogo ? { heroLogo } : {})}
        {...(menuLogo ? { menuLogo } : {})}
        {...(flexDirection ? { flexDirection } : {})}
        {...(horizontalAlignment ? { horizontalAlignment } : {})}
        {...(verticalAlignment ? { verticalAlignment } : {})}
      />
      <NavbarSections />
    </div>
  )
}

function getPreviewLink(href: string) {
  const trimmedHref = href.trim()
  return { href: trimmedHref || '#' }
}

function getPreviewImage(src: string, alt: string) {
  const trimmedSrc = src.trim()
  return trimmedSrc ? { src: trimmedSrc, alt } : undefined
}

function getOptionalValue<Value extends string>(value: Value | '') {
  return value || undefined
}

function NavbarSections() {
  const sections = [
    {
      id: 'strategy',
      kicker: '01',
      title: 'WHAT WE DO',
      body: 'Brand systems, conversion surfaces, and component libraries shaped for production teams.',
    },
    {
      id: 'systems',
      kicker: '02',
      title: 'HOW WE WORK',
      body: 'We turn visual direction into reusable interfaces with clear tokens, states, and handoff rules.',
    },
    {
      id: 'work',
      kicker: '03',
      title: 'WORK',
      body: 'Scroll depth, sticky behavior, and menu interactions can be tested directly in this preview.',
    },
    {
      id: 'studio',
      kicker: '04',
      title: 'ABOUT',
      body: 'A compact local surface for reviewing the same components before pushing the library to Webflow.',
    },
    {
      id: 'contact',
      kicker: '05',
      title: 'GET IN TOUCH',
      body: 'The navbar remains in view while the page content moves underneath it.',
    },
  ]

  return (
    <div className="navbar-sections">
      {sections.map((section) => (
        <section className="navbar-section" id={section.id} key={section.id}>
          <span>{section.kicker}</span>
          <h3>{section.title}</h3>
          <p>{section.body}</p>
        </section>
      ))}
    </div>
  )
}

function ControlGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="control-group">
      <span>{label}</span>
      {children}
    </label>
  )
}

function ControlSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="control-section">
      <h3>{title}</h3>
      <div className="control-section-grid">{children}</div>
    </section>
  )
}

function LinkControls({
  hrefKey,
  labelKey,
  labelNumber,
  navbarControls,
  updateNavbarControl,
}: {
  hrefKey: NavbarStringControlKey
  labelKey: NavbarStringControlKey
  labelNumber: string
  navbarControls: NavbarPreviewControls
  updateNavbarControl: UpdateNavbarControl
}) {
  return (
    <div className="link-control-pair">
      <ControlGroup label={`${labelNumber} Label`}>
        <TextControl
          value={String(navbarControls[labelKey])}
          onChange={(value) => updateNavbarControl(labelKey, value)}
        />
      </ControlGroup>
      <ControlGroup label={`${labelNumber} Link`}>
        <TextControl
          value={String(navbarControls[hrefKey])}
          onChange={(value) => updateNavbarControl(hrefKey, value)}
        />
      </ControlGroup>
    </div>
  )
}

function LayoutNumberControls({
  navbarControls,
  updateNavbarControl,
}: {
  navbarControls: NavbarPreviewControls
  updateNavbarControl: UpdateNavbarControl
}) {
  const controls: Array<{ key: NavbarNumberControlKey; label: string; max: number }> = [
    { key: 'layoutWidth', label: 'Layout Width', max: 2400 },
    { key: 'layoutHeight', label: 'Layout Height', max: 1600 },
    { key: 'layoutMaxWidth', label: 'Layout Max Width', max: 2400 },
    { key: 'layoutMaxHeight', label: 'Layout Max Height', max: 1600 },
    { key: 'marginTop', label: 'Margin Top', max: 240 },
    { key: 'marginRight', label: 'Margin Right', max: 240 },
    { key: 'marginBottom', label: 'Margin Bottom', max: 240 },
    { key: 'marginLeft', label: 'Margin Left', max: 240 },
    { key: 'paddingTop', label: 'Padding Top', max: 240 },
    { key: 'paddingRight', label: 'Padding Right', max: 240 },
    { key: 'paddingBottom', label: 'Padding Bottom', max: 240 },
    { key: 'paddingLeft', label: 'Padding Left', max: 240 },
    { key: 'gap', label: 'Gap', max: 120 },
  ]

  return (
    <>
      {controls.map((control) => (
        <ControlGroup key={control.key} label={control.label}>
          <NumberControl
            max={control.max}
            min={0}
            value={Number(navbarControls[control.key])}
            onChange={(value) => updateNavbarControl(control.key, value)}
          />
        </ControlGroup>
      ))}
    </>
  )
}

function SegmentedControl({
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void
  options: string[]
  value: string
}) {
  return (
    <div className="segmented-control">
      {options.map((option) => (
        <button
          className={option === value ? 'segment active' : 'segment'}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function TextControl({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  return (
    <input
      className="text-control"
      onChange={(event) => onChange(event.target.value)}
      type="text"
      value={value}
    />
  )
}

function SelectControl({
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void
  options: string[]
  value: string
}) {
  return (
    <select className="select-control" onChange={(event) => onChange(event.target.value)} value={value}>
      {options.map((option) => (
        <option key={option || 'default'} value={option}>
          {option || 'Default'}
        </option>
      ))}
    </select>
  )
}

function NumberControl({
  max,
  min,
  onChange,
  step = 1,
  value,
}: {
  max: number
  min: number
  onChange: (value: number) => void
  step?: number
  value: number
}) {
  return (
    <input
      className="number-control"
      max={max}
      min={min}
      onChange={(event) => onChange(Number(event.target.value))}
      step={step}
      type="number"
      value={value}
    />
  )
}

function BooleanControl({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="boolean-control">
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <PreviewApp />
  </StrictMode>,
)
