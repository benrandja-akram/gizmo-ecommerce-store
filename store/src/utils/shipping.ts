import { API_ID, API_TOKEN, YALIDINE_API } from './constants'

function api<T>(path: string, init?: RequestInit) {
  return fetch(new URL(path, YALIDINE_API), {
    next: {
      tags: ['shipping', path.replace(/\//g, '')],
      revalidate: 3600 * 24 * 7, // 1 week
    },
    ...init,
    headers: { 'X-API-ID': API_ID, 'X-API-TOKEN': API_TOKEN, ...init?.headers },
  }).then(async (res) => {
    const response = (await res.json()) as T
    if (res.ok) {
      return response
    }
    console.log(new URL(path, YALIDINE_API).toString(), response)
    throw res
  })
}

const getCommunes = () =>
  Promise.all([
    api<CommunesRoot>('communes?page=1&page_size=1000'),
    api<CommunesRoot>('communes?page=2&page_size=1000'),
  ]).then((centers) => centers.map((c) => c.data).flat())
const getCenters = () => api<CentersRoot>('centers?page_size=1000')
const getDeliveryFees = () =>
  api<DeliveryFeesRoot>('deliveryfees?page_size=1000')

export { getCenters, getCommunes, getDeliveryFees }
