import { useState, useEffect } from 'react';

const useStatus = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    // Get the queue status
    const fetchStatus = async () => {
      setLoading(true);
      const requestBody = {
        query: `
            query {
                getStatus {
                    queueLength
                    nextInline {
                      name
                      number
                    }
                    lastServed {
                      name
                      number
                    }
                }
            }
        `,
      };

      fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed');
          }
          return res.json();
        })
        .then((resData) => {
          console.log(resData.data.getStatus);
          setStatus(resData.data.getStatus);
          setLoading(false);
        })
        .catch((err) => {
          console.log('err:', err);
          setLoading(false);
        });
    };

    fetchStatus();

    return () => {
      setLoading(false);
    };
  }, []);

  return { loading, status };
};

export default useStatus;
