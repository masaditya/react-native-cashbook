import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Colors, Button} from 'react-native-ui-lib';
import useTransaction from '../../db/transaction';
import {TransactionType} from '../../types';

const CashFlowScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {getTransaction, loading, transaction} = useTransaction();
  const [list, setList] = React.useState<Array<TransactionType>>([]);

  React.useEffect(() => {
    getTransaction();
  }, []);

  React.useEffect(() => {
    setList(transaction);
  }, [transaction]);

  return (
    <View padding-10 flex backgroundColor={Colors.white}>
      <Text>Cash Flow List</Text>
      {list.map((item: TransactionType) => {
        return (
          <View key={item.id} row spread padding-5 marginV-5 centerV>
            <View>
              <Text color={Colors.black} text50BO>
                {item.type === 'pemasukan' ? '[ + ]' : '[ - ]'} Rp.{' '}
                {item.nominal}
                {',-'}
              </Text>
              <Text>{item.date}</Text>
              <Text>{item.keterangan}</Text>
            </View>
            <View>
              <Text>{item.nominal}</Text>
            </View>
          </View>
        );
      })}
      <Button fullWidth onPress={() => navigation.goBack()}>
        <Text white> Kembali </Text>
      </Button>
    </View>
  );
};

export default CashFlowScreen;
