import React from "react";
import { Controller } from "react-hook-form";
import { opcionesIndividuales } from "../libs/OpcionesIndividuales";

const PolizasIndividuales = ({ control }) => {
  console.log(control);
  const [polizasSeleccionadasIndividuales, setPolizasSeleccionadasIndividuales] =
    React.useState([]);

  const handlePolizaSeleccionadaIndividualesChange = (event) => {
    const { value, checked } = event.target;
    setPolizasSeleccionadasIndividuales((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((poliza) => poliza !== value)
    );
  };

  return (
    <>
      <div
        className="mt-3 form-group checkbox-row"
        id="poliza_seleccionada_container_individuales"
      >
        <p className="text-center text-[#0033A0]">
          <strong>
            Selecciona una o más pólizas <span className="text-red-500">*</span>
          </strong>
        </p>

        <Controller
          control={control}
          name="polizas_individuales"
          defaultValue={[]}
          render={({ field }) => (
            <div>
              {opcionesIndividuales.map((opcion) => (
                <div key={opcion.id}>
                  <input
                    type="checkbox"
                    id={opcion.id}
                    className="mx-5 my-5"
                    value={opcion.value}
                    checked={polizasSeleccionadasIndividuales.includes(opcion.value)}
                    onChange={(e) => {
                      handlePolizaSeleccionadaIndividualesChange(e);
                      field.onChange(e.target.checked
                        ? [...field.value, opcion.value]
                        : field.value.filter((val) => val !== opcion.value));
                    }}
                  />
                  <label htmlFor={opcion.id}>{opcion.value}</label>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      {polizasSeleccionadasIndividuales.length > 0 && (
        <div className="col-md-6" id="polizaSeleccionadaIndividualesOtros">
          <label htmlFor="otrosPolizasIndividuales">
            Escribe tus otras polizas individuales:
          </label>
          <textarea
            className="w-full h-[100px] rounded-xl border border-[#0033A0] px-5 py-5"
            name="polizas_individuales_otras"
            id="polizas_individuales_otras"
            placeholder="Escribe tus otras polizas..."
          ></textarea>
        </div>
      )}
    </>
  );
};

export default PolizasIndividuales;
