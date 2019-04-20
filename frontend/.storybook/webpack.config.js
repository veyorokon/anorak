const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const useExperimentalFeatures =
  process.env.CARBON_USE_EXPERIMENTAL_FEATURES !== 'false';

const useBreakingChanges = process.env.CARBON_USE_BREAKING_CHANGES !== 'false';

const useExternalCss =
  process.env.CARBON_REACT_STORYBOOK_USE_EXTERNAL_CSS === 'true';

const useStyleSourceMap =
  process.env.CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

const replaceTable = {
  componentsX: useExperimentalFeatures,
  breakingChangesX: useBreakingChanges,
};

const styleLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: useStyleSourceMap,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('autoprefixer')({
          browsers: ['last 1 version', 'ie >= 11'],
        }),
      ],
      sourceMap: useStyleSourceMap,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [path.resolve(__dirname, '..', 'node_modules')],
      data: `
        $feature-flags: (
          components-x: ${useExperimentalFeatures},
          breaking-changes-x: ${useBreakingChanges},
          grid: ${useExperimentalFeatures},
          ui-shell: true,
        );
      `,
      sourceMap: useStyleSourceMap,
    },
  },
];

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.devtool = useStyleSourceMap ? 'source-map' : '';
  defaultConfig.optimization = {
    ...defaultConfig.optimization,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          mangle: false,
        },
      }),
    ],
  };

  defaultConfig.module.rules.push({
    test: /(\/|\\)FeatureFlags\.js$/,
    loader: 'string-replace-loader',
    options: {
      multiple: Object.keys(replaceTable).map(key => ({
        search: `export\\s+const\\s+${key}\\s*=\\s*false`,
        replace: `export const ${key} = ${replaceTable[key]}`,
        flags: 'i',
      })),
    },
  });

  defaultConfig.module.rules.push({
    test: /-story\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            parser: 'babylon',
            printWidth: 80,
            tabWidth: 2,
            bracketSpacing: true,
            trailingComma: 'es5',
            singleQuote: true,
          },
        },
      },
    ],
    enforce: 'pre',
  });

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: [
      { loader: useExternalCss ? MiniCssExtractPlugin.loader : 'style-loader' },
      ...styleLoaders,
    ],
  });

  if (useExternalCss) {
    defaultConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    );
  }

  return defaultConfig;
};
