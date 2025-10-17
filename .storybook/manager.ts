import { addons } from 'storybook/manager-api'

addons.setConfig({
  enableShortcuts: true,
  isFullscreen: false,
  initialActive: 'sidebar',
  isToolshown: true,
  panelPosition: 'bottom',
  previewTabs: {
    'storybook/docs/panel': null,
    canvas: null,
  },
  selectedPanel: undefined,
  showNav: true,
  showPanel: true,
  showRoots: false,
  sidebarAnimations: true,
  theme: undefined,
})
