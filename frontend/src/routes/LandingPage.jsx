import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import landing_image from '../assets/landing_page.png'


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='LandingPage h-screen flex flex-col mt-24'>
      <Navbar />

      <div id='container' className="grow flex flex-col">

        <div id='top-container' className="flex h-96">
          <div id='landing-slogan' className="p-16 space-y-4 w-1/3 relative left-48
                                              max-xl:w-2/5 max-xl:left-24">
            <h1 className='text-3xl font-bold text-[#41403e]'>Trade, Organize, and Meet Enthusiastic Collectors!</h1>
            <p className='text-gray-500 text'>MyIdolList provides a platform for enthusiasts of photocard trading to trade and organize their photocards.</p>
            <div className="landing-buttons space-x-4">
              <button className="get-started drop-shadow-md bg-gray-700 text-white font-bold text-sm
                                  border-2 border-gray-700 rounded-full px-6 py-2
                                  hover:scale-105 ease-in-out duration-300 hover:underline"
                onClick={() => navigate('/Login')}>GET STARTED
              </button>
              <button className="learn-more drop-shadow-md text-gray-700 font-bold text-sm
                                border-2 border-gray-700 rounded-full px-6 py-2
                                hover:scale-105 ease-in-out duration-300 hover:underline">
                LEARN MORE
              </button>
            </div>
          </div>
          <a href="/trading-hub">
            <img src={landing_image} alt="landing-image"
              className="landing-image w-4/12 absolute right-48 rotate-[20deg] drop-shadow-lg
                          hover:cursor-pointer hover:scale-105 ease-in-out duration-300
                          max-xl:right-24"
            />
          </a>
        </div>

        <div id='our-features' className="flex relative grow bg-white border-t-1 items-center shadow-lg
        justify-center space-x-32 py-16 drop-shadow-[-12px_12px_12px_rgba(0,0,0,0.3)]">
          <div id='feature' className="flex flex-col text-center items-center space-y-2">
            <svg className="h-12 w-12 text-slate-800 bg-neutral-200 rounded-lg px-2 py-1 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className='font-bold text-lg text-slate-600'>Trade</p>
            <p className='text-sm text-gray-600 w-60'>Connect with a passionate community of collectors by trading and managing your photocards.</p>
          </div>
          <div id='feature' className="flex flex-col text-center items-center space-y-2">
            <svg className="h-12 w-12 text-slate-800 bg-neutral-200 rounded-lg px-2 py-1 w-12" stroke-width="1.5"  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#000000">
              <rect height="11.5" width="8.25" y="2.75" x="1.75" />
              <path stroke-linecap="round" stroke-linejoin="round" d="m10 3.75 4.25 2-4.25 7.5" />
            </svg>
            <p className='font-bold text-lg text-slate-600'>Organize Photocards</p>
            <p className='text-sm text-gray-600 w-60'>Create a catalog of photocards owned, organize, and label your cards with ease.</p>
          </div>
          <div id='feature' className="flex flex-col text-center items-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="h-12 w-12 text-slate-800 bg-neutral-200 rounded-lg px-2 py-1 w-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            <p className='font-bold text-lg text-slate-600'>Meet Other Collectors</p>
            <p className='text-sm text-gray-600 w-60'>Join a vibrant collector community. Share stories, trade experiences, and build lasting connections.</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
