import React, { useState } from 'react'
import Select from './select'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'
import { object } from 'prop-types';


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

function Picker({ filteringAndSorting, setFilteringAndSorting, soundPreferences, setSoundPreferences, initialState}) {
  
    const [tab, setTab] = useState('sound')

    const onChange = (fieldName, fieldValue) => {
      setSoundPreferences({ ...soundPreferences, [fieldName]: fieldValue })
    }

    const onClick = () => {
      setSoundPreferences(initialState)
    }

    const onSetFilteringAndSorting = (fieldName, fieldValue) => {
      setFilteringAndSorting({ ...filteringAndSorting, [fieldName]: fieldValue })
    }

    const hasFilters = Object.values(soundPreferences).some((v) => v > 0)
    
    const pickerArray = Object.keys(soundPreferences).map((field, i) => {
      const value = soundPreferences[field]
      const label = labels[field] && labels[field][value] ? labels[field][value] : soundPreferences[field]
      
      return (
        <div className="filter-section" key={i}>

          <div className='container-slider-button'>
            <button className={`reset-button ${ value > 0 ? 'active' : 'passive'}`} onClick={() => onChange(field, 0)}/>
          </div>
            
          <div className="label">{fieldDisambiguation[field] || field} 
            <span> {label} </span>
            
          </div>
          <Slider onChange={(val) => onChange(field, val)} min={0} max={10} value={value} />
        </div>
      )
    })

    const sortingOptions = [
      { value: 'match', label: 'Match' },
      { value: 'price', label: 'Price' },
      { value: 'sq', label: 'SQ'}
    ]

    return (
      <div className="taste-picker">

        
        <div className="pick-header">
          <h5>PICK YOUR FLAVOR</h5>

          <div className='container-slider-button'>
            <button className={`reset-button ${ hasFilters ? 'active' : 'passive'}`} onClick={onClick}/>
         </div>

        </div>

        <div className="pick-category">
          <button onClick={() => setTab('sound')}>sound</button>
          <button onClick={() => setTab('features')}>features</button>
        </div>

        {tab === 'sound' && pickerArray}

        {tab === 'features' && (
          <div>

            <div className='select-section'>
              <Select
                options={sortingOptions}
                onChange={(selectedOption) => onSetFilteringAndSorting('sortBy', selectedOption)}
                value={filteringAndSorting.sortBy}
              />
            </div>

            <div className='pick-category'>
              <button onClick={() => onSetFilteringAndSorting('sortOrder', 'asc')}>ASC</button>          
              <button onClick={() => onSetFilteringAndSorting('sortOrder', 'dsc')}>DSC</button>          
            </div>

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

        {/* <div className="filter-section">';
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
