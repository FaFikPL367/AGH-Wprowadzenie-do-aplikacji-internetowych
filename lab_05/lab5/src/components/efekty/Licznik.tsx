import { useEffect, useState } from "react";

function Licznik() {
    const [count, setCount] = useState(0);

    // Wypisanie napisu przy załadowaniu komponentu
    useEffect(() => {
        console.log("Hello world!")
    }, []);

    // Wypisanie o ile licznik się zwiększył za każdym razem gdy się zaktualizuje
    useEffect(() => {
        console.log(`Licznik się zwiększył do ${count}`);
    }, [count]);

    return (
        <div>
            <h1>Licznik: {count}</h1>
            <button onClick={() => setCount(count => count + 1)}>Dodaj</button>
        </div>
    );
}

export default Licznik;