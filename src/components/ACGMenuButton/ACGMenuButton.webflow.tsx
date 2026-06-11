import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ACGMenuButton } from './ACGMenuButton'

export default declareComponent(ACGMenuButton, {
  name: 'ACG Menu Button',
  description: 'Standalone menu button that opens the fullscreen navigation menu with four configurable links.',
  group: 'ACG / Navigation',
  props: {
    logoText: props.Text({
      name: 'Logo Text',
      defaultValue: 'Logo',
      group: 'Brand',
    }),
    menuLogo: props.Image({
      name: 'Open Menu Logo',
      group: 'Brand',
      tooltip: 'Logo shown in the center of the fullscreen menu header.',
    }),
    menuLogoHeight: props.Number({
      name: 'Open Menu Logo Height',
      defaultValue: 39,
      min: 8,
      max: 160,
      decimals: 0,
      group: 'Brand',
    }),
    hideOpenMenuLogo: props.Boolean({
      name: 'Hide Open Menu Logo',
      defaultValue: false,
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
    contactColor: props.Text({
      name: 'Contact Color',
      defaultValue: 'var(--acg-color-nocturnal-forest, #152304)',
      group: 'Contact',
      tooltip: 'CSS color or variable for the Get In Touch button text and outline.',
    }),
    contactHoverColor: props.Text({
      name: 'Contact Hover Color',
      defaultValue: 'var(--acg-color-petal-mist, #F9F0ED)',
      group: 'Contact',
      tooltip: 'Hover color used inside the fullscreen menu.',
    }),
    menuLabel: props.Text({
      name: 'Menu Label',
      defaultValue: 'MENU',
      group: 'Controls',
    }),
    closeLabel: props.Text({
      name: 'Close Label',
      defaultValue: 'CLOSE',
      group: 'Controls',
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
    openMenuHeaderHeight: props.Number({
      name: 'Open Menu Header Height',
      defaultValue: 115,
      min: 64,
      max: 320,
      decimals: 0,
      group: 'Sizing',
    }),
    openMenuHeaderTopPadding: props.Number({
      name: 'Open Menu Header Top Padding',
      defaultValue: 28,
      min: 0,
      max: 120,
      decimals: 0,
      group: 'Sizing',
    }),
    menuBackground: props.Text({
      name: 'Menu Background',
      defaultValue: 'var(--acg-nav-menu-background, var(--acg-nav-background, var(--acg-color-signal-orange, #FF5A00)))',
      group: 'Variables',
    }),
    textColor: props.Text({
      name: 'Button Text Color',
      defaultValue: 'var(--acg-nav-text, var(--acg-color-nocturnal-forest, #152304))',
      group: 'Variables',
    }),
    menuTextColor: props.Text({
      name: 'Menu Text Color',
      defaultValue: 'var(--acg-nav-menu-text, var(--acg-color-nocturnal-forest-50, rgba(21, 35, 4, 0.5)))',
      group: 'Variables',
    }),
    menuHoverColor: props.Text({
      name: 'Menu Hover Color',
      defaultValue: 'var(--acg-nav-menu-hover, var(--acg-color-nocturnal-forest, #152304))',
      group: 'Variables',
    }),
    ...webflowLayoutProps,
  },
})
