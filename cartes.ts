export class Cartes {
    private nom:string;
    private valeur:number;
    private symbol:string;

    constructor(nom:string, valeur:number, symbol:string) {
        this.nom = nom;
        this.valeur = valeur;
        this.symbol = symbol;
    }
    getNom():string {return this.nom;}
    getValeur():number {return this.valeur;}
    getSymbol():string {return this.symbol;}

    afficheCarte():void {console.log(this.nom+""+this.symbol);}
}