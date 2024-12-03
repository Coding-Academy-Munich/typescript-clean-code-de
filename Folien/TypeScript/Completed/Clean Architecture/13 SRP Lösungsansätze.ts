// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>SRP: Lösungsansätze</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Ein Änderungsgrund?
//
// <img src="img/book_01.png"
//      style="display:block;margin:auto;width:35%"/>
//

// %% [markdown]
//
// ## Verletzung des SRPs
//
// <img src="img/book_02.png"
//      style="display:block;margin:auto;width:60%"/>

// %%
class Book {
    constructor(
        public readonly title: string,
        public readonly author: string,
        public readonly pages: number
    ) {}

    print(): void {
        // Lots of code that handles the printer
        console.log(`Printing ${this.title} to printer.`);
    }

    save(): void {
        // Lots of code that handles the database
        console.log(`Saving ${this.title} to database.`);
    }
}

// %%
const book = new Book("Clean Code", "Robert C. Martin", 464);

// %%
book.print();

// %%
book.save();

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 1a)
//
// Vorschlag in Clean Architecture:
//
// <img src="img/book_resolution_1a_srp.png"
//      style="display:block;margin:auto;width:40%"/>

// %%
class BookV1 {
    constructor(
        public readonly title: string,
        public readonly author: string,
        public readonly pages: number
    ) {}
}

// %%
class BookPrinterV1a {
    constructor(private readonly book: BookV1) {}

    print(): void {
        // Lots of code that handles the printer
        console.log(`Printing ${this.book.title} to printer.`);
    }
}

// %%
class BookDatabaseV1a {
    constructor(private readonly book: BookV1) {}

    save(): void {
        // Lots of code that handles the database
        console.log(`Saving ${this.book.title} to database.`);
    }
}

// %%
const bookV1 = new BookV1("Clean Code", "Robert C. Martin", 464);

// %%
const bookPrinterV1a = new BookPrinterV1a(bookV1);

// %%
bookPrinterV1a.print();

// %%
const bookDatabaseV1a = new BookDatabaseV1a(bookV1);

// %%
bookDatabaseV1a.save();

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 1a mit Fassade)
//
// <img src="img/book_resolution_1a_srp_facade.png"
//      style="display:block;margin:auto;width:50%"/>

// %%
class BookPrinterFacadeV1a {
    constructor(book: BookV1) {
        this.bookPrinter = new BookPrinterV1a(book);
        this.bookDatabase = new BookDatabaseV1a(book);
    }

    print(): void {
        this.bookPrinter.print();
    }

    save(): void {
        this.bookDatabase.save();
    }

    private readonly bookPrinter: BookPrinterV1a;
    private readonly bookDatabase: BookDatabaseV1a;
}

// %%
const bookPrinterFacadeV1a = new BookPrinterFacadeV1a(bookV1);

// %%
bookPrinterFacadeV1a.print();

// %%
bookPrinterFacadeV1a.save();

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 1b)
//
// <img src="img/book_resolution_1_srp.png"
//      style="display:block;margin:auto;width:50%"/>

// %%
class BookPrinterV1b {
    print(book: BookV1): void {
        // Lots of code that handles the printer
        console.log(`Printing ${book.title} to printer.`);
    }
}

// %%
class BookDatabaseV1b {
    save(book: BookV1): void {
        // Lots of code that handles the database
        console.log(`Saving ${book.title} to database.`);
    }
}

// %%
const bookV1 = new BookV1("Clean Code", "Robert C. Martin", 464);

// %%
const bookPrinterV1b = new BookPrinterV1b();

// %%
bookPrinterV1b.print(bookV1);

// %%
const bookDatabaseV1b = new BookDatabaseV1b();

// %%
bookDatabaseV1b.save(bookV1);

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 1b mit Fassade)
//
// <img src="img/book_resolution_1_srp_facade.png"
//      style="display:block;margin:auto;width:50%"/>

// %%
class BookFacadeV1b {
    private readonly book: BookV1;
    private readonly bookPrinter: BookPrinterV1b;
    private readonly bookDatabase: BookDatabaseV1b;

    constructor(book: BookV1) {
        this.book = book;
        this.bookPrinter = new BookPrinterV1b();
        this.bookDatabase = new BookDatabaseV1b();
    }

    print(): void {
        this.bookPrinter.print(this.book);
    }

    save(): void {
        this.bookDatabase.save(this.book);
    }
}

// %%
const bookFacadeV1 = new BookFacadeV1b(bookV1);

// %%
bookFacadeV1.print();

// %%
bookFacadeV1.save();

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 1c)

// %%
class BookPrinterV1c {
    static print(book: BookV1): void {
        // Lots of code that handles the printer
        console.log(`Printing ${book.title} to printer.`);
    }
}

// %%
class BookDatabaseV1c {
    static save(book: BookV1): void {
        // Lots of code that handles the database
        console.log(`Saving ${book.title} to database.`);
    }
}

// %%
const bookV1 = new BookV1("Clean Code", "Robert C. Martin", 464);

// %%
BookPrinterV1c.print(bookV1);

// %%
BookDatabaseV1c.save(bookV1);

// %% [markdown]
//
// ## Auflösung der SRP-Verletzung (Version 2)
//
// <img src="img/book_resolution_2_srp.png"
//      style="display:block;margin:auto;width:60%"/>

// %%
interface IBook {
    get title(): string;
}

// %%
class BookPrinterV2 {
    print(book: IBook): void {
        // Lots of code that handles the printer
        console.log(`Printing ${book.title} to printer.`);
    }
}

// %%
class BookDatabaseV2 {
    save(book: IBook): void {
        // Lots of code that handles the database
        console.log(`Saving ${book.title} to database.`);
    }
}

// %%
class BookV2 implements IBook {
    constructor(
        readonly title: string,
        readonly author: string,
        readonly pages: number) {}


    print(): void {
        this.bookPrinter.print(this);
    }

    save(): void {
        this.bookDatabase.save(this);
    }

    private readonly bookPrinter = new BookPrinterV2();
    private readonly bookDatabase = new BookDatabaseV2();
}

// %%
const bookV2 = new BookV2("Clean Code", "Robert C. Martin", 464);

// %%
bookV2.print();

// %%
bookV2.save();

// %% [markdown]
//
// ## Vergleich
//
// <div>
// <img src="img/book_resolution_1a_srp.png"
//      style="float:left;padding:5px;width:40%"/>
// <img src="img/book_resolution_2_srp.png"
//      style="float:right;padding:5px;width:50%"/>
// </div>

// %% [markdown]
//
// ## Workshop: Wetter-App
//
// Sie arbeiten an einer vielseitigen Wetteranwendung namens WeatherWise. Die
// WeatherWise App bietet ihren Benutzern aktuelle Wetterinformationen aus
// verschiedenen Online-Plattformen. Über die Anzeige der aktuellen Bedingungen
// hinaus ermöglicht die App den Benutzern, die Vorhersage in verschiedenen
// visuellen Formaten anzuzeigen, und sie protokolliert Fehler für alle Probleme
// während des Datenabrufs oder der Analyse.
//
// Während WeatherWise für seine Funktionen gut ankommt, sieht sich das
// Entwicklungsteam mit Herausforderungen bei der Wartung und Erweiterung der
// Anwendung konfrontiert. Die Entwickler haben festgestellt, dass die
// Kernklasse, `Weather`, zunehmend komplex wird. Sie behandelt alles von der
// Datenbeschaffung bis zur Datendarstellung. Diese Komplexität erschwert die
// Einführung neuer Funktionen, ohne dass dabei die Gefahr besteht, Fehler
// einzuführen.
//
// Ihre Aufgabe: Refaktorisieren Sie die Klasse `Weather`, indem Sie
// sicherstellen, dass jede Klasse im System dem Single Responsibility Principle
// entspricht.

// %% [markdown]
//
// ### Klassendiagramm der Wetter-App
//
// <img src="img/weather_app_class.png"
//      style="display:block;margin:auto;width:40%"/>

// %% [markdown]
//
// ### RunWeatherApp() Sequenzdiagramm
//
// <img src="img/weather_app_sequence.png"
//      style="display:block;margin:auto;width:40%"/>

// %%
class Weather {
    fetchDataFromSource(): void {
        // Simulating fetching data from some source
        this.rawData = "Sunny, 25°C";
        console.log("Data fetched from source.");
    }

    parseData(): void {
        // Simulate data parsing
        if (!this.rawData) {
            this.logError("No data available");
            return;
        }
        this.data = [10.0, 12.0, 8.0, 15.0, 20.0, 22.0, 25.0];
        console.log("Data parsed: " + this.formatData());
    }

    displayInFormatA(): void {
        // Simulating one display format
        if (this.data.length === 0) {
            this.logError("No data available");
            return;
        }
        console.log("Format A: " + this.formatData());
    }

    displayInFormatB(): void {
        // Simulating another display format
        if (this.data.length === 0) {
            this.logError("No data available");
            return;
        }
        console.log("Format B: === " + this.formatData() + " ===");
    }

    logError(errorMsg: string): void {
        // Simulating error logging
        console.log("Error: " + errorMsg);
    }

    private formatData(): string {
        return this.data.join(", ");
    }

    private rawData: string = "";
    private data: number[] = [];
}

// %%
function runWeatherApp(introduceError: boolean) {
    const w = new Weather();
    w.fetchDataFromSource();
    if (!introduceError) {
        w.parseData();
    }
    w.displayInFormatA();
    w.displayInFormatB();
}

// %%
runWeatherApp(false);

// %%
runWeatherApp(true);

// %% [markdown]
//
// ### Implementierung nach Auflösung der SRP-Verletzungen:

// %% [markdown]
// ### Klassendiagramm der Wetter-App
//
// <img src="img/weather_app_class_srp.png"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ### RunWeatherApp() Sequenzdiagramm
//
// <div/>
// <img src="img/weather_app_sequence_srp.png"
//      style="display:block;margin:auto;width:75%"/>

// %%
class WeatherErrorLogger {
    public logError(errorMsg: string) {
        console.log("Error: " + errorMsg);
    }
}

// %%
class WeatherData {
    constructor(readonly data: number[] = []) {}


    public formattedData() {
        if (this.data.length === 0) {
            throw new Error("No data available!");
        }
        return this.data.join(", ");
    }
}

// %%
class WeatherDataSource {
    constructor(private readonly errorLogger: WeatherErrorLogger) {}

    public fetchData() {
        // Simulating fetching data from some source
        this._rawData = "Sunny, 25°C";
        this._hasData = true;
        console.log("Data fetched from source.");
    }

    public get rawData() {
        if (this._hasData) {
            return this._rawData;
        } else {
            this.errorLogger.logError("WeatherDataSource has no data!");
            return "";
        }
    }

    private _rawData: string = "";
    private _hasData: boolean = false;
}

// %%
class WeatherDataParser {
    constructor(private readonly errorLogger: WeatherErrorLogger) {}

    public parse(rawData: string): WeatherData {
        // Simulate data parsing
        if (rawData === "") {
            this.errorLogger.logError("No data available for parsing!");
            return new WeatherData();
        }

        const data = [10.0, 12.0, 8.0, 15.0, 20.0, 22.0, 25.0];
        console.log("Data parsed.");
        return new WeatherData(data);
    }
}

// %%
class WeatherDisplay {
    constructor(private readonly errorLogger: WeatherErrorLogger) {}

    public displayInFormatA(data: WeatherData) {
        try {
            const formattedData = data.formattedData();
            console.log("Format A: " + formattedData);
        } catch (e) {
            this.errorLogger.logError("In displayInFormatA: " + (e as Error).message);
        }
    }

    public displayInFormatB(data: WeatherData) {
        try {
            const formattedData = data.formattedData();
            console.log("Format B: === " + formattedData + " ===");
        } catch (e) {
            this.errorLogger.logError("In displayInFormatB: " + (e as Error).message);
        }
    }
}

// %%
function runWeatherAppSrp(introduceError: boolean) {
    const errorLogger = new WeatherErrorLogger();
    const parser = new WeatherDataParser(errorLogger);

    const dataSource = new WeatherDataSource(errorLogger);
    if (!introduceError) {
        dataSource.fetchData();
    }

    const weatherData = parser.parse(dataSource.rawData);

    const weatherDisplay = new WeatherDisplay(errorLogger);
    weatherDisplay.displayInFormatA(weatherData);
    weatherDisplay.displayInFormatB(weatherData);
}

// %%
runWeatherAppSrp(false);

// %%
runWeatherAppSrp(true);
// %% [markdown]
//
// - Mit diesem refaktorierten Code erfüllt jede Klasse das Single
//   Responsibility Prinzip.
// - Jede Klasse behandelt eine eigene Verantwortlichkeit: Datenbeschaffung,
//   Datenanalyse, Datenanzeige und Fehlerprotokollierung.
// - Diese Trennung ermöglicht eine einfachere Wartung, Tests und potenzielle
//   zukünftige Erweiterungen.
