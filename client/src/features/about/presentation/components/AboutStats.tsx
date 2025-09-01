import { useTranslation } from 'react-i18next';
import yearsImg from '../../../../assets/WEBSITE SYMBOLS/YEARSOFEXPERIENCE.png';
import clientsImg from '../../../../assets/WEBSITE SYMBOLS/HAPPY CLIENTS.png';
import teamImg from '../../../../assets/WEBSITE SYMBOLS/TEAM.png';
import certificationsImg from '../../../../assets/WEBSITE SYMBOLS/CERTIFICATION.png';

export const  AboutStats = () => {
  const { t } = useTranslation('about');

  // Get stats data from translations
  const statsData = t('stats', { returnObjects: true }) as {
    years: { number: string; title: string; description: string; };
    clients: { number: string; title: string; description: string; };
    team: { number: string; title: string; description: string; };
    certifications: { number: string; title: string; description: string; };
  };

  const statsArray = [
    statsData.years,
    statsData.clients,
    statsData.team,
    statsData.certifications
  ];

  const images = [yearsImg, clientsImg, teamImg, certificationsImg];

  return (
    <div className="bg-orion-gradient py-16 -mt-20 relative z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsArray.map((stat, index) => (
            <div 
              key={index}
              className="text-center text-white animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-2 flex justify-center items-center">
                <img src={images[index]} alt={stat.title} className="w-48 h-48 mx-auto object-cover" />
              </div>
              <div className="text-4xl xl:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.title}</div>
              <div className="text-sm text-purple-100">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
