module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@core': './src/core',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@api': './src/api',
          '@store': './src/store',
        },
      },
    ],
  ],
};
