import './App.css'
import Koszyk from "./components/Koszyk/Koszyk.tsx";
import NowyKoszyk from "./components/Koszyk/NowyKoszyk.tsx";
import Licznik from "./components/Licznik/Licznik.tsx";
import Formularz from "./components/Formularze/Formularz.tsx";
import Haslo from "./components/Formularze/Haslo.tsx";
import Logowanie from "./components/Formularze/Logowanie.tsx";
import Ternary from "./components/Inne/Ternary.tsx";
import Aktualizacja from "./components/Inne/Aktualizacja.tsx";
import Studenci from "./components/Studenci/Studenci.tsx";
import NowyLicznik from "./components/Licznik/NowyLicznik.tsx";
import StudentManager from "./components/Studenci/StudentManager.tsx";
import UseEffectLicznik from "./components/Efekty/useEffectLicznik.tsx";
import Tytul from "./components/Efekty/Tytul.tsx";
import Odliczanie from "./components/Efekty/Odliczanie.tsx";

function App() {
    return (
        <>
            <div className="1">
                <h1>1</h1>
                <h2>Koszyk</h2>
                <Koszyk></Koszyk>
                <h2>NowyKoszyk</h2>
                <NowyKoszyk></NowyKoszyk>
            </div>
            <div>
                <h1>2</h1>
                <h2>Licznik</h2>
                <Licznik></Licznik>
                <h2>NowyLicznik</h2>
                <NowyLicznik></NowyLicznik>
            </div>
            <div>
                <h1>3</h1>
                <h2>Formularz</h2>
                <Formularz></Formularz>
                <h2>Haslo</h2>
                <Haslo></Haslo>
                <h2>Logowanie</h2>
                <Logowanie></Logowanie>
            </div>
            <div>
                <h1>4</h1>
                <h2>Ternary</h2>
                <Ternary></Ternary>
                <h2>Aktualizacja</h2>
                <Aktualizacja></Aktualizacja>
            </div>
            <div>
                <h1>5</h1>
                <h2>Studenci</h2>
                <Studenci></Studenci>
                <h2>StudentManager + Dodawanie</h2>
                <StudentManager></StudentManager>
            </div>
            <div>
                <h1>6</h1>
                <h2>UseEffectLicznik</h2>
                <UseEffectLicznik></UseEffectLicznik>
                <h2>Tytuł</h2>
                <Tytul></Tytul>
                <h2>Odliczanie</h2>
                <Odliczanie></Odliczanie>
            </div>
            <div>
                <h1>7</h1>

            </div>
        </>
    )
}

export default App
