import { create } from 'zustand'
import type { ApartmentFilters, DeliveryStatus, LayoutType } from '@/entities/apartment/model/types'
import {
  AREA_MAX,
  AREA_MIN,
  FLOOR_MAX,
  FLOOR_MIN,
} from '@/entities/apartment/model/types'

export const defaultFilters: ApartmentFilters = {
  rooms: [],
  areaMin: AREA_MIN,
  areaMax: AREA_MAX,
  floorMin: FLOOR_MIN,
  floorMax: FLOOR_MAX,
  layoutType: '',
  deliveryStatus: '',
}

interface FiltersState extends ApartmentFilters {
  toggleRoom: (room: number) => void
  setAreaRange: (min: number, max: number) => void
  setFloorRange: (min: number, max: number) => void
  setLayoutType: (layoutType: LayoutType | '') => void
  setDeliveryStatus: (deliveryStatus: DeliveryStatus | '') => void
  reset: () => void
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
  ...defaultFilters,

  toggleRoom: (room) => {
    const { rooms } = get()
    const nextRooms = rooms.includes(room)
      ? rooms.filter((value) => value !== room)
      : [...rooms, room]

    set({ rooms: nextRooms })
  },

  setAreaRange: (areaMin, areaMax) => set({ areaMin, areaMax }),

  setFloorRange: (floorMin, floorMax) => set({ floorMin, floorMax }),

  setLayoutType: (layoutType) => set({ layoutType }),

  setDeliveryStatus: (deliveryStatus) => set({ deliveryStatus }),

  reset: () => set({ ...defaultFilters }),
}))
