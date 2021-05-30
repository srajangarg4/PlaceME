import { ADD_JOB, ADD_JOBS } from '../actions';

const jobReducer = (
  state = {
    jobs: {},
    hasAlreadyFetchedJobs: false,
  },
  action,
) => {
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
    default: {
      return state;
    }
  }
};
export default jobReducer;
