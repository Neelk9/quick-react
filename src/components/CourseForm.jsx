import React, { useState } from 'react';

const CourseForm = ({ initialCourse, onCancel }) => {
  const [title, setTitle] = useState(initialCourse.title);
  const [meets, setMeets] = useState(initialCourse.meets);

  const onSubmit = (e) => {
    e.preventDefault();
    // Do nothing
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Meets</label>
        <input type="text" value={meets} onChange={(e) => setMeets(e.target.value)} />
      </div>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseForm;
