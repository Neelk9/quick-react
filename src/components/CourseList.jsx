import React from 'react';
import '../App.css';

const CourseList = ({ courses }) => (
  <div className="grid-container">
    {Object.entries(courses).map(([id, { term, number, title, meets }]) => (
      <div key={id} className="course-card">
        <div className="course-title-section">
          <div className="course-title">{`${term} CS ${number}`}</div>
          <div>{title}</div>
        </div>
        <hr />
        <div className="course-meets">{meets}</div>
      </div>
    ))}
  </div>
);

export default CourseList;