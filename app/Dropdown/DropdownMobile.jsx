import React from 'react';
import classnames from 'classnames';

const DropdownMobile = ({ options, placeholder, selectedID, selectedName, onChange }) => (
  <div className="Dropdown__wrap">
    <div className="Dropdown-select">
      <div className="Dropdown-input">
        <div
          className = {classnames('Dropdown-input__placeholder', {
            'Dropdown-input__placeholder_open': !!selectedID
          })}
        >{placeholder}</div>
        { selectedName }
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

export default DropdownMobile;