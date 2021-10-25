import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, Button, Colors} from 'react-native-ui-lib';
import useAuth from '../../db/auth';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import useTransaction from '../../db/transaction';

const HomeScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {cekIsLogin} = useAuth();
  const {transaction} = useTransaction();
  const [pengeluaran, setPengeluaran] = useState<number[]>([]);
  const [tanggal, setTanggal] = useState<string[]>([]);
  const [pemasukan, setPemasukan] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [jmlPm, setjmlPm] = useState(0);
  const [jmlPl, setjmlPl] = useState(0);

  React.useEffect(() => {
    const cek = async () => {
      const v = await cekIsLogin();
      if (!v) {
        navigation.push('Login');
      }
    };
    cek();
  }, []);

  React.useEffect(() => {
    if (transaction) {
      let pl = transaction.map(
        item =>
          (item.type === 'pengeluaran' &&
            item.nominal &&
            item.nominal / 1000) ||
          100,
      );
      setPengeluaran(pl);
      let pm = transaction.map(
        item =>
          (item.type === 'pemasukan' && item.nominal && item.nominal / 1000) ||
          100,
      );
      let tgl = transaction.map(
        item => (item.date && item.date.split(' ')[2]) || '-',
      );

      let jmlpm = pm.reduce((prv, curr) => prv + curr, 0);
      let jmlpl = pl.reduce((prv, curr) => prv + curr, 0);
      setjmlPl(jmlpl);
      setjmlPm(jmlpm);
      setTanggal(tgl);
      setPemasukan(pm);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [transaction]);

  return (
    <View flex padding-10 backgroundColor={Colors.white}>
      <Text
        text30M
        style={{fontWeight: 'bold', letterSpacing: 1}}
        color="#7F51E0">
        Home
      </Text>
      {!loading && (
        <LineChart
          data={{
            labels: [...tanggal],
            datasets: [
              {
                data: [...pemasukan],
              },
              {
                data: [...pengeluaran],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisLabel="Rp."
          chartConfig={{
            backgroundColor: '#F1EAFF',
            backgroundGradientFrom: '#F1EAFF',
            backgroundGradientTo: '#F1EAFF',
            color: (opacity = 1) => `rgba(27, 81, 224, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(27, 81, 224, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <View row spread>
        <View
          margin-5
          flex
          height={100}
          centerH
          centerV
          backgroundColor="#F1EAFF">
          <Text>Pemasukan</Text>
          <Text text50>Rp. {jmlPm},-</Text>
        </View>
        <View
          margin-5
          flex
          height={100}
          centerH
          centerV
          backgroundColor="#F1EAFF">
          <Text>Pengeluaran</Text>
          <Text text50>Rp. {jmlPl},-</Text>
        </View>
      </View>
      <View row spread flex bottom>
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
        <Button
          flex
          margin-15
          fullWidth
          onPress={() => navigation.push('CashFlow')}>
          <Text white>Cash Flow</Text>
        </Button>
        <Button
          flex
          margin-15
          fullWidth
          onPress={() => navigation.push('Setting')}>
          <Text white>Pengaturan</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
