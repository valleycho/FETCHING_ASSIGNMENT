"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import RangeSlider from "../rangeSlider/RangeSlider";
import { MAX_LIMIT_PRICE, STEP_PRICE } from "@/app/data/productConstant";

interface FilterFormType {
  isSoldOut: boolean;
  minPrice: number;
  maxPrice: number;
}

const SideNavigator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const maxLimitPrice = MAX_LIMIT_PRICE;
  const { register, setValue, handleSubmit, watch, control } =
    useForm<FilterFormType>({
      defaultValues: {
        minPrice: 0,
        maxPrice: maxLimitPrice,
        isSoldOut: false,
      },
    });

  const onSubmit: SubmitHandler<FilterFormType> = (data) => {
    params.set("isSoldOut", data.isSoldOut.toString());
    params.set("minPrice", data.minPrice.toString());
    params.set("maxPrice", data.maxPrice.toString());
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const isSoldOut = searchParams.get("isSoldOut");
    setValue("isSoldOut", isSoldOut ? isSoldOut === "true" : false);

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : 0;
    setValue("minPrice", minPrice);

    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : maxLimitPrice;
    setValue("maxPrice", maxPrice);
  }, [searchParams, setValue]);

  return (
    <aside className="w-[240px] h-[calc(100vh-64px)]">
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <h4 className="font-bold text-sm">가격 필터</h4>
          <Controller
            name="minPrice"
            control={control}
            render={({ field }) => (
              <Controller
                name="maxPrice"
                control={control}
                render={({ field: maxField }) => (
                  <RangeSlider
                    min={field.value}
                    max={maxField.value}
                    step={STEP_PRICE}
                    onChange={(min: number, max: number) => {
                      field.onChange(min);
                      maxField.onChange(max);
                    }}
                  />
                )}
              />
            )}
          />

          <div className="flex justify-between mt-4 text-sm text-gray-700">
            <span className="text-xs font-semibold">
              ₩{watch("minPrice")?.toLocaleString()}
            </span>
            <span className="text-xs font-semibold">
              ₩{watch("maxPrice")?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* <Checkbox label="품절 상품 표시" {...register("isSoldOut")} /> */}
        <ToggleSwitch
          label="품절 상품 표시"
          checked={watch("isSoldOut")}
          {...register("isSoldOut")}
        />

        <button
          className="bg-blue-500 text-white text-sm p-2 shadow-md rounded-lg w-full hover:bg-blue-600 cursor-pointer mt-4"
          type="submit"
        >
          필터조건 검색
        </button>
      </form>
    </aside>
  );
};

export default SideNavigator;
