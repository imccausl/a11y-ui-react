import { dirname, join } from "path";

const config = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },

  stories: ['../packages/**/*/*.stories.mdx', '../packages/**/*/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],

  features: {
    previewMdx2: true
  },

  core: {},

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {
        useSWC: true
      }
    }
  },

  docs: {
    autodocs: true
  }
};

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}