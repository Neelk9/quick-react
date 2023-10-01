import React from 'react';
import '../App.css';

const CourseModal = ({ show, onClose, courses, selectedCourses }) => {
  if (!show) return null;

  const selectedCourseDetails = [...selectedCourses].map((id) => courses[id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {selectedCourseDetails.length === 0 ? (
          <p>No courses selected. Click on a course to select it.</p>
        ) : (
          selectedCourseDetails.map(({ number, title, meets }, idx) => (
            <div key={idx}>
              {`CS ${number}: ${title}, Meets at: ${meets}`}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseModal;
