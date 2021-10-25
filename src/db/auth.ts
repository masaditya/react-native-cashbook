import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { AuthType } from '../types';

const useAuth = () => {
    const [auth, setAuth] = React.useState<AuthType>()
    const setLogin = async (value : AuthType) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('AUTH', jsonValue)
          setAuth(value)
        } catch (e) {
          // saving error
        }
      }
      const cekIsLogin = async () => {
        const jsonValue = await AsyncStorage.getItem('AUTH')
            if (jsonValue){
                console.log("JSON VALUE", JSON.parse(jsonValue))
                setAuth(JSON.parse(jsonValue))
                return true
            }else{
                return false
            }
      }

      const logout = async () => {
          const result = await AsyncStorage.removeItem("AUTH")
      }

    return { auth, setLogin, cekIsLogin, logout }
}

export default useAuth
