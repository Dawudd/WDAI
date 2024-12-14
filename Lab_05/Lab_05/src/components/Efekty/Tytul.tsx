import {useEffect, useState} from "react";

function Tytul() {
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
        ></input>
    )
}

export default Tytul;