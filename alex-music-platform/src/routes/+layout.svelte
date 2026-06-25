<script>
  import './layout.css';
  let { children } = $props();
  
  import AnalogKnob from '$lib/components/AnalogKnob.svelte';
  import MiniPlayer from '$lib/components/MiniPlayer.svelte';
  import { supabase } from '$lib/supabase';
  
  import {
    masterVolume, globalTracks, activeIndex, isPlaying, 
    currentTime, duration, activeTrack
  } from '$lib/stores/playerStore.js';

  let audioElement = $state();
  let cargando = $state(true);

  // Descarga el catálogo globalmente
  $effect(() => {
    async function cargarCatalogo() {
      const { data, error } = await supabase
        .from('pistas')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) globalTracks.set(/** @type {any} */ (data));
      cargando = false;
    }
    cargarCatalogo();
  });

 // CANAL 1: Cambio de Pista (Track Switch)
  // Cada vez que cambia la canción, reiniciamos el buffer del navegador
  $effect(() => {
    const trackUrl = $activeTrack?.audio_url;
    if (audioElement && trackUrl) {
      audioElement.load(); // Fuerza al navegador a descargar el nuevo MP3
      if ($isPlaying) {
        audioElement.play().catch(() => console.log("Esperando interacción...", ));
      }
    }
  });

  // CANAL 2: Control de Transporte (Play / Pause)
  // Controla el estado físico del reproductor sin reiniciar la canción
  $effect(() => {
    const playing = $isPlaying;
    if (audioElement && $activeTrack?.audio_url) {
      if (playing && audioElement.paused) {
        audioElement.play().catch(() => console.log("Error al reproducir:", ));
      } else if (!playing && !audioElement.paused) {
        audioElement.pause();
      }
    }
  });

  // CANAL 3: Ganancia (Master Volume)
  $effect(() => {
    if (audioElement) {
      audioElement.volume = $masterVolume / 100;
    }
  });

  function updateTime() { if (audioElement) currentTime.set(audioElement.currentTime); }
  function updateMetadata() { if (audioElement) duration.set(audioElement.duration); }
  function handleEnd() {
    if ($activeIndex < $globalTracks.length - 1) {
      activeIndex.update(n => n + 1);
      isPlaying.set(true);
    } else {
      isPlaying.set(false);
    }
  }
</script>
<!-- BANNER TEMPORAL BETA -->
<div class="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-b border-surface-border py-3 text-center relative z-[100] shadow-md">
  <p class="text-[0.75rem] font-mono text-surface-border tracking-wider">
    <span class="w-2 h-2 inline-block rounded-full bg-neon-green animate-pulse mr-2"></span>
    <span class="text-white font-bold uppercase mr-1">V. BETA:</span> Plataforma en fase de calibración. Si tienes feedback, usa el formulario de <a href="#contacto" class="text-neon-green hover:text-white transition-colors font-bold underline underline-offset-2">Contacto</a>.
  </p>
</div>

<header class="w-full p-8 absolute top-0 left-0 z-50 flex justify-between items-center">
  <div class="flex items-center gap-3 group">
    <div class="pointer-events-auto">
      <AnalogKnob bind:value={$masterVolume} size={44} />
    </div>
    <a href="/" class="font-rubik text-2xl font-black text-white tracking-widest hover:text-white/80 transition-colors cursor-pointer">
      AB.
    </a>
  </div>
  <div class="hidden md:flex gap-10 items-center pr-4">
    <a href="/#servicios" class="text-[0.95rem] font-medium text-white/70 hover:text-white transition-colors">Servicios</a>
    <a href="/#beats" class="text-[0.95rem] font-medium text-white/70 hover:text-white transition-colors">Beats</a>
    <a href="/bio" class="text-[0.95rem] font-medium text-white/70 hover:text-white transition-colors">Sobre Mí</a>
    <a href="/contacto" class="text-[0.9rem] font-medium text-gold-base border border-gold-base/50 rounded-lg px-6 py-2 hover:bg-gold-base/10 transition-colors ml-2">
      Contacto
    </a>
  </div>
</header>

<!-- Paginación -->
<main class="pb-[40px]">
  {@render children()}
</main>

<!-- FOOTER GLOBAL RESTAURADO -->
<footer class="bg-surface-100 rounded-tl-[100px] pt-24 pb-[120px] px-8 mt-20 border-t border-l border-surface-border">
  <div class="max-w-[1200px] mx-auto">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
      <div class="lg:col-span-4">
        <div class="flex items-center gap-4 mb-6">
          
          <div class="pointer-events-none opacity-90">
            <AnalogKnob value={85} size={44} />
          </div>
          
          <a href="/" class="font-rubik font-bold text-2xl text-white tracking-widest hover:text-white/80 transition-colors cursor-pointer">
            AB.
          </a>
        </div>
        <p class="text-surface-border text-[0.95rem] leading-[1.8] max-w-[350px]">
          Producción musical, mezcla y mastering. El puente entre tu mente y los monitores. Tu sonido, materializado con flujo de trabajo ágil en Ableton Live.
        </p>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-5 lg:pl-8">
        <h4 class="font-rubik font-bold text-white text-[0.75rem] uppercase tracking-[2px] mb-2">Estudio</h4>
        <a href="/#servicios" class="text-surface-border hover:text-white transition-colors text-[0.9rem] font-medium w-fit">Servicios</a>
        <a href="/#beats" class="text-surface-border hover:text-white transition-colors text-[0.9rem] font-medium w-fit">Beats</a>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-5">
        <h4 class="font-rubik font-bold text-white text-[0.75rem] uppercase tracking-[2px] mb-2">Conectar</h4>
        <a href="/bio" class="text-surface-border hover:text-white transition-colors text-[0.9rem] font-medium w-fit">Sobre Mí</a>
        <a href="/contacto" class="text-surface-border hover:text-white transition-colors text-[0.9rem] font-medium w-fit">Contacto</a>
      </div>

      <div class="lg:col-span-4 lg:flex lg:justify-end">
        <div>
          <h4 class="font-rubik font-bold text-white text-[0.75rem] uppercase tracking-[2px] mb-6 lg:text-right">Redes</h4>
          <div class="grid grid-cols-3 gap-3 w-max">
            
            <div class="relative w-14 h-14 group/lock">
              <div class="pointer-events-none opacity-25 blur-[0.5px] grayscale w-full h-full flex items-center justify-center border border-surface-border rounded-xl text-surface-border">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div title="En Calibración" class="absolute inset-0 bg-surface-100/10 backdrop-blur-[2px] flex items-center justify-center rounded-xl border border-surface-border/50 z-10 cursor-not-allowed transition-all group-hover/lock:border-neon-pink/50 group-hover/lock:bg-surface-100/30">
                <span class="font-mono text-[0.45rem] text-neon-pink uppercase tracking-[1px] font-bold text-center leading-tight">En<br>Calib</span>
              </div>
            </div>

            <div class="relative w-14 h-14 group/lock">
              <div class="pointer-events-none opacity-25 blur-[0.5px] grayscale w-full h-full flex items-center justify-center border border-surface-border rounded-xl text-surface-border">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </div>
              <div title="En Calibración" class="absolute inset-0 bg-surface-100/10 backdrop-blur-[2px] flex items-center justify-center rounded-xl border border-surface-border/50 z-10 cursor-not-allowed transition-all group-hover/lock:border-danger-rec/50 group-hover/lock:bg-surface-100/30">
                <span class="font-mono text-[0.45rem] text-danger-rec uppercase tracking-[1px] font-bold text-center leading-tight">En<br>Calib</span>
              </div>
            </div>

            <div class="relative w-14 h-14 group/lock">
              <div class="pointer-events-none opacity-25 blur-[0.5px] grayscale w-full h-full flex items-center justify-center border border-surface-border rounded-xl text-surface-border">
                 <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </div>
              <div title="En Calibración" class="absolute inset-0 bg-surface-100/10 backdrop-blur-[2px] flex items-center justify-center rounded-xl border border-surface-border/50 z-10 cursor-not-allowed transition-all group-hover/lock:border-neon-green/50 group-hover/lock:bg-surface-100/30">
                <span class="font-mono text-[0.45rem] text-neon-green uppercase tracking-[1px] font-bold text-center leading-tight">En<br>Calib</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-surface-border mb-8"></div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <p class="text-surface-border text-[0.8rem] font-rubik tracking-widest uppercase">
        Copyright &copy; Alex Benavides.
      </p>
    </div>
  </div>
</footer>

<!-- EL MOTOR FÍSICO DE AUDIO -->
<audio
  bind:this={audioElement}
  src={$activeTrack?.audio_url}
  ontimeupdate={updateTime}
  onloadedmetadata={updateMetadata}
  onended={handleEnd}
  preload="metadata"
></audio>

<!-- LA BARRA INFERIOR (Solo aparece si el catálogo cargó) -->
{#if !cargando && $globalTracks.length > 0}
  <MiniPlayer />
{/if}