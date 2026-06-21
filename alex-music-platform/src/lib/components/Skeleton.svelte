<!-- src/lib/components/Skeleton.svelte -->
<div class="animate-pulse bg-surface-100 rounded-[24px] border border-surface-border p-6 md:p-8 flex flex-col md:flex-row gap-8 w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
  
  <!-- Cuadro de la portada falsa -->
  <div class="w-full md:w-[260px] aspect-square flex-shrink-0 rounded-[16px] bg-surface-200 border border-surface-border/30"></div>

  <!-- Controles y líneas falsas -->
  <div class="flex-1 flex flex-col justify-between py-4">
    <div>
      <div class="w-32 h-3 bg-surface-200 rounded-full mb-6"></div>
      <div class="w-3/4 h-8 bg-surface-200 rounded-full mb-4"></div>
      <div class="w-16 h-4 bg-surface-200 rounded-full mb-10"></div>
      
      <!-- Línea de tiempo falsa -->
      <div class="w-full h-1.5 bg-surface-200 rounded-full mb-8"></div>
    </div>

    <!-- Lista de canciones falsas -->
    <div class="flex flex-col gap-3">
      <div class="w-full h-12 bg-surface-200/50 rounded-xl"></div>
      <div class="w-full h-12 bg-surface-200/50 rounded-xl"></div>
      <div class="w-full h-12 bg-surface-200/50 rounded-xl"></div>
    </div>
  </div>
</div>