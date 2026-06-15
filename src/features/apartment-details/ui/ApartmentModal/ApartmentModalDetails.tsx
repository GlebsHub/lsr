import type { Apartment } from '@/entities/apartment/model/types'
import {
  formatArea,
  formatFloor,
  formatRooms,
  getDeliveryLabel,
  getLayoutLabel,
} from '@/entities/apartment/lib/formatters'
import './ApartmentModal.scss'

interface ApartmentModalDetailsProps {
  apartment: Apartment
}

export function ApartmentModalDetails({ apartment }: ApartmentModalDetailsProps) {
  const deliveryModifier =
    apartment.deliveryStatus === 'delivered'
      ? 'apartment-modal__badge--delivered'
      : 'apartment-modal__badge--not-delivered'

  return (
    <div className="apartment-modal">
      <div className="apartment-modal__gallery">
        <img
          className="apartment-modal__gallery-main"
          src={apartment.image}
          alt={`Планировка ${formatRooms(apartment.rooms)}`}
        />
        <div className="apartment-modal__gallery-thumbs">
          {apartment.gallery.map((image, index) => (
            <img
              key={image}
              className="apartment-modal__gallery-thumb"
              src={image}
              alt={`Дополнительное фото ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="apartment-modal__info">
        <h2 id="apartment-modal-title" className="apartment-modal__title">
          {formatRooms(apartment.rooms)}
        </h2>

        <span className={`apartment-modal__badge ${deliveryModifier}`}>
          {getDeliveryLabel(apartment)}
        </span>

        <dl className="apartment-modal__details">
          <div className="apartment-modal__detail">
            <dt className="apartment-modal__detail-label">Планировка</dt>
            <dd className="apartment-modal__detail-value">{getLayoutLabel(apartment)}</dd>
          </div>
          <div className="apartment-modal__detail">
            <dt className="apartment-modal__detail-label">Этаж</dt>
            <dd className="apartment-modal__detail-value">
              {formatFloor(apartment.floor, apartment.totalFloors)}
            </dd>
          </div>
          <div className="apartment-modal__detail">
            <dt className="apartment-modal__detail-label">Площадь</dt>
            <dd className="apartment-modal__detail-value">{formatArea(apartment.area)}</dd>
          </div>
          <div className="apartment-modal__detail">
            <dt className="apartment-modal__detail-label">Дом</dt>
            <dd className="apartment-modal__detail-value">{apartment.building}</dd>
          </div>
          <div className="apartment-modal__detail">
            <dt className="apartment-modal__detail-label">Статус сдачи</dt>
            <dd className="apartment-modal__detail-value">{getDeliveryLabel(apartment)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
