import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Box, Globe, Headphones, QrCode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const cardsData = [
  {
    title: "Visite 3D",
    imageSrc: "/3Dpic.jpg", // Image de fond pour la visite 3D
    icon: <Box className="w-8 h-8 text-white" />,
  },
  {
    title: "Multilingue",
    imageSrc: "/mutiling.jpg", // Image de fond pour multilingue
    icon: <Globe className="w-8 h-8 text-white" />,
  },
  {
    title: "Audio Guide",
    imageSrc: "/audio.jpg", // Image de fond pour l'audio guide
    icon: <Headphones className="w-8 h-8 text-white" />,
  },
  {
    title: "QR Code",
    imageSrc: "/qrcode.jpg", // Image de fond pour QR Code
    icon: <QrCode className="w-8 h-8 text-white" />,
  },
];
export default function AfricanHeritageHero() {
    
  return (
    <div className="h-[70vh] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
      {/* Navigation */}
       

      {/* Hero Section */}
      <div 
        className="relative z-10 h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: 'url("/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Découvrez l'héritage des<br />civilisations africaines
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Une expérience immersive au cœur de l'histoire et de la culture
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Link href="/gallery" className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
              Explorer la collection →

                </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                   <Link href="/tour-3d" className="flex items-center">
              <Box className="w-5 h-5 mr-2" />
              Visite 3D

                </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
             
           
                      <Link href="/scan" className="flex items-center">
               <QrCode className="w-5 h-5 mr-2" />
               Scanner QR Code

                </Link>
            </Button>
          </div>
        </div>
      </div>


      {/* Feature Cards */}
<div className="max-w-7xl z-[200] mx-auto px-8 mt-[10px] md:-mt-[100px] relative z-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cardsData.map((card) => (
            <Card
                key={card.title}
       
                style={{ 
                    backgroundImage: `url(${card.imageSrc})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
                className="relative border border-white h-full border-slate-700 hover:bg-slate-700/90 transition-all cursor-pointer group overflow-hidden" 
            >
                {/* CALQUE OBSCURCI (OVERLAY)
                  Il couvre toute la carte et porte la couleur de fond semi-transparente.
                  bg-black/50 pour 50% d'opacité, réduit à bg-black/30 au survol.
                */}
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/30 transition-colors "></div>

                {/* CONTENU DE LA CARTE (Texte et Icône) */}
                {/* On le rend "relative" et "z-10" pour qu'il soit au-dessus de l'overlay */}
                <div className="relative z-10 p-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="
                            w-16 h-16 rounded-lg 
                            flex items-center justify-center 
                            bg-white/10 group-hover:bg-white/20 transition-colors
                        ">
                            {/* Icône */}
                            {card.icon}
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                </div>
            </Card>
        ))}

    </div>
</div>
    </div>
  );
}