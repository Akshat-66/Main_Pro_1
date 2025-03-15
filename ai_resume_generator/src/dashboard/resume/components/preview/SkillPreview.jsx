import React from 'react';

function SkillPreview({ resumeInfo }) {
  // Safeguard: Ensure resumeInfo and resumeInfo.skills are defined
  const skills = resumeInfo?.skills || [];

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skill
      </h2>
      <hr
        className='border-[2px] my-2'
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      ></hr>

      <div className='grid grid-cols-2 gap-2 my-4'>
        {skills.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <h2 className='text-xs'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px]'>
              <div
                className='h-2'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + '%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;