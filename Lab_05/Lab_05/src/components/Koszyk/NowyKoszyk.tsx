import Produkt from "./Produkt.tsx";

function NowyKoszyk() {
    const Owoce: string[] = ["jabłko", "gruszka", "banan", "pomarańcza", "śliwka"];
    const lista = Owoce.map((owoc) => (
        <Produkt nazwa={owoc}></Produkt>
    ))
    return <div>{lista}</div>;
}

export default NowyKoszyk