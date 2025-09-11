class Cartes {
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

class Couleur {
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

class Pioche {
    private cartes:Array<Cartes>;
    private lst:Array<Cartes>;

    constructor() {
        // Crée un tableau plat de 52 cartes
        this.cartes = [
            ...new Couleur("pic").getCartes(),
            ...new Couleur("trefle").getCartes(),
            ...new Couleur("carreau").getCartes(),
            ...new Couleur("coeur").getCartes()
        ];
        this.lst = [];
        this.remplirPioche();
    }

    remplirPioche():void {
        // Mélange le tableau de cartes
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
        }
        // Copie les cartes mélangées dans lst
        this.lst = [...this.cartes];
    }

    getPioche():Array<Cartes> {return this.lst;}

    affichePioche():void {
        for (let i = 0; i < this.lst.length; i++) {
            this.lst[i].afficheCarte();
        }
        console.log(this.lst.length);
    }
}

const p = new Pioche();

p.affichePioche();