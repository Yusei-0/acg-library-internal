import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { GetInTouchButton } from './GetInTouchButton'

export default declareComponent(GetInTouchButton, {
  name: 'Get In Touch Button',
  description: 'ACG oval contact button with hand-drawn outline states.',
  group: 'ACG / Interactive',
  props: {
    label: props.Text({
      name: 'Label',
      defaultValue: 'GET IN TOUCH',
      group: 'Content',
    }),
    ariaLabel: props.Text({
      name: 'ARIA Label',
      defaultValue: '',
      group: 'Accessibility',
    }),
    link: props.Link({
      name: 'Link',
      group: 'Content',
    }),
    tone: props.Variant({
      name: 'Tone',
      options: ['Olive', 'Olive Light Hover', 'Orange', 'Light', 'Auto'],
      defaultValue: 'Olive',
      group: 'Style',
    }),
    size: props.Variant({
      name: 'Size',
      options: ['Small', 'Normal', 'Large', 'Big'],
      defaultValue: 'Normal',
      group: 'Sizing',
      tooltip: 'Preset dimensions and typography. Big is 94px tall.',
    }),
    height: props.Number({
      name: 'Custom Height',
      min: 24,
      max: 240,
      decimals: 0,
      group: 'Sizing',
      tooltip: 'Optional pixel height. Leave empty to use the selected size preset.',
    }),
    width: props.Number({
      name: 'Custom Width',
      min: 64,
      max: 640,
      decimals: 0,
      group: 'Sizing',
      tooltip: 'Optional pixel width. Leave empty to use the selected size preset.',
    }),
    fontSize: props.Number({
      name: 'Font Size',
      min: 8,
      max: 72,
      decimals: 0,
      group: 'Sizing',
      tooltip: 'Optional font size in pixels. Leave empty to use the selected size preset.',
    }),
    fontWeight: props.Number({
      name: 'Font Weight',
      min: 100,
      max: 1000,
      decimals: 0,
      group: 'Sizing',
      tooltip: 'Optional font weight. Common values are 400, 700, and 900.',
    }),
    strokeWidth: props.Number({
      name: 'Outline Weight',
      min: 0.5,
      max: 8,
      decimals: 2,
      group: 'Sizing',
      tooltip: 'Optional oval outline thickness. Leave empty to use the selected size preset.',
    }),
    color: props.Text({
      name: 'Color',
      defaultValue: '',
      group: 'Style',
      tooltip: 'Optional CSS color or variable. Leave empty to use the selected tone.',
    }),
    hoverColor: props.Text({
      name: 'Hover Color',
      defaultValue: '',
      group: 'Style',
      tooltip: 'Optional CSS color or variable. Leave empty to use the selected tone.',
    }),
    ...webflowLayoutProps,
  },
})
