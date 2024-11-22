import React from "react";
import { opcionesConsultas } from "../libs/OpcionesConsultas";
import { Controller, useForm } from "react-hook-form";

const Consultas = ({ control }) => {
  const [otrasConsultas, setOtrasConsultas] = React.useState("");

  const handleCheckboxChange = (event, field) => {
    const { value, checked } = event.target;
    const currentValues = field.value || [];

    if (checked) {
      field.onChange([...currentValues, value]);
      if (value === "k. Otras consultas") {
        setOtrasConsultas(value);
      }
    } else {
      const newValues = currentValues.filter((item) => item !== value);
      field.onChange(newValues);
      if (value === "k. Otras consultas") {
        setOtrasConsultas("");
      }
    }
  };

  return (
    <>
      <div
        className="mt-3 form-group checkbox-row flex flex-col"
        id="poliza_seleccionada_container_individuales"
      >
        <p className="text-[#0033A0] font-auto">
          <strong>Consultas:</strong>
        </p>

        <Controller
          control={control}
          name="consultas"
          defaultValue={[]}
          render={({ field }) => (
            <div>
              {opcionesConsultas.map((opcion) => (
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

        {otrasConsultas === "k. Otras consultas" && (
          <Controller
            control={control}
            name="otras_consultas"
            defaultValue=""
            render={({ field }) => (
              <div
                className="form-group mt-3 flex flex-col"
                id="otrasConsultas"
              >
                <label>Otras consultas:</label>
                <textarea
                  className="w-full h-[100px] rounded-xl border border-[#0033A0] px-5 py-5"
                  placeholder="Escribe tus consultas..."
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

export default Consultas;
