import React, { useEffect, useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { municipalitiesData } from '../data/municipalityData';
import { Button } from '../components/ui/Button';
import { TribalPattern } from '../components/TribalPattern';
import { MunicipalityNav } from '../components/MunicipalityNav';
import { MunicipalitySection } from '../components/MunicipalitySection';
export function ExplorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMunicipality, setActiveMunicipality] = useState<string>(
    municipalitiesData[0].id
  );
  // Intersection Observer for active state highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxIntersectionRatio = 0;
        let mostVisibleId = '';
        entries.forEach((entry) => {
          if (
          entry.isIntersecting &&
          entry.intersectionRatio > maxIntersectionRatio)
          {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        if (mostVisibleId) {
          setActiveMunicipality(mostVisibleId);
        }
      },
      {
        rootMargin: '-100px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );
    municipalitiesData.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Find matching municipality
    const match = municipalitiesData.find((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      scrollToMunicipality(match.id);
    } else {
      // If no municipality matches, search tours
      navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  const scrollToMunicipality = (id: string) => {
    setActiveMunicipality(id);
    const el = document.getElementById(id);
    if (el) {
      // Account for sticky nav (approx 140px offset)
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  const handleExploreTours = (municipalityName: string) => {
    navigate(`/tours?location=${encodeURIComponent(municipalityName)}`);
  };
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Banner */}
      <div className="bg-ocean text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <TribalPattern opacity={1} className="h-full" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="bg-olive text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-8 shadow-sm">
            Municipalities
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
            Discover the 9 Municipalities of
            <br className="hidden md:block" /> Davao del Norte
          </h1>
          <p className="text-lg md:text-xl text-ocean-100 mb-12 max-w-2xl mx-auto font-light">
            Explore the unique beauty, culture, and hidden gems waiting to be
            discovered across the province.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
            <div className="flex shadow-2xl rounded-full overflow-hidden bg-white p-2 pl-6 items-center">
              <SearchIcon className="text-gray-400 w-6 h-6 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for a municipality or tour..."
                className="w-full py-3 text-gray-900 border-none focus:ring-0 text-lg outline-none bg-transparent placeholder-gray-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

              <Button
                type="submit"
                size="lg"
                className="rounded-full px-10 py-4 text-lg font-bold flex-shrink-0 shadow-md hover:shadow-lg transition-all">

                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Sticky Quick Nav */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pt-5 pb-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Where do you want to go?
            </p>
          </div>
          <MunicipalityNav
            municipalities={municipalitiesData}
            activeId={activeMunicipality}
            onSelect={scrollToMunicipality} />

        </div>
      </div>

      {/* Main Content - Municipality Sections */}
      <div className="bg-white">
        {municipalitiesData.map((municipality, index) =>
        <MunicipalitySection
          key={municipality.id}
          municipality={municipality}
          index={index}
          onExplore={handleExploreTours} />

        )}
      </div>
    </div>);

}