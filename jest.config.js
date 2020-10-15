module.exports = {
  preset: 'react-native',
  setupFiles: [
    './tests/__mocks__/index.js'
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools)',
  ],
  coverageReporters: [
    "json-summary"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/core/**.js",
    "src/utils/**.js",
  ]
};