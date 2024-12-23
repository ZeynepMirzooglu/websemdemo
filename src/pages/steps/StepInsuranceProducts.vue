<template>
    <div>
      <h3>Adım 3: Sigorta Ürünleri Seçimi</h3>
  
      <va-button color="primary" outline @click="prevStep">
        Geri
      </va-button>
      <va-button color="primary" class="ml-2" @click="fetchInsuranceProducts">
        Ürünleri Getir
      </va-button>
  
      <div class="product-list" v-if="products.length">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="product-card"
        >
          <va-card :title="product.title" :subtitle="product.subtitle" class="mt-2">
            <template #content>
              <p>{{ product.description }}</p>
            </template>
            <template #footer>
              <va-button color="success" @click="selectProduct(product)">
                Seç
              </va-button>
            </template>
          </va-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import { useFormStore } from '@/stores/index'
  import { getInsuranceProducts } from '@/services/api'
  
  export default {
    name: 'StepInsuranceProducts',
    emits: ['nextStep', 'prevStep'],
    setup(props, { emit }) {
      const formStore = useFormStore()
      const products = ref([])
  
      const fetchInsuranceProducts = async () => {
        try {
          // Örnek: backend'e kampanya kodu ve kişisel bilgileri gönderip ürünleri alabiliriz
          const payload = {
            campaignCode: formStore.campaignCode,
            personalInfo: formStore.personalInfo,
            spouseInfo: formStore.spouseInfo,
            children: formStore.children
          }
          const response = await getInsuranceProducts(payload)
          products.value = response.products || []
        } catch (error) {
          console.error('Ürünleri getirirken hata:', error)
        }
      }
  
      const selectProduct = (product) => {
        formStore.setSelectedProduct(product)
        emit('nextStep')
      }
  
      const prevStep = () => {
        emit('prevStep')
      }
  
      onMounted(() => {
        // Komponent açılınca otomatik ürünleri getirmek isterseniz:
        // fetchInsuranceProducts()
      })
  
      return {
        products,
        fetchInsuranceProducts,
        selectProduct,
        prevStep
      }
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
  }
  .product-card {
    margin-bottom: 8px;
  }
  </style>
  