<script>
  // ESTÁNDAR SVELTE 5 (Runes Mode)
  // Desestructuramos las propiedades directamente desde $props()
  let { 
    text = "Contactarme", 
    href = "#contacto" 
  } = $props();
</script>

<a 
  {href}
  class="relative inline-flex items-center justify-center gap-4 px-12 py-5 font-rubik font-bold uppercase tracking-[3px] text-white transition-all duration-100 rounded-lg bg-gradient-to-br from-surface-300 to-surface-100 border-2 border-surface-border shadow-hardware-btn active:shadow-hardware-pressed active:translate-y-1 hover:border-surface-200 cursor-pointer group"
>
  <div class="w-4 h-4 rounded-full border-2 border-[#550000] bg-danger-rec shadow-[0_0_10px_#ff0000,inset_0_0_5px_#ffffff] animate-pulse group-hover:shadow-[0_0_15px_#ff2a2a,0_0_30px_#ff0000,inset_0_0_5px_#ffffff] transition-shadow duration-300"></div>
  
  <span class="mt-1">{text}</span>
</a>