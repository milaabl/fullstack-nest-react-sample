import React from 'react';
import { IonIcon, IonCol } from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import './PhotoInput.scss';

type PropsType = {
  uploadImage: (file: Blob, shelfId?: string | undefined, flowerId?: string | undefined) => void;
  shelfId?: string ;
  flowerId?: string;
};

const PhotoInput:React.FC<PropsType> = ({ uploadImage, shelfId, flowerId }: PropsType): JSX.Element => {
  const handlePhotoClick = (e: any): any => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (shelfId && flowerId) {
      uploadImage(file, shelfId, flowerId);
    } else {
      uploadImage(file, shelfId);
    }
  };

  return (
    <IonCol className="photo-input">
      <input
        name="photo-input"
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        alt="photo"
        id={flowerId || shelfId}
        onChange={handlePhotoClick}
        hidden />
      <label className="photo-input__label" htmlFor={flowerId || shelfId}>
        ;
        <IonIcon
          className="card-icon card-icon--withBlurredBackground"
          icon={cameraOutline} />
      </label>
    </IonCol>
  );
};

export default PhotoInput;
