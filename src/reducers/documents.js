import { documents } from 'assets/documents';

const documentsReducer = (state = documents, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};
export default documentsReducer;
