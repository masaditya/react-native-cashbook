import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TextField, Button, Toast} from 'react-native-ui-lib';
import useAuth from '../../db/auth';

const SettingScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {logout, auth, setLogin, cekIsLogin} = useAuth();
  const [password, setPassword] = React.useState<string>('');
  const [password2, setPassword2] = React.useState<string>('');
  const [message, setMessage] = React.useState('');

  const onSubmit = async () => {
    console.log(password);
    console.log(auth?.password);
    if (password === auth?.password) {
      await setLogin({...auth, password: password2});
      setMessage('Password Changes Successfully');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } else {
      setMessage('Password Incorrect');
      setTimeout(() => {
        setMessage('');
      }, 1000);
    }
    cleanup();
  };

  React.useEffect(() => {
    const cek = async () => {
      const v = await cekIsLogin();
      if (!v) {
        navigation.push('Login');
      }
    };
    cek();
  }, []);

  const cleanup = () => {
    setPassword('');
    setPassword2('');
  };

  return (
    <View padding-10>
      <Toast visible={message !== ''} message={message} />
      <Text>Ganti Password</Text>
      <TextField
        value={password}
        title="Password saat ini"
        secureTextEntry
        onChangeText={(value: string) => setPassword(value)}
      />
      <TextField
        value={password2}
        title="Password baru"
        secureTextEntry
        onChangeText={(value: string) => setPassword2(value)}
      />

      <Button fullWidth onPress={onSubmit}>
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
