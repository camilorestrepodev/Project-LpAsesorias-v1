import Swal from "sweetalert2";
import mostrarPopUpIframe from "./mostrarPopUpIframe";
import IframeColectiva from "../components/IframeColectiva";
import IframeIndividual from "../components/IframeIndividual";

const mostrarPopUpDatos = (msgTittle, iconMsg, formValues, resultOK) => {

  Swal.fire({
    title: msgTittle,
    icon: iconMsg,
    confirmButtonText: "Cerrar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
      if (resultOK) {
        window.location.href = window.location.href;
      } else {
        if (formValues.segurosAsesoria === "Portafolio Pólizas Colectivas") {
          mostrarPopUpIframe(IframeColectiva);
        } else if (formValues.segurosAsesoria === "Portafolio Pólizas Individuales") {
          mostrarPopUpIframe(IframeIndividual);
        } else {
          window.location.href = window.location.href;
        }
      }
    }
  });
}

export default mostrarPopUpDatos;

