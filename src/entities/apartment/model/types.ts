export type LayoutType = 'studio' | 'euro' | 'free'
export type DeliveryStatus = 'delivered' | 'not_delivered'

export interface Apartment {
  id: string
  rooms: number
  layoutType: LayoutType
  floor: number
  totalFloors: number
  area: number
  building: string
  deliveryStatus: DeliveryStatus
  image: string
  gallery: string[]
}

export interface ApartmentsResponse {
  data: Apartment[]
  total: number
}

export interface ApartmentFilters {
  rooms: number[]
  areaMin: number
  areaMax: number
  floorMin: number
  floorMax: number
  layoutType: LayoutType | ''
  deliveryStatus: DeliveryStatus | ''
}

export const AREA_MIN = 25
export const AREA_MAX = 120
export const FLOOR_MIN = 1
export const FLOOR_MAX = 25

export const ROOM_OPTIONS = [
  { value: 0, label: 'С' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
] as const

export const LAYOUT_LABELS: Record<LayoutType, string> = {
  studio: 'Студийная',
  euro: 'Евро',
  free: 'Свободная',
}

export const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  delivered: 'Сдан',
  not_delivered: 'Не сдан',
}
