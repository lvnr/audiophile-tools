import React, { useState } from 'react'
import Select from './select'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'

function Picker () {
  
    const [picker, setPicker] = useState({
      soundstage: null,
      aesthetics: null,
      balance: null,    
      imaging: null, 
      bassPower: null,  
      bassClarity: null, 
      bassSpeed: null,  
      bassExtension: null,
      midrange: null,  
      treble: null,     
      distortion: null, 
      dynamics: null,   
      detail: null,     
      texture: null,    
      naturalness: null,
      smoothess: null, 
      forwardness: null,
      speed: null,      
      warmth: null,    
      brightness: null, 
      sibilance: null  
    })
    
    const onChange = (fieldName, fieldValue) => {
      setPicker ({ ...picker, [fieldName]: fieldValue })
    }
    
    const pickerArray = Object.keys(picker).map((field, i) => (
      <div key={i}>
        {field}
        <div className="filter-section">
          <h4>{picker[field]}</h4>
          <Slider onChange={(val) => onChange([field], val)} min={0} max={10} />
        </div>
      </div>
    ))

    return (
      <div className="taste-picker">
        <div className="pick-header">
          <h5>PICK YOUR FLAVOR</h5>
        </div>

        <div className="filter-section">
         {pickerArray}
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