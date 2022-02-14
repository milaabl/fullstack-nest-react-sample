import React from 'react';
import { waterOutline, bugOutline, rainyOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './FlowerPotsKeyFeatures.scss';

export default function FlowerPotsKeyFeatures(): JSX.Element {
  return (
    <section className="flower-pots-key-features">
      <div className="flower-feature">
        <IonIcon icon={waterOutline} className="flower-feature__icon" />
        <h3 className="flower-feature__header">Water it</h3>
        <p className="flower-feature__content">
          Blomstergård will remind you
          {' '}
          <br />
          {' '}
          when plant needs your care.
        </p>
      </div>
      <div className="flower-feature">
        <IonIcon icon={rainyOutline} className="flower-feature__icon" />
        <h3 className="flower-feature__header">Water it ENOUGH</h3>
        <p className="flower-feature__content">
          Flowers, like us - humans,
          {' '}
          <br />
          {' '}
          need water to survive.
        </p>
      </div>
      <div className="flower-feature">
        <IonIcon icon={bugOutline} className="flower-feature__icon" />
        <h3 className="flower-feature__header">Fertilizing</h3>
        <p className="flower-feature__content">
          Make sure your plants
          {' '}
          <br />
          {' '}
          are protected and get enough nutrition.
        </p>
      </div>
    </section>
  );
}
