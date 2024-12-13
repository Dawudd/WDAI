import {ChangeEvent, useState} from "react";

function Haslo() {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    function set1(event: ChangeEvent<HTMLInputElement>) {
        setPassword1(event.target.value);
        arePasswordsEmpty(event.target.value, password2);
    }
    function set2(event: ChangeEvent<HTMLInputElement>) {
        setPassword2(event.target.value);
        arePasswordsEmpty(password1, event.target.value)
    }
    function check(val1: string, val2: string) {
        if (val1 !== val2) {
            alert("Hasła nie są zgodne");
        } else {
            alert("Zalogowano poprawnie");
        }
    }
    function arePasswordsEmpty(val1: string, val2: string): void {
        if (!val1 || !val2) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        return;
    }
    return (

        <div>
            <p>Hasło</p>
            <input
                type="text"
                onChange={(e) => set1(e)}
            ></input>
            <p>Powtórz hasło</p>
            <input
                type="text"
                onChange={(e) => set2(e)}

            ></input>
            <br /><br />
            <button disabled={isButtonDisabled} onClick={() => check(password1, password2)}>
                Logownie
            </button>
        </div>
    )

}

export default Haslo;