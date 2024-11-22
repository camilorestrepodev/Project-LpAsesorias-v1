import React from "react";
import { Controller } from "react-hook-form";

const DudasDescuentoNomina = ({ control }) => {
  return (
    <>
      <div
        className=" mt-5 flex flex-col self-stretch"
        id="inquietudes_container"
      >
        <label htmlFor="comentarios" className="text-[#0033A0]">
          Por favor describe tu inquietud*
        </label>
        <Controller
          name="comentarios"
          control={control}
          render={({ field }) => (
            <textarea
              className="w-full h-[100px] rounded-xl border border-[#0033A0] px-5 py-5"
              id="comentarios"
              placeholder="Escribe aquí..."
              {...field}
            />
          )}
        />
      </div>
    </>
  );
};

export default DudasDescuentoNomina;
