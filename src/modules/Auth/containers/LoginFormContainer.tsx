import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppStateType } from '../../../reducers/rootReducer';
import { LoginForm } from '../components/LoginForm';
import { getErrorOnLogin } from '../selectors/loginSelectors';
import { login } from '../actionCreators/loginActions';

const mapStateToProps = (state: AppStateType) => ({
  errorOnLogin: getErrorOnLogin(state),
});

const mapDispatchToProps = {
  login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
