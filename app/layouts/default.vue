<template>
  <div class="flex flex-col min-h-screen bg-magnus-bg">
    <header class="w-full bg-magnus-paper shadow-lg py-4 px-8 flex items-center justify-between magnus-header flex-shrink-0 border-b-2 border-magnus-faded">
      <div class="text-2xl font-bold text-magnus-text tracking-widest magnus-title drop-shadow font-typewriter">7th sea 角色表</div>
      <nav class="space-x-4">        
        <NuxtLink to="/" class="text-magnus-text hover:text-magnus-accent font-semibold transition duration-300">首頁</NuxtLink>
        <NuxtLink to="/2ndCharacter" class="text-magnus-text hover:text-magnus-accent font-semibold transition duration-300">七海二版角色表</NuxtLink>
      </nav>
    </header>
    <main class="flex-1 flex flex-col bg-magnus-bg">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.magnus-header {
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
}
.magnus-title {
  font-family: 'Google Sans Code', 'Google Sans Code', monospace;
  letter-spacing: 0.08em;
  text-shadow: 0 2px 8px rgba(249, 115, 22, 0.8), 0 1px 0 rgba(248, 250, 252, 0.2);
}
.font-typewriter {
  font-family: 'Google Sans Code', 'Google Sans Code', monospace !important;
}
</style>
