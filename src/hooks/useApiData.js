import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { apiCall } from '../actions';

export default (endpoint, requestData, method) => {
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState({
    isLoading: true,
    errors: null,
    data: null,
  });

  const setData = useCallback(
    (dataFromApi) => {
      setApiData({
        ...apiData,
        data: dataFromApi,
        isLoading: false,
      });
    },
    [apiData],
  );

  const setError = useCallback(
    (error) => {
      setApiData({
        ...apiData,
        errors: error,
        isLoading: false,
      });
    },
    [apiData],
  );

  useEffect(() => {
    const call = apiCall(
      endpoint,
      (dataFromApi) => {
        setData(dataFromApi);
      },
      (error) => setError(error),
      method,
      requestData,
    );
    dispatch(call);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data, errors, isLoading } = apiData;
  return {
    data,
    errors,
    isLoading,
    setApiData,
    setError,
  };
};
