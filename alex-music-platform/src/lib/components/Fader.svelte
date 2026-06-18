<script>
  let { 
    value = $bindable(75), 
    min = 0, 
    max = 100, 
    height = 180, 
    label = "VOL" 
  } = $props();

  // Calculamos la posición de la tapa
  let percentage = $derived((value - min) / (max - min));
  let bottomPos = $derived(percentage * 100);
</script>

<div class="relative flex flex-col items-center">
  <div class="relative flex justify-center w-12 group" style="height: {height}px;">
    
    <div class="absolute w-2.5 h-full bg-surface-300 rounded-full border border-[#333] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] overflow-hidden">
        <div class="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-black"></div>
    </div>

    <div
      class="absolute w-10 h-7 bg-[#1a1a1a] rounded-sm border border-[#333] shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none group-hover:border-gold-base transition-colors duration-200 z-10"
      style="bottom: calc({bottomPos}% - 14px);"
    >
      <div class="absolute top-1/2 left-0 w-full h-[2px] bg-gold-base -translate-y-1/2 shadow-[0_0_8px_rgba(224,198,143,0.6)]"></div>
    </div>

    <input
      type="range"
      {min} {max}
      bind:value
      orient="vertical"
      class="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize m-0 z-20"
      style="-webkit-appearance: slider-vertical; writing-mode: bt-lr;"
    />
  </div>

  <div class="mt-4 flex flex-col items-center">
    <span class="text-gold-base text-[0.85rem] font-mono font-bold">{value}</span>
    <span class="text-[0.7rem] font-bold tracking-widest text-[#555] uppercase font-rubik mt-1">{label}</span>
  </div>
</div>