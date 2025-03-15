import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExpriencePreview from './preview/ExpriencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'


function ResumePreview() {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor: resumeInfo?.themeColor
      }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummeryPreview resumeInfo={resumeInfo} />
      <ExpriencePreview resumeInfo={resumeInfo}/>
      <EducationalPreview  resumeInfo={resumeInfo}/>
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview