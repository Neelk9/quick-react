import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import CourseModal from './CourseModal';
import CourseForm from './CourseForm';
import { updateDbDocument } from '../utilities/firebase';

const TermPage = ({ updateCourse }) => {
  const [selectedTerm, setTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courses, setCourses] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'courses');
    const listener = onValue(coursesRef, (snapshot) => {
      setCourses(snapshot.val());
    });

    return () => {
      listener();
    };
  }, []);

  const startEditing = (id) => {
    setEditingCourseId(id);
  };

  const stopEditing = () => {
    setEditingCourseId(null);
  };

  const termCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selectedTerm)
  );

  const updateCourseAndState = async (updatedCourse, id) => {
    console.log(`Updating path courses/${id} with data:`, updatedCourse);
    await updateDbDocument(`courses/${id}`, updatedCourse).catch(err => console.error("DB Update Error: ", err));
    
    setCourses(prevCourses => {
      console.log("Previous Courses:", prevCourses);
      return {
        ...prevCourses,
        [id]: updatedCourse
      };
    });
  };

  return (
    <div>
      <div className="term-header">
        <TermSelector setTerm={setTerm} />
        <button className="small-button course-plan-button" onClick={() => setShowModal(true)}>Course Plan</button>
      </div>
      {editingCourseId ? (
        <CourseForm
          initialCourse={termCourses[editingCourseId]}
          onCancel={stopEditing}
          updateCourse={updateCourseAndState}
        />
      ) : (
        <CourseList
          courses={termCourses}
          selectedTerm={selectedTerm}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          startEditing={startEditing}
          updateCourse={updateCourseAndState}
        />
      )}
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
