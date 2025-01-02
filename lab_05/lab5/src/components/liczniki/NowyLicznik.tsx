import { useState } from "react";
import Przycisk from "./Przycisk";

function NowyLicznik() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Licznik: {count}</h1>
            <Przycisk incrementation={() => setCount(count => count+1)}/>
        </div>
    );
}

export default NowyLicznik;