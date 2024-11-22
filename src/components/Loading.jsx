import React from "react";

const Loading = () => {
  const loading =
    "https://image.comunicaciones.sura.com/lib/fe3911727564047d771277/m/1/d7d9d0b5-629c-449a-9e69-d1f2178fe8d6.gif";

  return (
    <>
      <div className="flex justify-center px-[120px] py-[70px]">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <img src={loading} alt="Imagen de condor" />
        </div>
      </div>
    </>
  );
};

export default Loading;
