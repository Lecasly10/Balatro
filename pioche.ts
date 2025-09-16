//import { Couleur } from "./couleur.ts";

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

class Pioche {
    private cartes:Array<Cartes>;
    private lst:Array<Cartes>;

    constructor() {
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
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
        }
        this.lst = [...this.cartes];
    }

    getPioche():Array<Cartes> {return this.lst;}

    affichePioche():void {
        for (let i = 0; i < this.lst.length; i++)
            this.lst[i].afficheCarte();
        console.log("Nombre de cartes dans la pioche : "+this.lst.length);
    }
}

class game {
    private pioche:Pioche;
    private health:number;
    private main:Array<Cartes>;
    private mainJouee:Array<Cartes>;

    constructor(health:number = 1000) {
        this.pioche = new Pioche();
        this.health = health;
        this.main = [];
        this.mainJouee = [];
    }

    setMainJouee(mj:Array<Cartes>) {this.mainJouee = mj;}
    getMainJouee():Array<Cartes> {return this.mainJouee;}

    start():void {
        for (let i = 0; i < 8; i++) this.main.push(this.pioche.getPioche().pop()!);
        console.log("\nMain du joueur :");
        this.main.forEach(c => c.afficheCarte());
        console.log("\nHealth : "+this.health);
        this.choixCarte();
        this.mainJouee.forEach(c => c.afficheCarte());
        this.combinaison();
    }

    choixCarte():void {
        const nb_carte = parseInt(prompt("Combien de cartes voulez-vous jouer ? (1-5) : ")!);
        let i = 0;

        while (i < nb_carte) {
            this.main.forEach(c => c.afficheCarte());
            const c: number = parseInt(prompt("Indiquez l'indexe de la carte que vous voulez ajouter à votre main.(1-" + this.main.length + ")")!);
            if (c >= 1 && c <= this.main.length) {
                this.mainJouee.push(this.main[c - 1]);
                this.main.splice(c - 1, 1);
                i++;
            }
        }
    }

    paire():number{
        let found = false;
        let i = 0;

        for (; i < this.mainJouee.length; i++) {
            for (let j = i + 1; j < this.mainJouee.length; j++) {
                if (this.mainJouee[i].getNom() === this.mainJouee[j].getNom()) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        return this.mainJouee[i].getValeur();
    }

    combinaison():void {
        if (this.paire() != -1) {
            console.log("Vous avez une paire ! Vous gagnez 100 points de vie.");
            this.health -= 10+(2*this.paire()); //10+(2*valeur de la paire)
        }
        else {

    }
}

const g = new game();
//g.start();
const c0 = new Cartes("A",11,"♠");
const c1 = new Cartes("A",11,"♦");
g.setMainJouee([c0, c1])
g.combinaison();

