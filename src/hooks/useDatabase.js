import { useState, useCallback } from 'react';

const useDatabase = (databaseFetchCall, loading = false) => {
  const [state, setState] = useState({
    loading,
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

  const setLoading = useCallback(
    (isLoading) => {
      setState({ ...state, loading: isLoading });
    },
    [state],
  );

  const callDatabase = useCallback(
    async (resolve, reject, data) => {
      setLoading(true);
      const result = await databaseFetchCall(data);
      setLoading(false);
      if (result?.successful) {
        setData(result?.result);
        resolve?.(result?.result);
      } else {
        setError(result?.error);
        reject?.(result?.error);
      }
    },
    [databaseFetchCall, setData, setError, setLoading],
  );

  return {
    ...state,
    setData,
    setError,
    callDatabase,
    setLoading,
  };
};
export default useDatabase;
