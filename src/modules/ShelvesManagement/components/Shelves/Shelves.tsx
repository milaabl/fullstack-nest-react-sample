import React from 'react';
import { IonRow, IonCol } from '@ionic/react';
import './Shelves.scss';

const Shelves: React.FC = (): JSX.Element => (
  <IonRow>
    <IonCol size="12">
      <h1 className="ion-text-center">My Shelves</h1>
    </IonCol>
  </IonRow>
);

export default Shelves;
