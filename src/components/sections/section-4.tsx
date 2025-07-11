import React from "react";
import Title from "../title";
import Description from "../description";
import RevenueChart from "../charts/revenue-chart";

const Section4 = () => {
  return (
    <div className="md:col-span-3 w-full h-full space-y-2">
      <Title className="text-4xl">
        Wayne Enterprises Sustains Strong Revenue Growth
      </Title>
      <Description>
        Quarterly revenue trends from Q1 2023 to Q4 2024 demonstrate exceptional
        growth trajectory, with total revenue increasing over 60% and reaching
        $2.4 billion by year-end. This remarkable performance stems from
        strategic innovation investments and enhanced workforce capabilities
        across all divisions.
      </Description>
      <Description>
        The revenue surge correlates directly with workforce satisfaction
        improvements and R&D investment increases. Departments with highest
        employee satisfaction scores generate 23% more revenue per employee,
        while divisions with intensive R&D focus show 31% higher profit margins.
      </Description>
      <RevenueChart />
    </div>
  );
};

export default Section4;
