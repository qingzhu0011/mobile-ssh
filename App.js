/**
 * MobileSSH - 主应用入口
 * 配置React Navigation导航系统
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
      {/* Stack导航器：Login → Terminal */}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerBackTitleVisible: false,
        }}>
        {/* 登录页：禁止返回 */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'SSH 连接', headerLeft: null}}
        />
        {/* 终端页：允许返回 */}
        <Stack.Screen
          name="Terminal"
          component={TerminalScreen}
          options={{title: 'SSH 终端', headerBackTitle: '返回'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
