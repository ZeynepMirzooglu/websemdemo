<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Sigorta Başvuru Formu</h2>
  
      <!-- Step'leri gösteren bir bileşen (Vuestic Steps örneği) -->
      <va-steps v-model="currentStep" :steps="steps" color="primary" />
  
      <!-- Adım 0: Kampanya ve Onaylar -->
      <div v-if="currentStep === 0">
        <StepCampaignCode @nextStep="goNextStep" />
      </div>
  
      <!-- Adım 1: Kişisel Bilgiler -->
      <div v-else-if="currentStep === 1">
        <StepPersonalInfo @nextStep="goNextStep" @prevStep="goPrevStep" />
      </div>
  
      <!-- Adım 2: Sigorta Ürünleri Seçimi -->
      <div v-else-if="currentStep === 2">
        <StepInsuranceProducts @nextStep="goNextStep" @prevStep="goPrevStep" />
      </div>
  
      <!-- Adım 3: Ödeme -->
      <div v-else-if="currentStep === 3">
        <StepPayment @prevStep="goPrevStep" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import StepCampaignCode from './steps/StepCampaignCode.vue'
  import StepPersonalInfo from './steps/StepPersonalInfo.vue'
  import StepInsuranceProducts from './steps/StepInsuranceProducts.vue'
  import StepPayment from './steps/StepPayment.vue'
  
  export default {
    name: 'MultiStepForm',
    components: {
      StepCampaignCode,
      StepPersonalInfo,
      StepInsuranceProducts,
      StepPayment
    },
    setup() {
      const currentStep = ref(0)
  
      // Vuestic UI Steps ya da kendi step gösterge bileşeninizi kullanabilirsiniz
      const steps = [
        { label: 'Kampanya Kodu' },
        { label: 'Kişisel Bilgiler' },
        { label: 'Ürün Seçimi' },
        { label: 'Ödeme' }
      ]
  
      const goNextStep = () => {
        currentStep.value++
      }
      const goPrevStep = () => {
        currentStep.value--
      }
  
      return {
        currentStep,
        steps,
        goNextStep,
        goPrevStep
      }
    }
  }
  </script>
  