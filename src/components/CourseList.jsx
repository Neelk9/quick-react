const CourseList = ({ courses }) => (
    <div>
      {Object.entries(courses).map(([id, { term, number, title }]) => (
        <div key={id}>{term} {number}: {title}</div>
      ))}
    </div>
  );
  
  export default CourseList;