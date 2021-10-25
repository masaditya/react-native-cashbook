import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TextField, Button} from 'react-native-ui-lib';
import useAuth from '../../db/auth';
import {AuthType} from '../../types';

const LoginScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {auth, setLogin} = useAuth();
  const [credentials, setCredentials] = React.useState<AuthType>({
    username: '',
    password: '',
  });

  const onSubmit = async () => {
    if (
      credentials.username === 'user' &&
      credentials.password === 'password'
    ) {
      await setLogin(credentials);
      navigation.push('Home');
    }
  };

  return (
    <View flex padding-10 centerV>
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
