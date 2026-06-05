import { props } from '@webflow/data-types'
import { declareComponent } from '@webflow/react'
import { webflowLayoutProps } from '../../shared/webflowLayoutProps'
import { ACGFooter } from './ACGFooter'

export default declareComponent(ACGFooter, {
  name: 'ACG Footer',
  description: 'Large ACG footer with nav links, socials, CTA, brand lockup, and legal links.',
  group: 'ACG / Navigation',
  props: {
    headline: props.Text({ name: 'Headline', defaultValue: 'How can we help you?', group: 'Content' }),
    contactLabel: props.Text({ name: 'Contact Label', defaultValue: 'GET IN TOUCH', group: 'CTA' }),
    contactLink: props.Link({ name: 'Contact Link', group: 'CTA' }),
    firstLabel: props.Text({ name: 'First Label', defaultValue: 'WHAT WE DO', group: 'Main Links' }),
    firstLink: props.Link({ name: 'First Link', group: 'Main Links' }),
    secondLabel: props.Text({ name: 'Second Label', defaultValue: 'HOW WE WORK', group: 'Main Links' }),
    secondLink: props.Link({ name: 'Second Link', group: 'Main Links' }),
    thirdLabel: props.Text({ name: 'Third Label', defaultValue: 'WORK', group: 'Main Links' }),
    thirdLink: props.Link({ name: 'Third Link', group: 'Main Links' }),
    fourthLabel: props.Text({ name: 'Fourth Label', defaultValue: 'ABOUT', group: 'Main Links' }),
    fourthLink: props.Link({ name: 'Fourth Link', group: 'Main Links' }),
    firstSocialLabel: props.Text({ name: 'First Social Label', defaultValue: 'LINKEDIN', group: 'Social' }),
    firstSocialLink: props.Link({ name: 'First Social Link', group: 'Social' }),
    secondSocialLabel: props.Text({ name: 'Second Social Label', defaultValue: 'INSTAGRAM', group: 'Social' }),
    secondSocialLink: props.Link({ name: 'Second Social Link', group: 'Social' }),
    backToTopLabel: props.Text({ name: 'Back To Top Label', defaultValue: 'Back to top', group: 'Back To Top' }),
    backToTopLink: props.Link({ name: 'Back To Top Link', group: 'Back To Top' }),
    brandPrefix: props.Text({ name: 'Brand Prefix', defaultValue: 'ACG', group: 'Brand' }),
    brandSuffix: props.Text({ name: 'Brand Suffix', defaultValue: 'studio', group: 'Brand' }),
    copyright: props.Text({
      name: 'Copyright',
      defaultValue: '© 2026 ACG STUDIO, a division of ALLGRAPHICSINC. All rights reserved.',
      group: 'Legal',
    }),
    firstLegalLabel: props.Text({ name: 'First Legal Label', defaultValue: 'PRIVACY POLICY', group: 'Legal' }),
    firstLegalLink: props.Link({ name: 'First Legal Link', group: 'Legal' }),
    secondLegalLabel: props.Text({ name: 'Second Legal Label', defaultValue: 'COOKIE POLICY', group: 'Legal' }),
    secondLegalLink: props.Link({ name: 'Second Legal Link', group: 'Legal' }),
    thirdLegalLabel: props.Text({ name: 'Third Legal Label', defaultValue: 'TERMS & CONDITIONS', group: 'Legal' }),
    thirdLegalLink: props.Link({ name: 'Third Legal Link', group: 'Legal' }),
    backgroundColor: props.Text({
      name: 'Background Color',
      defaultValue: 'var(--acg-color-nocturnal-forest, #152304)',
      group: 'Colors',
    }),
    textColor: props.Text({
      name: 'Text Color',
      defaultValue: 'var(--acg-color-petal-mist, #F9F0ED)',
      group: 'Colors',
    }),
    accentColor: props.Text({
      name: 'Accent Color',
      defaultValue: 'var(--acg-color-signal-orange, #FF5A00)',
      group: 'Colors',
    }),
    minHeight: props.Number({ name: 'Min Height', defaultValue: 820, min: 420, max: 1400, decimals: 0, group: 'Size' }),
    paddingX: props.Number({ name: 'Horizontal Padding', defaultValue: 28, min: 0, max: 180, decimals: 0, group: 'Size' }),
    paddingY: props.Number({ name: 'Top Padding', defaultValue: 52, min: 0, max: 180, decimals: 0, group: 'Size' }),
    className: props.Text({ name: 'Class Name', defaultValue: '', group: 'Layout' }),
    ...webflowLayoutProps,
  },
})
