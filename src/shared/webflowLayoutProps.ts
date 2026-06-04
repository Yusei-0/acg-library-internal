import { props } from '@webflow/data-types'

export const webflowLayoutProps = {
  marginTop: props.Number({
    name: 'Margin Top',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  marginRight: props.Number({
    name: 'Margin Right',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  marginBottom: props.Number({
    name: 'Margin Bottom',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  marginLeft: props.Number({
    name: 'Margin Left',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  paddingTop: props.Number({
    name: 'Padding Top',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  paddingRight: props.Number({
    name: 'Padding Right',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  paddingBottom: props.Number({
    name: 'Padding Bottom',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  paddingLeft: props.Number({
    name: 'Padding Left',
    min: 0,
    max: 240,
    decimals: 0,
    group: 'Layout',
  }),
  gap: props.Number({
    name: 'Gap',
    min: 0,
    max: 120,
    decimals: 0,
    group: 'Layout',
  }),
  flexDirection: props.Variant({
    name: 'Flex Direction',
    options: ['Row', 'Column'],
    group: 'Layout',
  }),
  horizontalAlignment: props.Variant({
    name: 'Horizontal Alignment',
    options: ['Start', 'Center', 'End', 'Stretch'],
    group: 'Layout',
  }),
  verticalAlignment: props.Variant({
    name: 'Vertical Alignment',
    options: ['Start', 'Center', 'End', 'Stretch'],
    group: 'Layout',
  }),
}
