const ConsultarCedula = async (numeroCedula) => {

    try {
        const url = new URL(
            "https://prod-177.westus.logic.azure.com:443/workflows/828e658a2cb041f39038efdf729a4e7d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0p3CbKdo1n1NonivFihpObbohNpCGENINHbZAyH_Kkg"
        );

        url.searchParams.append("cedula", numeroCedula);

        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Error al enviar las respuestas");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un problema con la petición:", error);
    }
};

export default ConsultarCedula;
