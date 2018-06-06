import React from 'react';
import PropTypes from 'prop-types';

const Highlight = ({ text, textToHighlight, highlightClassName = 'Highlight' }) => {
  if (!textToHighlight || !text) return text || null;
  let parts = text.split(new RegExp(`^(${textToHighlight})`, 'i'));
  return (
    parts.map((part, i) => part &&
      <span key={i} className={part.toLowerCase() === textToHighlight.toLowerCase() ? highlightClassName : null }>
        { part }
      </span>
    )
  )
};

Highlight.propTypes = {
  highlightClassName: PropTypes.string,
  textToHighlight: PropTypes.string,
  text: PropTypes.string
};

Highlight.defaultProps = {
  highlightClassName: null,
  textToHighlight: null,
  text: null
};

export default Highlight;