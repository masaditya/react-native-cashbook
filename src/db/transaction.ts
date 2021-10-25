import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { TransactionType } from '../types';

const useTransaction = () => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [transaction, setTransaction] = React.useState<Array<TransactionType>>([])

    React.useEffect(()=> {
        getTransaction()
    },[])

    const saveTransaction = async (value : Array<TransactionType>) => {
        setLoading(true)
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('TRANSACTION', jsonValue)
          setLoading(false)
        } catch (e) {
          // saving error
          setLoading(false)
        }
      }
      const getTransaction = async () => {
        setLoading(true)
        try {
          const jsonValue = await AsyncStorage.getItem('TRANSACTION')
            if(jsonValue){
                setTransaction(JSON.parse(jsonValue)) 
                setLoading(false)
            } 
        } catch(e) {
          // error reading value
          setLoading(false)
        }
      }
    return { transaction, getTransaction, saveTransaction, loading }
}

export default useTransaction
