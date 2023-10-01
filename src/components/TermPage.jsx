import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
  const [selectedTerm, setTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState(new Set());

  return (
    <div>
      <TermSelector setTerm={setTerm} />
      <CourseList
        courses={courses}
        selectedTerm={selectedTerm}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />
    </div>
  );
};

export default TermPage;
