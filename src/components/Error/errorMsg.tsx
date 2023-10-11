import React, { useState, useEffect, useContext } from 'react';
import styles from './errorMsg.module.css';
import { ErrorMessageProps } from '../../types';
import { Context } from '../../context/Context';

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const [visible, setVisible] = useState(true);
  const { setErrorMsg } = useContext(Context);


  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setErrorMsg('');
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles['error-message']} ${visible ? styles.visible : ''}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
