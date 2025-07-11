import React from 'react'
import Title from '../title'
import Description from '../description'
import HRMetricsChart from '../charts/hr-metrics'

const Section3 = () => {
  return (
    <div className="md:col-span-2 w-full h-full space-y-2">
          <Title className='text-3xl'>
            Employee Satisfaction Soars
            <span className="font-extrabold text-5xl ml-2">8.7/10</span>
          </Title>
          <Description>
            Wayne Enterprises has achieved unprecedented employee satisfaction
            levels at 8.7 out of 10, marking a significant milestone in the
            company's human capital strategy. The comprehensive workforce
            development program, implemented across all divisions in 2023, has
            yielded remarkable results that extend far beyond traditional
            metrics.
          </Description>

          <HRMetricsChart />
        </div>
  )
}

export default Section3