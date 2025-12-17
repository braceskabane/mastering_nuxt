<template>
  <div class="min-h-screen bg-purple-500 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">
          📊 Dashboard
        </h1>

        <!-- Ini adalah KUNCI dari Nested Routes -->
        <!-- Child routes akan muncul di sini 👇 -->
        <div class="bg-gray-50 p-6 rounded-lg mb-6">
          <NuxtPage />
        </div>

        <div class="space-y-4">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 class="font-bold text-blue-800 mb-2">📝 Penjelasan Parent:</h3>
            <ul class="text-blue-700 text-sm space-y-1">
              <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/dashboard.vue</code></li>
              <li>• Route: <code class="bg-white px-2 py-1 rounded">/dashboard</code></li>
              <li>• Tag <code class="bg-white px-2 py-1 rounded">&lt;NuxtPage /&gt;</code> adalah tempat child muncul</li>
            </ul>
          </div>

          <NuxtLink 
            to="/" 
            class="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            ← Kembali ke Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
