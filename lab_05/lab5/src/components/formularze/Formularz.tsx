import { useState } from "react";

function Formularz() {
  const [name, setName] = useState("");

  // Funkcja to radzenia sobie z wartościami wprowadzanymi do formularza
  const handleChange = (event) => {
    setName(event.target.value);
  }

  return (
    <form>
      <input type="text" value={name} onChange={handleChange}/>
      <div>{name}</div>
    </form>
  );
}

export default Formularz;
