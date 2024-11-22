
const enviarPeticion = async (formValues) => {
  const updatedFormValues = {
    ...formValues,
    polizas_colectivas: JSON.stringify(formValues.polizas_colectivas),
    polizas_individuales: JSON.stringify(formValues.polizas_individuales),
    modificaciones: JSON.stringify(formValues.modificaciones),
    consultas: JSON.stringify(formValues.consultas),

  };
  console.log(updatedFormValues);
  const URL =
    "https://prod-158.westus.logic.azure.com:443/workflows/f35020ab4963433387ab6b7d8d38a509/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ECEjW3vHTlZnN_fqWPqYoHt9sumvH6lvyvpZsW-t4E4";

  try {

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormValues)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    throw error;
  }
};

export default enviarPeticion;
