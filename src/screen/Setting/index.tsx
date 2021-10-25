import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TextField, Button} from 'react-native-ui-lib';
import useAuth from '../../db/auth';

const SettingScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {logout} = useAuth();
  return (
    <View padding-10>
      <Text>Ganti Password</Text>
      <TextField title="Password saat ini" secureTextEntry />
      <TextField title="Password baru" secureTextEntry />

      <Button fullWidth>
        <Text white>Simpan</Text>
      </Button>
      <Button onPress={() => navigation.goBack()} fullWidth outline marginT-10>
        <Text>Kembali</Text>
      </Button>
      <Button
        onPress={() => {
          logout().then(() => navigation.push('Login'));
        }}
        fullWidth
        outline
        marginT-20
        red30>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default SettingScreen;
