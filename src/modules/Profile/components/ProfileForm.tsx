import React, { useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { IonButton, IonInput, IonItem, IonLabel, IonText, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';
import BasicToast from '../../../common/Toast/BasicToast';
import { schema, ProfileValuesType } from '../helpers/profileHelper';
import TimeNotificationInput from './TimeNotificationInput';
import ProfileAvatar from './ProfileAvatar';

import './ProfileForm.scss';
import '../../../theme/_base.scss';

type UserProfileType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatarPath: string;
  timeZone: string;
  notificationTime: string;
};

type ProfileFormPropsType = {
  initUserProfile: () => void;
  updateProfile: (values: ProfileValuesType) => void;
  user: UserProfileType | null;
  isSuccess: boolean;
  onProfileUpdateErrors: Array<string> | null;
  errorOnAvatarUpdate: string;
  saveProfileUpdateSuccess: (isSuccess: boolean) => void;
};

const Input = ({ field, type, labelName, disabled }: FieldAttributes<any>) => (
  <IonItem className="item-input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput type={type} onIonChange={field.onChange} {...field} disabled={disabled} />
  </IonItem>
);
const timeZoneOptions = [
  ['(GMT-11:00) Pago Pago', 'Pacific/Pago_Pago'],
  ['(GMT-10:00) Hawaii Time', 'Pacific/Honolulu'],
  ['(GMT-08:00) Pacific Time', 'America/Los_Angeles'],
  ['(GMT-07:00) Mountain Time, Arizona, Chihuahua, Mazatlan', 'America/Denver'],
  ['(GMT-06:00) Central Time, Mexico City, Regina, Guatemala', 'America/Chicago'],
  ['(GMT-05:00) Eastern Time, Bogota, Lima', 'America/New_York'],
  ['(GMT-04:30) Caracas', 'America/Caracas'],
  ['(GMT-04:00) Atlantic Time - Halifax, Guyana, La Paz, Santiago', 'America/Halifax'],
  ['(GMT-03:00) Buenos Aires, Godthab, Montevideo', 'America/Argentina/Buenos_Aires'],
  ['(GMT-03:30) Newfoundland Time - St. Johns', 'America/St_Johns'],
  ['(GMT-02:00) Sao Paulo, South Georgia', 'America/Sao_Paulo'],
  ['(GMT-01:00) Azores, Cape Verde', 'Atlantic/Azores'],
  ['(GMT+00:00) London, Dublin, Lisbon, Monrovia, Casablanca', 'Europe/London'],
  ['(GMT+01:00) Amsterdam, Berlin, Brussels, Budapest, Belgrade, Prague, Copenhagen', 'Europe/Brussels'],
  ['(GMT+01:00) Madrid, Paris, Rome, Stockholm, Vienna, Warsaw, Algiers,', 'Europe/Stockholm'],
  ['(GMT+02:00) Athens, Bucharest, Cairo, Jerusalem, Johannesburg, Helsinki', 'Europe/Helsinki'],
  ['(GMT+02:00) Kyiv, Kaliningrad, Riga, Sofia, Tallinn, Vilnius', 'Europe/Kiev'],
  ['(GMT+03:00) Istanbul, Baghdad, Nairobi, Minsk, Riyadh, Moscow', 'Europe/Moscow'],
  ['(GMT+03:30) Tehran', 'Asia/Tehran'],
  ['(GMT+04:00) Baku, Samara, Tbilisi, Yerevan', 'Asia/Tbilisi'],
  ['(GMT+04:30) Kabul', 'Asia/Kabul'],
  ['(GMT+05:00) Karachi, Yekaterinburg, Tashkent', 'Asia/Yekaterinburg'],
  ['(GMT+05:30) Colombo', 'Asia/Colombo'],
  ['(GMT+06:00) Almaty, Dhaka', 'Asia/Almaty'],
  ['(GMT+06:30) Rangoon', 'Asia/Rangoon'],
  ['(GMT+07:00) Bangkok, Jakarta, Krasnoyarsk', 'Asia/Bangkok'],
  ['(GMT+08:00) Beijing, Hong Kong, Kuala Lumpur, Irkutsk, Singapore, Taipei, Ulaanbaatar, Perth', 'Asia/Shanghai'],
  ['(GMT+09:00) Seoul, Tokyo, Yakutsk', 'Asia/Seoul'],
  ['(GMT+09:30) Central Time - Darwin', 'Australia/Darwin'],
  ['(GMT+10:00) Brisbane, Guam, Magadan, Yuzhno-Sakhalinsk, Port Moresby', 'Australia/Brisbane'],
  ['(GMT+10:30) Central Time - Adelaide', 'Australia/Adelaide'],
  ['(GMT+11:00) Eastern Time - Hobart, Melbourne, Sydney, Guadalcanal, Noumea', 'Australia/Sydney'],
  ['(GMT+12:00) Majuro, Petropavlovsk-Kamchatskiy', 'Asia/Kamchatka'],
  ['(GMT+13:00) Auckland, Fakaofo, Fiji, Tongatapu', 'Pacific/Fiji'],
  ['(GMT+14:00) Apia', 'Pacific/Apia'],
].map((timeZone: Array<string>) => <IonSelectOption key={timeZone[1]} value={timeZone[1]}>{timeZone[0]}</IonSelectOption>);

const InputSelect = ({ field, value, labelName, disabled }: FieldAttributes<any>) => (
  <IonItem className="item-input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonSelect interface="action-sheet" value={value} {...field} onIonChange={field.onChange} disabled={disabled}>
      {timeZoneOptions}
    </IonSelect>
  </IonItem>
);

export const ProfileForm: React.FC<any> = ({
  initUserProfile,
  updateProfile,
  user,
  isSuccess,
  onProfileUpdateErrors,
  errorOnAvatarUpdate,
  saveProfileUpdateSuccess,
}: ProfileFormPropsType): JSX.Element|null => {
  const handleUpdate = useCallback(async (values: ProfileValuesType, { setSubmitting }: any) => {
    await updateProfile(values);
    setSubmitting(false);
  }, [updateProfile]);

  const handleDidDismiss = useCallback(() => saveProfileUpdateSuccess(false), [saveProfileUpdateSuccess]);

  useEffect(() => {
    initUserProfile();
  }, [initUserProfile]);

  if (!user) return null;

  return (
    <Formik
      initialValues={user}
      validationSchema={schema}
      onSubmit={handleUpdate}
      className="profile-form">
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <>
          <BasicToast
            isOpen={!isSubmitting && isSuccess}
            handleOnDidDismiss={handleDidDismiss}
            message="Successfully updated!"
            type="success" />
          <BasicToast
            isOpen={!!errorOnAvatarUpdate}
            handleOnDidDismiss={handleDidDismiss}
            message={errorOnAvatarUpdate}
            type="danger" />
          <Form noValidate>
            <IonGrid>
              <IonRow>
                <ProfileAvatar />
              </IonRow>
              <IonRow>
                <IonCol>
                  <Field name="name" component={Input} type="text" labelName="Name" />
                  {errors.name && touched.name && (
                    <IonText className="ion-margin-start ion-margin-bottom error">
                      {errors.name}
                    </IonText>
                  )}
                </IonCol>
                <IonCol>
                  <Field name="lastName" component={Input} type="text" labelName="Last Name" />
                  {errors.lastName && touched.lastName && (
                    <IonText className="ion-margin-start ion-margin-bottom error">
                      {errors.lastName}
                    </IonText>
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <Field name="email" component={Input} type="email" labelName="Email" disabled />
                </IonCol>
                <IonCol size="6">
                  <Field name="timeZone" component={InputSelect} labelName="Time Zone" value={user.timeZone} />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <Field name="notificationTime" component={TimeNotificationInput} labelName="Notification Time" />
                </IonCol>
              </IonRow>

              {errors.email && touched.email && (
                <IonRow>
                  <IonCol>
                    <IonText className="ion-margin-horizontal error">
                      {errors.email}
                    </IonText>
                  </IonCol>
                </IonRow>
              )}
              {onProfileUpdateErrors && !isSubmitting && (
                <ul>
                  {onProfileUpdateErrors && onProfileUpdateErrors.map((error: string) => (
                    <li key={error} className="ion-margin-horizontal error">
                      {error}
                    </li>
                  ))}
                </ul>
              )}
              <IonRow>
                <IonCol class="ion-text-center">
                  <IonButton type="submit" className="button" fill="outline" onClick={() => handleSubmit} disabled={isSubmitting}>
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Form>
        </>
      )}
    </Formik>
  );
};
