import { RouteComponentProps } from 'react-router-dom';

function redirectToHomePage(history: RouteComponentProps['history']): void {
  history.push('/');
}

export default {
  redirectToHomePage,
};
