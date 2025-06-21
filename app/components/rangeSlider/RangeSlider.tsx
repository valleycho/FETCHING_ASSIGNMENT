import { MAX_LIMIT_PRICE, STEP_PRICE } from "@/app/data/productConstant";
import { forwardRef } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  onChange?: (min: number, max: number) => void;
  minLimit?: number;
  maxLimit?: number;
  ref?: React.RefObject<HTMLInputElement>;
}

const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  (
    {
      min,
      max,
      step,
      minLimit = 0,
      maxLimit = MAX_LIMIT_PRICE,
      onChange,
    }: RangeSliderProps,
    ref
  ) => {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      // 10만원 단위로 반올림
      const roundedValue = Math.round(value / STEP_PRICE) * STEP_PRICE;
      if (roundedValue <= max - step) {
        onChange?.(roundedValue, max);
      }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      // 10만원 단위로 반올림
      const roundedValue = Math.round(value / STEP_PRICE) * STEP_PRICE;
      if (roundedValue >= min + step) {
        onChange?.(min, roundedValue);
      }
    };

    return (
      <div className="relative h-10 flex items-center justify-center">
        <div className="absolute w-full h-1 bg-gray-300 rounded"></div>

        <div
          className="absolute h-1 bg-blue-500 rounded"
          style={{
            left: `${(min / maxLimit) * 100}%`,
            width: `${((max - min) / maxLimit) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={STEP_PRICE} // 10만원 단위로 변경
          value={min}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:appearance-none"
        />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={STEP_PRICE} // 10만원 단위로 변경
          value={max}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:appearance-none"
        />
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export default RangeSlider;
