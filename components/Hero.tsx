import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center mb-12">
      <div 
        className="relative rounded-xl overflow-hidden p-8 md:p-16 flex flex-col items-center justify-center min-h-[350px] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(248, 249, 250, 0.1), rgba(248, 249, 250, 0.1)), url('https://picsum.photos/seed/bogotawall/1200/400')` }}
      >
        <div className="z-10 bg-white/80 backdrop-blur-sm p-8 rounded-lg">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight tracking-tighter mb-4 font-sans">
            El Pulso Creativo
            <br />
            <span className="text-amber-500">de la Ciudad.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Descubre, explora y conecta con el arte que transforma las calles de Bogotá.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;