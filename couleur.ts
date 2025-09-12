import { Cartes } from "./Cartes.ts";

export class Couleur {
    private nb_carte:number;
    private nom:string;
    private symbol:string;
    private cartes:Array<Cartes>;

    constructor(nom : string) {
        this.nb_carte = 13;

        switch (nom) {
            case "pic": {
                this.symbol = "♠";
                this.nom = nom;
                break;
            }
            case "carreau": {
                this.symbol = "♦";
                this.nom = nom;
                break;
            }
            case "coeur": {
                this.symbol = "♥";
                this.nom = nom;
                break;
            }
            case "trefle": {
                this.symbol = "♣";
                this.nom = nom;
                break;
            }
            default : throw new Error("Cette couleur n'existe pas\n");
        }
        this.cartes = [];
        this.remplirCartes();
    }
    getNom():string {return this.nom;}
    getNb():number {return this.nb_carte;}
    getSymbol():string {return this.symbol;}
    getCartes():Array<Cartes> {return this.cartes;}

    remplirCartes():void {
        for (let i = 1; i <= 13; i++) {
            let c:Cartes;

            if (i >= 2 && i <= 10)
                c = new Cartes(i.toString(),i, this.getSymbol());
            else {
                let n:string = "";

                switch (i) {
                    case 1: n = "A"; break;
                    case 11: n = "V"; break;
                    case 12: n = "D"; break;
                    case 13: n = "R"; break;
                }
                c = new Cartes(n, 11, this.getSymbol());
            }
            this.cartes.push(c);
        }
    }
}
