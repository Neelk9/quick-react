import { useState, useEffect , useRef} from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { updateDbDocument, useDbData } from './utilities/firebase';
import { useJsonQuery } from './utilities/fetch';

const queryClient = new QueryClient();

const App = () => {
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseData, errorFirebase] = useDbData('/');

  
  const [northwesternData, isLoadingNorthwestern, errorNorthwestern] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  useEffect(() => {
    if (northwesternData && !firebaseData) {
      updateDbDocument('/', northwesternData);
    }
    if (firebaseData) {
      setSchedule(firebaseData);
      setIsLoading(false);
    }
  }, [northwesternData, firebaseData]);

  const error = errorNorthwestern || errorFirebase;

  if (error) return <h1>Error: {`${error}`}</h1>;
  if (isLoading) return <h1>Fetching data...</h1>;
  if (!schedule) return <h1>No schedule data found</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
