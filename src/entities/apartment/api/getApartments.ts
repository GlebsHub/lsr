import type { ApartmentFilters, ApartmentsResponse } from '@/entities/apartment/model/types'
import { buildQueryParams } from '@/entities/apartment/lib/buildQueryParams'

export async function getApartments(filters: ApartmentFilters): Promise<ApartmentsResponse> {
  const query = buildQueryParams(filters)
  const response = await fetch(`/api/apartments${query}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить квартиры')
  }

  return response.json() as Promise<ApartmentsResponse>
}
