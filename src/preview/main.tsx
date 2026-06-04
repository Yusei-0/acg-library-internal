import { StrictMode, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ACGNavbar, ActionButton, GetInTouchButton, MetricCard } from '../components'
import type {
  ActionButtonSize,
  ActionButtonVariant,
  GetInTouchButtonTone,
  MetricCardAlignment,
  MetricCardTone,
} from '../components'
import '../../devlink/css/global.css'
import './styles.css'

type ComponentKey = 'navbar' | 'button' | 'getInTouch' | 'metric'
type CanvasMode = 'Contained' | 'Full width'

const componentTabs: Array<{ key: ComponentKey; label: string }> = [
  { key: 'navbar', label: 'ACG Navbar' },
  { key: 'button', label: 'Action Button' },
  { key: 'getInTouch', label: 'Get In Touch' },
  { key: 'metric', label: 'Metric Card' },
]

function PreviewApp() {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>('navbar')
  const [buttonVariant, setButtonVariant] = useState<ActionButtonVariant>('Primary')
  const [buttonSize, setButtonSize] = useState<ActionButtonSize>('Medium')
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('Contained')
  const [getInTouchTone, setGetInTouchTone] = useState<GetInTouchButtonTone>('Olive')
  const [metricTone, setMetricTone] = useState<MetricCardTone>('Light')
  const [metricAlignment, setMetricAlignment] = useState<MetricCardAlignment>('Left')
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
          <h1>Component Library</h1>
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
            buttonVariant,
            buttonSize,
            canvasMode,
            getInTouchTone,
            metricTone,
            metricAlignment,
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

          {activeComponent === 'button' ? (
            <>
              <ControlGroup label="Variant">
                <SegmentedControl
                  options={['Primary', 'Secondary', 'Ghost']}
                  value={buttonVariant}
                  onChange={(value) => setButtonVariant(value as ActionButtonVariant)}
                />
              </ControlGroup>
              <ControlGroup label="Size">
                <SegmentedControl
                  options={['Small', 'Medium', 'Large']}
                  value={buttonSize}
                  onChange={(value) => setButtonSize(value as ActionButtonSize)}
                />
              </ControlGroup>
            </>
          ) : null}

          {activeComponent === 'getInTouch' ? (
            <ControlGroup label="Tone">
              <SegmentedControl
                options={['Olive', 'Orange', 'Light']}
                value={getInTouchTone}
                onChange={(value) => setGetInTouchTone(value as GetInTouchButtonTone)}
              />
            </ControlGroup>
          ) : null}

          {activeComponent === 'metric' ? (
            <>
              <ControlGroup label="Tone">
                <SegmentedControl
                  options={['Light', 'Dark', 'Accent']}
                  value={metricTone}
                  onChange={(value) => setMetricTone(value as MetricCardTone)}
                />
              </ControlGroup>
              <ControlGroup label="Alignment">
                <SegmentedControl
                  options={['Left', 'Center']}
                  value={metricAlignment}
                  onChange={(value) => setMetricAlignment(value as MetricCardAlignment)}
                />
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
    buttonSize: ActionButtonSize
    buttonVariant: ActionButtonVariant
    canvasMode: CanvasMode
    getInTouchTone: GetInTouchButtonTone
    metricAlignment: MetricCardAlignment
    metricTone: MetricCardTone
  },
) {
  if (activeComponent === 'button') {
    return (
      <div className="button-preview">
        <ActionButton
          label="Book a strategy call"
          link={{ href: '#contact' }}
          size={options.buttonSize}
          variant={options.buttonVariant}
        />
      </div>
    )
  }

  if (activeComponent === 'metric') {
    return (
      <MetricCard
        alignment={options.metricAlignment}
        description="Measured across launch campaigns and retained for local QA."
        eyebrow="Library health"
        label="Reusable components"
        suffix="%"
        tone={options.metricTone}
        value="98"
      />
    )
  }

  if (activeComponent === 'getInTouch') {
    return (
      <div className={options.getInTouchTone === 'Light' ? 'button-preview dark-button-preview' : 'button-preview'}>
        <GetInTouchButton label="GET IN TOUCH" link={{ href: '#contact' }} tone={options.getInTouchTone} />
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

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <PreviewApp />
  </StrictMode>,
)
