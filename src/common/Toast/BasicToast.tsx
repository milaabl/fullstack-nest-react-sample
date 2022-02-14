import React from 'react';
import { IonToast } from '@ionic/react';
import '../../theme/_base.scss';

const TOAST_DURATION = 5000;

type PropsType = {
  isOpen: boolean;
  handleOnDidDismiss?: () => void;
  message: string;
  type: string;
  duration?: number | undefined;
};

export default function BasicToast({
  isOpen,
  handleOnDidDismiss,
  message,
  type,
  duration,
}: PropsType): JSX.Element {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={handleOnDidDismiss}
      position="top"
      duration={duration || TOAST_DURATION}
      message={message}
      color={type}
      cssClass="toast"
      buttons={[{ icon: 'close', role: 'cancel' }]}
      animated />
  );
}
