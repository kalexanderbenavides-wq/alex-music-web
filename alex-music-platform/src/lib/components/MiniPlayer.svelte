<script>
  import AnalogKnob from './AnalogKnob.svelte';
  import {
    globalTracks, activeIndex, isPlaying, 
    currentTime, duration, activeTrack, masterVolume
  } from '$lib/stores/playerStore.js';

  function togglePlay() {
    if ($globalTracks.length === 0) return;
    isPlaying.update(n => !n);
  }

  function nextTrack() {
    if ($activeIndex < $globalTracks.length - 1) {
      activeIndex.update(n => n + 1);
      isPlaying.set(true);
    }
  }

  function prevTrack() {
    if ($activeIndex > 0) {
      activeIndex.update(n => n - 1);
      isPlaying.set(true);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
</script>

<div class="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-[#1a1a1a] shadow-[0_-10px_30px_rgba(0,0,0,0.9)] z-50 px-4 h-20 flex items-center justify-between pointer-events-auto">
  
  <div class="flex items-center gap-4 w-1/4 min-w-[200px]">
    <div class="w-12 h-12 rounded-md overflow-hidden border border-[#2a2a2a] bg-[#111]">
      <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=150&auto=format&fit=crop" class="w-full h-full object-cover" alt="Cover">
    </div>
    <div class="flex flex-col">
      <span class="text-white font-rubik font-bold text-sm line-clamp-1">{$activeTrack.titulo || 'Selecciona una pista'}</span>
      <span class="text-[#555] text-[0.65rem] uppercase tracking-widest font-mono">{$activeTrack.genero || '---'}</span>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center flex-1 max-w-[500px]">
    <div class="flex items-center gap-6 mb-1">
      <button onclick={prevTrack} class="text-[#555] hover:text-white transition-colors cursor-pointer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>
      </button>
      
      <button 
        onclick={togglePlay} 
        class="w-14 h-14 flex items-center justify-center rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green/10 transition-colors shadow-[0_0_15px_rgba(35,250,157,0.2)] cursor-pointer"
      >
        {#if $isPlaying}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        {:else}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        {/if}
      </button>
      
      <button onclick={nextTrack} class="text-[#555] hover:text-white transition-colors cursor-pointer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>
      </button>
    </div>
    
    <div class="flex items-center gap-3 w-full">
      <span class="text-[0.65rem] text-[#555] font-mono w-8 text-right">{formatTime($currentTime)}</span>
      <div class="relative flex-1 h-1 bg-[#1a1a1a] rounded-full overflow-hidden cursor-pointer">
        <div class="absolute top-0 left-0 h-full bg-white transition-all duration-100" style="width: {($currentTime / $duration) * 100 || 0}%"></div>
      </div>
      <span class="text-[0.65rem] text-[#555] font-mono w-8">{formatTime($duration)}</span>
    </div>
  </div>

  <div class="flex items-center justify-end gap-3 w-1/4 min-w-[150px] pr-4">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#555]"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
    <AnalogKnob bind:value={$masterVolume} size={36} />
  </div>
</div>