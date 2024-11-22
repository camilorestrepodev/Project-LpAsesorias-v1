import React, { useState } from "react";
import { Controller } from "react-hook-form";
import PolizasColectivas from "./PolizasColectivas";
import PolizasIndividuales from "./PolizasIndividuales";
import ButtonAgendarCita from "./ButtonAgendarCita";
import AutorizacionDatos from "./AutorizacionDatos";
import IframeIndividual from "./IframeIndividual";
import IframeColectiva from "./IframeColectiva";
import ButtonEnviarDatos from "./ButtonEnviarDatos";
import mostrarPopUpIframe from "../libs/mostrarPopUpIframe";

const SegurosAsesoria = ({ control, segurosAsesoria, setSegurosAsesoria, onAuthorizationChange  }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showButtonEnviarDatos, setShowButtonEnviarDatos] = useState(false);
  const [showButtonAgendarCita, setShowButtonAgendarCita] = useState(true);

  const handleAuthorizationChange = (authorized) => {
    setIsAuthorized(authorized);
  };

  const handleAgendarCitaClick = (event) => {
    event.preventDefault();

    if (segurosAsesoria === "Portafolio Pólizas Colectivas") {
      mostrarPopUpIframe(
        IframeColectiva,
        setShowButtonEnviarDatos,
        setShowButtonAgendarCita
      );
    } else if (segurosAsesoria === "Portafolio Pólizas Individuales") {
      mostrarPopUpIframe(
        IframeIndividual,
        setShowButtonEnviarDatos,
        setShowButtonAgendarCita
      );
    }
  };

  return (
    <>
      <div className="mt-3 flex flex-col" id="seguros_asesoria_container">
        <label htmlFor="seguros_asesoria" className="text-[#0033A0]">
          Elige el seguro en el que deseas recibir asesoría{" "}
          <span className="text-[#FF0000]">*</span>
        </label>
        <Controller
          name="segurosAsesoria"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              id="seguros_asesoria"
              className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(e);
                setSegurosAsesoria(value);
              }}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="Portafolio Pólizas Colectivas">
                Portafolio Pólizas Colectivas
              </option>
              <option value="Portafolio Pólizas Individuales">
                Portafolio Pólizas Individuales
              </option>
            </select>
          )}
        />
      </div>

      {segurosAsesoria === "Portafolio Pólizas Colectivas" && (
        <>
          <PolizasColectivas control={control} />
          <AutorizacionDatos
            onAuthorizationChange={handleAuthorizationChange}
            control={control}
          />
          {showButtonAgendarCita && (
            <ButtonAgendarCita
              disabled={!isAuthorized}
              onClick={handleAgendarCitaClick}
            />
          )}
          {showButtonEnviarDatos && <ButtonEnviarDatos />}
        </>
      )}

      {segurosAsesoria === "Portafolio Pólizas Individuales" && (
        <>
          <PolizasIndividuales control={control} />
          <AutorizacionDatos
            onAuthorizationChange={handleAuthorizationChange}
            control={control}
          />
          {showButtonAgendarCita && (
            <ButtonAgendarCita
              disabled={!isAuthorized}
              onClick={handleAgendarCitaClick}
            />
          )}
          {showButtonEnviarDatos && <ButtonEnviarDatos />}
        </>
      )}
    </>
  );
};

export default SegurosAsesoria;
