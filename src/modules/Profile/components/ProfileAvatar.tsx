import React from 'react';
import { connect } from 'react-redux';
import { IonCol } from '@ionic/react';
import { getUserAvatarPath } from '../../Auth/selectors/loginSelectors';
import defaultAvatar from '../../../assets/avatar.svg';
import { uploadAvatar } from '../actionCreators/profileThunks';

import './ProfileAvatar.scss';
import '../../../theme/_base.scss';

type PropsType = {
  uploadAvatar: (file: Blob) => void;
  avatar: string | null;
};

const ProfileAvatar = ({ uploadAvatar, avatar }: PropsType): JSX.Element => {
  function handleAvatarClick(e: any): any {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    uploadAvatar(file);
  }
  return (
    <IonCol className="profile-form-avatar-container">
      <section className="profile-form-avatar" role="presentation">
        <img src={avatar || defaultAvatar} alt="avatar" className="profile-form-avatar__image" />
      </section>
      <input
        name="avatarPath"
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        alt="profile-avatar"
        className="profile-form-avatar__input"
        onChange={handleAvatarClick} />
    </IonCol>
  );
};

const mapStateToProps = (state: any) => ({
  avatar: getUserAvatarPath(state),
});

const mapDispatchToProps = {
  uploadAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
