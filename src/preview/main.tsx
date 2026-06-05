import { StrictMode, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ACGFooter, ACGNavbar, ArrowButton, GetInTouchButton, MarqueeTitle, ProjectCard } from '../components'
import type {
  GetInTouchButtonTone,
  MarqueeTitleDirection,
} from '../components'
import '../../devlink/css/global.css'
import './styles.css'

type ComponentKey = 'navbar' | 'footer' | 'arrowButton' | 'getInTouch' | 'marqueeTitle' | 'projectCard'
type CanvasMode = 'Contained' | 'Full width'

const componentTabs: Array<{ key: ComponentKey; label: string }> = [
  { key: 'navbar', label: 'ACG Navbar' },
  { key: 'footer', label: 'ACG Footer' },
  { key: 'arrowButton', label: 'Arrow Button' },
  { key: 'getInTouch', label: 'Get In Touch' },
  { key: 'marqueeTitle', label: 'Marquee Title' },
  { key: 'projectCard', label: 'Project Card' },
]

function PreviewApp() {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>('navbar')
  const [arrowAngle, setArrowAngle] = useState(0)
  const [arrowFontSize, setArrowFontSize] = useState(64)
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('Contained')
  const [getInTouchTone, setGetInTouchTone] = useState<GetInTouchButtonTone>('Olive')
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

  return (
    <main className={isFullWidth ? 'preview-shell full-width-mode' : 'preview-shell'}>
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
            getInTouchTone,
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
            <ControlGroup label="Tone">
              <SegmentedControl
                options={['Olive', 'Olive Light Hover', 'Orange', 'Light']}
                value={getInTouchTone}
                onChange={(value) => setGetInTouchTone(value as GetInTouchButtonTone)}
              />
            </ControlGroup>
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
    getInTouchTone: GetInTouchButtonTone
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
        <GetInTouchButton label="GET IN TOUCH" link={{ href: '#contact' }} tone={options.getInTouchTone} />
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

  if (activeComponent === 'footer') {
    return (
      <div className="footer-preview">
        <ACGFooter />
      </div>
    )
  }

  return (
    <div className={options.canvasMode === 'Full width' ? 'navbar-preview full-width-navbar' : 'navbar-preview'}>
      <ACGNavbar
        contactLink={{ href: '#contact' }}
        firstLink={{ href: '#strategy' }}
        fourthLink={{ href: '#studio' }}
        logoText="ACG"
        secondLink={{ href: '#systems' }}
        thirdLink={{ href: '#work' }}
      />
      <NavbarSections />
    </div>
  )
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

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <PreviewApp />
  </StrictMode>,
)
