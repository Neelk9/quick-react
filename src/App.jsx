import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import TermPage from './components/TermPage';

const queryClient = new QueryClient();

const App = () => {

  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

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