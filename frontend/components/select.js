import React from 'react'
import Select from 'react-select'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px",
    padding: "5px",
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? 'grey' : 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    // borderBottom: "1px",
    padding: "5px",
    backgroundColor: "",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  }
}

class MySelect extends React.Component{
  render(){
    return(
      <Select
        options={this.props.options}
        styles={customStyles}
        onChange={this.props.onChange}
        value={this.props.value}
        isMulti={this.props.isMulti}
        placeholder={this.props.placeholder}
      />
    )
  }
}

export default MySelect
