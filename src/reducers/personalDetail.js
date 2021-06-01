import { ADD_PERSONAL_DETAIL } from 'actions/personalDetails';

const personalDetailReducer = (state = null, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_PERSONAL_DETAIL:
      const { id, data } = payload;
      return { [id]: data };
    default:
      return state;
  }
};

export default personalDetailReducer;
