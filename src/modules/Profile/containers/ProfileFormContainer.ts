import { connect } from 'react-redux';
import { initUserProfile } from '../../Auth/actionCreators/loginActions';
import { ProfileForm } from '../components/ProfileForm';
import { getErrorsOnProfileUpdate, getIsSuccess, getErrorOnAvatarUpdate } from '../selectors/profileSelectros';
import { getUser } from '../../Auth/selectors/loginSelectors';
import { saveProfileUpdateSuccess } from '../actionCreators/profileActions';
import { AppStateType } from '../../../reducers/rootReducer';
import { updateProfile } from '../actionCreators/profileThunks';

const mapStateToProps = (state: AppStateType) => ({
  isSuccess: getIsSuccess(state),
  onProfileUpdateErrors: getErrorsOnProfileUpdate(state),
  user: getUser(state),
  errorOnAvatarUpdate: getErrorOnAvatarUpdate(state),
});

const mapDispatchToProps = {
  updateProfile,
  initUserProfile,
  saveProfileUpdateSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
