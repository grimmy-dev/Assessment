import React from "react";
import Title from "../title";
import Description from "../description";
import RDChart from "../charts/rd-chart";

const Section6 = () => {
  return (
    <div className="md:col-span-5 w-full h-full  ">
      <Title className="text-4xl">
        Wayne R&D Divisions: Project Progress Snapshot
      </Title>
      <Description>
        A comprehensive real-time comparison of active, completed, and paused
        projects across Wayne Enterprises&apos; R&D divisions. This dashboard
        provides strategic insights into resource allocation, development
        timelines, and operational efficiency metrics for our cutting-edge
        research initiatives spanning advanced materials, biotechnology,
        aerospace engineering, and emerging technologies. Monitor project
        velocity, budget utilization, and milestone achievements to optimize our
        innovation pipeline and maintain Wayne Enterprises&apos; competitive
        edge in the global market.
      </Description>
      <RDChart />
    </div>
  );
};

export default Section6;
