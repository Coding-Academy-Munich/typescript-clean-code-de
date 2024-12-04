// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>GRASP: Abstrakte Patterns</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// # GRASP: Polymorphie
//
// - Polymorphe Operationen beschreiben ähnliche (aber nicht identische)
//   Verhaltensweisen, die sich je nach Typ eines Objekts ändern können
// - Normalerweise kein Wechsel zwischen den Verhaltensweisen während der Laufzeit

// %% [markdown]
//
// ## In TypeScript
//
// - (Dynamische) Polymorphie: Vererbung, virtuelle Methoden
//   - Sehr flexibel
//   - Selektion der Funktionalität zur Laufzeit (dynamischer Typ)
//   - Overhead in Laufzeit und Speicherplatz (mit Profiler messen!)
//   - Heterogene Arrays möglich
// - Callbacks oder Closures:
//   - Ähnlich zu virtuellen Methoden
//   - Manchmal syntaktisch einfacher, weniger Code


// %% [markdown]
//
// # GRASP: Pure Fabrication
//
// Welchem Objekt geben wir die Verantwortung für eine Aufgabe, wenn z.B.
// Information Expert oder Creator zu Lösungen führen, die nicht gut sind, weil
// sie niedrige Kohäsion oder hohe Kopplung haben?

// %% [markdown]
//
// # GRASP: Pure Fabrication
//
// - Eine Klasse, die nicht im Domänenmodell vorkommt
// - Typischerweise ein Gegengewicht zum Informationsexperten, der die Funktionalität
//   in einer einzigen Klasse konzentrieren will
// - Beispiel:
//   - Datenbankfunktionalität in Domänenklassen
//   - Konsistent mit Information Expert
//   - Aber: geringe Kohäsion, hohe Kopplung
//   - Einführung von Data Access Objects (eine Pure Fabrication)

// %% [markdown]
//
// ## Vorsicht vor übermäßiger Verwendung
//
// - Werden Pure Fabrications zu häufig verwendet, kann das zu einem Verlust der
//   niedrigen Repräsentationslücke führen
// - Oft wird dadurch auch die Kohäsion der Domänenklassen verringert
// - Besonders Entwickler mit Background in prozeduralen Sprachen neigen dazu,
//   sehr viele "Verhaltensobjekte" einzuführen, bei denen die
//   Verantwortlichkeiten *nicht* mit den für ihre Erfüllung benötigten
//   Informationen zusammenfallen

// %% [markdown]
//
// # GRASP: Indirektion
//
// <div>
// "Jedes Problem in der Informatik kann gelöst werden, indem man eine weitere
// Indirektion hinzufügt."
// <div style="float:right;">- David Wheeler</div>
// </div>
//
// <br>
// <div> "Außer zu viele Indirektionen."
// <div style="float:right;">– N.N.</div>
// </div>

// %% [markdown]
//
// - Wie können wir die Kopplung zwischen zwei Objekten verringern?
// - Wir führen eine weitere Schicht ein, die die beiden Objekte entkoppelt

// %% [markdown]
//
// ## Indirektion
//
// - Sehr häufige Muster auf jeder Schicht
//   - Betriebssystem
//   - Virtuelle Maschinen
//   - Polymorphe Methodenaufrufe
// - Testen:
//   - Indirektionen sind Nahtstellen, die für Testzwecke verwendet werden können

// %% [markdown]
//
// ## Protected Variation
//
// Problem: Wie können wir Komponenten so gestalten, dass Variations- oder
// Evolutionspunkte keine unerwünschten Auswirkungen auf andere Komponenten haben?

// %% [markdown]
//
// ## Protected Variation
//
// Lösung:
// - Identifiziere die Punkte, an denen Variationen oder Evolutionen auftreten können
// - Führe einer stabilen Schnittstelle zum Schutz dieser Punkte ein
// - Diese Schnittstellen sind häufig Pure Fabrications
// - Oft führen diese Schnittstellen eine Indirection ein

// %% [markdown]
//
// ## Protected Variations
//
// - Sehr häufig angewandt:
//   - Private Attribute mit Gettern/Settern
//   - Schnittstellen, Polymorphismus
//   - Virtuelle Maschinen
//   - Standards
// - Testen:
//   - Geschützte Variationen sind oft Einstiegspunkte für Tests
//   - Aber oft müssen zusätzliche Tests geschrieben werden, um sicherzustellen,
//     dass das System noch funktioniert, wenn die Variabilität tatsächlich
//     verwendet wird

// %% [markdown]
//
// - Protected Variation ist ein sehr allgemeines Prinzip
// - Fast alle anderen Software-Entwicklungsprinzipien und Patterns sind
//   spezielle Fälle von Protected Variation

// %% [markdown]
//
// ## Vorsicht vor übermäßiger Verwendung
//
// - Protected Variation kann zwei verschiedene Arten von Änderung unterstützen:
//   - Variationspunkte: Varianten, die im existierenden System vorhanden sind
//   - Evolutionspunkte: Spekulative Abstraktionen, die die zukünftige
//     Entwicklung des Systems unterstützen sollen
// - Oft sind die Kosten von spekulativen Abstraktionen höher als die Kosten von
//   sie später einzuführen
