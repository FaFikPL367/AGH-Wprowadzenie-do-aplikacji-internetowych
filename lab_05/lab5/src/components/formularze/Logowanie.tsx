import { useState } from "react";

function Haslo() {
    const [inputs, setInputs] = useState({});

    // Funkcja to radzenia sobie z wartościami wprowadzanymi do formularza
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    // Funkcja do obsługi logowania
    const handleLogin = (event) => {
        event.preventDefault(); // Zapobiega odświeżeniu strony
        
        if (inputs.haslo === inputs.powtorzhaslo && inputs.haslo && inputs.powtorzhaslo && inputs.nazwa) { 
            alert('Zalogowano poprawnie');
        } else if (inputs.haslo !== inputs.powtorzhaslo && inputs.haslo && inputs.powtorzhaslo && inputs.nazwa) {
            alert('Hasła nie są zgodne');
        }
    }

    return (
        <form>
            <label>
                Nazwa użytkownika:
                <input type="text" name="nazwa" value={inputs.nazwa || ''} onChange={handleChange}/>
            </label>
            <br />
            <label>
                Hasło:
                <input type="text" name="haslo" value={inputs.haslo || ''} onChange={handleChange}/>
            </label>
            <br />
            <label>
                Powtórz hasło:
                <input type="text" name="powtorzhaslo" value={inputs.powtorzhaslo || ''} onChange={handleChange}/>
            </label>
            <br />
            
            <button disabled={!inputs.nazwa || !inputs.haslo || !inputs.powtorzhaslo} onClick={handleLogin}>Logowanie</button>
        </form>
    );
}

export default Haslo;