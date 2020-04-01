import React from 'react';

import { View, StatusBar, ScrollView } from 'react-native'

import { Signin } from './src/screen'

const App: () => React$Node = () => {
  return (
    <ScrollView style={{ backgroundColor: '#fff' }} >
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <Signin />
    </ScrollView>
  );
};


export default App;
