import Swal from "sweetalert2";
import { createRoot } from "react-dom/client";
import React from "react";

const mostrarPopUpIframe = (Component, setShowButtonEnviarDatos, setShowButtonAgendarCita) => {

    Swal.fire({
      icon: "warning",
      title: "Para finalizar tu proceso de agendamiento:",
      html: `
        <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 20px">
          <ul> 
            <li style="text-align: justify;">- Llena este formulario de agendamiento y da clic en 'Reservar'</li>
            <li style="text-align: justify;">- Da clic en 'Enviar datos de reserva' para pasar al siguiente paso</li>
            <li style="text-align: justify;">- Da clic en 'Enviar los datos' para terminar</li>
          </ul>
          <div style="display: block; margin-top: 20px" id="customComponentContainer"></div>
        </div>`,
      confirmButtonText: "Enviar datos de reserva",
      customClass: {
        confirmButton: 'custom-confirm-button'  
      },
      didOpen: () => {
        Swal.getIcon().id = "btnWarning";
        const btnWarning = Swal.getIcon();
        btnWarning.style.borderColor = "red";
        btnWarning.style.color = "red";
        Swal.getConfirmButton().id = "btnCerrarCita";
        const customComponentContainer = document.getElementById("customComponentContainer");
            if (customComponentContainer) {
                const root = createRoot(customComponentContainer);
                root.render(React.createElement(Component));
            }

        const btnCerrarCita = document.getElementById("btnCerrarCita");
        btnCerrarCita.addEventListener("click", function () {
          Swal.close();
          setShowButtonEnviarDatos(true); 
          setShowButtonAgendarCita(false);
        });
      },
    });
  };

export default mostrarPopUpIframe;