import React, { useState, useEffect } from 'react';
import '../App.css';
import { doesConflict } from '../utilities/timeConflict';
import CourseForm from './CourseForm';

const CourseList = ({ courses, selectedTerm, selectedCourses, setSelectedCourses, updateCourse }) => {
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [conflictingCourses, setConflictingCourses] = useState(new Set());

  useEffect(() => {
    const newConflictingCourses = new Set();
    for (const selected of selectedCourses) {
      const selectedCourse = courses[selected];
      for (const [id, course] of Object.entries(courses)) {
        if (doesConflict(course, selectedCourse)) {
          newConflictingCourses.add(id);
        }
      }
    }
    setConflictingCourses(newConflictingCourses);
  }, [courses, selectedCourses]);

  const toggleCourse = (id) => {
    const newSelectedCourses = new Set(selectedCourses);
    if (newSelectedCourses.has(id)) {
      newSelectedCourses.delete(id);
    } else if (!conflictingCourses.has(id)) {
      newSelectedCourses.add(id);
    }
    setSelectedCourses(newSelectedCourses);
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    setEditingCourseId(id);
  };

  const handleCancel = () => {
    setEditingCourseId(null);
  };

  return (
    <div className="grid-container">
      {Object.entries(courses).map(([id, course]) => {
        if (course.term !== selectedTerm) return null;

        if (editingCourseId === id) {
          return <CourseForm key={id} course={course} onCancel={handleCancel} updateCourse={updateCourse} />;
        }

        const isSelected = selectedCourses.has(id);
        let cardStyle = "course-card";
        if (isSelected) {
          cardStyle = "course-card-selected";
        } else if (conflictingCourses.has(id)) {
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
            <button className="small-button" onClick={(e) => handleEdit(id, e)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
