import { useEffect, useState } from "react";

function Odliczanie() {
    const [licznik, setLicznik] = useState(15.0);
    const [isActivated, setIsActivated] = useState(false);
    
    // W razie zmiany stanu
    const handleChange = () => {
        setIsActivated(prev => !prev);
    }

    // Działanie licznika
    useEffect(() => {
        let intervalID: number;

        // Jeżeli licznik jest uruchomiony
        if (isActivated && licznik > 0) {
            intervalID = setInterval(() => {
                setLicznik(prev => Math.max(Number((prev - 0.1).toFixed(1)), 0));
            }, 100);
        } 

        // Jeżeli licznik nie jest uruchomiony
        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        }
    }, [isActivated, licznik]);
    
    return (
        <div>
            <h1>{licznik}</h1>
            <button disabled={licznik===0} onClick={handleChange}>
                {licznik===0 ? "Odliczanie zakończone": isActivated ? "STOP" : "START"}
            </button>
        </div>
    );
}

export default Odliczanie;