<template>
  <div class="min-h-screen bg-green-500 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        👋 Halaman About
      </h1>
      <p class="text-gray-600 mb-4">
        Selamat! Anda berhasil pindah halaman!
      </p>
      
      <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-6">
        <h3 class="font-bold text-green-800 mb-2">📝 Penjelasan:</h3>
        <ul class="text-green-700 text-sm space-y-1">
          <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/about.vue</code></li>
          <li>• Route otomatis: <code class="bg-white px-2 py-1 rounded">/about</code></li>
          <li>• Nama file = nama route!</li>
        </ul>
      </div>

      <NuxtLink 
        to="/" 
        class="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        ← Kembali ke Home
      </NuxtLink>
    </div>
  </div>
</template>
