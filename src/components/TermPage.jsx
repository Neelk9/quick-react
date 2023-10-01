import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import CourseModal from './CourseModal';

const TermPage = ({ courses }) => {
  const [selectedTerm, setTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [showModal, setShowModal] = useState(false);

  const termCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selectedTerm)
  );

  return (
    <div>
      <div className="term-header">
        <TermSelector setTerm={setTerm} />
        <button className="course-plan-button" onClick={() => setShowModal(true)}>Course Plan</button>
      </div>
      <CourseList
        courses={termCourses}
        selectedTerm={selectedTerm}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />
      <CourseModal
        show={showModal}
        courses={termCourses}
        selectedCourses={selectedCourses}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default TermPage;