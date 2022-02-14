import React from 'react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';

const TimeNotificationInput = ({ field, labelName }: FieldAttributes<any>):JSX.Element => (
  <IonItem>
    <IonLabel>{labelName}</IonLabel>
    <IonInput
      type="time"
      debounce={100}
      value={field.value}
      onIonChange={field.onChange}
      {...field} />
  </IonItem>
);

export default TimeNotificationInput;
