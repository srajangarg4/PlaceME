export const AUTH_STATE = 'AUTH_STATE';
export const USER_STATE = 'USER_STATE';

const appDataKeys = [AUTH_STATE];

const AsyncStorage = window.localStorage;

export const saveData = (key, data) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('saving error', error.message); // eslint-disable-line no-console
  }
};

export const getData = (key) => {
  let data = null;
  try {
    data = (AsyncStorage.getItem(key)) || null;
  } catch (error) {
    console.log(error.message); // eslint-disable-line no-console
  }
  return JSON.parse(data);
};

export const deleteData = async (key) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('delete error', error.message); // eslint-disable-line no-console
  }
};

export const clearData = () => {
  try {
    AsyncStorage.multiRemove(appDataKeys);
  } catch (error) {
    console.log('delete error', error.message); // eslint-disable-line no-console
  }
};
