import React from "react";
import { Controller } from "react-hook-form";

const AutorizacionDatos = ({ onAuthorizationChange, control }) => {
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    onAuthorizationChange(isChecked);
  };

  return (
    <div className="form-check mt-4" id="politicas_privacidad">
      <Controller
        name="autorizacion_politica"
        control={control}
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <input
            type="checkbox"
            className="mx-2 my-5"
            id="autorizacion_politica"
            onChange={(e) => {
              onChange(e); 
              handleCheckboxChange(e); 
            }}
            {...fieldProps}
          />
        )}
      />
      <label className="form-check-label" htmlFor="autorizacion_politica">
        Autorizo el uso de mi información personal de acuerdo con la{" "}
        <a href="https://www.segurossura.com.co/Paginas/legal/politica-privacidad-datos.aspx">
          <span className="text-decoration-underline">
            política de tratamiento de datos personales
          </span>
        </a>
      </label>
    </div>
  );
};

export default AutorizacionDatos;
