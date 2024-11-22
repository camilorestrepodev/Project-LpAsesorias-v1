import React from "react";

const IframeColectiva = () => {
  return (
    <>
      <div id="iframeContainerColectivas" >
        <iframe
          id="iframeColectivas"
          src="https://outlook.office365.com/owa/calendar/CopiadeAgendamientoGestoresBST@sura.com/bookings/"
          width="600"
          height="800"
        />
      </div>
    </>
  );
};

export default IframeColectiva;
