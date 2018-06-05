import React from 'react';

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

export default Highlight;