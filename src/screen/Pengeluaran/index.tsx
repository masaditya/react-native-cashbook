import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  TextField,
  Button,
  DateTimePicker,
} from 'react-native-ui-lib';
import useTransaction from '../../db/transaction';
import {TransactionType} from '../../types';

const PengeluaranScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {transaction, saveTransaction, loading, getTransaction} =
    useTransaction();
  const [pengeluaranState, setPengeluaranState] = React.useState<
    Omit<TransactionType, 'id'>
  >({});

  React.useEffect(() => {
    getTransaction();
  }, []);

  const onSave = () => {
    let tmp: TransactionType = {
      ...pengeluaranState,
      id: Date.now(),
      type: 'pengeluaran',
    };
    saveTransaction([...transaction, tmp]);
    setPengeluaranState({});
  };
  return (
    <View padding-10>
      <DateTimePicker
        defaultValue={new Date().toLocaleDateString()}
        title="Tanggal"
        dateFormat="MM/DD/yyyy"
        onChange={(e: any) => {
          let d = new Date(e);
          setPengeluaranState({
            ...pengeluaranState,
            date: d.toDateString(),
          });
          console.log(d.toDateString());
        }}
      />
      <TextField
        value={pengeluaranState.nominal?.toString()}
        title="Nominal"
        keyboardType="number-pad"
        onChangeText={(value: string) =>
          setPengeluaranState({...pengeluaranState, nominal: Number(value)})
        }
      />
      <TextField
        value={pengeluaranState.keterangan}
        title="Keterangan"
        onChangeText={(value: string) =>
          setPengeluaranState({...pengeluaranState, keterangan: value})
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

export default PengeluaranScreen;
