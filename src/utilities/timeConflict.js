export const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
    return hours * 60 + minutes;
  };
  
  export const timesOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };
  
  export const doesConflict = (course1, course2) => {
    if (!course1.meets || !course2.meets) return false;
    const [days1, time1] = course1.meets.split(' ');
    const [days2, time2] = course2.meets.split(' ');
    const [start1, end1] = time1.split('-').map(parseTime);
    const [start2, end2] = time2.split('-').map(parseTime);
  
    for (const day1 of days1) {
      if (days2.includes(day1)) {
        if (timesOverlap(start1, end1, start2, end2)) {
          return true;
        }
      }
    }
    return false;
  };
  