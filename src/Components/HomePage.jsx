import React, {useEffect, useState} from 'react';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../utils/constants';

const HomePage = () => {
  const [stats, setStats] = useState({
    users: 0,
    credentials: 0,
    devices: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(BASE_URL + "/stats");
        // backend returns { message, data: { usersCount, credentialsCount, deviceCount } }
        const payload = res?.data?.data;
        if (payload) {
          setStats({
            users: payload.usersCount ?? 0,
            credentials: payload.credentialsCount ?? 0,
            devices: payload.deviceCount ?? 0,
          });
        }
      } catch (err) {
        console.error("Failed to get stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-grow">
      <Banner />

      <section className="py-20 px-6  text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Take control of your digital security<br />with our password manager</h1>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Collaboration is made easy with our cloud storage platform. You can easily share files with friends,
            family, or colleagues, and even work on them together in real-time.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" state={{isLoginForm : false}} className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-md font-medium">Try SafeKeyz Now</Link>
            <Link to="/learn-more" className="border border-gray-500 hover:border-white hover:text-white text-gray-300 px-6 py-3 rounded-md font-medium">Learn more →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">{stats.users}+</p>
            <p className="text-gray-400">People uses SafeKeyz to secure their Credentials.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">{stats.credentials}+</p>
            <p className="text-gray-400">Credentials safely stored and encrypted.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">100%</p>
            <p className="text-gray-400">Protection during fraud attempts.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">{stats.devices}+</p>
            <p className="text-gray-400">Devices synced with SafeKeyz.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;