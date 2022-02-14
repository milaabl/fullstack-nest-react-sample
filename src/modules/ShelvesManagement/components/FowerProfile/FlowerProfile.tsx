import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonTitle,
} from '@ionic/react';
import { FlowerData } from '../../../../../api/src/flowers/interfaces';
import { AppStateType } from '../../../../reducers/rootReducer';
import { getFlowerData } from '../../selectors/flowerPageSelectors';
import { getFlowerData as getFlowerDataThunk } from '../../thunks/flowerThunk';
import { secondsToPeriodString } from '../../../../utils/timeUtils';
import { getImage } from '../../helpers/uploadImageHelper';
import Cactus from '../../../../assets/Cactus.jpg';
import './FlowerProfile.scss';

type PropsType = {
  fetchFlowerData: (id: string) => any;
  flowerData: FlowerData | null;
};

const FlowerProfile = ({
  fetchFlowerData,
  flowerData,
}: PropsType): JSX.Element => {
  const { id } = useParams();
  useEffect(() => {
    fetchFlowerData(id);
  }, [id, fetchFlowerData]);

  const nextWateringIn = (new Date(flowerData?.flower.nextWateringAt as Date).getTime() - new Date().getTime()) / 1000;
  const isNextWateringOverdue = nextWateringIn < 0;
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonGrid>
              <IonRow>
                <IonCol size="9">
                  <IonTitle class="flower-profile__name">{flowerData?.flower.name}</IonTitle>
                </IonCol>
                <IonCol size="3">
                  <IonTitle class="flower-profile__date">
                    {
                      flowerData ?
                        new Intl.DateTimeFormat([], {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }).format(new Date(flowerData.flower.createdAt)) :
                        ''
                    }
                  </IonTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <p className="flower-profile__description">{flowerData?.flower.description}</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <div className={cn('flower-profile__next-watering', {
                    'flower-profile__next-watering-overdue': isNextWateringOverdue,
                    'flower-profile__next-watering-upcoming': !isNextWateringOverdue,
                  })}>
                    <p>Next watering</p>
                    <div>
                      {
                        Number.isNaN(nextWateringIn) ? '' : secondsToPeriodString(nextWateringIn)
                      }
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
          <IonCol>
            <img src={getImage(flowerData?.flower.picturePath, Cactus)} alt="flower" />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  flowerData: getFlowerData(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchFlowerData: (id: string) => dispatch(getFlowerDataThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowerProfile);
