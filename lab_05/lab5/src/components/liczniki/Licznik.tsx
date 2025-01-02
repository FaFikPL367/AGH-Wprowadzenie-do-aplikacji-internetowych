import { useState } from "react";

function Licznik() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Licznik: {count}</h1>
            <button onClick={() => setCount(count => count + 1)}>Dodaj</button>
        </div>
    );
}

export default Licznik;