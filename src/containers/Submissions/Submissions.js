import { useEffect, useState } from 'react';
import { getSubmissions } from './SubmissionsService';

const Submissions = () => {
  const [submissions, setSubmissions] = useState();

  useEffect(() =>
    getSubmissions().then(response => setSubmissions(response.data))
  );

  return <div></div>;
};

export default Submissions;
