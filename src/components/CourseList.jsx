import React from 'react';
import '../App.css';

const CourseList = ({ courses, selectedTerm, selectedCourses, setSelectedCourses }) => {
  
  const toggleCourse = (id) => {
    const newSelectedCourses = new Set(selectedCourses);
    if (newSelectedCourses.has(id)) {
      newSelectedCourses.delete(id);
    } else {
      newSelectedCourses.add(id);
    }
    setSelectedCourses(newSelectedCourses);
  };

  return (
    <div className="grid-container">
      {Object.entries(courses).map(([id, { term, number, title, meets }]) => {
        const isSelected = selectedCourses.has(id);
        const cardStyle = isSelected ? "course-card-selected" : "course-card";
        
        if (term === selectedTerm) {
          return (
            <div
              key={id}
              className={cardStyle}
              onClick={() => toggleCourse(id)}
            >
              <div className="course-title-section">
                <div className="course-title">{`${term} CS ${number}`}</div>
                <div>{title}</div>
              </div>
              <hr />
              <div className="course-meets">{meets}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CourseList;
