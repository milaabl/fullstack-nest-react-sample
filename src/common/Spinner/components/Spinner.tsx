import React from 'react';
import { connect } from 'react-redux';
import { IonSpinner } from '@ionic/react';
import { AppStateType } from '../../../reducers/rootReducer';
import { getIsLoading } from '../selectors/spinnerSelectors';

import './spinner.scss';

type PropsType = {
  isLoading: boolean;
};

const SPINNER_DURATION = 5000;

function Spinner({ isLoading }: PropsType): JSX.Element {
  return (
    <>
      {isLoading && (
        <div className="baseSpinner">
          <IonSpinner name="lines" className="baseSpinner__spinner" duration={SPINNER_DURATION} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(Spinner);
