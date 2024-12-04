// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>GoF: Strategy Pattern</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ### Zweck
//
// - Austauschbare Algorithmen / austauschbares Verhalten
// - Algorithmen unabhängig von Klassen, die sie verwenden

// %% [markdown]
//
// ### Auch bekannt als
//
// Policy

// %% [markdown]
//
// ### Motivation
//
// - Wir wollen einen Text in einem Feld mit begrenzter Breite darstellen
// - Dafür gibt es verschiedene Möglichkeiten:
//   - Abschneiden nach einer bestimmten Anzahl von Zeichen (mit/ohne Ellipse)
//   - Umbruch nach einer bestimmten Anzahl von Zeichen
//     - Umbruch mitten im Wort
//     - Umbruch bei Leerzeichen (greedy/dynamische Programmierung)

// %% [markdown]
//
// ## Struktur
//
// <img src="img/pat_strategy.png"
//      style="display:block;margin:auto;width:80%"/>

// %% [markdown]
//
// ## Teilnehmer
//
// - `Strategy`
//   - gemeinsames Interface für alle unterstützten Algorithmen
// - `ConcreteStrategy`
//   - implementiert den Algorithmus
// - `Context`
//   - wird mit einem `ConcreteStrategy`-Objekt konfiguriert
//   - kennt sein `Strategy`-Objekt
//   - optional: Interface, das der Strategie Zugriff die Kontext-Daten ermöglicht

// %%
interface Strategy {
    algorithmInterface(): number;
}

// %%
class Context {
    constructor(public strategy: Strategy) {}

    contextInterface(): number {
        return this.strategy.algorithmInterface();
    }
}

// %%
class ConcreteStrategyA implements Strategy {
    algorithmInterface(): number {
        return 1.5;
    }
}

// %%
class ConcreteStrategyB implements Strategy {
    algorithmInterface(): number {
        return 2.0;
    }
}

// %%
const context = new Context(new ConcreteStrategyA());

// %%
console.log("Strategy A: " + context.contextInterface());

// %%
context.strategy = new ConcreteStrategyB();
console.log("Strategy B: " + context.contextInterface());

// %% [markdown]
//
// ### Interaktionen
//
// - Strategie und Kontext interagieren, um den gewählten Algorithmus zu implementieren.
//   - Kontext kann Daten an Strategie übergeben
//   - Kontext kann sich selber an Strategie übergeben
// - Ein Kontext leitet Anfragen seiner Clients an seine Strategie weiter. [...]

// %% [markdown]
//
// ### Implementierung
//
// - `ConcreteStrategy` benötigt effizienten Zugriff auf alle benötigten Daten
// - ...

// %% [markdown]
//
// ## Beispielcode: Textumbruch für ein Blog

// %%
interface TextWrapStrategy {
    wrap(text: string, width: number): string[];
}

// %%
class TruncationStrategy implements TextWrapStrategy {
    wrap(text: string, width: number): string[] {
        if (text.length <= width) {
            return [text];
        }
        return [text.substring(0, width - 3) + "..."];
    }
}

// %%
class BreakAnywhereStrategy implements TextWrapStrategy {
    wrap(text: string, width: number): string[] {
        let remainingText = text;
        const lines: string[] = [];
        while (remainingText.length > width) {
            lines.push(remainingText.substring(0, width));
            remainingText = remainingText.substring(width);
        }
        lines.push(remainingText);
        return lines;
    }
}
// %%
class BreakOnSpaceStrategy implements TextWrapStrategy {
    wrap(text: string, width: number): string[] {
        const lines: string[] = [];
        let remainingText = text;

        while (remainingText.length > width) {
            let pos = remainingText.lastIndexOf(' ', width);
            if (pos === -1) {
                pos = width;
            }
                lines.push(remainingText.substring(0, pos));
                remainingText = remainingText.substring(pos + 1);
        }

        lines.push(remainingText);
        return lines;
    }
}

// %%
class BlogPost {
    constructor(
        readonly author: string,
        readonly title: string,
        readonly text: string
    ) {}
}

// %%
class Blog {
    private readonly posts: BlogPost[] = [];

    constructor(public strategy: ITextWrapStrategy) {}

    print(width: number): void {
        this.posts.forEach(post => {
            console.log('-'.repeat(width));
            console.log(`Title: ${post.title}`);
            console.log(`Author: ${post.author}`);
            this.strategy.wrap(post.text, width).forEach(line => {
                console.log(line);
            });
            console.log('-'.repeat(width));
        });
    }

    addPost(post: BlogPost): void {
        this.posts.push(post);
    }
}

// %%
const firstPost = "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et " +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
    "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
    "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
    "mollit anim id est laborum.";
const secondPost = "To be or not to be that is the question. Whether 'tis nobler in the mind to suffer " +
    "the slings and arrows of outrageous fortune or to take arms against a sea of " +
    "troubles and by opposing end them. To die, to sleep no more and by a sleep to say we " +
    "end the heart-ache and the thousand natural shocks that flesh is heir to. 'Tis a " +
    "consummation devoutly to be wish'd. To die, to sleep to sleep perchance to dream. " +
    "Ay, there's the rub. For in that sleep of death what dreams may come when we have " +
    "shuffled off this mortal coil must give us pause.";
// %%
const blog = new Blog(new TruncationStrategy());

// %%
blog.addPost(new BlogPost("John Doe", "My first post", firstPost));
blog.addPost(new BlogPost("Jane Doe", "My second post", secondPost));

blog.print(40);

// %%
blog.strategy = new BreakAnywhereStrategy();
blog.print(40);

// %%
blog.strategy = new BreakOnSpaceStrategy();
blog.print(40);

// %% [markdown]
//
// ### Anwendbarkeit
//
// - Konfiguration von Objekten mit einer von mehreren Verhaltensweisen
// - Verschiedene Varianten eines Algorithmus
// - Kapseln von Daten mit Algorithmus (Client muss Daten nicht kennen)
// - Vermeidung von bedingten Anweisungen zur Auswahl eines Algorithmus

// %% [markdown]
//
// ### Konsequenzen
//
// - Familien wiederverwendbarer, verwandter Algorithmen
// - Alternative zu Vererbung
// - Auswahl einer Strategie ohne bedingte Anweisungen
// - Context/Clients muss die möglichen Strategien kennen
// - Kommunikations-Overhead zwischen Strategie und Kontext
// - Erhöhte Anzahl von Objekten

// %% [markdown]
//
// ### TypeScript Implementierungs-Tipp
//
// In C# kann das Strategy Pattern oft einfach durch ein Funktions-Objekt als
// Member implementiert werden:

// %%
class FunBlog {
    private readonly posts: BlogPost[] = [];

    constructor(public strategy: (text: string, width: number) => string[]) {}

    print(width: number): void {
        this.posts.forEach(post => {
            console.log('-'.repeat(width));
            console.log(`Title: ${post.title}`);
            console.log(`Author: ${post.author}`);
            this.strategy(post.text, width).forEach(line => {
                console.log(line);
            });
            console.log('-'.repeat(width));
        });
    }

    addPost(post: BlogPost): void {
        this.posts.push(post);
    }
}

// %%
function truncateLines(text: string, width: number): string[] {
    if (text.length <= width) {
        return [text];
    }
    return [text.substring(0, width - 3) + "..."];
}

// %% [markdown]
//
// - Hier haben wir eine Funktion `truncateLines()` definiert, die die gleiche
//   Funktionalität hat wie unsere `TruncationStrategy`

// %%
const funBlog = new FunBlog(truncateLines);

// %%
funBlog.addPost(new BlogPost("John Doe", "My first post", firstPost));
funBlog.addPost(new BlogPost("Jane Doe", "My second post", secondPost));

// %%
funBlog.print(40);

// %%
funBlog.strategy = (text: string, width: number) => {
    if (text.length <= width) {
        return [text];
    }
    return [text.substring(0, width - 3) + "..."];
};

funBlog.print(40);

// %%
function breakOnSpace(text: string, width: number): string[] {
    const lines: string[] = [];
    let remainingText = text;

    while (remainingText.length > width) {
        let pos = remainingText.lastIndexOf(' ', width);
        if (pos === -1) {
            pos = width;
        }
            lines.push(remainingText.substring(0, pos));
            remainingText = remainingText.substring(pos + 1);
    }

    lines.push(remainingText);
    return lines;
}

// %%
funBlog.strategy = breakOnSpace;
funBlog.print(40)

// %% [markdown]
//
// ## Workshop: Vorhersagen
//
// Sie wollen ein System schreiben, das Vorhersagen für Aktienkurse treffen kann.
//
// Schreiben Sie dazu eine Klasse `Predictor` mit einer Methode
//
// ```typescript
// predict(values: number[]): number
// ```
//
// Verwenden Sie das Strategy Pattern, um mindestens zwei verschiedene
// Vorhersage-Varianten zu ermöglichen:
//
// - Die Vorhersage ist der Mittelwert aller Werte aus `values`
// - Die Vorhersage ist der letzte Wert in `values` (oder 0, wenn `values` leer ist)
//
// Testen Sie Ihre Implementierung mit einigen Beispieldaten.

// %%
interface PredictionStrategy {
    predict(values: number[]): number;
}

// %%
class LastValueStrategy implements PredictionStrategy {
    public predict(values: number[]): number {
        return values.length === 0 ? 0.0 : values[values.length - 1];
    }
}

// %%
class MeanValueStrategy implements PredictionStrategy {
    public predict(values: number[]): number {
        return values.length === 0
            ? 0.0
            : values.reduce((a, b) => a + b, 0) / values.length;
    }
}

// %%
class Predictor {
    constructor(public strategy: PredictionStrategy) {}

    public predict(values: number[]): number {
        return this.strategy.predict(values);
    }

    public setStrategy(strategy: PredictionStrategy): void {
        this.strategy = strategy;
    }
}

// %%
const p = new Predictor(new MeanValueStrategy());
const values = [1.0, 2.0, 3.0];

// %%
console.log("Default prediction: " + p.predict(values));

// %%
p.strategy = new LastValueStrategy();
console.log("Last value prediction: " + p.predict(values));

// %%
p.strategy = new MeanValueStrategy();
console.log("Mean value prediction: " + p.predict(values));

// %%
function mean(values: number[]): number {
    return values.length === 0
        ? 0.0
        : values.reduce((a, b) => a + b, 0) / values.length;
}

// %%
class PredictorFun {
    constructor(public strategy: (values: number[]) => number) {}

    public predict(values: number[]): number {
        return this.strategy(values);
    }

    public setStrategy(strategy: (values: number[]) => number): void {
        this.strategy = strategy;
    }
}

// %%
const pf = new PredictorFun(mean);
const myValues = [1.0, 2.0, 3.0];

// %%
console.log("Default prediction: " + pf.predict(myValues));

// %%
pf.strategy = values => values.length === 0 ? 0.0 : values[values.length - 1];
console.log("Last value prediction: " + pf.predict(myValues));

// %%
pf.strategy = mean;
console.log("Mean value prediction: " + pf.predict(myValues));

// %%
