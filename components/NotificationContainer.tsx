import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import NotificationToast from './NotificationToast';

const NotificationContainer: React.FC = () => {
  const { toastNotifications, removeToastNotification } = useContext(NotificationContext);

  return (
    <div className="fixed top-20 right-0 z-50 p-4 space-y-2 w-full max-w-md">
      {toastNotifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onDismiss={removeToastNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;