import { useState, useCallback} from 'react';
const axios = require('axios');
export const useHttpClient = () => {
  /* This custom hook will help us to handle http requests in generic and comfortable way. */

  const [isLoading, setIsLoading] = useState(false);  // We will use this state to determine if the loading spinner or message need to appear.
  const [error, setError] = useState(); // This state will get the error message and will passed her to the calling component


  const sendRequest = useCallback(
    /* This callback will manage the request protocol, it will get the parameters that are needed for 
     * the axios request and will update the 'error' and 'isLoading' states accordingly.
     * and in case of success will return the response. */
    async (url, method = 'GET', body = null, headers = {}, defaultErrorMsg="") => {
      setIsLoading(true);

      try {
        const response = await axios({method:method, url:url, headers:headers, data:body});
        setIsLoading(false);
        return response;
      } catch (err) {
        if(err.response) {
          setError(err.response.data.message); 
        }
        else {
          setError(defaultErrorMsg);
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };


  return { isLoading, error, sendRequest, clearError };
};