import React from "react";
import { opcionesColectivas } from "../libs/OpcionesColectivas";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const PolizasColectivas = ({ control }) => {
  return (
    <div
      className="form-group checkbox-row mt-3"
      id="poliza_seleccionada_container_colectivas"
    >
      <p className="text-center text-[#0033A0]">
        <strong>
          Selecciona una o más pólizas <span className="text-red-500">*</span>
        </strong>
      </p>
      <Controller
        control={control}
        name="polizas_colectivas"
        defaultValue={[]}
        render={({ field }) => (
          <div>
            {opcionesColectivas.map((opcion) => (
              <div key={opcion.id}>
                <input
                  type="checkbox"
                  id={opcion.id}
                  className="mx-5 my-5"
                  checked={field.value.includes(opcion.value)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    const newValues = checked
                      ? [...field.value, value]
                      : field.value.filter((item) => item !== value);
                    field.onChange(newValues);
                  }}
                  value={opcion.value}
                />
                <label htmlFor={opcion.id}>{opcion.value}</label>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

PolizasColectivas.propTypes = {
  control: PropTypes.object,
};

export default PolizasColectivas;
