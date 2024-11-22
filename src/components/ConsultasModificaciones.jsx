import React from "react";
import Modificaciones from "./Modificaciones";
import Consultas from "./Consultas";
import AutorizacionDatos from "./AutorizacionDatos";
import ButtonEnviarDatos from "./ButtonEnviarDatos";
import { Controller } from "react-hook-form";
const ConsultasModificaciones = ({ control }) => {
  const [polizaAdquirida, setPolizaAdquirida] = React.useState("");

  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const handleAuthorizationChange = (authorized) => {
    setIsAuthorized(authorized);
  };

  return (
    <>
      <div className="mt-3 flex self-stretch justify-between gap-x-10">
        <div className="w-full" id="poliza_adquirida_container">
          <label
            htmlFor="poliza_adquirida"
            className="text-[#0033A0] flex flex-col"
          >
            ¿Tu póliza fue adquirida por la página web?*
          </label>
          <Controller
            name="poliza_adquirida"
            control={control}
            render={({ field }) => (
              <select
                id="poliza_adquirida"
                defaultValue=""
                className="w-[100%] h-[40px] rounded-xl border border-[#0033A0] px-5 mt-2"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setPolizaAdquirida(e.target.value)}
                }
              >
                <option value="">Selecciona una opción</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            )}
          />
        </div>
      </div>
      {polizaAdquirida === "Si" && (
        <div className="w-full" id="poliza_adquirida_texto_container">
          <p className="text-[#FF0000]">
            ¡Por favor gestiona tus solicitudes a través de Sura en línea{" "}
            <a href="https://www.suraenlinea.com">
              <b>https://www.suraenlinea.com/</b>
            </a>{" "}
            o al #888 opción 8-2
          </p>
        </div>
      )}
      {polizaAdquirida === "No" && (
        <div className="w-full mt-5" id="poliza_adquirida_texto_container">
          <p className="text-[#0033A0] text-center font-semibold">
            Elige los seguros en los que deseas recibir asesoría{" "}
            <span className="text-[#FF0000]">*</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
            <Modificaciones control={control} />
            <Consultas control={control} />
          </div>
          <AutorizacionDatos
            onAuthorizationChange={handleAuthorizationChange}
            control={control}
          />
          <ButtonEnviarDatos disabled={!isAuthorized} />
        </div>
      )}{" "}
    </>
  );
};

export default ConsultasModificaciones;
