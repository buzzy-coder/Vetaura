import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import GeoSync from '@/components/GeoSync';
import EducationHub from '@/components/EducationHub';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceCards />
        <GeoSync />
        <EducationHub />
      </main>
      <Footer />
    </>
  );
}
