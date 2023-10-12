import React, { useState, useEffect, useContext } from 'react';
import { ErrorMessageProps } from '../../types';
import { Context } from '../../context/Context';

const Notification = ({ message }: ErrorMessageProps) => {
  const [visible, setVisible] = useState(true);
  const { showNotification } = useContext(Context);

  useEffect(() => {
    if (!message) {
      setVisible(false);
    }
  }, [message]);

  const closeNotification = () => {
    setVisible(false);
    showNotification('');
  };

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md border-black border-2 ${visible ? 'block' : 'hidden'}`}>
      <p className="text-xl">{message}</p>
      <div className="text-center mt-4">
        <button onClick={closeNotification} className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600">OK</button>
      </div>
    </div>
  );
};

export default Notification;
