import React from "react";

const ButtonEnviarDatos = ({ disabled, onSubmit  }) => {
  
  return (
    <div className="form-group mt-10" id="botonEnviarDatos">
      <button
        className="w-[200px] h-[46px] text-[16px] text-[#FFFFFF] bg-[#0033A0] rounded-2xl hover:cursor-pointer disabled:bg-[#2d6df690] disabled:cursor-not-allowed"
        id="enviarDatos"
        disabled={disabled}
        onClick={onSubmit}
      >
        Enviar los datos 
      </button>
    </div>
  );
};

export default ButtonEnviarDatos;