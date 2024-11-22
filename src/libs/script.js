


const form = document.getElementById("myForm");
const iframeColectivas = document.getElementById("iframeColectivas");
const iframeIndividuales = document.getElementById("iframeIndividuales");
const tooltipElement = document.querySelector('.tooltipleft');

const url =
  "https://prod-109.westus.logic.azure.com:443/workflows/6411dc1554d743bca372aa1421ec6395/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qS4_SegVZHRVaLsaWAk8EAfmGJi9iyvsZNJE-xH3qqM";

const textosPorOpcion = {
  "Asesoria y venta": "*Conocer y comprar seguros (Colectivos/individuales)",
  "Consultas o modificaciones de tus seguros":
    "*Cambios que deseas realizar en tus pólizas actuales colectivas e individuales",
  "Dudas descuento de nomina de tus seguros":
    "*Solo para inquietudes sobre tus descuentos de póliza de nómina",
};



function mostrarTextoSeleccionado() {
  const opcionSeleccionada = tipoAsesoria.value;

  if (textosPorOpcion.hasOwnProperty(opcionSeleccionada)) {
    textoTooltip.textContent = textosPorOpcion[opcionSeleccionada];
    tooltipleft.style.display = "grid";

  } else {
    textoTooltip.textContent = "Texto no encontrado";
    tooltipleft.style.display = "none";
  }
}
    
tooltipElement.addEventListener("touchstart", function(event){
    if (tooltipElement.classList.contains('tooltip-visible')) {
    tooltipElement.classList.remove('tooltip-visible'); 
  } else {
    tooltipElement.classList.add('tooltip-visible'); 
  }
});



function createColumnTitle(titleText) {
  const title = document.createElement("h4");
  title.textContent = titleText;
  title.style.color = "#0033A0";
  title.style.fontSize = "16px";
  title.style.fontWeight = "500";
  return title;
}


let data = {};

function enviarData() {
  formData = {
    nombre_completo: form.nombre_completo.value,
    tipo_documento: form.tipo_documento.value,
    numero_documento: form.numero_documento.value,
    celular: form.celular.value,
    correo_electronico: form.correo_electronico.value,
    ciudad: form.ciudad.value,
    tipo_vinculacion: form.tipo_vinculacion.value,
    tipo_asesoria: form.tipo_asesoria.value,
    select_producto: form.select_producto.value,
    otros_productos: form.otros_productos.value,
    poliza_adquirida: form.poliza_adquirida.value,
    polizas_individuales_otras: form.polizas_individuales_otras.value,
    seguros_asesoria: form.querySelector('[name="seguros_asesoria"]').value,
    otras_modificaciones: form.otras_modificaciones.value,
    otras_consultas: form.otras_consultas.value,
    autorizacion: form.querySelector('input[name="autorizacion"]:checked')
      .value,
    comentarios: form.comentarios.value,
  };

  const polizaSeleccionadaColectiva = Array.from(
    form.querySelectorAll(
      '#poliza_seleccionada_container_colectivas input[type="checkbox"]:checked'
    ),
    (checkbox) => checkbox.id
  );
  const polizaSeleccionadaIndividual = Array.from(
    form.querySelectorAll(
      '#poliza_seleccionada_container_individuales input[type="checkbox"]:checked'
    ),
    (checkbox) => checkbox.id
  );
  const modificacionesSeleccionadas = Array.from(
    form.querySelectorAll('#leftColumn input[type="checkbox"]:checked'),
    (checkbox) => checkbox.id
  );
  const consultasSeleccionadas = Array.from(
    form.querySelectorAll('#rightColumn input[type="checkbox"]:checked'),
    (checkbox) => checkbox.id
  );

  formData.poliza_seleccionada_colectiva = polizaSeleccionadaColectiva;
  formData.poliza_seleccionada_individual = polizaSeleccionadaIndividual;
  formData.modificaciones_seleccionadas = modificacionesSeleccionadas;
  formData.consultas_seleccionadas = consultasSeleccionadas;

  data = {
    formData,
  };

  console.log(data);

  return data;
}






