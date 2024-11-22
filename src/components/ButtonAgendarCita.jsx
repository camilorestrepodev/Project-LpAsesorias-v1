import React from "react";

const ButtonAgendarCita = ({ disabled, onClick}) => {
  return (
    <div>
      <div className="mt-10" id="botonAgendarCita">
        <button
          className="w-[200px] h-[46px] text-[16px] text-[#FFFFFF] bg-[#0033A0] rounded-2xl hover:cursor-pointer disabled:bg-[#2d6df690] disabled:cursor-not-allowed"
          id="agendarCita"
          disabled={disabled}
          onClick={onClick}
        >
          Agendar cita
        </button>
      </div>
    </div>
  );
};

export default ButtonAgendarCita;
