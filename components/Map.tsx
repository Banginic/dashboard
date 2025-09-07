import React from "react";

function Map() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-xl border border-muted">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7507030342596!2d9.7085!3d4.0511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d0932!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2s"
        width="100%"
        height="300"
        loading="lazy"
        className="border-0 w-full h-[300px]"
        allowFullScreen
      />
    </div>
  );
}

export default Map;
