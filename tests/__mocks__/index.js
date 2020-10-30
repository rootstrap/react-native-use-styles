jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => {
  return {
    create: (style) => style,
    flatten: (style) => style,
  };
});
