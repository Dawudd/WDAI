import {useState} from "react";

function Przycisk() {
    const [count, setCount] = useState(0);
    function click() {
        setCount(count + 1);
    }
    return (
        <button onClick={click}>

        </button>
    )
}

export default Przycisk