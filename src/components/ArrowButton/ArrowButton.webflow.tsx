import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ArrowButton } from './ArrowButton'

export default declareComponent(ArrowButton, {
  name: 'Arrow Button',
  description: 'Customizable circular arrow link button with editable typography, colors, sizing, and arrow angle.',
  group: 'ACG / Interactive',
  props: {
    label: props.Text({
      name: 'Label',
      defaultValue: 'VIEW ALL WORK',
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
    className: props.Text({
      name: 'Class Name',
      defaultValue: '',
      group: 'Layout',
    }),
    textColor: props.Text({
      name: 'Text Color',
      defaultValue: '#152304',
      group: 'Colors',
    }),
    hoverTextColor: props.Text({
      name: 'Hover Text Color',
      defaultValue: '#FF5A00',
      group: 'Colors',
    }),
    circleColor: props.Text({
      name: 'Circle Color',
      defaultValue: '#152304',
      group: 'Colors',
    }),
    hoverCircleColor: props.Text({
      name: 'Hover Circle Color',
      defaultValue: '#FF5A00',
      group: 'Colors',
    }),
    backgroundColor: props.Text({
      name: 'Background Color',
      defaultValue: 'transparent',
      group: 'Colors',
    }),
    hoverBackgroundColor: props.Text({
      name: 'Hover Background Color',
      defaultValue: 'transparent',
      group: 'Colors',
    }),
    width: props.Number({
      name: 'Width',
      min: 0,
      max: 2400,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Leave empty or 0 for auto width.',
    }),
    height: props.Number({
      name: 'Height',
      min: 0,
      max: 600,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Leave empty or 0 for auto height.',
    }),
    circleSize: props.Number({
      name: 'Circle Size',
      defaultValue: 88,
      min: 16,
      max: 240,
      decimals: 0,
      group: 'Size',
    }),
    borderWidth: props.Number({
      name: 'Circle Border Width',
      defaultValue: 7,
      min: 1,
      max: 24,
      decimals: 0,
      group: 'Size',
    }),
    buttonGap: props.Number({
      name: 'Button Gap',
      defaultValue: 32,
      min: 0,
      max: 160,
      decimals: 0,
      group: 'Size',
    }),
    arrowSize: props.Number({
      name: 'Arrow Size',
      defaultValue: 42,
      min: 8,
      max: 160,
      decimals: 0,
      group: 'Size',
    }),
    arrowAngle: props.Number({
      name: 'Arrow Angle',
      defaultValue: 0,
      min: -360,
      max: 360,
      decimals: 0,
      group: 'Icon',
      tooltip: '0 points right. 90 points diagonally up-right.',
    }),
    fontFamily: props.Text({
      name: 'Font Family',
      defaultValue: 'Ppneueyork, Georgia, serif',
      group: 'Typography',
    }),
    fontSize: props.Number({
      name: 'Font Size',
      defaultValue: 64,
      min: 8,
      max: 240,
      decimals: 0,
      group: 'Typography',
    }),
    fontWeight: props.Number({
      name: 'Font Weight',
      defaultValue: 900,
      min: 100,
      max: 1000,
      decimals: 0,
      group: 'Typography',
    }),
    ...webflowLayoutProps,
  },
})
