import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

const routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({
            title: route.params.user.name,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen
          name="Repository"
          component={Repository}
          options={({ route }) => ({
            title: route.params.repo.name,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default routes;
