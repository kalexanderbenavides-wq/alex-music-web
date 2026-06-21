<script>
  let { value = $bindable(85), min = 0, max = 100, height = 120, label = "" } = $props();

  let percentage = $derived(Math.max(0, Math.min(1, (value - min) / (max - min))));
  let bottomPos = $derived(percentage * 100);

  let ledColor = $derived(
    percentage >= 0.85 ? '#ff3b30' : 
    percentage >= 0.60 ? '#ffcc00' : 
    '#34c759'                        
  );
</script>

<div class="relative flex flex-col items-center group">
  <div class="relative flex justify-center w-12" style="height: {height}px;">
    
    <div class="absolute w-1.5 h-full bg-[#050505] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,1)] border border-[#1a1a1a] overflow-hidden">
      <div 
        class="absolute left-0 w-full transition-transform duration-100 ease-out opacity-80 group-hover:opacity-100 group-hover:brightness-125" 
        style="height: 100%; bottom: -100%; background: linear-gradient(to top, #34c759 0%, #ffcc00 60%, #ff3b30 100%); transform: translateY(-{bottomPos}%);"
      ></div>
    </div>

    <div class="absolute w-10 h-5 bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-sm border border-[#333] shadow-[0_5px_10px_rgba(0,0,0,0.8)] pointer-events-none z-10 flex items-center justify-center transition-all duration-100 ease-out" style="bottom: calc({bottomPos}% - 10px);">
      <div class="w-full h-[2px] shadow-[0_0_8px_var(--glow)] transition-all duration-300 group-hover:shadow-[0_0_15px_var(--glow)]" style="background-color: {ledColor}; --glow: {ledColor};"></div>
    </div>

    <input type="range" {min} {max} bind:value class="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize m-0 z-20 touch-none pointer-events-auto" style="writing-mode: vertical-lr; direction: rtl;" />
  </div>

  <div class="mt-4 flex flex-col items-center">
    <span class="text-[0.70rem] font-mono font-bold transition-colors duration-300 drop-shadow-[0_0_5px_var(--glow)] group-hover:brightness-125" style="color: {ledColor}; --glow: {ledColor};">
      {Math.round(value)}
    </span>
    {#if label}
      <span class="text-[0.6rem] text-surface-border font-bold uppercase tracking-widest mt-1">{label}</span>
    {/if}
  </div>
</div>