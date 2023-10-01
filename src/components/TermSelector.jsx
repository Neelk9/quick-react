import React from 'react';

const TermSelector = ({ setTerm }) => {
  return (
    <div>
      <select onChange={(e) => setTerm(e.target.value)}>
        <option value="Fall">Fall</option>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
      </select>
    </div>
  );
};

export default TermSelector;