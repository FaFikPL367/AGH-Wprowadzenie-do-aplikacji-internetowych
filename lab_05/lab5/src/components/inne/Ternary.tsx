const a: boolean = true;
const b: boolean = true;

function Ternary() {
    return (
        <div>
            {a ? <div>Stwierdzenie "a" jest porpawne</div> : <div>Stwierdzenie "a" jest fałszywe</div>}
            {b ? <div>Stwierdzenie "b" jest porpawne</div> : <div>Stwierdzenie "b" jest fałszywe</div>}
        </div>
    );
}

export default Ternary;