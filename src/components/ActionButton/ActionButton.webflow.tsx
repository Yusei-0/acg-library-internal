import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ActionButton } from './ActionButton'

export default declareComponent(ActionButton, {
  name: 'Action Button',
  description: 'Reusable call-to-action link button with variants and sizing.',
  group: 'ACG / Interactive',
  props: {
    label: props.Text({
      name: 'Label',
      defaultValue: 'Get started',
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
    variant: props.Variant({
      name: 'Variant',
      options: ['Primary', 'Secondary', 'Ghost'],
      defaultValue: 'Primary',
      group: 'Style',
    }),
    size: props.Variant({
      name: 'Size',
      options: ['Small', 'Medium', 'Large'],
      defaultValue: 'Medium',
      group: 'Style',
    }),
    fullWidth: props.Boolean({
      name: 'Full Width',
      defaultValue: false,
      group: 'Layout',
    }),
    disabled: props.Boolean({
      name: 'Disabled',
      defaultValue: false,
      group: 'State',
    }),
    ...webflowLayoutProps,
  },
})
