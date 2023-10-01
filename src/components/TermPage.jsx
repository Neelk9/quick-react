import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
  const [selectedTerm, setTerm] = useState("Fall");

  return (
    <div>
      <TermSelector setTerm={setTerm} />
      <CourseList courses={courses} selectedTerm={selectedTerm} />
    </div>
  );
};

export default TermPage;
