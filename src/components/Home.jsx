import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { opcionesProductos } from "../libs/Productos";
import { opcionesVinculaciones } from "../libs/Vinculaciones";
import { opcionesAsesoria } from "../libs/TipoAsesoria";
import ConsultasModificaciones from "./ConsultasModificaciones";
import DudasDescuentoNomina from "./DudasDescuentoNomina";
import ButtonEnviarDatos from "./ButtonEnviarDatos";
import SegurosAsesoria from "./SegurosAsesoria";
import AutorizacionDatos from "./AutorizacionDatos";
import enviarPeticion from "../libs/EnviarPeticion";
import ConsultarCedula from "../libs/ConsultarCedula";
import mostrarPopUpDatos from "../libs/mostrarPopUpDatos";

const Home = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [mostrarOtroProducto, setMostrarOtroProducto] = useState(false);
  const [selectProducto, setSelectProducto] = useState("");
  const [tipoAsesoria, setTipoAsesoria] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [segurosAsesoria, setSegurosAsesoria] = useState("");

  const handleAuthorizationChange = (authorized) => {
    setIsAuthorized(authorized);
  };

  const handleTipoAsesoriaChange = (event) => {
    const newTipoAsesoria = event.target.value;
    if (newTipoAsesoria !== "Asesoria y venta") {
      setSegurosAsesoria("");
    }
    setTipoAsesoria(newTipoAsesoria);
  };

  const handleProductoChange = (selectedValue) => {
    if (selectedValue === "Otros") {
      setMostrarOtroProducto(true);
    } else {
      setMostrarOtroProducto(false);
      setValue("otros_productos", "");
    }
  };

  const onSubmit = async (data) => {
    const updatedFormValues = {
      ...data,
      tipoAsesoria,
      segurosAsesoria,
    };

    console.log(updatedFormValues);

    try {
      const responseId = await ConsultarCedula(
        updatedFormValues.numeroDocumento
      );

      if (tipoAsesoria === "Asesoria y venta") {
        if (!responseId) {
          if (
            segurosAsesoria === "Portafolio Pólizas Colectivas" ||
            segurosAsesoria === "Portafolio Pólizas Individuales"
          ) {
            mostrarPopUpDatos(
              "¡Debes completar el registro del agendamiento! Revisa tu número de cédula",
              "warning",
              updatedFormValues,
              false
            );
          }
        } else {
          const response = await enviarPeticion(updatedFormValues);
          if (response) {
            mostrarPopUpDatos(
              "¡Tus respuestas han sido enviadas con éxito!",
              "success",
              updatedFormValues,
              true
            );
          }
        }
      } else if (
        tipoAsesoria === "Consultas o modificaciones de tus seguros" ||
        tipoAsesoria === "Dudas descuento de nomina de tus seguros"
      ) {
        const response = await enviarPeticion(updatedFormValues);
        if (response) {
          mostrarPopUpDatos(
            "¡Tus respuestas han sido enviadas con éxito!",
            "success",
            updatedFormValues,
            true
          );
        }
      }
    } catch (error) {
      if (error.message !== "No se encontró el ID") {
        mostrarPopUpDatos(
          "Hubo un problema al enviar tus respuestas. Por favor, intenta de nuevo.",
          "error",
          updatedFormValues,
          false
        );
      }
    }
  };

  return (
    <>
      <section id="main" className="flex justify-center ">
        <div className="container bg-[#FFFFFF] border-[1px] border-[#0033A0] rounded-xl mt-[90px] p-10 mb-[90px]">
          <form
            id="myForm"
            className="form__container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-3 flex flex-col">
              <label htmlFor="nombre_completo" className=" text-[#0033A0]">
                Nombre completo: <span className="text-[#E40506]">*</span>
              </label>
              <input
                id="nombre_completo"
                className="h-[40px] rounded-xl border border-[#2D6DF6] px-5 mt-2"
                type="text"
                placeholder="Escribe aquí tu nombre.."
                {...register("nombreCompleto", {
                  required: {
                    value: true,
                    message: "El nombre completo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "El nombre solo debe contener letras",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "El nombre no debe superar los 50 caracteres",
                  },
                })}
              />
              {errors.nombreCompleto && (
                <div className="error text-[#E40506] italic text-[14px]">
                  {errors.nombreCompleto.message}
                </div>
              )}
            </div>

            <div className="mt-3 flex self-stretch justify-between flex-wrap gap-x-10">
              <div className="mt-3 flex flex-1 flex-col">
                <label htmlFor="tipo_documento" className="text-[#0033A0]">
                  Tipo de documento: <span className="text-[#E40506]">*</span>
                </label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  rules={{ required: "El tipo de documento es requerido" }}
                  render={({ field }) => (
                    <select
                      id="tipoDocumento"
                      defaultValue=""
                      className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                      {...field}
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      <option value="cedula">Cédula de Ciudadanía</option>
                      <option value="carnet_extranjeria">
                        Carnet de Extranjería
                      </option>
                      <option value="nit">NIT</option>
                      <option value="pasaporte">Pasaporte</option>
                    </select>
                  )}
                />
                {errors.tipoDocumento && (
                  <div className="error text-[#E40506] italic text-[14px]">
                    {errors.tipoDocumento.message}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <div className="flex flex-col">
                  <label htmlFor="numeroDocumento" className="text-[#0033A0]">
                    Número de documento:{" "}
                    <span className="text-[#E40506]">*</span>
                  </label>
                  <Controller
                    name="numeroDocumento"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "El número de documento es requerido",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "El número de documento debe ser numérico",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "El número de documento debe tener al menos 6 dígitos",
                      },
                      maxLength: {
                        value: 12,
                        message:
                          "El número de documento no puede tener más de 12 dígitos",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        id="numeroDocumento"
                        className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                        type="text"
                        placeholder="Ej. 123456789"
                        {...field}
                        maxLength={12}
                      />
                    )}
                  />
                  {errors.numeroDocumento && (
                    <div className="error text-[#E40506] italic text-[14px]">
                      {errors.numeroDocumento.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex self-stretch justify-between flex-wrap gap-x-10">
              <div className="mt-3 flex flex-1 flex-col">
                <label htmlFor="celular" className="text-[#0033A0]">
                  Celular: <span className="text-[#E40506]">*</span>
                </label>
                <input
                  id="celular"
                  className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                  type="tel"
                  placeholder="Ingresa tu celular"
                  pattern="[0-9]{10}"
                  {...register("celular", {
                    required: {
                      value: true,
                      message: "El celular es requerido",
                    },
                    maxLength: {
                      value: 10,
                      message: "El celular debe tener 10 digitos",
                    },
                    minLength: {
                      value: 10,
                      message: "El celular debe tener 10 digitos",
                    },
                  })}
                />
                {errors.celular && (
                  <div className="error text-[#E40506] italic text-[14px]">
                    {errors.celular.message}
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-1 flex-col">
                <label htmlFor="correoElectronico" className="text-[#0033A0]">
                  Correo electrónico: <span className="text-[#E40506]">*</span>
                </label>
                <input
                  id="correoElectronico"
                  className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                  type="email"
                  placeholder="Ingresa tu correo"
                  {...register("correoElectronico", {
                    required: {
                      value: true,
                      message: "El correo electrónico es requerido",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ingresa un correo electrónico valido",
                    },
                  })}
                />
                {errors.correoElectronico && (
                  <div className="error text-[#E40506] italic text-[14px]">
                    {errors.correoElectronico.message}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex self-stretch justify-between flex-wrap gap-x-10">
              <div className="mt-3 flex flex-1 flex-col">
                <label htmlFor="ciudad" className="text-[#0033A0]">
                  Ciudad: <span className="text-[#E40506]">*</span>
                </label>
                <input
                  type="text"
                  id="ciudad"
                  className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                  placeholder="Escribe tu ciudad..."
                  {...register("ciudad", {
                    required: {
                      value: true,
                      message: "La ciudad es requerida",
                    },
                  })}
                />
                {errors.ciudad && (
                  <div className="error text-[#E40506] italic text-[14px]">
                    {errors.ciudad.message}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <label
                  htmlFor="tipo_vinculacion"
                  id="tipovinculacion"
                  className="text-[#0033A0]"
                >
                  Tipo de Vinculación: <span className="text-[#E40506]">*</span>
                </label>
                <select
                  id="tipo_vinculacion"
                  name="tipo_vinculacion"
                  defaultValue={""}
                  className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                  {...register("tipo_vinculacion", {
                    required: "El tipo de vinculación es requerido",
                  })}
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  {opcionesVinculaciones.map((vinculacion) => (
                    <option key={vinculacion.value} value={vinculacion.value}>
                      {vinculacion.label}
                    </option>
                  ))}
                </select>
                {errors.tipo_vinculacion && (
                  <div className="error text-[#E40506] italic text-[14px]">
                    {errors.tipo_vinculacion.message}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-x-20">
              <div className="flex justify-between">
                <div className="flex flex-1 flex-col mr-10">
                  <div className="mt-3 flex flex-1 flex-col">
                    <label htmlFor="tipo_asesoria" className="text-[#0033A0]">
                      Selecciona el tipo de asesoría que requieres:{" "}
                      <span className="text-[#E40506]">*</span>
                    </label>
                    <select
                      className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                      id="tipo_asesoria"
                      value={tipoAsesoria}
                      onChange={handleTipoAsesoriaChange}
                      name="tipo_asesoria"
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {opcionesAsesoria.map((asesoria) => (
                        <option key={asesoria} value={asesoria}>
                          {asesoria}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mt-3 flex flex-1 flex-col">
                    <label
                      htmlFor="select_producto"
                      id="producto"
                      className="text-[#0033A0]"
                    >
                      Producto: <span className="text-[#E40506]">*</span>
                    </label>
                    <Controller
                      name="producto"
                      control={control}
                      rules={{ required: "El producto es requerido" }}
                      render={({ field }) => (
                        <select
                          className="h-[40px] rounded-xl border border-[#2D6DF6] px-5"
                          id="select_producto"
                          defaultValue={""}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            handleProductoChange(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Seleccione una opción
                          </option>
                          {opcionesProductos.map((producto) => (
                            <option key={producto.id} value={producto.value}>
                              {producto.value}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.producto && (
                      <div className="error text-[#E40506] italic text-[14px]">
                        {errors.producto.message}
                      </div>
                    )}
                  </div>
                  {mostrarOtroProducto && (
                    <div
                      className="form__productos--container mt-3 w-full"
                      id="form__productos--container"
                    >
                      <label htmlFor="comentarios" className="text-[#0033A0]">
                        Escribe otros productos*
                      </label>
                      <Controller
                        name="otros_productos"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                          <textarea
                            id="otros_productos"
                            placeholder="Escribe otros productos..."
                            className="w-full h-[100px] rounded-xl border border-[#0033A0] px-5 py-5"
                            value={field.value}
                            onChange={field.onChange}
                          ></textarea>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {tipoAsesoria === "Asesoria y venta" && (
                <div className="mt-3 w-full">
                  <SegurosAsesoria
                    control={control}
                    segurosAsesoria={segurosAsesoria}
                    setSegurosAsesoria={setSegurosAsesoria}
                    tipoAsesoria={tipoAsesoria}
                    onSubmit={handleSubmit(onSubmit)}
                    onAuthorizationChange={handleAuthorizationChange}
                  />
                </div>
              )}

              {tipoAsesoria === "Consultas o modificaciones de tus seguros" && (
                <div className="mt-3 w-full">
                  <ConsultasModificaciones control={control} />
                </div>
              )}
              {tipoAsesoria === "Dudas descuento de nomina de tus seguros" && (
                <>
                  <DudasDescuentoNomina control={control} />
                  <AutorizacionDatos
                    onAuthorizationChange={handleAuthorizationChange}
                    control={control}
                  />
                  <ButtonEnviarDatos
                    disabled={!isAuthorized}
                    onSubmit={handleSubmit(onSubmit)}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
