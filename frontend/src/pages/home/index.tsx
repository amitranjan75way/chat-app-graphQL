import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';
import chat from '../../assets/chat.png';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      {/* Animated Welcome Text */}
      <motion.h1
        className={style.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to Sout-Chat
      </motion.h1>

      {/* Animated Image */}
      <motion.img
        src={chat}
        alt="Chat Image"
        className={style.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Buttons with Animation */}
      <motion.div
        className={style.buttons}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {isAuthenticated
          ?
          <button className={style.chatButton}>
            Start Chat
          </button>
          :
          <button className={style.getStartedButton} onClick={()=>navigate('/register')}>
            Get Started
          </button>
        }
      </motion.div>
    </div>
  );
}

export default Home;
