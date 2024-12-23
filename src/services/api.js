import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com', // backend’inizin adresi
  headers: { 'Content-Type': 'application/json' }
})

// Örnek: Ürün listesini al
export const getInsuranceProducts = async (formData) => {
  try {
    const response = await api.post('/insurance/products', formData)
    return response.data
  } catch (error) {
    console.error('getInsuranceProducts error:', error)
    throw error
  }
}

// Örnek: Ödeme fonksiyonu
export const submitPayment = async (paymentData) => {
  try {
    const response = await api.post('/insurance/payment', paymentData)
    return response.data
  } catch (error) {
    console.error('submitPayment error:', error)
    throw error
  }
}

export default api
