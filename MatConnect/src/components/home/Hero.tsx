import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RouteSearch from '../routes/RouteSearch';
import axios from 'axios';

const Hero: React.FC = () => {
  const [routeCount, setRouteCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [routesRes, schedulesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:4000/api/getRoutes'),
          axios.get('http://localhost:4000/api/getSchedules'),
          axios.get('http://localhost:4000/api/users'),
        ]);

        setRouteCount(routesRes.data.length);
        setScheduleCount(schedulesRes.data.length);
        setUserCount(usersRes.data.length);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Book Your PSV Tickets <br />
              <span className="text-accent">Anytime, Anywhere</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-white/90 max-w-lg">
              Say goodbye to long queues and uncertainty. Book your matatu, bus, or shuttle tickets in advance and travel with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/routes" className="btn-accent">
                <div className="flex items-center">
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
              <Link to="/about" className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20">
                Learn More
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="font-bold text-2xl md:text-3xl">{routeCount}+</div>
                <div className="text-sm text-white/80">Routes</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl md:text-3xl">{scheduleCount}+</div>
                <div className="text-sm text-white/80">Daily Trips</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl md:text-3xl">{userCount}+</div>
                <div className="text-sm text-white/80">Happy Travelers</div>
              </div>
            </div>
          </div>

          <div className="slide-in">
            <div className="bg-white rounded-lg shadow-xl p-6 text-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Trip</h2>
              <RouteSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
