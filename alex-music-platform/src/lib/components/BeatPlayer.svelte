<script>
  import Fader from './Fader.svelte';

  // Recibimos todo el catálogo de Supabase
  let { tracks = [] } = $props();

  // Variables del motor
  let activeIndex = $state(0);
  let isPlaying = $state(false);
  let volume = $state(75);
  let audioElement = $state();
  let currentTime = $state(0);
  let duration = $state(0);

  // Saber cuál es la pista actual
  let activeTrack = $derived(tracks[activeIndex] || {});

  // Funciones de reproducción
  function togglePlay(index) {
    if (tracks.length === 0) return;

    if (index === activeIndex) {
      if (isPlaying) audioElement.pause();
      else audioElement.play();
      isPlaying = !isPlaying;
    } else {
      activeIndex = index;
      isPlaying = true;
      // Pequeño retraso para que el audio cargue antes de darle play
      setTimeout(() => audioElement.play(), 50);
    }
  }

  function nextTrack() {
    if (activeIndex < tracks.length - 1) {
      togglePlay(activeIndex + 1);
    }
  }

  function prevTrack() {
    if (activeIndex > 0) {
      togglePlay(activeIndex - 1);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Conectar el Fader de volumen al audio real
  $effect(() => {
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  });
</script>

<div class="bg-surface-100 rounded-[24px] border border-surface-border p-6 md:p-8 flex flex-col md:flex-row gap-8 w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
  
  <div class="w-full md:w-[260px] aspect-square flex-shrink-0 rounded-[16px] overflow-hidden shadow-lg border border-surface-border/50 bg-surface-200">
    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" class="w-full h-full object-cover" alt="Cover Art">
  </div>

  <div class="flex-1 flex flex-col justify-between">
    
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
        <p class="text-neon-green text-[0.65rem] font-bold tracking-[3px] uppercase">Reproduciendo Ahora</p>
      </div>
      
      <h2 class="text-white text-3xl font-bold font-rubik mb-1">{activeTrack.titulo || 'Selecciona una pista'}</h2>
      <p class="text-surface-border text-sm font-medium uppercase tracking-widest">{activeTrack.bpm ? `${activeTrack.bpm} BPM` : ''}</p>

      <div class="flex items-center gap-4 mt-6">
        <span class="text-[0.75rem] text-surface-border font-mono w-10">{formatTime(currentTime)}</span>
        <div class="relative w-full h-1.5 bg-surface-300 rounded-full overflow-hidden cursor-pointer">
          <div class="absolute top-0 left-0 h-full bg-[#E0C68F] transition-all duration-100" style="width: {(currentTime / duration) * 100 || 0}%"></div>
        </div>
        <span class="text-[0.75rem] text-surface-border font-mono w-10">{formatTime(duration)}</span>
      </div>

      <div class="flex items-center gap-6 mt-6">
        <button onclick={prevTrack} class="text-surface-border hover:text-white transition-colors cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>
        </button>
        <button onclick={() => togglePlay(activeIndex)} class="w-14 h-14 flex items-center justify-center rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green/10 transition-colors shadow-[0_0_15px_rgba(35,250,157,0.2)] cursor-pointer">
          {#if isPlaying}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          {/if}
        </button>
        <button onclick={nextTrack} class="text-surface-border hover:text-white transition-colors cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2 border-t border-surface-border/50 pt-4 h-[180px] overflow-y-auto pr-2">
      {#each tracks as track, i}
        <div
          class="flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group {activeIndex === i ? 'bg-surface-200/80 border-surface-border' : 'border-transparent hover:bg-surface-200/40'}"
          onclick={() => togglePlay(i)}
        >
          <div class="flex items-center gap-4">
            <span class="text-surface-border text-xs font-mono w-4">{i + 1}</span>
            <span class="text-white text-sm font-medium font-rubik tracking-wide">{track.titulo}</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-[0.65rem] uppercase tracking-wider font-bold">
              {track.genero}
            </span>
            <button class="w-8 h-8 flex items-center justify-center rounded-full border border-surface-border group-hover:border-white transition-colors text-surface-border group-hover:text-white">
              {#if activeIndex === i && isPlaying}
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              {:else}
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="ml-0.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              {/if}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="hidden md:flex flex-col items-center justify-center border-l border-surface-border/50 pl-8 ml-2">
    <Fader bind:value={volume} height={180} />
    <span class="text-[0.65rem] text-surface-border font-mono mt-6">VOL</span>
    <span class="text-[0.8rem] text-white font-bold mt-1">{volume}</span>
  </div>

  <audio
    bind:this={audioElement}
    src={activeTrack?.audio_url}
    bind:currentTime={currentTime}
    bind:duration={duration}
    onended={nextTrack}
    preload="metadata"
  ></audio>

</div>