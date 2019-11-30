import React, { useState } from 'react'
import Select from './select'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'


// sargel 2 hat knopka ASC, DSC
// amen knopkan sxmeluc update anel 'sortOrder' statei dashty

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

const fieldDisambiguation = {
  bassPower: 'bass (power)',  
  bassClarity: 'bass (clarity)', 
  bassSpeed: 'bass (speed)',  
  bassExtension: 'bass (extension)',
}

function Picker({ filteringAndSorting, setFilteringAndSorting }) {
  
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
      sibilance: null,
    })

    const [tab, setTab] = useState('sound')

    const onChange = (fieldName, fieldValue) => {
      setPicker({ ...picker, [fieldName]: fieldValue })
    }

    const onSetFilteringAndSorting = (fieldName, fieldValue) => {
      setFilteringAndSorting({ ...filteringAndSorting, [fieldName]: fieldValue })
    }
    
    const pickerArray = Object.keys(picker).map((field, i) => {
      const value = picker[field]
      const label = labels[field] && labels[field][value] ? labels[field][value] : picker[field]
      return (
        <div className="filter-section" key={i}>
          <div className="label">{fieldDisambiguation[field] || field} <span>{label}</span></div>
          <Slider onChange={(val) => onChange(field, val)} min={0} max={10} />
        </div>
      )
    })

    const sortingOptions = [
      { value: 'price', label: 'Price' },
    ]

    return (
      <div className="taste-picker">
        
        <div className="pick-header">
          <h5>PICK YOUR FLAVOR</h5>
        </div>

        <div className="pick-category">
          <button onClick={() => setTab('sound')}>sound</button>
          <button onClick={() => setTab('features')}>features</button>
        </div>

        {tab === 'sound' && pickerArray}

        {tab === 'features' && (
          <div>

            <Select
              options={sortingOptions}
              onChange={(selectedOption) => onSetFilteringAndSorting('sortBy', selectedOption)}
              value={filteringAndSorting.sortBy}
            />

            <button onClick={() => onSetFilteringAndSorting('sortOrder', true)}>ASC</button>          
            <button onClick={() => onSetFilteringAndSorting('sortOrder', false)}>DSC</button>          


            <div className="filter-section">
              <div className="label"><span>{filteringAndSorting.priceRange[0]}</span> Price Range <span>{filteringAndSorting.priceRange[1]}</span></div>
              <Range
                value={filteringAndSorting.priceRange}
                onChange={(val) => onSetFilteringAndSorting('priceRange', val)}
                min={0}
                max={5000}
                allowCross={false}
              />
            </div>
          </div>
        )}

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