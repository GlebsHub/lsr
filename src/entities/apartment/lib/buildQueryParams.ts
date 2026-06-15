import type { ApartmentFilters } from '@/entities/apartment/model/types'
import {
  AREA_MAX,
  AREA_MIN,
  FLOOR_MAX,
  FLOOR_MIN,
} from '@/entities/apartment/model/types'

export function buildQueryParams(filters: ApartmentFilters): string {
  const params = new URLSearchParams()

  if (filters.rooms.length > 0) {
    params.set('rooms', filters.rooms.join(','))
  }

  if (filters.areaMin !== AREA_MIN) {
    params.set('areaMin', String(filters.areaMin))
  }

  if (filters.areaMax !== AREA_MAX) {
    params.set('areaMax', String(filters.areaMax))
  }

  if (filters.floorMin !== FLOOR_MIN) {
    params.set('floorMin', String(filters.floorMin))
  }

  if (filters.floorMax !== FLOOR_MAX) {
    params.set('floorMax', String(filters.floorMax))
  }

  if (filters.layoutType) {
    params.set('layoutType', filters.layoutType)
  }

  if (filters.deliveryStatus) {
    params.set('deliveryStatus', filters.deliveryStatus)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}
