interface DeliveryFeesRoot {
  has_more: boolean
  total_data: number
  data: DeliveryFeesDaum[]
  links: DeliveryFeesLinks
}

interface DeliveryFeesDaum {
  wilaya_id: number
  wilaya_name: string
  home_fee: number
  desk_fee: number
}

interface DeliveryFeesLinks {
  self: string
}

interface CentersRoot {
  has_more: boolean
  total_data: number
  data: CentersDaum[]
  links: CentersLinks
}

interface CentersDaum {
  center_id: number
  name: string
  address: string
  gps: string
  commune_id: number
  commune_name: string
  wilaya_id: number
  wilaya_name: string
}

interface CentersLinks {
  self: string
}

interface CommunesRoot {
  has_more: boolean
  total_data: number
  data: CommunesDaum[]
  links: CommunesLinks
}

interface CommunesDaum {
  id: number
  name: string
  wilaya_id: number
  wilaya_name: string
  has_stop_desk: number
  is_deliverable: number
  delivery_time_parcel: number
  delivery_time_payment: number
}

interface CommunesLinks {
  self: string
  before: string
}
