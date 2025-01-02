import { useEffect, useState } from "react";

function Licznik() {
    const [licznik, setLicznik] = useState(() => {
        // Funkcja inicjalizująca licznik na podstawie localStoarage
        const savedLicznik = localStorage.getItem('licznik');
        return savedLicznik ? parseInt(savedLicznik, 10) : 0;
    });

    // Aktualizacja licznika w localStorage
    useEffect(() => {
        localStorage.setItem('licznik', licznik.toString());
    }, [licznik]);

    return (
        <div>
            <h1>Licznik: {licznik}</h1>
            <button onClick={() => setLicznik(licznik => licznik + 1)}>+1</button>
        </div>
    )
}

export default Licznik;