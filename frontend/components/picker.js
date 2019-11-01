import React, { useState } from 'react'
import Select from './select'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'

const labels = {
  soundstage: {
    0:  'Non-existent',
    4:  'Small',
    5:  'Medium',
    6:  'Moderate',
    7:  'Big',
    8:  'Large',
    9:  'Huge',
    10: 'Unreal',
  }
}

function Picker() {
  
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
    
    const pickerArray = Object.keys(picker).map((field, i) => {
      const value = picker[field]
      const label = labels[field] && labels[field][value] ? labels[field][value] : picker[field]
      return (
        <div className="filter-section" key={i}>
          <div className="label">{field} <span>{label}</span></div>
          <Slider onChange={(val) => onChange(field, val)} min={0} max={10} />
        </div>
      )
    })

    return (
      <div className="taste-picker">
        <div className="pick-header">
          <h5>PICK YOUR FLAVOR</h5>
        </div>

        {pickerArray}

        {/* <div className="filter-section">
          <span id="driver">Driver</span>
          <div className="round">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox"></label>
          </div>
          <Select />
        </div> */}
      </div>
    );

}

export default Picker