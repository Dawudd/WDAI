import {useState} from "react";

function Licznik() {
    const [count, setCount] = useState(0);
    function click() {
        setCount(count + 1);
    }
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => click()}>DODAJ</button>
        </div>
    )
}

export default Licznik;