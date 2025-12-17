<template>
  <div class="min-h-screen bg-orange-500 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">
          🛍️ Daftar Produk
        </h1>

        <!-- List Produk -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 transition"
          >
            <div class="text-3xl mb-2">{{ product.icon }}</div>
            <h3 class="font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-sm text-gray-600">Rp {{ product.price }}</p>
            <p class="text-xs text-blue-600 mt-2">Klik untuk detail →</p>
          </NuxtLink>
        </div>

        <!-- Penjelasan -->
        <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded mb-4">
          <h3 class="font-bold text-orange-800 mb-2">📝 Penjelasan:</h3>
          <ul class="text-orange-700 text-sm space-y-1">
            <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/products.vue</code></li>
            <li>• Route: <code class="bg-white px-2 py-1 rounded">/products</code></li>
            <li>• Link ke detail: <code class="bg-white px-2 py-1 rounded">/products/1</code>, <code class="bg-white px-2 py-1 rounded">/products/2</code>, dst</li>
            <li>• Angka di akhir URL adalah <strong>parameter dynamic</strong></li>
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
</template>

<script setup>
import { ref } from 'vue'

// Data produk sederhana
const products = ref([
  { id: 1, name: 'Laptop', price: '10.000.000', icon: '💻' },
  { id: 2, name: 'Mouse', price: '200.000', icon: '🖱️' },
  { id: 3, name: 'Keyboard', price: '500.000', icon: '⌨️' },
  { id: 4, name: 'Monitor', price: '2.000.000', icon: '🖥️' },
  { id: 5, name: 'Headphone', price: '800.000', icon: '🎧' },
  { id: 6, name: 'Webcam', price: '600.000', icon: '📷' }
])
</script>
