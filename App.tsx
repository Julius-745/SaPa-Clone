// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import AddPengguna from './src/pages/AddPengaduan';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import rootReducer from './src/components/store/rootReducer';
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPengguna" component={AddPengguna} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;