import { Modal } from '@/shared/ui/Modal/Modal'
import { useApartmentModalStore } from '@/features/apartment-details/model/modalStore'
import { ApartmentModalDetails } from './ApartmentModalDetails'

export function ApartmentModal() {
  const apartment = useApartmentModalStore((state) => state.apartment)
  const closeApartment = useApartmentModalStore((state) => state.closeApartment)

  return (
    <Modal
      open={Boolean(apartment)}
      onClose={closeApartment}
      titleId="apartment-modal-title"
    >
      {apartment && <ApartmentModalDetails apartment={apartment} />}
    </Modal>
  )
}
