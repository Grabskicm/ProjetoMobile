import React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Acesso from './src/screens/Acesso';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import CadastroPet from './src/screens/CadastroPet';
import ListPage from './src/screens/ListPage';
import Atualiza from './src/screens/Atualiza';
import Detalhes from './src/screens/Detalhes';
import Jogo from './src/screens/Jogo';



const Stack = createNativeStackNavigator();


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Listagem" component={ListPage} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Acesso" component={Acesso} />
        <Stack.Screen name="CadastroPet" component={CadastroPet} />
        <Stack.Screen name="Atualiza" component={Atualiza} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Jogo" component={Jogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;