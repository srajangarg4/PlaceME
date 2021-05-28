import { useState, useCallback } from 'react';

const useDatabase = (databaseFetchCall) => {
  const [state, setState] = useState({
    loading: false,
    errors: null,
    data: null,
  });

  const setData = useCallback(
    (dataFromApi) => {
      setState({
        ...state,
        data: dataFromApi,
        loading: false,
      });
    },
    [state],
  );

  const setError = useCallback(
    (error) => {
      setState({
        ...state,
        errors: error,
        loading: false,
      });
    },
    [state],
  );

  const callDatabase = async (resolve, reject, data) => {
    setState({ ...state, loading: true });
    const result = await databaseFetchCall(data);
    setState({ ...state, loading: false });
    if (result?.successful) {
      setData(result.result);
      resolve?.(result.result);
    } else {
      setError(result.error);
      reject?.(result.error);
    }
  };

  return {
    ...state,
    setData,
    setError,
    callDatabase,
  };
};
export default useDatabase;
