import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import LoginScreen from './src/screen/Login';
import PemasukanScreen from './src/screen/Pemasukan';
import PengeluaranScreen from './src/screen/Pengeluaran';
import SettingScreen from './src/screen/Setting';
import CashFlowScreen from './src/screen/CashFlow';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pemasukan" component={PemasukanScreen} />
        <Stack.Screen name="Pengeluaran" component={PengeluaranScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="CashFlow" component={CashFlowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
