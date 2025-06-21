"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Checkbox from "../checkbox/Checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

interface FilterFormType {
  isSoldOut: boolean;
}

const SideNavigator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const { register, setValue, handleSubmit, watch } = useForm<FilterFormType>();

  const onSubmit: SubmitHandler<FilterFormType> = (data) => {
    params.set("isSoldOut", data.isSoldOut.toString());
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const isSoldOut = searchParams.get("isSoldOut");
    if (isSoldOut) {
      setValue("isSoldOut", isSoldOut === "true");
      return;
    }

    setValue("isSoldOut", false);
  }, [searchParams, setValue]);

  return (
    <aside className="w-[240px] h-[calc(100vh-64px)]">
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
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
