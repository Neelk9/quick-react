import React, { useState } from 'react';

const CourseForm = ({ course, onCancel, updateCourse }) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);
  const [term, setTerm] = useState(course.term);
  const [number, setNumber] = useState(course.number);
  const [titleError, setTitleError] = useState('');
  const [meetsError, setMeetsError] = useState('');

  const validateTitle = (title) => {
    if (title.length < 2) {
      setTitleError('Title must be at least two characters.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateMeets = (meets) => {
    const regex = /^[MTWRF]+\s\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (meets !== '' && !regex.test(meets)) {
      setMeetsError('Must contain days and start-end, e.g., MWF 12:00-13:20');
      return false;
    }
    setMeetsError('');
    return true;
  };

  const generateCourseId = (term, number) => {
    return `${term[0]}${number}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isTitleValid = validateTitle(title);
    const isMeetsValid = validateMeets(meets);
  
    if (isTitleValid && isMeetsValid) {
      const updatedCourse = { ...course, title, meets, term, number };
      const courseIdToUpdate = generateCourseId(term, number);
      console.log("Going to update course with ID:", courseIdToUpdate);
      updateCourse(updatedCourse, courseIdToUpdate);
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          onBlur={() => validateTitle(title)}
        />
        {titleError && <span>{titleError}</span>}
      </div>
      <div>
        <label htmlFor="meets">Meeting Time:</label>
        <input 
          type="text" 
          id="meets" 
          value={meets} 
          onChange={(e) => setMeets(e.target.value)} 
          onBlur={() => validateMeets(meets)}
        />
        {meetsError && <span>{meetsError}</span>}
      </div>
      <div>
        <label htmlFor="term">Term:</label>
        <input 
          type="text" 
          id="term" 
          value={term} 
          onChange={(e) => setTerm(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="number">Number:</label>
        <input 
          type="text" 
          id="number" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
        />
      </div>
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;
