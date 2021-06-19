import {
  ADD_COMPANIES,
  ADD_COMPANY,
  ADD_LIMITED_COMPANIES,
} from 'actions/companies';

const comapnyReducer = (
  state = {
    companies: {},
    hasAlreadyFetchedCompanies: false,
  },
  action,
) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_COMPANY: {
      console.log('object');
      const { id, data } = payload;
      return {
        ...state,
        companies: { ...state.companies, [id]: data },
      };
    }
    case ADD_COMPANIES:
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          companies: { ...state.companies, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedCompanies: true };
    case ADD_LIMITED_COMPANIES: {
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          companies: { ...state.companies, [id]: data },
        };
      });
      return { ...state };
    }
    default:
      return state;
  }
};

export default comapnyReducer;
