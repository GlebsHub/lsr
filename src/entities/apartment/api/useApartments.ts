import { useQuery } from '@tanstack/react-query'
import type { ApartmentFilters } from '@/entities/apartment/model/types'
import { getApartments } from '@/entities/apartment/api/getApartments'

export function useApartments(filters: ApartmentFilters) {
  return useQuery({
    queryKey: ['apartments', filters],
    queryFn: () => getApartments(filters),
  })
}
