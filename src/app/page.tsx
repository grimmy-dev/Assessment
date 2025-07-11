import MaxWidthWrapper from "@/components/max-width-wrapper";
import Section1 from "@/components/sections/section-1";
import Section2 from "@/components/sections/section-2";
import Section3 from "@/components/sections/section-3";
import Section4 from "@/components/sections/section-4";
import Section5 from "@/components/sections/section-5";
import Section6 from "@/components/sections/section-6";

export default function Home() {
  return (
    <MaxWidthWrapper className="py-10">
      <header className="p-2 text-center border-b-2">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide uppercase">
          Wayne Enterprise
        </h1>
        <p className="text-lg font-medium">BUSINESS INTELLIGENCE REPORT</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>
    </MaxWidthWrapper>
  );
}
