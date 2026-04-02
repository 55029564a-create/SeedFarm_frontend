import styled from 'styled-components';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Hero from '../Components/Hero';
import Problem from '../Components/Problem';
import Solution from '../Components/Solution';
import Features from '../Components/Features';
import Dashboard from '../Components/Dashboard';
import Impact from '../Components/Impact';
import UseCase from '../Components/UseCase';
import System from '../Components/System';
import CTA from '../Components/CTA';
import ScrollToTop from '../Components/ScrollToTop';

import { PageWrapper } from '../styles/landingStyled';

const LandingPage = () => {
  return (
    <PageWrapper>
      <Header />

      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Dashboard />
      <Impact />
      <UseCase />
      <System />
      <CTA />

      <Footer />

      <ScrollToTop />
    </PageWrapper>
  );
};

export default LandingPage;
