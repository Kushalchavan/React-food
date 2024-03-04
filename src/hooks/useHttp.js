import { useCallback, useEffect, useState } from "react";

// Making custom hook for fetching data
const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Something went wrong, failed to send request"
    );
  }

  return responseData;
};

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const responseData = await sendHttpRequest(url, {
          ...config,
          body: data,
        });
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // Return the states
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
};

export default useHttp;
