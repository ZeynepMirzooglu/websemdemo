import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    // Adım 1: Kampanya
    campaignCode: '',
    isLightingInfoChecked: false,
    isConsentChecked: false,

    // Adım 2: Kişisel Bilgiler
    personalInfo: {
      name: '',
      surname: '',
      tcNo: ''
    },
    spouseInfo: {
      name: '',
      surname: '',
      tcNo: ''
    },
    children: [], // { name, surname, tcNo } gibi objeler barındırabilir

    // Adım 3: Sigorta Ürünleri
    insuranceProducts: [],
    selectedProduct: null,

    // Adım 4: Ödeme
    paymentInfo: {
      cardNumber: '',
      holderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: ''
    }
  }),
  actions: {
    // setCampaignCode, setPersonalInfo gibi aksiyonlarla state'i güncelleyebiliriz.
    setCampaignCode(value) {
      this.campaignCode = value
    },
    setLightingInfoChecked(value) {
      this.isLightingInfoChecked = value
    },
    setConsentChecked(value) {
      this.isConsentChecked = value
    },
    setPersonalInfo(payload) {
      this.personalInfo = { ...this.personalInfo, ...payload }
    },
    setSpouseInfo(payload) {
      this.spouseInfo = { ...payload }
    },
    setChildrenInfo(childrenArray) {
      this.children = [...childrenArray]
    },
    setInsuranceProducts(products) {
      this.insuranceProducts = products
    },
    setSelectedProduct(product) {
      this.selectedProduct = product
    },
    setPaymentInfo(payload) {
      this.paymentInfo = { ...this.paymentInfo, ...payload }
    }
  }
})
