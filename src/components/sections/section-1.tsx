import React from "react";
import { SecurityChart } from "../charts/security-chart";
import Description from "../description";
import Title from "../title";

const Section1 = () => {
  return (
    <div className="md:col-span-3 md:row-span-2">
      <Title>
        Wayne Tech Cuts Gotham Crime by
        <span className="text-6xl font-extrabold ml-2">40%</span>
      </Title>
      <Description>
        GOTHAM CITY - Strategic deployment of Wayne Tech security systems across
        six districts delivers unprecedented crime reduction. Bristol District
        leads the transformation with a 45% incident decrease over the past 12
        months, marking the most significant public safety improvement in
        Gotham&apos;s modern history.
      </Description>
      <Description>
        The comprehensive security initiative, launched in early 2023,
        represents a $47 million investment in cutting-edge surveillance
        technology, predictive analytics, and rapid response systems. Wayne
        Enterprises&apos; Public Safety Division worked closely with Gotham City
        Police Department to identify optimal deployment locations, focusing on
        high-crime corridors and vulnerable community areas.
      </Description>
      <Description>
        Bristol District&apos;s remarkable transformation serves as a model for
        urban security innovation. The area, once plagued by frequent incidents,
        now boasts a 45% reduction in criminal activity. Park Row follows
        closely with 38% improvement, while even the historically challenging
        Narrows district shows measurable progress at 15% reduction.
      </Description>

      <SecurityChart />

      <Description>
        The technology&apos;s impact extends beyond crime statistics. Average
        emergency response times have decreased by 4.2 minutes across all
        districts, potentially saving lives during critical incidents. The
        integrated system combines real-time monitoring, automated threat
        detection, and seamless communication between Wayne Tech units and first
        responders.
      </Description>
      <Description>
        Chief Financial Officer analysis reveals exceptional return on
        investment, with every dollar spent on Wayne Tech deployment saving
        $3.40 in crime-related costs. This includes reduced property damage,
        decreased law enforcement overtime, and improved community economic
        activity in safer areas.
      </Description>

      <div className="flex flex-col items-start gap-2 p-2 bg-blue-100 border-2 border-l-8 border-b-8 border-blue-400 rounded-lg">
        <h2 className="font-bold text-2xl">Key Metrics</h2>
        <span className="text-xs font-medium">
          673 Wayne Tech units deployed city-wide
        </span>
        <span className="text-xs font-medium">
          $47M total public safety investment
        </span>
        <span className="text-xs font-medium">
          4.2 minutes average response time improvement
        </span>
        <span className="text-xs font-medium">
          $3.4M crime costs saved per $1M invested
        </span>
      </div>
      <Description className="mb-4">
        Looking ahead, Wayne Enterprises plans to expand the program to
        neighboring municipalities. The success in Gotham demonstrates the
        scalability of technology-driven public safety solutions, with optimal
        deployment density established at 12 units per square mile for maximum
        effectiveness.
      </Description>
    </div>
  );
};

export default Section1;
