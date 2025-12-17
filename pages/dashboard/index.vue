<template>
  <div class="bg-white p-6 rounded-lg border-2 border-green-400">
    <h2 class="text-2xl font-bold text-green-600 mb-4">
      ✅ Ini adalah CHILD route!
    </h2>
    <p class="text-gray-700 mb-4">
      Saya muncul di dalam tag <code class="bg-gray-100 px-2 py-1 rounded">&lt;NuxtPage /&gt;</code>
    </p>

    <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded">
      <h3 class="font-bold text-green-800 mb-2">📝 Penjelasan Child:</h3>
      <ul class="text-green-700 text-sm space-y-1">
        <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/dashboard/index.vue</code></li>
        <li>• Route: <code class="bg-white px-2 py-1 rounded">/dashboard</code> (sama dengan parent)</li>
        <li>• Karena namanya <code class="bg-white px-2 py-1 rounded">index.vue</code>, ini muncul di route parent</li>
        <li>• Saya di-render INSIDE parent, bukan replace!</li>
      </ul>
    </div>
  </div>
</template>
