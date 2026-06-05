import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ProjectCard } from './ProjectCard'

export default declareComponent(ProjectCard, {
  name: 'Project Card',
  description: 'Clickable project card with main image, animated hover image, and project metadata.',
  group: 'ACG / Content',
  props: {
    projectTitle: props.Text({
      name: 'Project Title',
      defaultValue: 'Project Title',
      group: 'Content',
    }),
    clientName: props.Text({
      name: 'Client Name',
      defaultValue: 'Client Name',
      group: 'Content',
    }),
    category: props.Text({
      name: 'Category',
      defaultValue: '(Categories)',
      group: 'Content',
    }),
    image: props.Image({
      name: 'Image',
      group: 'Media',
    }),
    hoverImage: props.Image({
      name: 'Hover Image',
      group: 'Media',
      tooltip: 'Image that fades in on hover.',
    }),
    link: props.Link({
      name: 'Link',
      group: 'Content',
    }),
    className: props.Text({
      name: 'Class Name',
      defaultValue: '',
      group: 'Layout',
      tooltip: 'Optional custom class applied to the outer card link.',
    }),
    width: props.Number({
      name: 'Desktop Width',
      defaultValue: 520,
      min: 160,
      max: 1400,
      decimals: 0,
      group: 'Size',
    }),
    tabletWidth: props.Number({
      name: 'Tablet Width',
      min: 160,
      max: 1400,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to desktop when empty.',
    }),
    mobileWidth: props.Number({
      name: 'Mobile Width',
      min: 160,
      max: 1400,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to tablet, then desktop, when empty.',
    }),
    imageHeight: props.Number({
      name: 'Desktop Image Height',
      defaultValue: 520,
      min: 120,
      max: 1400,
      decimals: 0,
      group: 'Size',
    }),
    tabletImageHeight: props.Number({
      name: 'Tablet Image Height',
      min: 120,
      max: 1400,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to desktop when empty.',
    }),
    mobileImageHeight: props.Number({
      name: 'Mobile Image Height',
      min: 120,
      max: 1400,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to tablet, then desktop, when empty.',
    }),
    metaGap: props.Number({
      name: 'Desktop Meta Gap',
      defaultValue: 10,
      min: 0,
      max: 80,
      decimals: 0,
      group: 'Size',
    }),
    tabletMetaGap: props.Number({
      name: 'Tablet Meta Gap',
      min: 0,
      max: 80,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to desktop when empty.',
    }),
    mobileMetaGap: props.Number({
      name: 'Mobile Meta Gap',
      min: 0,
      max: 80,
      decimals: 0,
      group: 'Size',
      tooltip: 'Optional. Falls back to tablet, then desktop, when empty.',
    }),
    ...webflowLayoutProps,
  },
})
