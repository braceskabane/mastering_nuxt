<template>
  <div class="min-h-screen bg-blue-500 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        🎉 Halo Nuxt 3!
      </h1>
      <p class="text-gray-600 mb-4">
        Ini adalah halaman pertama kita
      </p>
      
      <div class="space-y-3">
        <NuxtLink 
          to="/about" 
          class="block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-center"
        >
          Pergi ke About →
        </NuxtLink>

        <NuxtLink 
          to="/dashboard" 
          class="block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 text-center"
        >
          Pergi ke Dashboard (Nested Route) →
        </NuxtLink>

        <NuxtLink 
          to="/products" 
          class="block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 text-center"
        >
          🛍️ Produk (Dynamic Route) →
        </NuxtLink>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
        <h3 class="font-bold text-yellow-800 mb-2">📝 Penjelasan:</h3>
        <ul class="text-yellow-700 text-sm space-y-1">
          <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/index.vue</code></li>
          <li>• Route otomatis: <code class="bg-white px-2 py-1 rounded">/</code> (halaman utama)</li>
          <li>• Di Nuxt, setiap file di folder <code class="bg-white px-2 py-1 rounded">pages/</code> otomatis jadi route!</li>
          <li>• <code class="bg-white px-2 py-1 rounded">&lt;NuxtLink to="/about"&gt;</code> untuk pindah halaman</li>
        </ul>
      </div>
    </div>
  </div>
</template>
