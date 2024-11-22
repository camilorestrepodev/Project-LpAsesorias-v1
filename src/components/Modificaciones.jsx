import React from "react";
import { Controller } from "react-hook-form";
import { opcionesModificaciones } from "../libs/OpcionesModificaciones";

const Modificaciones = ({ control }) => {
  const [otrasModificaciones, setOtrasModificaciones] = React.useState("");

  const handleCheckboxChange = (event, field) => {
    const { value, checked } = event.target;
    const currentValues = field.value || [];

    if (checked) {
      field.onChange([...currentValues, value]);
      if (value === "e. Otras modificaciones") {
        setOtrasModificaciones(value);
      }
    } else {
      const newValues = currentValues.filter((item) => item !== value);
      field.onChange(newValues);
      if (value === "e. Otras modificaciones") {
        setOtrasModificaciones("");
      }
    }
  };

  return (
    <>
      <div
        className="mt-3 form-group checkbox-row"
        id="poliza_seleccionada_container_individuales"
      >
        <p className=" text-[#0033A0] font-auto">
          <strong>Modificaciones:</strong>
        </p>
        <Controller
          control={control}
          name="modificaciones"
          defaultValue={[]}
          render={({ field }) => (
            <div>
              {opcionesModificaciones.map((opcion) => (
                <div key={opcion.id}>
                  <input
                    type="checkbox"
                    id={opcion.id}
                    name={opcion.name}
                    className="mx-2 my-5"
                    checked={field.value.includes(opcion.value)}
                    onChange={(e) => handleCheckboxChange(e, field)}
                    value={opcion.value}
                  />
                  <label htmlFor={opcion.id}>{opcion.value}</label>
                </div>
              ))}
            </div>
          )}
        />
        {otrasModificaciones === "e. Otras modificaciones" && (
          <Controller
            control={control}
            name="otras_modificaciones"
            defaultValue=""
            render={({ field }) => (
              <div className="mt-3 flex flex-col" id="otrasModificaciones">
                <label>Otras modificaciones:</label>
                <textarea
                  className="w-full h-[100px] rounded-xl border border-[#0033A0] px-5 py-5"
                  name="otras_modificaciones"
                  id="otras_modificaciones"
                  placeholder="Escribe tus modificaciones..."
                  {...field}
                ></textarea>
              </div>
            )}
          />
        )}
      </div>
    </>
  );
};

export default Modificaciones;
