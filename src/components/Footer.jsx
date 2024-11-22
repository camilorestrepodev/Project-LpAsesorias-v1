import React from "react";

const Footer = () => {
  return (
    <>
      <div id="footer" className="bg-[#0033A0] text-white py-5 text-center absolute b-0 w-[100%]">
        <p>© 2024 SURA. Todos los derechos reservados.</p>
        <a href="https://www.suralinea.com/terminos-condiciones" className="hover:underline">
          Políticas de uso y seguridad
        </a>{" "}
        |
        <a href="https://www.suralinea.com/politicas-privacidad" className="hover:underline">
          Política de privacidad y ley de datos personales
        </a>
      </div>
    </>
  );
};

export default Footer;
