import React from 'react';
// NOTE: You would typically import and use a Calendar icon (e.g., from heroicons)
// For this example, we'll use a placeholder component.
const CalendarIconPlaceholder = () => (
  <div className="w-8 h-8 p-1 rounded-full border-2 border-orange-400 bg-white mx-auto mb-3">
    <div className="w-full h-full bg-orange-500 rounded-sm"></div>
  </div>
);

const timelineEvents = [
  { year: "2018", description: "Inauguration officielle du musée" },
  { year: "2020", description: "Expansion de la collection permanente" },
  { year: "2023", description: "Lancement du projet de digitalisation" },
  { year: "2024", description: "Plus de 200,000 visiteurs accueillis" },
];

const HistoryAndCTASecion = () => {
  // NOTE: Replace these with actual image paths for your logos
  const partnerLogos = [
    { src: '/franco.png', alt: 'Organisation internationale de la Francophonie' },
    { src: '/mini.png', alt: 'CEDEAO/ECOWAS' },
    { src: '/una.jpg', alt: 'Union Africaine' },
  ];

  return (
    <div className="bg-white pt-12 pb-24 font-sans">
      
      {/* --- History Timeline Section --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-4xl font-extrabold text-orange-500 mb-12">
          Notre Histoire
        </h2>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              style={{ backgroundColor: '#F8F9FB' }} // Light background color for the card
            >
              <CalendarIconPlaceholder />
              <p className="text-2xl font-bold mb-1 text-gray-800">
                {event.year}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- Separator (If needed, to match the layout) --- */}
      <div className="h-20"></div>

      {/* --- Call to Action & Partners Section --- */}
      <div className="max-w-7xl rounded-lg bg-slate-100 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-8">
          
          {/* CTA Text */}
          <div className="text-left">
            <h3 className="text-3xl font-bold leading-snug text-gray-800">
              Au fil des années, nous avons aidé de nombreuses institutions. 
              <br />
              <span className="text-orange-500">Êtes-vous prêt à devenir notre partenaire ?</span>
            </h3>
          </div>

          {/* Logos and Button */}
          <div className="flex flex-col sm:flex-row items-start lg:items-center justify-start lg:justify-end space-y-4 sm:space-y-0 sm:space-x-6">
            
            {/* Logos */}
            <div className="flex space-x-4 items-center ">
              {partnerLogos.map((logo, index) => (
                <img 
                  key={index}
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-10 opacity-75 hover:opacity-100 transition duration-300"
                />
              ))}
            </div>

            {/* CTA Button */}
       
          </div>
               <a 
              href="/contact" 
              className="w-[180px]  items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition duration-300 transform hover:scale-105"
            >
              Nous contacter &rarr;
            </a>
        </div>
      </div>

    </div>
  );
};

export default HistoryAndCTASecion;