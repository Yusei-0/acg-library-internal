import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { MetricCard } from './MetricCard'

export default declareComponent(MetricCard, {
  name: 'Metric Card',
  description: 'Reusable content card for metrics, KPIs, and short proof points.',
  group: 'ACG / Content',
  props: {
    eyebrow: props.Text({
      name: 'Eyebrow',
      defaultValue: 'Performance',
      group: 'Content',
    }),
    value: props.Text({
      name: 'Value',
      defaultValue: '42',
      group: 'Content',
    }),
    suffix: props.Text({
      name: 'Suffix',
      defaultValue: '%',
      group: 'Content',
    }),
    label: props.Text({
      name: 'Label',
      defaultValue: 'Conversion lift',
      group: 'Content',
    }),
    description: props.Text({
      name: 'Description',
      defaultValue: 'Measured across the latest campaign cycle.',
      group: 'Content',
    }),
    tone: props.Variant({
      name: 'Tone',
      options: ['Light', 'Dark', 'Accent'],
      defaultValue: 'Light',
      group: 'Style',
    }),
    alignment: props.Variant({
      name: 'Alignment',
      options: ['Left', 'Center'],
      defaultValue: 'Left',
      group: 'Layout',
    }),
    showAccentBar: props.Boolean({
      name: 'Accent Bar',
      defaultValue: true,
      group: 'Style',
    }),
    radius: props.Number({
      name: 'Radius',
      defaultValue: 8,
      min: 0,
      max: 24,
      decimals: 0,
      group: 'Style',
    }),
    ...webflowLayoutProps,
  },
})
