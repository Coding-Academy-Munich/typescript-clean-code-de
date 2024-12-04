// -*- coding: utf-8 -*-
// %% [markdown]
// <!--
// clang-format off
// -->
//
// <div style="text-align:center; font-size:200%;">
//   <b>SOLID: Dependency-Inversions-Prinzip</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// # Abhängigkeiten
//
// - Wir müssen zwei Arten von Abhängigkeiten unterscheiden:
//   - Daten- und Kontrollfluss
//   - Quellcode-, Modul- und Package-Abhängigkeiten
// - Daten- und Kontrollfluss-Abhängigkeiten sind inhärent in der Logik
// - Quellcode-Abhängigkeiten können wir durch die Architektur kontrollieren

// %% [markdown]
//
// ## Beispiel
//
// <img src="img/db-example-01.png"
//      style="display:block;margin:auto;width:75%"/>
//
// Die Quellcode-Abhängigkeit geht in die gleiche Richtung wie der Datenfluss:
//
// `MyModule.ts` ⟹ `Database.ts`

// %% [markdown]
//
// Modul `Database.ts`

// %%
class Database {
    execute(query: string, data: string): string[] {
        // Simulate database interaction
        const result: string[] = [];
        if (query.startsWith("SELECT")) {
            result.push("Data from the database");
        } else if (query.startsWith("INSERT")) {
            console.log(`Inserted: ${data}`);
        }
        return result;
    }
}

// %% [markdown]
//
// Modul `MyModule.ts`:

// %%
class MyDomainClassV1 {
    private readonly db = new Database();

    performWork(data: string): void {
        data = "Processed: " + data;
        this.db.execute("INSERT INTO my_table VALUES (?)", data);
    }

    retrieveResult(): string[] {
        return this.db.execute("SELECT * FROM my_table", "");
    }
}

// %%
const myDomainObjectV1 = new MyDomainClassV1();

// %%
myDomainObjectV1.performWork("Hello World");

// %%
console.log(myDomainObjectV1.retrieveResult());

// %% [markdown]
//
// Wir würden derartige Abhängigkeiten im Kern unsere Anwendung gerne vermeiden
//
// - Einfacher zu testen
// - Einfacher externe Abhängigkeiten zu ersetzen
// - Einfacher den Code zu verstehen
// - ...

// %% [markdown]
//
// <img src="img/db-example-02.png"
//      style="display:block;margin:auto;width:75%"/>

// %% [markdown]
//
// - Modul `MyModule.ts`:
//   - Keine Abhängigkeit mehr zu `Database.ts`
//   - Adapter Pattern

// %%
interface IAbstractDatabaseAdapter {
    saveObject(data: string): void;
    retrieveData(): string[];
}

// %%
class MyDomainClassV2 {
    private readonly db: IAbstractDatabaseAdapter;

    constructor(db: IAbstractDatabaseAdapter) {
        this.db = db;
    }

    public performWork(data: string) {
        data = "Processed: " + data;
        this.db.saveObject(data);
    }

    public retrieveResult(): string[] {
        return this.db.retrieveData();
    }
}
// %% [markdown]
//
// - Modul `ConcreteDatabaseAdapter.ts`:
//   - Implementiert `IAbstractDatabaseAdapter` für `Database.ts`
//   - Hängt von `Database.ts` ab

// %%
class ConcreteDatabaseAdapter implements IAbstractDatabaseAdapter {
    private readonly db = new Database();

    saveObject(data: string): void {
        this.db.execute("INSERT INTO my_table VALUES (?)", data);
    }

    retrieveData(): string[] {
        return this.db.execute("SELECT * FROM my_table", "");
    }
}

// %% [markdown]
//
// - Modul `Main.ts`:

// %%
const dbAdapter: IAbstractDatabaseAdapter = new ConcreteDatabaseAdapter();

// %%
const myDomainObjectV2: MyDomainClassV2 = new MyDomainClassV2(dbAdapter);

// %%
myDomainObjectV2.performWork("Hello World");

// %%
console.log(myDomainObjectV2.retrieveResult());

// %% [markdown]
//
// # SOLID: Dependency Inversion Prinzip
//
// - Die Kernfunktionalität eines Systems hängt nicht von seiner Umgebung ab
//   - **Konkrete Artefakte hängen von Abstraktionen ab** (nicht umgekehrt)
//   - **Instabile Artefakte hängen von stabilen Artefakten ab** (nicht umgekehrt)
//   - **Äußere Schichten** der Architektur **hängen von inneren Schichten ab**
//     (nicht umgekehrt)
//   - Klassen/Module hängen von Abstraktionen (z. B. Schnittstellen) ab,
//     nicht von anderen Klassen/Modulen
// - Abhängigkeitsinversion (Dependency Inversion) erreicht dies durch die Einführung
//   von Schnittstellen, die "die Abhängigkeiten umkehren"

// %% [markdown]
//
// ### Vorher
// <img src="img/dependency-01.png"
//      style="display:block;margin:auto;width:75%"/>
//
// ### Nachher
// <img src="img/dependency-02.png"
//      style="display:block;margin:auto;width:75%"/>

// %% [markdown]
//
// <img src="img/dip-01.png"
//      style="display:block;margin:auto;width:95%"/>

// %% [markdown]
//
// <img src="img/dip-02.png"
//      style="display:block;margin:auto;width:95%"/>

// %% [markdown]
//
// <img src="img/dip-03.png"
//      style="display:block;margin:auto;width:95%"/>

// %% [markdown]
//
// ## Workshop: Wetterbericht
//
// Wir haben ein Programm geschrieben, das einen Wetterbericht von einem Server
// abruft. Leider ist dabei die Abhängigkeit zum Server vom Typ
// `LegacyWeatherServer` hart kodiert. Aufgrund der Popularität des Programms
// müssen wir jedoch mit einem neuen Typ von Server `NewWeatherServer`
// kompatibel werden. Dazu refaktorisieren wir den Code nach dem
// Dependency-Inversion-Prinzip und Implementieren dann einen zusätzlichen
// Adapter für `NewWeatherServer`.
//
// - Führen Sie eine Abstraktion ein, um die Abhängigkeit umzukehren
// - Schreiben Sie eine konkrete Implementierung der Abstraktion für
//   `LegacyWeatherServer`
// - Testen Sie die Implementierung
// - Implementieren Sie einen Adapter für `NewWeatherServer`
// - Testen Sie den Adapter

// %%
class WeatherReport {
    constructor(public temperature: number, public humidity: number) {}
}

// %%
class LegacyWeatherServer {
    private static readonly random = Math.random;

    public getWeatherReport(): WeatherReport {
        return new WeatherReport(20.0 + 10.0 * LegacyWeatherServer.random(), 0.5 + 0.5 * LegacyWeatherServer.random());
    }
}

// %%
class NewWeatherServer {
    private static readonly random = Math.random;

    public fetchWeatherData(): WeatherReport {
        const temperature = 10.0 + 20.0 * NewWeatherServer.random();
        const humidity = 0.7 + 0.4 * NewWeatherServer.random();
        return new WeatherReport(temperature, humidity);
    }
}

// %%
class WeatherReporter {
    private readonly server: LegacyWeatherServer;

    constructor(server: LegacyWeatherServer) {
        this.server = server;
    }

    public report(): string {
        const report = this.server.getWeatherReport();
        return report.temperature > 25.0 ? "It's hot" : "It's not hot";
    }
}

// %%
const server = new LegacyWeatherServer();
const reporter = new WeatherReporter(server);

// %%
console.log(reporter.report());

// %%
interface IWeatherDataSource {
    getWeatherReport(): WeatherReport;
}

// %%
class NewWeatherReporter {
    private readonly dataSource: IWeatherDataSource;

    constructor(dataSource: IWeatherDataSource) {
        this.dataSource = dataSource;
    }

    public report(): string {
        const report = this.dataSource.getWeatherReport();
        return report.temperature > 25.0 ? "It's hot" : "It's not hot";
    }
}

// %%
class LegacyWeatherServerAdapter implements IWeatherDataSource {
    private readonly server: LegacyWeatherServer;

    constructor(server: LegacyWeatherServer) {
        this.server = server;
    }

    public getWeatherReport(): WeatherReport {
        return this.server.getWeatherReport();
    }
}

// %%
const legacyReporter = new NewWeatherReporter(new LegacyWeatherServerAdapter(server));

// %%
console.log(legacyReporter.report());

// %%
class NewWeatherServerAdapter implements IWeatherDataSource {
    private readonly server: NewWeatherServer;

    constructor(server: NewWeatherServer) {
        this.server = server;
    }

    public getWeatherReport(): WeatherReport {
        return this.server.fetchWeatherData();
    }
}

// %%
const newServer = new NewWeatherServer();
const newReporter = new NewWeatherReporter(new NewWeatherServerAdapter(newServer));

// %%
console.log(newReporter.report());

// %%
