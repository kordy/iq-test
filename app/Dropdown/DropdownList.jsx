import React from 'react';
import DropdownListItem from './DropdownListItem';
import classnames from 'classnames';

const DropdownList = ({ list, currentTextValue, onSelect, cursor, onChangeCursor, listRef, listItemRef }) => (
    <div ref={listRef} className="Dropdown-list">
      {
        list.length ? list.map(({ name, id }, i) => (
          <DropdownListItem
            key={id}
            id={id}
            listItemRef={listItemRef}
            i={i}
            name={name}
            className={classnames('Dropdown-list__item', { 'Dropdown-list__item_active': i === cursor })}
            onSelect={onSelect}
            onChangeCursor={onChangeCursor}
            currentTextValue={currentTextValue}
          />
        )) : <div className="Dropdown-list__item Dropdown-list__item_empty">Результатов не найдено</div>
      }
  </div>
);

export default DropdownList;