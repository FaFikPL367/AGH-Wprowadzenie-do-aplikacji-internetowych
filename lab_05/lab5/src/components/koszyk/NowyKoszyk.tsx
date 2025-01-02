import Produkt from "./Produkt";

const Produkty = ["Mleko", "Chleb", "Masło", "Jajka", "Cukier"];

function Koszyk() {
    return (
        <div>
            {Produkty.map((pro, idx) => <Produkt key={idx} nazwa={pro} />)}
        </div>
    );
}

export default Koszyk;