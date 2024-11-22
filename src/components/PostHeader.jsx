import React from "react";

const PostHeader = () => {
  return (
    <>
      <div className="post-header bg-[#E0EAFF] py-[50px] px-0">
        <h1 className="post-header__title text-[#0033A0] p-5 m-auto text-4xl text-center font-normal">
          Asesoría en seguros colectivos e individuales
        </h1>
        <p className="post-header___text text-black text-center text-xl">
          Bienvenido, este es un espacio creado exclusivamente para ti. Déjanos
          tus datos y agenda tu cita.
        </p>
      </div>
    </>
  );
};

export default PostHeader;
