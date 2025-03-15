import React from 'react'

function ExpriencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
         <h2 className='text-center font-bold text-sm mb-2'
         style={{
            color:resumeInfo?.themeColor
          }}>Professional Experience</h2>
           <hr className='border-[2px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}></hr>

        {resumeInfo?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                style={{color:resumeInfo?.themeColor}}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
                    {experience?.city},
                    {experience?.state}
                    <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate}</span></h2>

                 {/* <p className='text-xs my-2'>
                    {experience.workSummery}</p>    */}

                    <div dangerouslySetInnerHTML={{__html:experience?.workSummery}} />

            </div>
        ))}
    </div>
  )
}

export default ExpriencePreview