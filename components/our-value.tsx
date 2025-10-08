import React from 'react';
// NOTE: You would typically use SVG icons here. 
// For this example, we'll use a placeholder component and style it.
const PlaceholderIcon = () => (
  <div className="w-10 h-10 p-2 border border-dashed border-orange-400 bg-white rounded shadow-sm flex items-center justify-center mx-auto mb-4">
    <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
  </div>
);

const valuesData = [
  {
    title: "Collaboration",
    description: "La collaboration est au cœur de nos projets. Nous travaillons main dans la main avec les conservateurs, historiens et communautés pour créer une expérience authentique et fidèle."
  },
  {
    title: "Transparence",
    description: "La transparence, au-delà de l'honnêteté, est essentielle à notre approche. C'est facile de respecter ce en quoi nous croyons vraiment, et nous le faisons avec fierté."
  },
  {
    title: "Confiance",
    description: "La confiance est basée sur l'action et la protection de l'environnement. Nos visiteurs doivent se sentir en sécurité et valorisés quand ils explorent nos collections."
  },
  {
    title: "Intégrité",
    description: "L'intégrité est l'acte éthique de montrer un engagement et une responsabilité envers le patrimoine, en assurant sa conservation et son respect."
  }
];

const ValuesSection = () => {
  return (
    // Outer container with light background color to match the image context
    <div className="bg-slate-100 mt-16 pt-16 pb-32 relative"> 
      
      {/* Curved bottom edge (approximation using a pseudo-element or separate div) */}
      <div className="absolute rotate-180 -top-[50px] left-0 right-0 h-24 bg-white rounded-t-[50%] transform translate-y-1/2 z-10" 
           style={{ borderTopLeftRadius: '50% 100px', borderTopRightRadius: '50% 100px' }}>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[50%] transform translate-y-1/2 z-10" 
           style={{ borderTopLeftRadius: '50% 100px', borderTopRightRadius: '50% 100px' }}>
      </div>

      <div className="max-w-6xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 text-center relative z-20">
        
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-orange-500 mb-4">
          Nos valeurs
        </h1>
        <p className="text-xl text-gray-600 mb-16">
          Nous nous efforçons de maintenir le plus haut niveau d'excellence
        </p>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-center text-gray-700 max-w-4xl mx-auto">
          {valuesData.map((value, index) => (
            <div key={index} className="p-4">
              <PlaceholderIcon />
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {value.title}
              </h3>
              <p className="text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;