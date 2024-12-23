<template>
    <div class="p-6 bg-gray-100">
      <h3>Adım 1: Kampanya Kodu ve Onaylar</h3>
  
      <form @submit.prevent="handleSubmit">
        <!-- Kampanya Kodu -->
        <va-input
          v-model="campaignCode"
          label="Kampanya Kodu"
          placeholder="Kampanya kodunu giriniz"
          required
        />
  
        <!-- Aydınlatma Metni Onayı -->
        <va-checkbox v-model="lightingInfoChecked">
          Aydınlatma metnini okudum ve kabul ediyorum
        </va-checkbox>
        <va-button
          size="small"
          :disabled="!lightingInfoChecked"
          @click="showLightingInfoModal = true"
        >
          Detay
        </va-button>
  
        <!-- Rıza Onayı -->
        <va-checkbox v-model="consentChecked">
          Kişisel verilerimin işlenmesine rıza gösteriyorum
        </va-checkbox>
        <va-button
          size="small"
          :disabled="!consentChecked"
          @click="showConsentModal = true"
        >
          Detay
        </va-button>
  
        <!-- Modallar -->
        <va-modal
          v-if="showLightingInfoModal"
          title="Aydınlatma Metni"
          :visible.sync="showLightingInfoModal"
        >
          <p>
            Burada detaylı aydınlatma metni içeriği yer alabilir...
          </p>
        </va-modal>
  
        <va-modal
          v-if="showConsentModal"
          title="Rıza Metni"
          :visible.sync="showConsentModal"
        >
          <p>
            Burada detaylı rıza metni içeriği yer alabilir...
          </p>
        </va-modal>
  
        <va-button
          type="submit"
          color="primary"
          class="mt-4"
          :disabled="!isFormValid"
        >
          Devam
        </va-button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useFormStore } from '@/stores/index'
  
  export default {
    name: 'StepCampaignCode',
    emits: ['nextStep'],
    setup(props, { emit }) {
      const formStore = useFormStore()
  
      const campaignCode = ref('')
      const lightingInfoChecked = ref(false)
      const consentChecked = ref(false)
  
      const showLightingInfoModal = ref(false)
      const showConsentModal = ref(false)
  
      // Formun geçerli olup olmadığını kontrol edelim
      const isFormValid = computed(() => {
        return (
          campaignCode.value.trim() !== '' &&
          lightingInfoChecked.value &&
          consentChecked.value
        )
      })
  
      const handleSubmit = () => {
        // Store’a kaydet
        formStore.setCampaignCode(campaignCode.value)
        formStore.setLightingInfoChecked(lightingInfoChecked.value)
        formStore.setConsentChecked(consentChecked.value)
  
        // Bir sonraki adıma geç
        emit('nextStep')
      }
  
      // Daha önce girilmiş değerleri store’dan geri yükleyebiliriz
      onMounted(() => {
        campaignCode.value = formStore.campaignCode
        lightingInfoChecked.value = formStore.isLightingInfoChecked
        consentChecked.value = formStore.isConsentChecked
      })
  
      return {
        campaignCode,
        lightingInfoChecked,
        consentChecked,
        showLightingInfoModal,
        showConsentModal,
        isFormValid,
        handleSubmit
      }
    }
  }
  </script>
  