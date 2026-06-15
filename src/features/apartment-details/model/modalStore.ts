import { create } from 'zustand'
import type { Apartment } from '@/entities/apartment/model/types'

interface ModalState {
  apartment: Apartment | null
  openApartment: (apartment: Apartment) => void
  closeApartment: () => void
}

export const useApartmentModalStore = create<ModalState>((set) => ({
  apartment: null,
  openApartment: (apartment) => set({ apartment }),
  closeApartment: () => set({ apartment: null }),
}))
