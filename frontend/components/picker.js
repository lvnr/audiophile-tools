import React, { useState } from 'react'
import Select from './select'

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'
import './picker.css'
import { object } from 'prop-types';

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

function Picker({ filteringAndSorting, setFilteringAndSorting, soundPreferences, setSoundPreferences, 
  initialState, categoryOptions, setCategoryOptions, enclosureOptions, setEnclosureOptions, driverTypeOptions, setDriverTypeOptions,
  weight, setWeight}) {
  
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

    const onSetFilterinWeight = (fieldName, fieldValue) => {
      setWeight({ ...weight, [fieldName]: fieldValue})
    }

    const onSetCategoryOptions = (fieldName, fieldValue) => {
      setCategoryOptions({ ...categoryOptions, [fieldName]: fieldValue})
    }

    const onSetEnclosureOptions = (fieldName, fieldValue) => {
      setEnclosureOptions({ ...enclosureOptions, [fieldName]: fieldValue})
    }

    const onSetDriverTypeOptions = (fieldName, fieldValue) => {
      setDriverTypeOptions({ ...driverTypeOptions, [fieldName]: fieldValue})
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

    const sortingCategoriesOptions = [
      { value: 'over-ear', label: 'Over-ear'},
      { value: 'on-ear', label: 'On-ear'},
      { value: 'in-ear', label: 'In-ear'}
    ]

    const sortingEnclusureOptions = [
      { value: 'open', label: 'Open'}, 
      { value: 'semi-open', label: 'Semi-open'}, 
      { value: 'closed', label: 'Closed'}
    ]

    const sortingDriverTypeOptions = [
      { value: 'planar', label: 'Planar'},
      { value: 'dynamic', label: 'Dynamic'}, 
      { value: 'electro-Static', label: 'Electro-Static'}, 
      { value: 'hybrid', label: 'Hybrid'},
      { value: 'balanced brmature', label: 'Balanced Armature'}
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
          <button className={`reset-pick-category-sound ${tab === 'sound' ? 'active' : 'passive'}`} onClick={() => setTab('sound')}>sound</button>
          <button className={`reset-pick-category-features ${tab === 'features' ? 'active' : 'passive'}`} onClick={() => setTab('features')}>features</button>
        </div>

        {tab === 'sound' && pickerArray}

        {tab === 'features' && (
          <div>

            <div className='select-section'>
              <Select
                options={sortingOptions}
                onChange={(selectedOption) => onSetFilteringAndSorting('sortBy', selectedOption)}
                value={filteringAndSorting.sortBy}
                placeholder="Sort by"
              />

              <Select
                options={sortingCategoriesOptions}
                onChange={(selectedOption) => onSetCategoryOptions('sortBy', selectedOption)}
                value={categoryOptions.sortBy}
                isMulti
              />

              <Select
                options={sortingEnclusureOptions}
                onChange={(selectedOption) => onSetEnclosureOptions('sortBy', selectedOption)}
                value={enclosureOptions.sortBy}
                isMulti
              />

              <Select
                options={sortingDriverTypeOptions}
                onChange={(selectedOption) => onSetDriverTypeOptions('sortBy', selectedOption)}
                value={driverTypeOptions.sortBy}
                isMulti
              />
            </div>

            <div className='pick-category'>
              <button  className={`sorting-button ${ filteringAndSorting.sortOrder === 'asc' ? 'active' : 'passive'}`} onClick={() => onSetFilteringAndSorting('sortOrder', 'asc')}>ASC</button>          
              <button  className={`sorting-button ${ filteringAndSorting.sortOrder === 'dsc' ? 'active' : 'passive'}`} onClick={() => onSetFilteringAndSorting('sortOrder', 'dsc')}>DSC</button>          
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

            <div className="filter-section">
              <div className="label"><span>{weight.weightRange[0]}</span> Weight <span>{weight.weightRange[1]}</span></div>
                <Range
                  value={weight.weightRange}
                  onChange={(val) => onSetFilterinWeight('weightRange', val)}
                  min={0}
                  max={1000}
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
