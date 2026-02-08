/**
 * MobileSSH - 主应用入口
 * 配置导航和全局样式
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import TerminalScreen from './src/screens/TerminalScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'SSH 连接'}}
        />
        <Stack.Screen
          name="Terminal"
          component={TerminalScreen}
          options={{title: 'SSH 终端'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
