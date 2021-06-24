import {
  ADD_COMPANIES,
  ADD_COMPANY,
  ADD_LIMITED_COMPANIES,
} from 'actions/companies';

const initialState = {
  companies: {},
  hasAlreadyFetchedCompanies: false,
};

const comapnyReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_COMPANY: {
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
