import type { Apartment } from '@/entities/apartment/model/types'
import {
  formatArea,
  formatFloor,
  formatRooms,
  getDeliveryLabel,
  getLayoutLabel,
} from '@/entities/apartment/lib/formatters'
import './ApartmentCard.scss'

interface ApartmentCardProps {
  apartment: Apartment
  onClick: (apartment: Apartment) => void
}

export function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {
  const deliveryModifier =
    apartment.deliveryStatus === 'delivered'
      ? 'apartment-card__badge--delivered'
      : 'apartment-card__badge--not-delivered'

  return (
    <article
      className="apartment-card"
      onClick={() => onClick(apartment)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(apartment)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Квартира ${formatRooms(apartment.rooms)}, ${formatArea(apartment.area)}`}
    >
      <div className="apartment-card__image-wrap">
        <img
          className="apartment-card__image"
          src={apartment.image}
          alt={`Планировка ${formatRooms(apartment.rooms)}`}
          loading="lazy"
        />
        <span className={`apartment-card__badge ${deliveryModifier}`}>
          {getDeliveryLabel(apartment)}
        </span>
      </div>

      <div className="apartment-card__body">
        <h3 className="apartment-card__rooms">{formatRooms(apartment.rooms)}</h3>
        <p className="apartment-card__layout">{getLayoutLabel(apartment)}</p>
        <ul className="apartment-card__meta">
          <li className="apartment-card__meta-item">{formatFloor(apartment.floor, apartment.totalFloors)}</li>
          <li className="apartment-card__meta-item">{formatArea(apartment.area)}</li>
          <li className="apartment-card__meta-item">{apartment.building}</li>
        </ul>
      </div>
    </article>
  )
}
