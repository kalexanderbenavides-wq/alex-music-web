<script>
  // 1. Importaciones unificadas y limpias
  import RecButton from '$lib/components/RecButton.svelte';
  import AnalogKnob from '$lib/components/AnalogKnob.svelte';
  import Fader from '$lib/components/Fader.svelte';
  import BeatPlayer from '$lib/components/BeatPlayer.svelte';
  import { supabase } from '$lib/supabase';
  import Skeleton from '$lib/components/Skeleton.svelte';
  import { globalTracks } from '$lib/stores/playerStore.js';
  
  // 2. Variables de estado para Supabase
  let pistas = $state(/** @type {any[]} */ ([]));
  let cargando = $state(true);

  // 3. Función que descarga el catálogo
  $effect(() => {
    async function cargarCatalogo() {
      const { data, error } = await supabase
        .from('pistas')
        .select('*')
        .order('created_at', { ascending: false });
        
      console.log("Respuesta de la Base de Datos:", data);
      console.log("Posible Error Invisible:", error);

      if (!error) pistas = data;
      cargando = false;
    }
    cargarCatalogo();
  });
</script>

<section id="inicio" class="min-h-screen pt-[120px] pb-16 flex flex-col items-center justify-center text-center px-4 relative">
  
  <div class="w-full max-w-[900px] aspect-video rounded-[20px] overflow-hidden relative mb-12 border border-surface-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-surface-100 group/lock focus-within:ring-2 focus-within:ring-gold-base">
    
    <div class="pointer-events-none opacity-20 blur-[2px] grayscale w-full h-full relative select-none" aria-hidden="true">
      <img 
        src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop" 
        alt="Consola analógica en el Estudio de Grabación" 
        class="w-full h-full object-cover brightness-[0.7]"
      />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-surface-0/70 backdrop-blur-sm border-2 border-surface-border rounded-full flex items-center justify-center text-surface-border">
        <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="ml-1">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </div>

    <div title="Módulo en Calibración" class="absolute inset-0 bg-surface-0/10 backdrop-blur-[2px] flex flex-col items-center justify-center z-20 cursor-not-allowed transition-all duration-300 group-hover/lock:bg-surface-0/30">
      <div class="flex items-center gap-3 bg-surface-100/90 px-6 py-3 rounded-full border border-surface-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/lock:border-gold-base/40 group-hover/lock:shadow-[0_0_25px_rgba(224,198,143,0.1)]">
        <span class="w-2 h-2 rounded-full bg-gold-base animate-pulse"></span>
        <span class="font-mono text-xs text-white uppercase tracking-[3px] font-bold mt-0.5">Módulo en Calibración</span>
      </div>
      <p class="text-surface-border text-xs font-mono uppercase tracking-[2px] mt-4 opacity-70">Video Reel próximamente</p>
    </div>

  </div>
  
  <h1 class="font-rubik text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.2] mb-12 max-w-[800px] text-white">
    Si lo imaginas, existe.<br/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-white">Nosotros lo materializamos.</span>
  </h1>
  
  <RecButton text="Contactarme" href="/contacto" />
</section>

<div id="beats" class="relative w-full flex justify-center mt-20 mb-28 px-4">
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-neon-purple opacity-30 blur-[100px] rounded-full pointer-events-none z-0"></div>
  
  <div class="relative z-10 w-full max-w-[1100px]">
    {#if $globalTracks.length === 0}
      <Skeleton />
    {:else}
      <BeatPlayer />
    {/if}
  </div>
</div>

<section id="servicios" class="relative py-32 overflow-hidden border-t border-surface-border">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed filter blur-[12px] brightness-[0.2] scale-[1.1] z-0"></div>
  
  <div class="relative z-10 max-w-[1200px] mx-auto px-8">
    <h2 class="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-white">
      Mis Servicios
    </h2>
    
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-surface-100/60 backdrop-blur-md border border-gold-base/20 rounded-[20px] p-12 text-center transition-all duration-400 hover:-translate-y-2 hover:border-gold-base hover:bg-surface-100/80 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(224,198,143,0.05)] group">
        <div class="flex justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          <AnalogKnob value={30} label="" size={64} />
        </div>
        <h3 class="font-rubik text-2xl font-semibold mb-4 text-white">Producción Musical</h3>
        <p class="text-surface-border text-[0.95rem] leading-relaxed">
          Construimos la identidad sonora de tu tema desde cero. Diseño de beats, estructuración y arreglos adaptados a tu estilo vocal.
        </p>
      </div>

      <div class="bg-surface-100/60 backdrop-blur-md border border-gold-base/20 rounded-[20px] p-12 text-center transition-all duration-400 hover:-translate-y-2 hover:border-gold-base hover:bg-surface-100/80 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(224,198,143,0.05)] group">
        <div class="flex justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          <div class="pointer-events-none scale-75 origin-top"><Fader value={85} label="" height={100} /></div>
        </div>
        <h3 class="font-rubik text-2xl font-semibold mb-4 text-white">Mezcla Profesional</h3>
        <p class="text-surface-border text-[0.95rem] leading-relaxed">
          Equilibrio perfecto de frecuencias y dinámica. Hago que cada instrumento respire y tu voz destaque en cualquier sistema.
        </p>
      </div>

      <div class="bg-surface-100/60 backdrop-blur-md border border-gold-base/20 rounded-[20px] p-12 text-center transition-all duration-400 hover:-translate-y-2 hover:border-gold-base hover:bg-surface-100/80 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(224,198,143,0.05)] group">
        <div class="flex justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          <AnalogKnob value={90} label="" size={64} />
        </div>
        <h3 class="font-rubik text-2xl font-semibold mb-4 text-white">Mastering Analógico</h3>
        <p class="text-surface-border text-[0.95rem] leading-relaxed">
          El pulido final. Volumen comercial, calidez analógica y compatibilidad total para Spotify y Apple Music.
        </p>
      </div>
    </div>
  </div>
</section>

<section id="extras" class="relative py-32 overflow-hidden border-t border-surface-border">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed filter blur-[15px] brightness-[0.15] scale-[1.1] z-0"></div>
  
  <div class="relative z-10 max-w-[1200px] mx-auto px-8">
    <h2 class="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-white">
      Educación & Partituras
    </h2>
    
    <div class="grid md:grid-cols-2 gap-12">
      <div class="bg-surface-100/60 backdrop-blur-md border border-gold-base/20 rounded-[20px] p-12 relative overflow-hidden group hover:border-gold-base transition-colors">
        <div class="absolute top-0 left-0 w-1 h-full bg-gold-base transition-all duration-300 group-hover:w-full group-hover:opacity-5"></div>
        <h3 class="font-rubik text-2xl font-semibold mb-4 text-white relative z-10">Clases de Guitarra</h3>
        <p class="text-surface-border text-[1.05rem] mb-8 relative z-10">
          Clases personalizadas de guitarra eléctrica y acústica. Aprende acordes, escalas, improvisación y técnicas avanzadas adaptadas a tu nivel.
        </p>
        <a href="/contacto" aria-label="Consultar tarifas para transcripción" class="inline-flex items-center gap-2 font-rubik text-gold-base font-semibold uppercase tracking-[1px] text-[0.9rem] relative z-10 hover:gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-gold-base rounded">
          Consultar tarifas <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="bg-surface-100/60 backdrop-blur-md border border-gold-base/20 rounded-[20px] p-12 relative overflow-hidden group hover:border-gold-base transition-colors">
        <div class="absolute top-0 left-0 w-1 h-full bg-gold-base transition-all duration-300 group-hover:w-full group-hover:opacity-5"></div>
        <h3 class="font-rubik text-2xl font-semibold mb-4 text-white relative z-10">Clases de Producción (Ableton)</h3>
        <p class="text-surface-border text-[1.05rem] mb-8 relative z-10">
          Aprende con un enfoque práctico. Teoría musical aplicada, grabación en home studio, síntesis y mezcla de voces.
        </p>
        <a href="/contacto" aria-label="Agendar clase de producción en Ableton" class="inline-flex items-center gap-2 font-rubik text-gold-base font-semibold uppercase tracking-[1px] text-[0.9rem] relative z-10 hover:gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-gold-base rounded">
          Agendar clase <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="py-24 bg-surface-0 border-y border-surface-border overflow-hidden relative">
  <h4 class="text-center font-rubik text-[1.2rem] uppercase tracking-[2px] text-surface-border mb-12">Artistas y Clientes</h4>
  
  <div class="w-full overflow-hidden whitespace-nowrap relative group/lock">
    
    <div class="pointer-events-none opacity-20 blur-[1px] grayscale select-none" aria-hidden="true">
      <div class="absolute top-0 left-0 w-[150px] h-full bg-gradient-to-r from-surface-0 to-transparent z-10"></div>
      <div class="absolute top-0 right-0 w-[150px] h-full bg-gradient-to-l from-surface-0 to-transparent z-10"></div>
      
      <div class="inline-flex gap-16 pl-16 animate-marquee w-[200%]">
        {#each [1, 2] as set}
          <div class="flex flex-col items-center gap-4">
            <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5646f?w=200&h=200&fit=crop" class="w-[100px] h-[100px] rounded-full object-cover border-2 border-surface-border" alt="Retrato Lil Nova" />
            <span class="font-rubik text-[0.9rem] font-semibold text-white">Lil Nova</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <img src="https://images.unsplash.com/photo-1516280440502-61614f17849e?w=200&h=200&fit=crop" class="w-[100px] h-[100px] rounded-full object-cover border-2 border-surface-border" alt="Retrato J. Cruz" />
            <span class="font-rubik text-[0.9rem] font-semibold text-white">J. Cruz</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <img src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=200&h=200&fit=crop" class="w-[100px] h-[100px] rounded-full object-cover border-2 border-surface-border" alt="Retrato The Vibe" />
            <span class="font-rubik text-[0.9rem] font-semibold text-white">The Vibe</span>
          </div>
          <div class="flex flex-col items-center gap-4">
            <img src="https://images.unsplash.com/photo-1508214751196-bfd1406eb34e?w=200&h=200&fit=crop" class="w-[100px] h-[100px] rounded-full object-cover border-2 border-surface-border" alt="Retrato Elena Rose" />
            <span class="font-rubik text-[0.9rem] font-semibold text-white">Elena Rose</span>
          </div>
        {/each}
      </div>
    </div>

    <div title="Módulo en Calibración" class="absolute inset-0 bg-surface-0/10 backdrop-blur-[2px] flex flex-col items-center justify-center z-20 cursor-not-allowed transition-all duration-300 group-hover/lock:bg-surface-0/30">
      <div class="flex items-center gap-3 bg-surface-100/90 px-6 py-3 rounded-full border border-surface-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover/lock:border-gold-base/40 group-hover/lock:shadow-[0_0_25px_rgba(224,198,143,0.1)]">
        <span class="w-2 h-2 rounded-full bg-gold-base animate-pulse"></span>
        <span class="font-mono text-xs text-white uppercase tracking-[3px] font-bold mt-0.5">Módulo en Calibración</span>
      </div>
    </div>

  </div>
</section>