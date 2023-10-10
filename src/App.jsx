import { useEffect, useState } from 'react';
import { getDbDocument, useDbData, updateDbDocument } from './utilities/firebase';
import Banner from './components/Banner';
import TermPage from './components/TermPage';

const App = () => {
  const [schedule, setSchedule] = useState(null);
  const [firebaseData, errorFirebase] = useDbData('/');
  const [courses, setCourses] = useState({});

  const updateCourses = (updatedCourse, id) => {
    setCourses(prevCourses => ({
      ...prevCourses,
      [id]: updatedCourse
    }));
  };

  useEffect(() => {
    if (errorFirebase) {
      console.error("Firebase Error:", errorFirebase);
      return;
    }
    if (firebaseData) {
      setSchedule(firebaseData);
    }
  }, [firebaseData, errorFirebase]);

  if (errorFirebase) return <h1>Error: {`${errorFirebase}`}</h1>;
  if (!schedule) return <h1>Fetching data...</h1>;

  const updateCoursesInDb = async (updatedCourse, id) => {
    await updateDbDocument(`courses/${id}`, updatedCourse);
    updateCourses(updatedCourse, id);
  };

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} updateCourse={updateCoursesInDb} />
    </div>
  );
};

export default App;
