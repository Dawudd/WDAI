import {useState} from "react";

function Formularz() {
    const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
            ></input>
            <div>
                {inputValue}
            </div>
        </div>
    )
}

export default Formularz;