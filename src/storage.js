export const AUTH_STATE = 'AUTH_STATE';
export const USER_STATE = 'USER_STATE';

const appDataKeys = [AUTH_STATE];

const storage = window.localStorage;

export const saveData = (key, data) => {
  try {
    storage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('saving error', error.message); // eslint-disable-line no-console
  }
};

export const getData = (key) => {
  let data = null;
  try {
    data = storage.getItem(key) || null;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
  return JSON.parse(data);
};

export const deleteData = (key) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error('delete error', error.message); // eslint-disable-line no-console
  }
};

export const clearData = () => {
  try {
    storage.multiRemove(appDataKeys);
  } catch (error) {
    console.error('delete error', error.message); // eslint-disable-line no-console
  }
};
