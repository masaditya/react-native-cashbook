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
import { images } from '../../db/image';
import { userCred } from '../../db/loginCred';
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
      (credentials.username === userCred.username &&
        credentials.password === userCred.password)
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
            uri: images.loginImage,
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
