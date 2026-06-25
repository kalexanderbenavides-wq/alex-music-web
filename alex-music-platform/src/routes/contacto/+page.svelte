<section class="min-h-screen bg-surface-0 relative flex items-center justify-center py-32 px-4 overflow-hidden">
  
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-neon-pink opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

  <div class="max-w-[1000px] w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
    
    <div>
      <div class="inline-block border border-surface-border bg-surface-100/50 backdrop-blur-md px-4 py-1 rounded-full mb-8">
        <span class="font-mono text-neon-pink text-xs font-bold tracking-widest uppercase">
          <span class="inline-block w-2 h-2 rounded-full bg-neon-pink mr-2 animate-pulse" aria-hidden="true"></span>
          Inbox Abierto
        </span>
      </div>
      <h1 class="font-rubik font-bold text-[3.5rem] mb-6 text-white leading-tight">
        Inicia tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-white">proyecto.</span>
      </h1>
      <p class="text-white/80 mb-10 text-[1.15rem] leading-relaxed font-light max-w-md">
        ¿Listo para materializar esa idea? Cuéntame qué tienes en mente y armemos el ruteo para llevar tu sonido al siguiente nivel.
      </p>
      
      <div class="flex flex-col gap-6">
        <a href="mailto:hola@alexbenavides.com" class="flex items-center gap-4 text-white font-rubik font-medium text-[1.1rem] hover:text-neon-pink transition-colors group focus:outline-none focus:ring-2 focus:ring-neon-pink rounded-xl p-2 -ml-2">
          <div class="w-12 h-12 rounded-full bg-surface-100 border border-surface-border flex items-center justify-center group-hover:border-neon-pink transition-colors" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neon-pink"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </div>
          alexbenavidesguit@gmail.com
        </a>
      </div>
    </div>

    <form action="https://api.web3forms.com/submit" method="POST" class="bg-surface-100/40 backdrop-blur-md p-8 md:p-10 rounded-[24px] border border-surface-border shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative">
      
      <input type="hidden" name="access_key" value="708601f5-fe99-41f1-b26d-21f7b0ac24a6">
      
      <input type="checkbox" name="botcheck" class="hidden" style="display: none;" aria-hidden="true">

      <div class="space-y-6">
        <div>
          <label for="name" class="block text-[0.8rem] font-bold text-surface-border uppercase tracking-widest mb-2">Tu Nombre / Artista</label>
          <input type="text" id="name" name="nombre" class="w-full bg-surface-0 border border-surface-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,73,122,0.15)] transition-all" placeholder="Ej: Cory Wong..." required aria-required="true" />
        </div>
        
        <div>
          <label for="email" class="block text-[0.8rem] font-bold text-surface-border uppercase tracking-widest mb-2">Correo Electrónico</label>
          <input type="email" id="email" name="email" class="w-full bg-surface-0 border border-surface-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,73,122,0.15)] transition-all" placeholder="tu@correo.com" required aria-required="true" />
        </div>
        
        <div>
          <label for="message" class="block text-[0.8rem] font-bold text-surface-border uppercase tracking-widest mb-2">Detalles del proyecto</label>
          <textarea id="message" name="mensaje" rows="4" class="w-full bg-surface-0 border border-surface-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,73,122,0.15)] transition-all resize-none" placeholder="Hola, necesito materializar..." required aria-required="true"></textarea>
        </div>
        
        <button type="submit" class="w-full relative inline-flex items-center justify-center gap-4 px-8 py-5 font-rubik font-bold uppercase tracking-[3px] text-white transition-all duration-100 rounded-lg bg-gradient-to-br from-surface-300 to-surface-100 border-2 border-surface-border shadow-[0_4px_0_#111,0_8px_15px_rgba(0,0,0,0.4)] active:shadow-[0_0_0_#111] active:translate-y-1 hover:border-surface-200 cursor-pointer group mt-2 focus:outline-none focus:ring-2 focus:ring-danger-rec focus:ring-offset-2 focus:ring-offset-surface-0">
          <div class="w-4 h-4 rounded-full border-2 border-[#550000] bg-danger-rec shadow-[0_0_10px_#ff0000,inset_0_0_5px_#ffffff] group-hover:shadow-[0_0_15px_#ff2a2a,0_0_30px_#ff0000,inset_0_0_5px_#ffffff] transition-shadow duration-300" aria-hidden="true"></div>
          <span class="mt-1">Enviar Mensaje</span>
        </button>
      </div>
    </form>

  </div>
</section>