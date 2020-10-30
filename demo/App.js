import './styles/global';
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import useStyles from './styles/namespaced';

export default function App() {
  const [isDisabled, setDisabled] = useState(false);
  const s = useStyles([isDisabled]);

  return (
    <View style={s`.container`}>
      <Text style={s`.centered font:size:$title &disabled`}>Hello Planet!</Text>
      <Button
        onPress={() => setDisabled((current) => !current)}
        title="toggle"
      />
    </View>
  );
}
