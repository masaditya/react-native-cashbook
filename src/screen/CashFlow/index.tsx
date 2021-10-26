import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Colors, Button, Image} from 'react-native-ui-lib';
import { images } from '../../db/image';
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
      <Text
        marginV-20
        text40M
        style={{fontWeight: 'bold', letterSpacing: 1}}
        color="#7F51E0">
        Cash Flow List
      </Text>
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
              {item.type == 'pemasukan' ? (
                <Image
                  marginR-10
                  style={{
                    height: 25,
                    width: 25,
                  }}
                  source={{
                    uri: images.iconPemasukan,
                  }}
                />
              ) : (
                <Image
                  marginR-10
                  style={{
                    height: 25,
                    width: 25,
                  }}
                  source={{
                    uri: images.iconPengeluaran,
                  }}
                />
              )}
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
