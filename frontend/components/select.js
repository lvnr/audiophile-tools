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
    padding: '5px',
    backgroundColor: '#fff',
    borderRadius: '0',
    borderLeft: '0',
    borderRight: '0',
    borderBottom: '0',
    borderColor: 'rgba(235, 235, 235, 0.906)',
    boxShadow: 'none'
  }),
  continer: (provided, state) => ({
    ...provided,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  }
}

const allOption = { value: 'all', label: 'All' }


const MySelect = (props) => {
  if (props.allowSelectAll) {
    if (props.value.length === props.options.length) {
      return (
        <Select
          {...props}
          styles={customStyles}
          value={[allOption]}
          onChange={selected => props.onChange(selected.slice(1))}
        />
      )
    }

    return (
      <Select
        {...props}
        styles={customStyles}
        options={[allOption, ...props.options]}
        onChange={(selected, { action }) => {
          if (action === 'clear')
            return props.onChange([allOption])

          if (selected && selected.length > 0 && selected[selected.length - 1].value === allOption.value)
            return props.onChange(props.options)

          return props.onChange(selected ? selected.filter((option) => option.value !== allOption.value) : [allOption])
        }}
      />
    )
  }

  return <Select {...props} styles={customStyles} />
}

export default MySelect
