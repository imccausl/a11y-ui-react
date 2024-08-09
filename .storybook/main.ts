import { dirname, join } from "path";
import type {StorybookConfig} from "@storybook/react-webpack5"

const config: StorybookConfig  = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen',
  },

  stories: ['../packages/**/*/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-actions"),
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook"
  ],

  core: {},

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {}
    }
  },

  docs: {},
  staticDirs: ['static']
};

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}