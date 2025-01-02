import { useState } from "react";

function Haslo() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    return (
        <form>
            <label>
                Hasło:
                <input type="text" name="haslo" value={inputs.haslo || ''} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Powtórz hasło:
                <input type="text" name="powtorzhaslo" value={inputs.powtorzhaslo || ''} onChange={handleChange}/>
            </label>
            <div>
                {inputs.haslo === '' && inputs.powtorzhaslo === '' ? 'Proszę wprowadzić hasło' : inputs.haslo === inputs.powtorzhaslo ? '' : 'Hasła nie są zgodne'}
            </div>
        </form>
    );
}

export default Haslo;