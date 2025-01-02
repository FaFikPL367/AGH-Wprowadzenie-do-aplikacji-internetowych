import Produkt from "./Produkt";

function Koszyk() {
    return (
        <div>
            <Produkt nazwa="Mleko" />
            <Produkt nazwa="Chleb" />
            <Produkt nazwa="Masło" />
            <Produkt nazwa="Jajka" />
            <Produkt nazwa="Cukier" />
        </div>
    );
}

export default Koszyk;