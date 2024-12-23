<template>
    <div>
      <h3>Adım 2: Kişisel Bilgiler</h3>
  
      <!-- VeeValidate Form -->
      <Form @submit.prevent="onSubmit" v-slot="{ errors }">
        <!-- İsim -->
        <Field name="name" />
        <ErrorMessage name="name" />
        <va-input
          label="İsim"
          v-model="formValues.name"
          placeholder="Adınız"
          :error="errors.name"
        />
  
        <!-- Soyisim -->
        <Field name="surname" />
        <ErrorMessage name="surname" />
        <va-input
          label="Soyisim"
          v-model="formValues.surname"
          placeholder="Soyadınız"
          :error="errors.surname"
        />
  
        <!-- T.C. Kimlik No -->
        <Field name="tcNo" />
        <ErrorMessage name="tcNo" />
        <va-input
          label="T.C. Kimlik No"
          v-model="formValues.tcNo"
          placeholder="11111111111"
          :error="errors.tcNo"
        />
  
        <!-- Eş Bilgileri (Opsiyonel) -->
        <va-checkbox v-model="hasSpouse">
          Eş Bilgileri Ekle
        </va-checkbox>
        <div v-if="hasSpouse" class="mt-2">
          <va-input
            label="Eş Adı"
            v-model="formValues.spouse.name"
          />
          <va-input
            label="Eş Soyadı"
            v-model="formValues.spouse.surname"
          />
          <va-input
            label="Eş T.C. No"
            v-model="formValues.spouse.tcNo"
          />
        </div>
  
        <!-- Çocuk Bilgileri (Opsiyonel) -->
        <va-checkbox v-model="hasChildren">
          Çocuk Bilgileri Ekle
        </va-checkbox>
        <div v-if="hasChildren" class="mt-2">
          <div
            v-for="(child, index) in formValues.children"
            :key="index"
            class="child-section"
          >
            <va-input
              label="Çocuk Adı"
              v-model="child.name"
            />
            <va-input
              label="Çocuk Soyadı"
              v-model="child.surname"
            />
            <va-input
              label="Çocuk T.C. No"
              v-model="child.tcNo"
            />
          </div>
  
          <va-button size="small" @click.prevent="addChild">
            Çocuk Ekle
          </va-button>
        </div>
  
        <!-- Butonlar -->
        <div class="mt-4">
          <va-button color="primary" outline @click="prevStep">
            Geri
          </va-button>
          <va-button type="submit" color="primary" class="ml-2">
            Devam
          </va-button>
        </div>
      </Form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useFormStore } from '@/stores/index'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as Yup from 'yup'
  
  export default {
    name: 'StepPersonalInfo',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    emits: ['nextStep', 'prevStep'],
    setup(props, { emit }) {
      const formStore = useFormStore()
  
      // Yup şemamız
      const schema = Yup.object({
        name: Yup.string().required('İsim zorunludur'),
        surname: Yup.string().required('Soyisim zorunludur'),
        tcNo: Yup.string()
          .required('TC Kimlik No zorunludur')
          .matches(/^[0-9]{11}$/, 'TC Kimlik No 11 haneli olmalıdır')
      })
  
      const formValues = ref({
        name: '',
        surname: '',
        tcNo: '',
        spouse: { name: '', surname: '', tcNo: '' },
        children: []
      })
  
      const hasSpouse = ref(false)
      const hasChildren = ref(false)
  
      const addChild = () => {
        formValues.value.children.push({
          name: '',
          surname: '',
          tcNo: ''
        })
      }
  
      onMounted(() => {
        // Store'daki değerleri geri yükle
        formValues.value.name = formStore.personalInfo.name
        formValues.value.surname = formStore.personalInfo.surname
        formValues.value.tcNo = formStore.personalInfo.tcNo
  
        formValues.value.spouse = { ...formStore.spouseInfo }
        if (formStore.spouseInfo.name) {
          hasSpouse.value = true
        }
  
        formValues.value.children = [...formStore.children]
        if (formValues.value.children.length > 0) {
          hasChildren.value = true
        }
      })
  
      const onSubmit = async () => {
        try {
          // Validasyon kontrolü
          await schema.validate(formValues.value, { abortEarly: false })
  
          // Store'a kaydet
          formStore.setPersonalInfo({
            name: formValues.value.name,
            surname: formValues.value.surname,
            tcNo: formValues.value.tcNo
          })
  
          if (hasSpouse.value) {
            formStore.setSpouseInfo({ ...formValues.value.spouse })
          } else {
            formStore.setSpouseInfo({})
          }
  
          if (hasChildren.value) {
            formStore.setChildrenInfo(formValues.value.children)
          } else {
            formStore.setChildrenInfo([])
          }
  
          emit('nextStep')
        } catch (err) {
          console.error('Validasyon hataları:', err.errors)
        }
      }
  
      const prevStep = () => {
        emit('prevStep')
      }
  
      return {
        formValues,
        hasSpouse,
        hasChildren,
        addChild,
        onSubmit,
        prevStep
      }
    }
  }
  </script>
  
  <style scoped>
  .child-section {
    margin-top: 8px;
  }
  </style>
  