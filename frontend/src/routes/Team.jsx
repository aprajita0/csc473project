import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jezlea from '../assets/Jezlea.png';
import Zed from '../assets/Zed.png';
import Aprajita from '../assets/Aprajita.png';
import team_image from '../assets/team.png';
import { UserGroupIcon} from '@heroicons/react/24/solid';

const Team = () => {
  const teamMembers = [
    {
      name: 'Jezlea Ortega',
      role: 'Frontend Developer',
      image: Jezlea,
      bio: 'As an experienced frontend developer, I specialize in crafting user-friendly interfaces utilizing technologies such as React, Tailwind CSS, and Vite.js. Additionally, I bring a unique edge with hands-on experience in game development using Unity and on the job client based work at Accenture. I am passionate about blending creativity and functionality, aiming to specialize in software engineering and UX design to deliver exceptional user experiences.',
      linkedIn: 'https://www.linkedin.com/in/jezlea-ortega-29870b187',
    },
    {
      name: 'Aprajita Srivastava',
      role: 'Backend Developer',
      image: Aprajita,
      bio: 'Hello, I am Aprajita Srivastava, currently a senior at The City College of New York, pursuing a B.S. in Computer Science. I have a strong foundation in backend development and database management, with a growing passion for machine learning and artificial intelligence. I enjoy solving complex challenges and continuously expanding my technical expertise.',
      linkedIn: 'https://www.linkedin.com/in/aprajita-srivastava25/',
    },
    {
      name: 'Melchizedek De Castro',
      role: 'Frontend Developer',
      image: Zed,
      bio: 'Currently a Senior at The City College of New York, I enjoy learning and working with other problem solvers and creative minded people. A student and learner by day, a musician by night, I strive to implement creative ideas into my daily work to solve unseen modern day problems. Having led numerous teams in building projects, I never hesitate to take the lead and engage in communication with my teammates in order to foster a successful project.',
      linkedIn: 'https://www.linkedin.com/in/meldecastro/',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-20 ">
      <Navbar />
      <div id='container' className="grow flex flex-col ">
        <div id='top-container' className="flex h-[300px] container mx-auto px-4 ">
            <div id='meet_team' className="p-16 w-1/3 relative left-5 max-xl:w-2/5 max-xl:left-24">
            <div className="flex items-center space-x-2">
                <h1 className='text-4xl font-bold text-[#41403e]'>Meet the Team</h1>
                <UserGroupIcon className="h-18 w-18 text-gray-300" />
            </div>
            <p className='text-gray-500 text mt-4'>Meet the passionate individuals driving our mission forward and bringing our vision to life.</p>
        </div>
        <a href="/team_image"> <img src={team_image} alt="team_image" className="team-image w-2/16 h-[450px] absolute right-60 drop-shadow-lg hover:cursor-pointer hover:scale-105 ease-in-out duration-300 max-xl:right-24"/>
        </a>
        </div>
        <div id='our-team' className="relative bg-white border-t shadow-lg py-3 ">
            <section className="py-16 bg-white">
                <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {teamMembers.map((member, index) => (
                        <div key={index} className=" bg-white shadow-lg rounded-lg overflow-hidden drop-shadow-lg hover:cursor-pointer hover:scale-105 ease-in-out duration-300 max-xl:right-24">
                            <div className="group">
                                <img src={member.image} alt={member.name} className="w-full h-60 object-cover"/>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-700">{member.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                                {member.linkedIn && (
                                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-md font-semibold text-[#41403e] hover:underline">Connect on LinkedIn</a>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default Team;
