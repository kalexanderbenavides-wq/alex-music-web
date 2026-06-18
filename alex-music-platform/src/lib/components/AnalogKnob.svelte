<script>
  // ESTÁNDAR SVELTE 5
  let { 
    value = $bindable(50), 
    min = 0, 
    max = 100, 
    size = 64, 
    label = "KNOB" 
  } = $props();

  // $derived calcula automáticamente la rotación cuando cambia el 'value'
  let percentage = $derived((value - min) / (max - min));
  let rotation = $derived(-135 + (percentage * 270));
</script>

<div class="relative inline-flex flex-col items-center group" style="width: {size}px;">
  <div class="relative flex items-center justify-center">
    
    <svg width={size} height={size} viewBox="0 0 64 64" class="pointer-events-none transition-transform duration-75">
      <circle cx="32" cy="32" r="28" fill="#0a0a0a" stroke="#27272a" stroke-width="2" class="group-hover:stroke-[#E0C68F] transition-colors"/>
      <circle cx="32" cy="32" r="22" fill="#1f1f1f" stroke="#111" stroke-width="1"/>
      
      <g transform="rotate({rotation} 32 32)">
        <line x1="32" y1="32" x2="32" y2="12" stroke="#E0C68F" stroke-width="4" stroke-linecap="round" 
              class="drop-shadow-[0_0_4px_rgba(224,198,143,0.5)]"/>
      </g>
      
      <circle cx="12" cy="52" r="2" fill="#555"/>
      <circle cx="52" cy="52" r="2" fill="#555"/>
    </svg>

    <input
      type="range"
      {min} {max}
      bind:value
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-10"
      title="Ajustar {label}"
    />
  </div>

  <span class="mt-2 text-[0.75rem] font-bold tracking-widest text-surface-border uppercase font-rubik group-hover:text-gold-base transition-colors">
    {label}
  </span>
</div>