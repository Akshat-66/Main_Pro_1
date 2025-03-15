import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function DashBoard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    GlobalApi.GetUserResumes(email)
      .then((resp) => {
        console.log(resp.data);
        setResumeList(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
      });
  };

  return (
    <div className='p-4 sm:p-6 md:px-16 lg:px-32'>
      <h2 className='font-bold text-xl sm:text-2xl md:text-3xl'>My Resume</h2>
      <p className='text-sm sm:text-base'>Start creating an AI resume for your next job role :)</p>
      
      {/* Responsive grid layout */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6'>
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeCardItem 
              resume={resume} 
              key={resume.id} 
              refreshData={GetResumesList} 
            />
          ))}
      </div>
    </div>
  );
}

export default DashBoard;
