import React from 'react';
import Slider from 'react-slick';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/4.jpg';
import img5 from '../../assets/5.jpg';
import img6 from '../../assets/6.jpg';
import { SLIDER_SETTINGS } from './FlowerPotsSliderHelper';

import './FlowerPotSlider.scss';

export default function FlowerPotSlider():JSX.Element {
  return (
    <Slider {...SLIDER_SETTINGS} className="flowerPotSlider">
      <div><div style={{ backgroundImage: `url(${img5})` }} className="flowerPotSlider__image" /></div>
      <div><div style={{ backgroundImage: `url(${img1})` }} className="flowerPotSlider__image" /></div>
      <div><div style={{ backgroundImage: `url(${img4})` }} className="flowerPotSlider__image" /></div>
      <div><div style={{ backgroundImage: `url(${img2})` }} className="flowerPotSlider__image" /></div>
      <div><div style={{ backgroundImage: `url(${img6})` }} className="flowerPotSlider__image" /></div>
      <div><div style={{ backgroundImage: `url(${img3})` }} className="flowerPotSlider__image" /></div>
    </Slider>
  );
}
