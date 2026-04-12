import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { Concept } from '../components/Concept';
import { Features } from '../components/Features';
import { PhysicalSpaces } from '../components/PhysicalSpaces';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-transparent font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Concept />
      <Features />
      <PhysicalSpaces />
      <CTA />
      <Footer />
    </div>
  );
};
