export const colors = {
  signalOrange: '#FF5A00',
  signalOrange70: 'rgba(255, 90, 0, 0.7)',
  signalOrange30: 'rgba(255, 90, 0, 0.3)',
  nocturnalForest: '#152304',
  nocturnalForest50: 'rgba(21, 35, 4, 0.5)',
  nocturnalForest40: 'rgba(21, 35, 4, 0.4)',
  nocturnalForest30: 'rgba(21, 35, 4, 0.3)',
  petalMist: '#F9F0ED',
} as const

export const colorVars = {
  signalOrange: `var(--acg-color-signal-orange, ${colors.signalOrange})`,
  signalOrange70: `var(--acg-color-signal-orange-70, ${colors.signalOrange70})`,
  signalOrange30: `var(--acg-color-signal-orange-30, ${colors.signalOrange30})`,
  nocturnalForest: `var(--acg-color-nocturnal-forest, ${colors.nocturnalForest})`,
  nocturnalForest50: `var(--acg-color-nocturnal-forest-50, ${colors.nocturnalForest50})`,
  nocturnalForest40: `var(--acg-color-nocturnal-forest-40, ${colors.nocturnalForest40})`,
  nocturnalForest30: `var(--acg-color-nocturnal-forest-30, ${colors.nocturnalForest30})`,
  petalMist: `var(--acg-color-petal-mist, ${colors.petalMist})`,
} as const
