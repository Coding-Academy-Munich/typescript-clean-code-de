// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Bibliothekssystem: Einführung</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// # Bibliotheks-Verwaltungssystem
//
// - System zur Verwaltung von Benutzern und Medienbestand in Bibliotheken
// - Sowohl für Bibliothekare als auch Benutzer
// - Aktivitäten: Registrierung, Suche, Ausleihe, Rückgabe, Strafzahlungen
// - Suche von Medien in anderen Bibliotheken und Online-Repositories
// - Empfehlungen für Benutzer
// - Verschiedene Oberflächen (Web, App, Terminal)

// %% [markdown]
//
// - Wie könnte das Domänenmodell für ein solches System aussehen?
// - Welche Konzepte gibt es?
// - Welche Use-Cases/Anwendungsfälle gibt es?

// %% [markdown]
//
// ## Domänenmodell: Konzepte
//
// - Medien
//   - Bücher, Videos, Musik, ...
//   - Unterschiedliche Metadaten für verschiedene Medien
// - Benutzer
//   - Mitglieder, Besucher
//   - verschiedene Typen von Mitgliedern: Kinder, Studenten, Senioren, ...
//   - Unterschiedliche Privilegien
//   - Aktivitäten: Ausleihen von Medien, Rückgabe, Suche, Strafzahlungen
// - Bibliothekare
//   - Verwalten von Benutzern und Medien
//   - Aktivitäten: Registrierung, Suche, Ausleihe, Rückgabe, Strafzahlungen

// %% [markdown]
//
// ## Aktivitäten (Bibliothekar)
//
// - Verwalten von Mitgliedern (Registrierung, Löschen, Suche, Modifikation,
//   ...)
// - Verwaltung von Medien (Hinzufügen, Löschen, Suche, Modifikation ...)
// - Ausleihen und Rückgabe von Medien
// - Veranlassen von Erinnerungen, Strafzahlungen
// - Anzeige bisheriger Aktivitäten (Hinzufügen, Ausleihen, ...) für alle
//   Benutzer
// - Anzeige von Aktivitäten für alle Medien

// %% [markdown]
//
// ## Aktivitäten (Benutzer)
//
// - Registrierung, Abmeldung, Mitteilung von Adressänderungen
// - Suche nach Medien
// - Ausleihen und Rückgabe von Medien (Benutzer-Seite)
// - Anzeige der bisherigen Aktivitäten (Ausleihen, Rückgaben, Strafzahlungen)
//   für den Benutzer

// %% [markdown]
//
// ## Workshop: Bibliotheks-Verwaltungssystem (Teil 1)
//
// - Entwickeln Sie ein erstes Domänenmodell für das Bibliotheks-Verwaltungssystem
//   - Sie können z.B. ein Klassendiagramm verwenden oder einfach nur eine Liste
//     von Klassen und Attributen
// - Welche Klassen in Ihrem Domänenmodell haben Assoziationen zu
//   - Mitgliedern?
//   - Büchern?

// %% [markdown]
//
// - Verwenden Sie das Creator Pattern um zu entscheiden, welche Klasse die
//   Verantwortung für das Erstellen von Mitgliedern und welche die Verantwortung
//   für das Erstellen von Büchern hat
// - Verwenden Sie das Information Expert Pattern um zu entscheiden, welche Klasse
//   die Verantwortung für das Suchen von Mitgliedern und welche die Verantwortung
//   für das Suchen von Büchern hat
// - Implementieren Sie diesen Teil des Domänenmodells in TypeScript
// - Versuchen Sie dabei das Prinzip der niedrigen Repräsentationslücke anzuwenden

// %%
class Member {
    name: string;
    address: string;
    email: string;

    constructor(name: string, address: string, email: string) {
        this.name = name;
        this.address = address;
        this.email = email;
    }

    toString() {
        return `Member(${this.name}, ${this.address}, ${this.email})`;
    }
}

// %%
class Book {
    title: string;
    isbn: string;

    constructor(title: string, isbn: string) {
        this.title = title;
        this.isbn = isbn;
    }

    toString() {
        return `Book(${this.title}, ${this.isbn})`;
    }
}

// %%
class LibrarySystem {
    private members: Member[];
    private books: Book[];

    constructor() {
        this.members = [];
        this.books = [];
    }

    toString() {
        let result = "Members:\n";
        this.members.forEach(member => {
            result += `  ${member.name}\n`;
        });
        result += "Books:\n";
        this.books.forEach(book => {
            result += `  ${book.title}\n`;
        });
        return result;
    }

    addMember(name: string, address: string, email: string) {
        const member = new Member(name, address, email);
        this.members.push(member);
    }

    addBook(title: string, isbn: string) {
        const book = new Book(title, isbn);
        this.books.push(book);
    }

    findMember(name: string) {
        return this.members.find(member => member.name === name);
    }

    findBook(title: string) {
        return this.books.find(book => book.title === title);
    }
}

// %%
const library = new LibrarySystem();

// %%
library.addMember("Max Mustermann", "Musterstraße 1", "max@example.com");

// %%
library.addBook("Design Patterns", "978-0-20163-361-0");

// %%
const foundMember = library.findMember("Max Mustermann");
console.log(foundMember?.toString());

// %%
const foundBook = library.findBook("Design Patterns");
console.log(foundBook?.toString());

// %%
console.log(library.toString());

// %%
