import { http, HttpResponse } from 'msw'
import type { Apartment, DeliveryStatus, LayoutType } from '@/entities/apartment/model/types'
import { apartmentsData } from './data/apartments'

function filterApartments(url: URL): Apartment[] {
  const roomsParam = url.searchParams.get('rooms')
  const areaMin = url.searchParams.get('areaMin')
  const areaMax = url.searchParams.get('areaMax')
  const floorMin = url.searchParams.get('floorMin')
  const floorMax = url.searchParams.get('floorMax')
  const layoutType = url.searchParams.get('layoutType') as LayoutType | null
  const deliveryStatus = url.searchParams.get('deliveryStatus') as DeliveryStatus | null

  return apartmentsData.filter((apartment) => {
    if (roomsParam) {
      const rooms = roomsParam.split(',').map(Number)
      const matchesRoom = rooms.some((room) =>
        room >= 4 ? apartment.rooms >= 4 : apartment.rooms === room,
      )
      if (!matchesRoom) return false
    }

    if (areaMin && apartment.area < Number(areaMin)) return false
    if (areaMax && apartment.area > Number(areaMax)) return false
    if (floorMin && apartment.floor < Number(floorMin)) return false
    if (floorMax && apartment.floor > Number(floorMax)) return false
    if (layoutType && apartment.layoutType !== layoutType) return false
    if (deliveryStatus && apartment.deliveryStatus !== deliveryStatus) return false

    return true
  })
}

export const handlers = [
  http.get('/api/apartments', ({ request }) => {
    const url = new URL(request.url)
    const data = filterApartments(url)

    return HttpResponse.json({
      data,
      total: data.length,
    })
  }),
]
