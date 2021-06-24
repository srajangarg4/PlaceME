import {
  ADD_JOB_APPLICATION,
  ADD_JOB_APPLICATIONS,
} from 'actions/jobApplication';

const initialState = {
  jobApplications: {},
  hasAlreadyFetchedApplications: false,
};

const jobApplicationReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_JOB_APPLICATION: {
      const { id, data } = payload;
      return {
        ...state,
        jobApplications: { ...state.jobApplications, [id]: data },
      };
    }
    case ADD_JOB_APPLICATIONS:
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          jobApplications: { ...state.jobApplications, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedApplications: true };
    default:
      return state;
  }
};

export default jobApplicationReducer;
