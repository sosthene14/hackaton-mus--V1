import Link from "next/link"
import { Button } from "./ui/button"

export const ImmersiveExprience = () => {
    return (
         <div className="max-w-7xl mx-auto px-8 py-12">
        <div 
          className="relative h-[300px] rounded-2xl overflow-hidden group"
          style={{
            backgroundImage: 'url(/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight max-w-2xl">
              5000 ans d'histoire africaine vous<br />attendent en immersion totale
            </h2>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md w-fit transition-all duration-300 group-hover:bg-white/30">
            
<Link href="/tour-3d" className="flex items-center">
Démarrer la visite virtuelle →
</Link>

              
            </Button>
          </div>
        </div>
      </div>
    )
}