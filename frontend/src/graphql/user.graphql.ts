// auth.api.ts
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useAppDispatch } from '../store/store';
import { login } from '../store/reducers/authReducer';

// Define your GraphQL mutations
const SIGN_UP = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      email
      profilePic
      accessToken
      refreshToken
    }
  }
`;

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(SIGN_UP, {
    onCompleted: (data) => {
      console.log(data);
      // Dispatch user and tokens to Redux store
      // dispatch(setUser(data.signUp.user));
      // dispatch(setTokens({
      //   accessToken: data.signUp.accessToken,
      //   refreshToken: data.signUp.refreshToken,
      // }));
    },
  });
};

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) { id name email profilePic accessToken refreshToken }
  }
`;

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log(data);
      // Dispatch user and tokens to Redux store
      // dispatch(setUser(data.login.user));
      // dispatch(setTokens({
      //   accessToken: data.login.accessToken,
      //   refreshToken: data.login.refreshToken,
      // }));
    },
  });
};






