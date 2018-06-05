import React from 'react';
import Highlight from '../Highlight/Hightlight';
import pure from 'recompose/pure';

const DropdownListItem = ({name, id, i, currentTextValue, onSelect, onChangeCursor, className, listItemRef}) => {
  return (
    <div
      ref={listItemRef ? (node) => listItemRef(node, id) : null}
      key={id}
      className={className}
      onClick={() => { onSelect(id, name) }}
      onMouseEnter={() => onChangeCursor(i)}
      onMouseLeave={() => onChangeCursor(null)}
    >
      <Highlight
        text={name}
        textToHighlight={currentTextValue}
        highlightClassName="Dropdown-list__highlighted"
      />
    </div>
  );
};

export default pure(DropdownListItem);
