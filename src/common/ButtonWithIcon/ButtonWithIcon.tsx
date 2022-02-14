import React from 'react';
import classNames from 'classnames';
import { IonButton, IonIcon } from '@ionic/react';

import './ButtonWithIcon.scss';

type PropsType = {
  link?: string;
  text: string;
  iconName: string;
  className?: string;
  onClick?: () => void;
  contentColor?: string;
  color?: string;
};

const ButtonWithIcon:React.FC<PropsType> = ({
  link,
  text,
  iconName,
  className,
  onClick,
  contentColor,
  color,
}: PropsType): JSX.Element => (
  <IonButton
    routerLink={link}
    className={classNames('button', className)}
    onClick={onClick}
    color={color}>

    <span className={classNames('button__text', {
      'button__text--withWhiteText': contentColor,
    })}>
      {text}
    </span>

    <IonIcon
      icon={iconName}
      className={classNames('button__icon', {
        'button__icon--white': contentColor,
      })} />
  </IonButton>
);

export default ButtonWithIcon;
