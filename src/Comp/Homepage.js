import React from "react";
import Layout from "./Common/Layout";
import FooterBanner from "./FooterBanner";
import HealthCenter from "./HealthCenter";
import HeroBanner from "./HeroBanner";
import LatestNews from "./LatestNews";
import OurDoctors from "./OurDoctors";

export default function Homepage() {
  return (
    <Layout>
      <HeroBanner />
      <HealthCenter />
      <OurDoctors />
      <LatestNews />
      <FooterBanner />
    </Layout>
  );
}
