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
      options: ['Olive', 'Orange', 'Light'],
      defaultValue: 'Olive',
      group: 'Style',
    }),
    ...webflowLayoutProps,
  },
})
