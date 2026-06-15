import type { Apartment } from '../model/types'
import { DELIVERY_LABELS, LAYOUT_LABELS } from '../model/types'

export function formatRooms(rooms: number): string {
  if (rooms === 0) return 'Студия'
  if (rooms >= 4) return '4+ комн.'
  return `${rooms}-комн.`
}

export function formatFloor(floor: number, totalFloors: number): string {
  return `${floor} / ${totalFloors} этаж`
}

export function formatArea(area: number): string {
  return `${area} м²`
}

export function getLayoutLabel(apartment: Apartment): string {
  return LAYOUT_LABELS[apartment.layoutType]
}

export function getDeliveryLabel(apartment: Apartment): string {
  return DELIVERY_LABELS[apartment.deliveryStatus]
}
