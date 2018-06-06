import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMobile = ({ options, placeholder, selectedID, selectedName, onChange }) => (
  <div className="Dropdown__wrap">
    <div className="Dropdown-select">
      <div className="Dropdown-input">
        <div
          className = {classnames('Dropdown-input__placeholder', {
            'Dropdown-input__placeholder_open': !!selectedID
          })}
        >{placeholder}</div>
        <div className="Dropdown-select__value">{ selectedName }</div>
      </div>

      <select
        className="Dropdown-select__select"
        onChange={(e) => {
          const id = e.target.value || null;
          const name = id ? e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text : null;
          onChange(id, name);
        }}
      >
        <option value="">{ placeholder }</option>
        {
          options && options.length && options.map(({ id, name }) =>
            <option key={id} value={id}>{ name }</option>
          )
        }
      </select>
      <div className="Dropdown__arrow" />
    </div>
  </div>

);

DropdownMobile.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  placeholder: PropTypes.string.isRequired,
  selectedID: PropTypes.string,
  selectedName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DropdownMobile.defaultProps = {
  options: null,
  selectedID: null,
  selectedName: null
};

export default DropdownMobile;