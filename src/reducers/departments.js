const { ADD_DEPARTMENTS } = require('actions/department');

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
    default:
      return state;
  }
};

export default DepartmentReducer;
