import { useState } from "react";

function Aktualizacja() {
    const [produkt, setProdukt] = useState({nazwa: 'Pomidor', cena: 50});
    
    const updatePrice = () => {
        setProdukt(prev => ({...prev, cena: 100}));
    }

    return (
        <div>
            <h1>Aktualnie {produkt.nazwa} kosztuje {produkt.cena}</h1>
            <button onClick={updatePrice}>Zmień cenę</button>
        </div>
    );
}

export default Aktualizacja;