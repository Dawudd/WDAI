function Ternary() {
    let a: boolean = true;
    let b: boolean = false;

    return (
        <div>
            <div>
                Stwierdzenie <b>a</b> jest {a ? "prawdziwe" : "fałszywe"}.
            </div>
            <div>
                Stwierdzenie <b>b</b> jest {b ? "prawdziwe" : "fałszywe"}.
            </div>
        </div>
    )
}

export default Ternary