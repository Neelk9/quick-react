import React from 'react';
import '../App.css';
import { doesConflict } from '../utilities/timeConflict';

const CourseList = ({ courses, selectedTerm, selectedCourses, setSelectedCourses, startEditing }) => {
  
  const toggleCourse = (id) => {
    const newSelectedCourses = new Set(selectedCourses);
    if (newSelectedCourses.has(id)) {
      newSelectedCourses.delete(id);
    } else {
      newSelectedCourses.add(id);
    }
    setSelectedCourses(newSelectedCourses);
  };

  const isConflicting = (course) => {
    for (const selected of selectedCourses) {
      const selectedCourse = courses[selected];
      if (doesConflict(course, selectedCourse)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="grid-container">
      {Object.entries(courses).map(([id, course]) => {
        if (course.term !== selectedTerm) return null;
        
        const isSelected = selectedCourses.has(id);
        let cardStyle = "course-card";
        
        if (isSelected) {
          cardStyle = "course-card-selected";
        } else if (isConflicting(course)) {
          cardStyle = "course-card-conflict";
        }

        return (
          <div
            key={id}
            className={cardStyle}
            onClick={() => toggleCourse(id)}
          >
            <div className="course-title-section">
              <div className="course-title">{`${course.term} CS ${course.number}`}</div>
              <div>{course.title}</div>
            </div>
            <hr />
            <div className="course-meets">{course.meets}</div>
            <button onClick={(e) => { e.stopPropagation(); startEditing(id); }}>Edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
