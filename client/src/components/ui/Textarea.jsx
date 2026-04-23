
import React from "react";

const Textarea = (props) => {
  return (
    <textarea
      {...props}
      className="w-full p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  );
};

export default Textarea;