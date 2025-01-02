import { useEffect, useState } from "react";

function Title() {
    const [title, setTitle] = useState('');

    const changeTitle = (e) => {
        // Atualizacja stanu
        setTitle(e.target.value);
    }

    useEffect(() => {
        // Zmiana tytułu strony
        document.title = title;
    }, [title]);

    return (
        <div>
            <input type="text" name="title" value={title} onChange={changeTitle}/>
        </div>
    );
}

export default Title;