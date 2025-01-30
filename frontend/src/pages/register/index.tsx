import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './index.module.css';
import { useSignUp } from '../../graphql/user.graphql'; // Import your custom hook
import { login } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import ButtonLoader from '../../components/buttonLoader';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { Eye, EyeOff } from 'lucide-react'; // For password visibility toggle icons

type FormData = {
  name: string;
  email: string;
  password: string;
};

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(2, 'Password must be at least 2 characters')
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(false);

  // Use the custom sign-up hook
  const [signUp, { loading, error }] = useSignUp();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await signUp(data);

      const userData = response.data.signUp;

      // Dispatch user info and tokens to Redux store
      // dispatch(login({
      //   name: userData.name,
      //   email: userData.email,
      //   profilePic: userData.profilePic,
      //   accessToken: userData.accessToken,
      //   refreshToken: userData.refreshToken,
      // }));

      // Store the data in localStorage
      // window.localStorage.setItem('name', userData.name);
      // window.localStorage.setItem('email', userData.email);
      // window.localStorage.setItem('accessToken', userData.accessToken);
      // window.localStorage.setItem('refreshToken', userData.refreshToken);
      // window.localStorage.setItem('isAuthenticated', 'true');

      toast.success('User Registered successfully');
      reset();
      navigate('/');
    } catch (err) {
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div className={style.signupContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.header}>
          Welcome to <span className={style.brandName}>My App</span>
        </h1>
        <p className={style.subHeader}>Register to get started!</p>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label>Enter Name</label>
            <input type="text" {...register('name')} placeholder="Your Name" />
            {errors.name && <p className={style.error}>{errors.name.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Email</label>
            <input type="email" {...register('email')} placeholder="Your Email" />
            {errors.email && <p className={style.error}>{errors.email.message}</p>}
          </div>

          <div className={style.inputGroup}>
            <label>Enter Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Your Password"
              />
              <button
                type="button"
                className={style.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={style.error}>{errors.password.message}</p>}
          </div>

          {error && (
            <p className={style.error}>{error.message || 'An error occurred!'}</p>
          )}

          <button type="submit" className={style.registerButton} disabled={loading}>
            {loading ? <ButtonLoader /> : <span>Register</span>}
          </button>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={style.loginButton}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
