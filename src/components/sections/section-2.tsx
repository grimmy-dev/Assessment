import React from "react";
import Title from "../title";
import Description from "../description";
import RDRevenueChart from "../charts/rd-vs-revenue";

const Section2 = () => {
  return (
    <div className="md:col-span-2">
      <Title className="text-3xl">R&D Investment Pays Off</Title>
      <Description>
        Wayne Foundation leads with 102% growth on just $37M in R&D investment,
        while Wayne Aerospace achieves only 56% growth despite spending $161M on
        research. Lower R&D spending consistently delivers higher growth rates
        across divisions, suggesting operational efficiency drives better
        results than research expenditure.
      </Description>
      <RDRevenueChart />
    </div>
  );
};

export default Section2;
