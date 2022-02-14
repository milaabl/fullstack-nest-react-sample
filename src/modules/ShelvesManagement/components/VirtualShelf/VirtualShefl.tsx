import { IonCol, IonRow } from '@ionic/react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShelfCardData } from '../../interfaces';
import { getVirtualShelf } from '../../selectors/shelvesSelectors';
import { virtualShelfThunk } from '../../thunks/shelvesThunk';
import ShelfCard from '../ShelfCard/ShelfCard';
import './VirtualShelf.scss';

type PropsType = {
  fetchVirtualShelf: () => void;
  virtualShelf: ShelfCardData | null;
};

const VirtualShelf = ({ fetchVirtualShelf, virtualShelf }: PropsType): JSX.Element | null => {
  useEffect(() => {
    fetchVirtualShelf();
  }, [fetchVirtualShelf]);
  return virtualShelf?.flowers?.length ? (
    <IonRow
      class="ion-justify-content-start">
      <IonCol
        size="12"
        size-sm="6"
        size-md="6"
        size-lg="4"
        size-xs="12"
        class="virtual-shelf__card">
        <Link
          to="shelf/virtual">
          <ShelfCard shelf={virtualShelf} />
        </Link>
      </IonCol>
    </IonRow>
  ) : null;
};

const mapStateToProps = (state: any) => ({
  virtualShelf: getVirtualShelf(state),
});

const mapDispatchToProps = {
  fetchVirtualShelf: () => virtualShelfThunk(),
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualShelf);
