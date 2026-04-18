import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import EducationHub from '@/components/EducationHub';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceCards />
        <EducationHub />
      </main>
      <Footer />
    </>
  );
}
