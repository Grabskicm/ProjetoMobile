import React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Acesso from './src/screens/Acesso';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';


const Stack = createNativeStackNavigator();


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Acesso" component={Acesso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;