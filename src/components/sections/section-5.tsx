import React from "react";
import ProductionChart from "../charts/production-chart";
import Title from "../title";
import Description from "../description";

const Section5 = () => {
  return (
    <div className="md:col-span-2 ">
      <Title className="text-2xl">
        Wayne Enterprises Dominate Global Manufacturing
      </Title>
      <Description>
        Latest production data reveals Wayne Enterprises&apos; strategic
        diversification across five major product lines, with Construction
        Materials leading at 32.1% of total output. The conglomerate&apos;s 15.9
        million unit monthly production volume demonstrates robust operational
        capacity across aerospace, biotech, electronics, and applied sciences
        divisions.
      </Description>
      <ProductionChart />
    </div>
  );
};

export default Section5;
