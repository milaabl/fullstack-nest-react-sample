import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { water, rainy, bug } from 'ionicons/icons';
import ButtonWithIcon from '../../../../common/ButtonWithIcon/ButtonWithIcon';
import { AppStateType } from '../../../../reducers/rootReducer';
import { waterFlowerHandler } from '../../thunks/flowerThunk';
import { getCurrentShelf } from '../../selectors/shelvesSelectors';
import { FlowerCardData } from '../../interfaces';

const WATER_ACTION = 'Water';
const HYDRATE_ACTION = 'Hydrate';
const FERTILIZE_ACTION = 'Fertilize';

export const LIST_OF_FLOWER_ACTIONS = [
  { name: WATER_ACTION, icon: water },
  { name: HYDRATE_ACTION, icon: rainy },
  { name: FERTILIZE_ACTION, icon: bug },
];

type PropsType = {
  isMissedWatering: boolean;
  flowerId: string;
  shelfId: string;
  waterFlowerHandler: (shelfId: string, flowerId: string, flower: FlowerCardData) => void;
  flower: FlowerCardData;
};

class FlowerCardButtonsList extends React.Component<PropsType> {
  render() {
    const { isMissedWatering, flowerId, shelfId, waterFlowerHandler, flower } = this.props;

    function handleOnClick(action: string): void {
      if (action === WATER_ACTION) {
        waterFlowerHandler(shelfId, flowerId, flower);
      }
      return;
    }

    return (
      <>
        {LIST_OF_FLOWER_ACTIONS.map((buttonName, index) => (
          <ButtonWithIcon
            key={index.toString()}
            text={buttonName.name}
            iconName={buttonName.icon}
            className={classNames('flower-action-buttons__button button--successBackground', {
              'flower-action-buttons__button--disabled': buttonName.name === HYDRATE_ACTION || buttonName.name === FERTILIZE_ACTION,
              'button--dangerBackground': buttonName.name === WATER_ACTION && isMissedWatering,
            })}
            contentColor="white"
            onClick={() => handleOnClick(buttonName.name)} />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  shelfId: getCurrentShelf(state),
});

const mapDispatchToProps = {
  waterFlowerHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowerCardButtonsList);
