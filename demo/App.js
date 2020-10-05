import './styles/global';
import React from 'react';
import { View, Text } from 'react-native';

import useStyles from './styles/namespaced';

export default function App() {
  const s = useStyles();

  return (
    <View style={[s`.container`]}>
      <Text style={s`.text`}>Hello Planet!</Text>
    </View>
  );
}
