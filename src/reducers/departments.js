const { ADD_DEPARTMENTS, ADD_DEPARTMENT } = require('actions/department');

const initialState = {
  departments: {},
  hasAlreadyFetchedDepartments: false,
};

const DepartmentReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_DEPARTMENTS:
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          departments: { ...state.departments, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedDepartments: true };
    case ADD_DEPARTMENT: {
      const { id, data } = payload;
      return {
        ...state,
        departments: { ...state.departments, [id]: data },
      };
    }
    default:
      return state;
  }
};

export default DepartmentReducer;
