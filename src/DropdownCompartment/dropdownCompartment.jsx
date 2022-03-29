import { React, useState } from "react";
const DropdownCompartment = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {props.options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <p>{selectedValue}</p>
    </div>
  );
};

export default DropdownCompartment;
