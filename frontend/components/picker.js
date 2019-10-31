import React, { useState } from 'react'
import Select from './select'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'

function Picker () {
    const [soundstage, setSoundstage] = useState(0)
    const [detail, setDetail] = useState(null)

    return (
      <div className="taste-picker">
        <div className="pick-header">
          <h5>PICK YOUR FLAVOR</h5>
        </div>

        <div className="filter-section">
          <span>soundstage</span>
          <h4>{soundstage}</h4>
          <Slider onChange={val => setSoundstage(val)} min={0} max={10} />
        </div>

        <div className="filter-section">
          <span>details and resolution</span>
          <h4>{detail}</h4>
          <Slider onChange={val => setDetail(val)} min={0} max={10} />
        </div>

        <div className="filter-section">
          <span>distortion</span>
        </div>

        <div className="filter-section">
          <span>soundstage</span>
        </div>

        <div className="filter-section">
          <span id="driver">Driver</span>
          <div className="round">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox"></label>
          </div>
          <Select />
        </div>
      </div>
    );

}

export default Picker