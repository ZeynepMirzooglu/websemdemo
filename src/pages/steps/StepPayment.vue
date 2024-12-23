<template>
    <div>
      <h3>Adım 4: Ödeme Bilgileri</h3>
  
      <div v-if="selectedProduct">
        <p>Seçilen Ürün: <strong>{{ selectedProduct.title }}</strong></p>
      </div>
  
      <Form @submit.prevent="onSubmit" v-slot="{ errors }">
        <!-- Kart Numarası -->
        <Field name="cardNumber" />
        <ErrorMessage name="cardNumber" />
        <va-input
          label="Kart Numarası"
          v-model="formValues.cardNumber"
          placeholder="16 haneli kart numarası"
          :error="errors.cardNumber"
        />
  
        <!-- Kart Sahibinin Adı -->
        <Field name="holderName" />
        <ErrorMessage name="holderName" />
        <va-input
          label="Kart Sahibinin Adı"
          v-model="formValues.holderName"
          placeholder="Ad Soyad"
          :error="errors.holderName"
        />
  
        <!-- Son Kullanma Tarihi (Ay / Yıl) -->
        <div class="row">
          <div class="col">
            <Field name="expiryMonth" />
            <ErrorMessage name="expiryMonth" />
            <va-input
              label="Ay (AA)"
              v-model="formValues.expiryMonth"
              placeholder="12"
              :error="errors.expiryMonth"
            />
          </div>
          <div class="col">
            <Field name="expiryYear" />
            <ErrorMessage name="expiryYear" />
            <va-input
              label="Yıl (YY)"
              v-model="formValues.expiryYear"
              placeholder="25"
              :error="errors.expiryYear"
            />
          </div>
        </div>
  
        <!-- CVC -->
        <Field name="cvc" />
        <ErrorMessage name="cvc" />
        <va-input
          label="CVC"
          v-model="formValues.cvc"
          placeholder="123"
          :error="errors.cvc"
        />
  
        <!-- Butonlar -->
        <div class="mt-4">
          <va-button color="primary" outline @click="prevStep">
            Geri
          </va-button>
          <va-button
            type="submit"
            color="success"
            class="ml-2"
            :disabled="isPaymentLoading"
          >
            {{ isPaymentLoading ? 'Ödeme İşleniyor...' : 'Ödeme Yap' }}
          </va-button>
        </div>
      </Form>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useFormStore } from '@/stores/index'
  import { submitPayment } from '@/services/api'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as Yup from 'yup'
  
  export default {
    name: 'StepPayment',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    emits: ['prevStep'],
    setup(props, { emit }) {
      const formStore = useFormStore()
      const selectedProduct = computed(() => formStore.selectedProduct)
  
      // State
      const formValues = ref({
        cardNumber: '',
        holderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: ''
      })
      const isPaymentLoading = ref(false)
  
      // Validasyon şeması
      const schema = Yup.object({
        cardNumber: Yup.string()
          .required('Kart numarası zorunludur')
          .matches(/^[0-9]{16}$/, 'Kart numarası 16 haneli olmalıdır'),
        holderName: Yup.string().required('Kart sahibinin adı zorunludur'),
        expiryMonth: Yup.string()
          .required('Ay zorunludur')
          .matches(/^[0-9]{2}$/, 'Ay 2 haneli olmalıdır'),
        expiryYear: Yup.string()
          .required('Yıl zorunludur')
          .matches(/^[0-9]{2}$/, 'Yıl 2 haneli olmalıdır'),
        cvc: Yup.string()
          .required('CVC zorunludur')
          .matches(/^[0-9]{3}$/, 'CVC 3 haneli olmalıdır')
      })
  
      onMounted(() => {
        // Store’daki ödeme bilgisi varsa doldur
        formValues.value = {
          ...formValues.value,
          ...formStore.paymentInfo
        }
      })
  
      const onSubmit = async () => {
        try {
          // Validasyon
          await schema.validate(formValues.value, { abortEarly: false })
  
          // Pinia'ya kaydet
          formStore.setPaymentInfo(formValues.value)
  
          // Ödeme isteği
          isPaymentLoading.value = true
          const payload = {
            product: selectedProduct.value,
            payment: formValues.value
          }
          const response = await submitPayment(payload)
          isPaymentLoading.value = false
  
          alert('Ödeme başarılı! Teşekkürler.')
          // Burada bir teşekkür sayfasına yönlendirebilirsiniz.
        } catch (error) {
          isPaymentLoading.value = false
          if (error.name === 'ValidationError') {
            console.error('Validasyon hataları:', error.errors)
          } else {
            console.error('Ödeme hatası:', error)
          }
        }
      }
  
      const prevStep = () => {
        emit('prevStep')
      }
  
      return {
        selectedProduct,
        formValues,
        isPaymentLoading,
        onSubmit,
        prevStep
      }
    }
  }
  </script>
  
  <style scoped>
  .row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 8px;
  }
  .col {
    flex: 1;
  }
  </style>
  