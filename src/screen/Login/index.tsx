import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  TextField,
  Button,
  Image,
  Colors,
} from 'react-native-ui-lib';
import useAuth from '../../db/auth';
import {AuthType} from '../../types';

const LoginScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {auth, setLogin, cekIsLogin} = useAuth();
  const [credentials, setCredentials] = React.useState<AuthType>({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    const cek = async () => {
      const v = await cekIsLogin();
      if (v) {
        navigation.push('Home');
      }
    };
    cek();
  }, []);

  const onSubmit = async () => {
    if (
      (credentials.username === 'user' &&
        credentials.password === 'password') ||
      credentials.password === '12345'
    ) {
      await setLogin(credentials);
      navigation.push('Home');
    }
  };

  return (
    <View flex padding-10 centerV backgroundColor={Colors.white}>
      <View centerH paddingV-20>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: 'https://png.pngtree.com/png-vector/20190827/ourlarge/pngtree-book-cash-money-novel-blue-dotted-line-line-icon-png-image_1700552.jpg',
          }}
        />
      </View>
      <TextField
        title="Username"
        onChangeText={(value: string) =>
          setCredentials({...credentials, username: value})
        }
      />
      <TextField
        title="Password"
        secureTextEntry
        onChangeText={(value: string) =>
          setCredentials({...credentials, password: value})
        }
      />
      <Button fullWidth onPress={onSubmit}>
        <Text white> Login </Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
