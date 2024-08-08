import { dirname, join } from "path";

const config = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop) => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    // }
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

  features: {
    previewMdx2: true
  },

  core: {},

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {}
    }
  },

  docs: {}
};

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}