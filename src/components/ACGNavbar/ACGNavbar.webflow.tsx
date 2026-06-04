import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ACGNavbar } from './ACGNavbar'

export default declareComponent(ACGNavbar, {
  name: 'ACG Navbar',
  description: 'Sticky navbar with hero links, compact menu state, and fullscreen infinite menu.',
  group: 'ACG / Navigation',
  props: {
    logoText: props.Text({
      name: 'Logo Text',
      defaultValue: 'Logo',
      group: 'Brand',
    }),
    contactLabel: props.Text({
      name: 'Contact Label',
      defaultValue: 'GET IN TOUCH',
      group: 'Contact',
    }),
    contactLink: props.Link({
      name: 'Contact Link',
      group: 'Contact',
    }),
    firstLabel: props.Text({
      name: 'First Label',
      defaultValue: 'WHAT WE DO',
      group: 'Links',
    }),
    firstLink: props.Link({
      name: 'First Link',
      group: 'Links',
    }),
    secondLabel: props.Text({
      name: 'Second Label',
      defaultValue: 'HOW WE WORK',
      group: 'Links',
    }),
    secondLink: props.Link({
      name: 'Second Link',
      group: 'Links',
    }),
    thirdLabel: props.Text({
      name: 'Third Label',
      defaultValue: 'WORK',
      group: 'Links',
    }),
    thirdLink: props.Link({
      name: 'Third Link',
      group: 'Links',
    }),
    fourthLabel: props.Text({
      name: 'Fourth Label',
      defaultValue: 'ABOUT',
      group: 'Links',
    }),
    fourthLink: props.Link({
      name: 'Fourth Link',
      group: 'Links',
    }),
    scrollThreshold: props.Number({
      name: 'Scroll Threshold',
      defaultValue: 24,
      min: 0,
      max: 240,
      decimals: 0,
      group: 'Behavior',
    }),
    navBackground: props.Text({
      name: 'Hero Background',
      defaultValue: 'var(--acg-nav-background, #ff4f00)',
      group: 'Variables',
      tooltip: 'CSS color or variable. Example: var(--acg-nav-background, #ff4f00).',
    }),
    compactBackground: props.Text({
      name: 'Compact Background',
      defaultValue: 'var(--acg-nav-compact-background, #f4ede9)',
      group: 'Variables',
      tooltip: 'CSS color or variable for the sticky compact state.',
    }),
    menuBackground: props.Text({
      name: 'Menu Background',
      defaultValue: 'var(--acg-nav-menu-background, var(--acg-nav-background, #ff4f00))',
      group: 'Variables',
      tooltip: 'CSS color or variable for the fullscreen menu.',
    }),
    textColor: props.Text({
      name: 'Text Color',
      defaultValue: 'var(--acg-nav-text, #0b0b0b)',
      group: 'Variables',
      tooltip: 'CSS color or variable for navbar text, CTA border, and CTA text.',
    }),
    menuTextColor: props.Text({
      name: 'Menu Text Color',
      defaultValue: 'var(--acg-nav-menu-text, #9d3400)',
      group: 'Variables',
      tooltip: 'CSS color or variable for fullscreen menu links.',
    }),
    menuHoverColor: props.Text({
      name: 'Menu Hover Color',
      defaultValue: 'var(--acg-nav-menu-hover, #0b0b0b)',
      group: 'Variables',
      tooltip: 'CSS color or variable for fullscreen menu link hover.',
    }),
    ...webflowLayoutProps,
  },
})
