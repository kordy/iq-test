import React from 'react';
import Highlight from '../Highlight/Hightlight';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

const DropdownListItem = ({item, currentTextValue, onSelect, setActiveOption, className, listItemRef}) => {
  return (
    <div
      ref={listItemRef ? (node) => listItemRef(node, item.id) : null}
      className={className}
      onClick={() => { onSelect(item.id, item.name) }}
      onMouseEnter={() => setActiveOption(item)}
      onMouseLeave={() => setActiveOption(null)}
    >
      <Highlight
        text={item.name}
        textToHighlight={currentTextValue}
        highlightClassName="Dropdown-list__highlighted"
      />
    </div>
  );
};

DropdownListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  currentTextValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  listItemRef: PropTypes.func.isRequired,
  className: PropTypes.string,
};

DropdownListItem.defaultProps = {
  currentTextValue: '',
  className: ''
};

export default pure(DropdownListItem);
