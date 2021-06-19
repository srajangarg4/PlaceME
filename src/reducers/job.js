import { ADD_JOB, ADD_JOBS, ADD_LIMITED_JOBS } from 'actions';

const initialState = {
  jobs: {},
  hasAlreadyFetchedJobs: false,
};

const jobReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_JOB: {
      const { id, data } = payload;
      return {
        ...state,
        jobs: { ...state.jobs, [id]: data },
      };
    }
    case ADD_JOBS: {
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          jobs: { ...state.jobs, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedJobs: true };
    }
    case ADD_LIMITED_JOBS: {
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          jobs: { ...state.jobs, [id]: data },
        };
      });
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
export default jobReducer;
