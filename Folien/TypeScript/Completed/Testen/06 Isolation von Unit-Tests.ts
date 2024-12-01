// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Isolation von Unit-Tests</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Unit-Test
//
// - Testet einen kleinen Teil des Codes (eine **"Unit"**)
// - Hat kurze Laufzeit
// - *Ist isoliert*

// %% [markdown]
//
// ## Was ist eine "Unit"?
//
// - Ein Verhalten?
//   - *Unit of behavior*
//   - Teil eines Szenarios/Use-Cases/...
//   - Ursprüngliche Intention von Kent Beck
// - Ein Code-Bestandteil?
//   - *Unit of code*
//   - Oft Unit = Klasse
//   - In der Literatur weit verbreitete Ansicht

// %% [markdown]
//
// ## Was bedeutet "isolierter" Test?
//
// - Keine Interaktion zwischen Tests?
//   - Isolierte Testfälle
//   - Klassische Unit-Tests (Detroit School, Kent Beck)
// - Keine Interaktion zwischen getesteter Einheit und dem Rest des Systems?
//   - Abhängigkeiten werden durch einfache Simulationen ersetzt (Test-Doubles)
//   - London School

// %% [markdown]
//
// ## Isolierte Testfälle (Detroit School)
//
// - Jeder Testfall ist unabhängig von den anderen
// - Tests können in beliebiger Reihenfolge ausgeführt werden
// - Tests können parallel ausgeführt werden

// %% [markdown]
//
// ### Gegenbeispiel: Nicht isolierte Testfälle

// %%
function check(condition: boolean, message: string): void {
    if (!condition) {
        console.log(`Test failed: ${message}`);
    } else {
        console.log(`Success: ${message}`);
    }
}

// %%
class TimeUtils {
    public static globalTime = new Date();

    public static printTime(prefix: string, time: Date): void {
        console.log(`${prefix}: ${time.toISOString()}`);
    }
}

// %%
TimeUtils.printTime("The time is", new Date());

// %%
function test1(): void {
    const now = new Date();
    TimeUtils.printTime("Test 1 global_time: ", TimeUtils.globalTime);
    TimeUtils.printTime("Test 1 now:         ", now);
    check(now.getTime() >= TimeUtils.globalTime.getTime(), "now >= globalTime");
}

// %%
function test2(): void {
    const now = new Date();
    TimeUtils.globalTime = new Date(now.getTime() + 1000);
    TimeUtils.printTime("Test 2 global_time: ", TimeUtils.globalTime);
    TimeUtils.printTime("Test 2 now:         ", now);
    check(now.getTime() < TimeUtils.globalTime.getTime(), "now < globalTime");
}

// %%
test1();
test2();

// %%
test2();
test1();

// %% [markdown]
//
// ## Gründe für nicht isolierte Testfälle
//
// - Veränderlicher globaler/statischer Zustand
// - Veränderliche externe Ressourcen (Dateien, Datenbanken, Netzwerk, ...)

// %% [markdown]
//
// ## Isolation der getesteten Unit
//
// - Die getestete Unit wird von allen anderen Units isoliert
// - Test-Doubles für alle Abhängigkeiten

// %% [markdown]
//
// ### Gegenbeispiel: Nicht isolierte Unit
//
// - Verkäufer von Veranstaltungs-Tickets
// - Konkrete Klasse `Show` repräsentiert eine Veranstaltung

// %%
class Show {
    constructor(public name: string, readonly capacity: number) {}

    public purchase(numTickets: number): void {
        if (numTickets > this.capacity) {
            throw new Error("Not enough capacity");
        }
        this.capacity -= numTickets;
    }
}

// %%
class TicketOffice {
    private shows: { [key: string]: Show } = {};

    public addShow(show: Show): void {
        this.shows[show.name] = show;
    }

    public getShow(showName: string): Show {
        return this.shows[showName];
    }

    public purchaseTickets(showName: string, numTickets: number): boolean {
        if (this.shows[showName]) {
            try {
                this.shows[showName].purchase(numTickets);
                return true;
            } catch (error) {
                console.error(`Cannot purchase ${numTickets} tickets for ${showName}`);
                console.error(error.message);
                return false;
            }
        }
        return false;
    }
}

// %%
const ticketOffice = new TicketOffice();
const show = new Show("TypeScript Conference", 100);
ticketOffice.addShow(show);

const result = ticketOffice.purchaseTickets("TypeScript Conference", 10);

check(result, "Purchase completed successfully.");
check(ticketOffice.getShow("TypeScript Conference").capacity === 90, "Capacity of show was decreased");

// %%
interface Show {
    name: string;
    get capacity(): number;
    purchase(numTickets: number): void;
}

// %%
class ConcreteShow implements Show {
    private _capacity: number;
    
    constructor(readonly name: string, capacity: number) {
        this._capacity = capacity;
    }
    
    get capacity() { return this._capacity; }

    purchase(numTickets: number): void {
        if (numTickets > this.capacity) {
            throw new Error("Not enough capacity");
        }
        this._capacity -= numTickets;
    }
}

// %%
class TicketOffice {
    private shows: { [key: string]: Show } = {};

    public addShow(show: Show): void {
        this.shows[show.name] = show;
    }

    public getShow(showName: string): IShow {
        return this.shows[showName];
    }

    public purchaseTickets(showName: string, numTickets: number): boolean {
        if (this.shows[showName]) {
            try {
                this.shows[showName].purchase(numTickets);
                return true;
            } catch (e) {
                console.error(`Cannot purchase ${numTickets} tickets for ${showName}`);
                console.error(e.message);
                return false;
            }
        }
        return false;
    }
}

// %% [markdown]
//
// ### Isolation von `TicketOffice` für Tests
//
// - Entkopplung von allen Abhängigkeiten
// - `ShowMock`-Implementierung für Shows

// %%
class ShowMock implements Show {
    public name = "TypeScript Conference";
    public capacity = 90;
    public purchaseArgs: number[] = [];

    public purchase(numTickets: number): void {
        this.purchaseArgs.push(numTickets);
    }
}

// %%
function testPurchaseTicketsCallsPurchaseCorrectly() {
    const ticketOffice = new TicketOffice();
    const showMock = new ShowMock();
    ticketOffice.addShow(showMock);
    const numTickets = 10;

    const result = ticketOffice.purchaseTickets("TypeScript Conference", numTickets);

    check(result === true, "Completed purchase successfully.");
    check(showMock.capacity === 90, "Reduced capacity of conference.");
    check(JSON.stringify(showMock.purchaseArgs) === `[${numTickets}]`, "Called purchase() with correct args.");
}

// %%
testPurchaseTicketsCallsPurchaseCorrectly()

// %% [markdown]
//
// ## Vorteile der Isolation der getesteten Unit
//
// - Einfache Struktur der Tests
//   - Jeder Test gehört zu genau einer Unit
// - Genaue Identifikation von Fehlern
// - Aufbrechen von Abhängigkeiten/des Objektgraphen

// %% [markdown]
//
// ## Nachteile der Isolation der getesteten Unit
//
// - Potenziell höherer Aufwand (z.B. Mocks)
// - Fehler in der Interaktion zwischen Units werden nicht gefunden
// - Verleiten zum Schreiben von "Interaktionstests"
// - **Risiko von Kopplung an Implementierungsdetails**

// %% [markdown]
//
// ## Empfehlung
//
// - Verwenden Sie isolierte Unit-Tests (Detroit School)
// - Isolieren Sie Abhängigkeiten, die "eine Rakete starten"
//   - nicht-deterministisch (z.B. Zufallszahlen, aktuelle Zeit, aktuelles Datum)
//   - langsam
//   - externe Systeme (z.B. Datenbank)
// - Isolieren Sie Abhängigkeiten, die ein komplexes Setup benötigen

// %% [markdown]
//
// ## Workshop: Virtuelle Universität
//
// - Im `code`-Ordner finden Sie eine Implementierung eins sehr einfachen
//   Verwaltungssystems für eine Universität:
// - Es gibt Kurse, Professoren, die die Kurse halten, Studenten, die Aufgaben
//   bearbeiten und abgeben müssen.
// - Der Code ist in `Code/StarterKits/virtual-university-sk` zu finden.
// - Die `Main.cs`-Datei illustriert, wie die Klassen zusammenarbeiten und
//   verwendet werden können.

// %% [markdown]
//
// - Identifizieren Sie, welche Klassen und Methoden zu den "wertvollsten"
//   Unit-Tests führen.
// - Implementieren Sie diese Unit-Tests mit xUnit.net.
//   - Idealerweise implementieren sie Tests für alle Klassen, die sinnvolle
//     Tests haben.
//   - Falls Sie dafür nicht genug Zeit haben, können Sie auch nur Tests für
//     einen Teil des Codes schreiben.
//   - Die Klasse `Student` ist ein ganz guter Startpunkt, weil sie eine sehr
//     begrenzte Funktionalität hat, die Sie mit relativ wenigen Tests abdecken
//     können.
// - Sind Ihre Tests isoliert?
//   - Nach der Detroit- oder London-School?

// %% [markdown]
//
// - Falls Sie Ihre Tests nach der Detroit-School isoliert haben:
//   - Überlegen Sie, wie Sie das System überarbeiten müssten, um die Klassen in
//     Tests vollständig zu isolieren, also im London School Stil zu testen.
