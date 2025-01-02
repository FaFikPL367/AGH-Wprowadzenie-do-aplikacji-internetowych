import { useState } from "react";

function Dodawanie({onAdd}) {
    // Stan pojedynczego studenta
    const [student, setStudent] = useState({imie: "", nazwisko: "", rocznik: 0});
    
    // Funkcja obsługująca zmianę wartości w polach formularza
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({...student, [name]: value});
    }
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Zapobiegamy odświeżeniu strony

        // Walidacja danych
        const {imie, nazwisko, rocznik} = student;
        if (imie === "" || nazwisko === "" || isNaN(Number(rocznik))) {
            alert("Wszystkie pola muszą być wypełnione i rocznik musi być liczbą");
            return;
        }

        // Dodajemy studenta do listy
        onAdd(student);

        // Czyszczenie formularza
        setStudent({imie: "", nazwisko: "", rocznik: 0});
    }

    return (
        <form>
            <label>
                Imię:
                <input type="text" name="imie" onChange={handleChange} value={student.imie}/>
            </label>
            <br />
            <label>
                Nazwisko:
                <input type="text" name="nazwisko" onChange={handleChange} value={student.nazwisko}/>
            </label>
            <br />
            <label>
                Rocznik:
                <input type="text" name="rocznik" onChange={handleChange} value={student.rocznik}/>
            </label>
            <br />
            <button onClick={handleSubmit}>Dodaj</button>
        </form>
    );
}

export default Dodawanie;