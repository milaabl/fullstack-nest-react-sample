import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IonHeader, IonIcon, IonTitle, IonToolbar, IonButtons, IonLabel } from '@ionic/react';

import { leafOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import headerAvatar from '../../../assets/avatar.svg';

import { getUserAvatarPath, getUserNameAndSurname } from '../../Auth/selectors/loginSelectors';
import { getIsMobile } from '../../../appSelectors/appSelectors';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';
import { userLogout } from '../../Auth/actionCreators/logoutActions';

import './Header.scss';

type PropsType = {
  userNameAndSurname: string | null;
  avatar: string | null;
  isMobile: boolean;
  userLogout: () => void;
};

const Header:React.FC<PropsType> = ({ userNameAndSurname, avatar, isMobile, userLogout }: PropsType): JSX.Element => (
  <IonHeader className="ion-padding-start ion-padding-end">
    <IonToolbar className="main-header">
      <Link to="/" className="main-header-logo-container ion-text-center">
        <IonTitle className="main-header-logo">
          <IonIcon icon={leafOutline} className="main-header-logo__icon" />
          <span className="main-header-logo__name">Blomstergård</span>
        </IonTitle>
      </Link>
      {userNameAndSurname
        ? (
          <>
            <Link to="/profile" slot="end" className="main-header-avatar">
              <IonLabel className="main-header-avatar__name ion-margin-end">{userNameAndSurname || ''}</IonLabel>
              <img src={avatar || headerAvatar} alt="avatar" className="main-header-avatar__photo" />
            </Link>
            <IonButtons className="main-header__buttons" slot="end">
              <ButtonWithIcon text="Log Out" iconName={logInOutline} onClick={userLogout} />
            </IonButtons>
          </>
        )
        : (
          <IonButtons className="main-header__buttons" slot="end">
            <ButtonWithIcon link="/login" text="Sign In" iconName={logInOutline} />
            { !isMobile && <ButtonWithIcon link="/registration" text="Sign Up" iconName={personAddOutline} /> }
          </IonButtons>
        )}
    </IonToolbar>
  </IonHeader>
);

const mapStateToProps = (state: any) => ({
  userNameAndSurname: getUserNameAndSurname(state),
  avatar: getUserAvatarPath(state),
  isMobile: getIsMobile(state),
});

const mapDispatchToProps = {
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
