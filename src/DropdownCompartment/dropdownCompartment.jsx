const DropdownCompartment = (props) => {
  return (
    <div>
      <select>
        {props.options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCompartment;
