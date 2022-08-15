import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user_info', jsonValue)
    } catch (e) {
      
    }
}

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_info')

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@user_info')
    } catch(e) {
      // error reading value
    }
}

export const storeLocation = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@user_location', jsonValue)
  } catch (error) {
    
  }
}

export const getLocation = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_location')

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    
  }
}