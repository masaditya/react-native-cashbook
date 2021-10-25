import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  Button,
  TextField,
  DateTimePicker,
} from 'react-native-ui-lib';
import {TextFieldProps} from 'react-native-ui-lib/generatedTypes/src/incubator';
import useTransaction from '../../db/transaction';
import {TransactionType} from '../../types';

const PemasukanScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {transaction, saveTransaction, loading, getTransaction} =
    useTransaction();
  const [pemasukanState, setPemasukanState] = React.useState<
    Omit<TransactionType, 'id'>
  >({});

  React.useEffect(() => {
    getTransaction();
  }, []);

  const onSave = () => {
    let tmp = [...transaction];
    tmp.push({...pemasukanState, id: Date.now(), type: 'pemasukan'});
    saveTransaction(tmp);
    setPemasukanState({});
  };

  return (
    <View padding-10>
      <DateTimePicker
        defaultValue={new Date().toLocaleDateString()}
        title="Tanggal"
        dateFormat="MM/DD/yyyy"
        onChange={(e: any) => {
          let d = new Date(e);
          setPemasukanState({
            ...pemasukanState,
            date: d.toDateString(),
          });
          console.log(d.toDateString());
        }}
      />
      <TextField
        value={pemasukanState.nominal?.toString()}
        title="Nominal"
        keyboardType="number-pad"
        onChangeText={(value: string) =>
          setPemasukanState({...pemasukanState, nominal: Number(value)})
        }
      />
      <TextField
        value={pemasukanState.keterangan}
        title="Keterangan"
        onChangeText={(value: string) =>
          setPemasukanState({...pemasukanState, keterangan: value})
        }
      />
      <Button fullWidth onPress={onSave} disabled={loading}>
        <Text white>Simpan</Text>
      </Button>
      <Button onPress={() => navigation.goBack()} fullWidth outline marginT-20>
        <Text>Kembali</Text>
      </Button>
    </View>
  );
};

export default PemasukanScreen;
