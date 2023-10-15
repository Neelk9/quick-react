import { useEffect, useState } from 'react';
import { useDbData, updateDbDocument } from './utilities/firebase';
import Banner from './components/Banner';
import TermPage from './components/TermPage';

const App = () => {
  const [schedule, setSchedule] = useState(null);
  const [firebaseData, errorFirebase] = useDbData('/courses/');
  
  useEffect(() => {
    if (firebaseData) setSchedule(firebaseData);
  }, [firebaseData, errorFirebase]);

  const updateCourseAndState = async (updatedCourse, id) => {
    console.log(`Going to update: ${id}`, updatedCourse);
    try {
      await updateDbDocument(`courses/${id}`, updatedCourse);
      setSchedule(prevSchedule => ({
        ...prevSchedule,
        courses: {
          ...prevSchedule.courses,
          [id]: updatedCourse
        }
      }));
    } catch (error) {
      console.error("Database Update Error:", error);
    }
  };

  if (errorFirebase) return <h1>Error: {`${errorFirebase}`}</h1>;
  if (!schedule) return <h1>Fetching data...</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage updateCourse={updateCourseAndState} />
    </div>
  );
};

export default App;
