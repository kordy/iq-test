import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMobile = ({ options, placeholder, selectedId, selectedName, onChange, isPending }) => (
  <div className="Dropdown__wrap">
      <div className={classnames('Dropdown-input', { 'Dropdown-input_loading': isPending })}>
        <div
          className = {classnames('Dropdown-input__placeholder', {
            'Dropdown-input__placeholder_open': !!selectedId
          })}
        >{placeholder}</div>
        <div className="Dropdown__select-value">{ selectedName }</div>
      </div>

      <select
        className="Dropdown__select"
        disabled={isPending}
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

);

DropdownMobile.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  placeholder: PropTypes.string.isRequired,
  isPending: PropTypes.bool,
  selectedId: PropTypes.string,
  selectedName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DropdownMobile.defaultProps = {
  options: null,
  isPending: false,
  selectedId: null,
  selectedName: null
};

export default DropdownMobile;