// src/App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/splash-screen';
import ExploreScreen from './src/screens/explore-screen';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './src/store';
const Stack = createStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Explore"
              component={ExploreScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
