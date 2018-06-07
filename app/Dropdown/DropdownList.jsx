import React from 'react';
import DropdownListItem from './DropdownListItem';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownList = ({ list, currentTextValue, onSelect, listRef, listItemRef, isOpen, activeOption, setActiveOption, isPending }) => (
    <div ref={listRef} className={classnames('Dropdown-list', { 'Dropdown-list_open': isOpen, 'Dropdown-list_loading': isPending })}>
      {
        !isPending && (list.length ? list.map((item) => (
          <DropdownListItem
            key={item.id}
            item={item}
            listItemRef={listItemRef}
            className={classnames('Dropdown-list__item', { 'Dropdown-list__item_active': activeOption && item.id === activeOption.id })}
            onSelect={onSelect}
            currentTextValue={currentTextValue}
            setActiveOption={setActiveOption}
          />
        )) : <div className="Dropdown-list__item Dropdown-list__item_empty">Результатов не найдено</div>)
      }
  </div>
);

DropdownList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  currentTextValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  activeOption: PropTypes.object,
  setActiveOption: PropTypes.func.isRequired,
  listRef: PropTypes.func.isRequired,
  listItemRef: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

DropdownList.defaultProps = {
  list: [],
  activeOption: null,
  currentTextValue: ''
};

export default DropdownList;