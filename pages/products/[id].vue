<template>
  <div class="min-h-screen bg-teal-500 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        
        <!-- Tampilkan produk jika ditemukan -->
        <div v-if="product">
          <div class="text-6xl mb-4 text-center">{{ product.icon }}</div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">
            {{ product.name }}
          </h1>
          <p class="text-2xl text-teal-600 mb-6 text-center font-semibold">
            Rp {{ product.price }}
          </p>

          <div class="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 class="font-semibold text-gray-800 mb-2">Deskripsi:</h2>
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <button class="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 mb-4">
            🛒 Tambah ke Keranjang
          </button>
        </div>

        <!-- Tampilkan error jika tidak ditemukan -->
        <div v-else class="text-center py-8">
          <div class="text-6xl mb-4">😢</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <p class="text-gray-600 mb-4">
            Produk dengan ID <code class="bg-gray-100 px-2 py-1 rounded">{{ productId }}</code> tidak ada
          </p>
        </div>

        <!-- Penjelasan PENTING tentang Dynamic Route -->
        <div class="bg-purple-50 border-l-4 border-purple-400 p-4 rounded mb-4">
          <h3 class="font-bold text-purple-800 mb-2">🔥 Dynamic Route - PENTING!</h3>
          <ul class="text-purple-700 text-sm space-y-2">
            <li>• File ini: <code class="bg-white px-2 py-1 rounded">pages/products/[id].vue</code></li>
            <li>• <strong>Bracket [id]</strong> artinya parameter yang bisa berubah</li>
            <li>• Route: <code class="bg-white px-2 py-1 rounded">/products/1</code>, <code class="bg-white px-2 py-1 rounded">/products/2</code>, <code class="bg-white px-2 py-1 rounded">/products/apapun</code></li>
            <li>• ID saat ini: <code class="bg-white px-2 py-1 rounded font-bold">{{ productId }}</code></li>
            <li>• Akses dengan: <code class="bg-white px-2 py-1 rounded">route.params.id</code></li>
          </ul>
        </div>

        <!-- Coba ID lain -->
        <div class="mb-4">
          <h3 class="font-semibold text-gray-700 mb-2">Coba ID lain:</h3>
          <div class="flex gap-2">
            <NuxtLink
              v-for="i in 6"
              :key="i"
              :to="`/products/${i}`"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ID {{ i }}
            </NuxtLink>
          </div>
        </div>

        <NuxtLink 
          to="/products" 
          class="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          ← Kembali ke List Produk
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Ambil route untuk akses params
const route = useRoute()

// Ambil ID dari URL parameter
const productId = computed(() => route.params.id)

// Data produk (dalam aplikasi nyata, ini dari API/database)
const allProducts = ref([
  { 
    id: '1', 
    name: 'Laptop Gaming', 
    price: '10.000.000', 
    icon: '💻',
    description: 'Laptop gaming dengan spesifikasi tinggi untuk gaming dan produktivitas'
  },
  { 
    id: '2', 
    name: 'Mouse Wireless', 
    price: '200.000', 
    icon: '🖱️',
    description: 'Mouse wireless ergonomis dengan DPI tinggi untuk presisi maksimal'
  },
  { 
    id: '3', 
    name: 'Keyboard Mechanical', 
    price: '500.000', 
    icon: '⌨️',
    description: 'Keyboard mechanical RGB dengan switch cherry MX untuk typing experience terbaik'
  },
  { 
    id: '4', 
    name: 'Monitor 4K', 
    price: '2.000.000', 
    icon: '🖥️',
    description: 'Monitor 4K 27 inch dengan refresh rate 144Hz untuk gaming dan editing'
  },
  { 
    id: '5', 
    name: 'Headphone Pro', 
    price: '800.000', 
    icon: '🎧',
    description: 'Headphone noise-cancelling dengan audio quality premium'
  },
  { 
    id: '6', 
    name: 'Webcam HD', 
    price: '600.000', 
    icon: '📷',
    description: 'Webcam 1080p untuk streaming dan video conference dengan kualitas jernih'
  }
])

// Cari produk berdasarkan ID dari parameter
const product = computed(() => {
  return allProducts.value.find(p => p.id === productId.value)
})
</script>
