import { ADD_TOAST } from 'actions';

const toastReducer = (state = null, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_TOAST:
      return { ...payload };
    default:
      return state;
  }
};

export default toastReducer;
