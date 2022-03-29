import "./App.css";
import SongContainer from "./SongContainer/songContainer";
import DropdownCompartment from "./DropdownCompartment/dropdownCompartment";

function App() {
  const data = [
    { value: 1, name: "A" },
    { value: 2, name: "B" },
    { value: 3, name: "C" },
  ];

  return (
    <div className="App">
      <DropdownCompartment options={data}></DropdownCompartment>
      <h1>Song List</h1>
      <SongContainer></SongContainer>
    </div>
  );
}

export default App;
