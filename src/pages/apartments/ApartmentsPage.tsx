import { ApartmentCard } from '@/entities/apartment/ui/ApartmentCard/ApartmentCard'
import { useApartments } from '@/entities/apartment/api/useApartments'
import { ApartmentModal } from '@/features/apartment-details/ui/ApartmentModal/ApartmentModal'
import { useApartmentModalStore } from '@/features/apartment-details/model/modalStore'
import { FiltersPanel } from '@/features/filters/ui/FiltersPanel/FiltersPanel'
import { useFiltersStore } from '@/features/filters/model/filtersStore'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useShallow } from 'zustand/react/shallow'
import './ApartmentsPage.scss'

export function ApartmentsPage() {
  const filters = useFiltersStore(
    useShallow((state) => ({
      rooms: state.rooms,
      areaMin: state.areaMin,
      areaMax: state.areaMax,
      floorMin: state.floorMin,
      floorMax: state.floorMax,
      layoutType: state.layoutType,
      deliveryStatus: state.deliveryStatus,
    })),
  )
  const debouncedFilters = useDebounce(filters, 300)
  const { data, isLoading, isError } = useApartments(debouncedFilters)
  const openApartment = useApartmentModalStore((state) => state.openApartment)

  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <h1 className="page__title">Каталог квартир</h1>
          <p className="page__subtitle">
            Подберите квартиру по параметрам и откройте карточку для просмотра деталей
          </p>
        </div>
      </header>

      <main className="page__main container">
        <FiltersPanel
          resultCount={data?.total}
          isLoading={isLoading}
          isError={isError}
        />

        <section className="page__content" aria-live="polite">
          {isLoading && <p className="page__status">Загрузка квартир...</p>}

          {isError && (
            <p className="page__status page__status--error">
              Не удалось загрузить данные. Попробуйте обновить страницу.
            </p>
          )}

          {!isLoading && !isError && data?.data.length === 0 && (
            <p className="page__status">Квартир не найдено. Измените параметры фильтров.</p>
          )}

          {!isLoading && !isError && data && data.data.length > 0 && (
            <ul className="apartments-list">
              {data.data.map((apartment) => (
                <li key={apartment.id} className="apartments-list__item">
                  <ApartmentCard apartment={apartment} onClick={openApartment} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <ApartmentModal />
    </div>
  )
}
