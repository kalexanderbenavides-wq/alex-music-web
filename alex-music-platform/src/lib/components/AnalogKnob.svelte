<script>
  let { value = $bindable(50), min = 0, max = 100, size = 120, label = "" } = $props();

  let uid = $state(Math.random().toString(36).substr(2, 9));

  let percentage = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
  let rotation = $derived(-135 + percentage * 270);
  let litLength = $derived(percentage * 188.5); 

  let indicatorColor = $derived(
    percentage >= 0.85 ? '#ff3b30' : 
    percentage >= 0.60 ? '#ffcc00' : 
    '#34c759'                        
  );
</script>

<div class="relative flex flex-col items-center justify-center group" style="width: {size}px; height: {size}px;">
  
  <svg class="absolute inset-0 w-full h-full transform rotate-[135deg]" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="ledGradient_{uid}" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-135 50 50)">
        <stop offset="0%" stop-color="#34c759" />
        <stop offset="50%" stop-color="#ffcc00" />
        <stop offset="100%" stop-color="#ff3b30" />
      </linearGradient>

      <mask id="trackMask_{uid}">
        <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="10" stroke-dasharray="188.5 260" stroke-linecap="round" />
      </mask>

      <mask id="progressMask_{uid}">
        <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="10" stroke-dasharray="{litLength} 260" stroke-linecap="round" />
      </mask>

      <filter id="ledGlow_{uid}" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="2 4" stroke-linecap="round" mask="url(#trackMask_{uid})" />
    <!-- Al pasar el cursor, los LEDs brillan más intenso -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#ledGradient_{uid})" stroke-width="3" stroke-dasharray="2 4" stroke-linecap="round" mask="url(#progressMask_{uid})" filter="url(#ledGlow_{uid})" class="transition-all duration-300 group-hover:brightness-125" />
  </svg>

  <div class="absolute w-[66%] h-[66%] rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#050505] shadow-[0_10px_20px_rgba(0,0,0,0.9),inset_0_2px_2px_rgba(255,255,255,0.05)] border border-[#111] p-[2px]">
    <div class="w-full h-full rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#111] shadow-[inset_0_-2px_5px_rgba(0,0,0,0.8),inset_0_2px_3px_rgba(255,255,255,0.05)] relative" style="transform: rotate({rotation}deg);">
      <!-- El punto indicador gana un resplandor extra en hover -->
      <div class="absolute top-[12%] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full transition-all duration-300 group-hover:scale-125" style="background-color: {indicatorColor}; box-shadow: 0 0 8px {indicatorColor};"></div>
    </div>
  </div>

  <input type="range" {min} {max} bind:value class="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20 m-0 touch-none" />
</div>