import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Cookies
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useCurrentUser = () => {
  const history = useHistory();
  const [singleUser, setSingleUser] = useState([]);

  useEffect(() => {
    if (cookies.get('token') === undefined) {
      history.push('/');
    } else {
      history.push(`/status/${cookies.get('token').userId}`);
    }

    // Get current user
    const fetchSingleUser = async () => {
      const requestBody = {
        query: `
            query SingleUser($userId: String!) {
                singleUser(userId: $userId) {
                    name
                    number
                    createdAt
                }
            }
        `,
        variables: {
          userId: cookies.get('token').userId,
        },
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
          console.log(resData.data);
          setSingleUser(resData.data.singleUser);
        })
        .catch((err) => {
          history.push('/');
          console.log('err:', err);
        });
    };

    fetchSingleUser();

    // if (userStatus.status === 'served') {
    //   db.collection('queue')
    //     .doc(userStatus.id)
    //     .delete()
    //     .then(() => {
    //       cookies.remove('inQueue');
    //       history.push('/');
    //       console.log('User deleted successfully');
    //     });
    // }

    return () => {
      if (cookies.get('token') === undefined) {
        history.push('/');
      }
    };
  }, [history]);

  return { singleUser };
};

export default useCurrentUser;
