import React from 'react';
import '../App.css';

const CourseList = ({ courses, selectedTerm }) => (
  <div className="grid-container">
    {Object.entries(courses).map(([id, { term, number, title, meets }]) => {
      if (term === selectedTerm) {
        return (
          <div key={id} className="course-card">
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

export default CourseList;