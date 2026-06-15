import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import type {
  DeliveryStatus,
  LayoutType,
} from "@/entities/apartment/model/types";
import {
  AREA_MAX,
  AREA_MIN,
  DELIVERY_LABELS,
  FLOOR_MAX,
  FLOOR_MIN,
  LAYOUT_LABELS,
  ROOM_OPTIONS,
} from "@/entities/apartment/model/types";
import { Button } from "@/shared/ui/Button/Button";
import { Select } from "@/shared/ui/Select/Select";
import { useFiltersStore } from "../../model/filtersStore";
import "./FiltersPanel.scss";

const LAYOUT_OPTIONS = [
  { value: "", label: "Все" },
  ...Object.entries(LAYOUT_LABELS).map(([value, label]) => ({ value, label })),
];

const DELIVERY_OPTIONS = [
  { value: "", label: "Все" },
  ...Object.entries(DELIVERY_LABELS).map(([value, label]) => ({ value, label })),
];

interface FiltersPanelProps {
  resultCount?: number;
  isLoading?: boolean;
  isError?: boolean;
}

export function FiltersPanel({
  resultCount,
  isLoading = false,
  isError = false,
}: FiltersPanelProps) {
  const {
    rooms,
    areaMin,
    areaMax,
    floorMin,
    floorMax,
    layoutType,
    deliveryStatus,
    toggleRoom,
    setAreaRange,
    setFloorRange,
    setLayoutType,
    setDeliveryStatus,
    reset,
  } = useFiltersStore();

  return (
    <aside className="filters">
      <div className="filters__header">
        <h2 className="filters__title">Фильтры</h2>
        {!isError && (
          <p className="filters__count" aria-live="polite">
            {isLoading ? "Поиск..." : `Найдено: ${resultCount ?? 0}`}
          </p>
        )}
      </div>

      <div className="filters__group">
        <span className="filters__label">Компактность</span>
        <div className="filters__checkboxes">
          {ROOM_OPTIONS.map((option) => (
            <label key={option.value} className="filters__checkbox">
              <input
                type="checkbox"
                className="filters__checkbox-input"
                checked={rooms.includes(option.value)}
                onChange={() => toggleRoom(option.value)}
              />
              <span className="filters__checkbox-text">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters__group">
        <span className="filters__label">
          Площадь: {areaMin}–{areaMax} м²
        </span>
        <div className="filters__slider">
          <Slider
            range
            min={AREA_MIN}
            max={AREA_MAX}
            value={[areaMin, areaMax]}
            onChange={(value) => {
              if (!Array.isArray(value)) return;
              setAreaRange(value[0], value[1]);
            }}
          />
        </div>
      </div>

      <div className="filters__group">
        <span className="filters__label">
          Этаж: {floorMin}–{floorMax}
        </span>
        <div className="filters__slider">
          <Slider
            range
            min={FLOOR_MIN}
            max={FLOOR_MAX}
            value={[floorMin, floorMax]}
            onChange={(value) => {
              if (!Array.isArray(value)) return;
              setFloorRange(value[0], value[1]);
            }}
          />
        </div>
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="layout-type">
          Тип планировки
        </label>
        <Select
          id="layout-type"
          value={layoutType}
          options={LAYOUT_OPTIONS}
          onChange={(nextValue) =>
            setLayoutType(nextValue as LayoutType | "")
          }
        />
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="delivery-status">
          Статус сдачи
        </label>
        <Select
          id="delivery-status"
          value={deliveryStatus}
          options={DELIVERY_OPTIONS}
          onChange={(nextValue) =>
            setDeliveryStatus(nextValue as DeliveryStatus | "")
          }
        />
      </div>

      <div className="filters__actions">
        <Button variant="secondary" className="filters__reset" onClick={reset}>
          Сбросить фильтры
        </Button>
      </div>
    </aside>
  );
}
