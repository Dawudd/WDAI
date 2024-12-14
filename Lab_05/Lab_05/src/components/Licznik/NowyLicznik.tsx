import {useState} from "react";
import Przycisk from "./Przycisk.tsx";

function NowyLicznik() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div>
            <p>{count}</p>
            <Przycisk onClick={handleClick}></Przycisk>
        </div>
    )
}

export default NowyLicznik;