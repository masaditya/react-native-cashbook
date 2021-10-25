import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Button} from 'react-native-ui-lib';
import useAuth from '../../db/auth';

const HomeScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {cekIsLogin} = useAuth();

  React.useEffect(() => {
    const cek = async () => {
      const v = await cekIsLogin();
      if (!v) {
        navigation.push('Login');
      }
    };
    cek();
  }, []);

  return (
    <View flex centerV centerH>
      <Text>Home</Text>
      <View row spread>
        <Button
          margin-15
          fullWidth
          onPress={() => navigation.push('Pemasukan')}>
          <Text white>Tambah Pemasukan</Text>
        </Button>
        <Button
          margin-15
          fullWidth
          onPress={() => navigation.push('Pengeluaran')}>
          <Text white>Tambah Pengeluaran</Text>
        </Button>
      </View>
      <View row spread>
        <Button margin-15 fullWidth onPress={() => navigation.push('CashFlow')}>
          <Text white>Cash Flow</Text>
        </Button>
        <Button margin-15 fullWidth onPress={() => navigation.push('Setting')}>
          <Text white>Pengaturan</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
