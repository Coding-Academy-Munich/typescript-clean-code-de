// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Adventure: Spielfigur</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
// <img src="img/adv-domain-03.png"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ## Version 4a: Spielfiguren
//
// <img src="img/adventure-v4a-overview.png" alt="Adventure Version 4a"
//      style="display:block;margin:auto;width:40%"/>

// %% [markdown]
//
// Siehe `Code/Completed/GraspAdventure/AdventureV4a/` für den vollständigen Code.

// %% [markdown]
//
// ## Version 4b: Enumeration der Aktionen
//
// - Enumeration `Action` mit allen möglichen Aktionen
// - `Pawn`-Klasse hat nur noch eine `Perform()`-Methode
// - `Perform()`-Methode bekommt eine `action` als Parameter

// %% [markdown]
//
// ## Version 4b: Spielfiguren mit Enumeration
//
// <img src="img/adventure-v4b-overview.png" alt="Adventure Version 4b"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ```typescript
// enum Action { Move, SkipTurn }
// ```
//
// ```typescript
// class Pawn {
//     constructor(private name: string, private location: Location) {}
//
//     perform(action: Action, direction?: string): void {
//         switch (action) {
//             case Action.Move:
//                 this.location = this.location.getConnectedLocation(direction);
//                 break;
//             case Action.SkipTurn:
//                 break;
//             default:
//                 throw new Error(`Unknown action: ${action}`);
//         }
//     }
//
//     performIfPossible(action: Action, direction?: string): void {
//         try {
//             this.perform(action, direction);
//         } catch (error) {
//             // ignored
//         }
//     }
//
//     readonly name: string;
//     get location(): Location {
//         return this.location;
//     }
//
//     set location(value: Location) {
//         this.location = value;
//     }
// }
// ```
// %% [markdown]
//
// ## GRASP und SOLID Prinzipien
//
// - GRASP:
//   - Geschützte Variation (Protected Variation)
//   - Indirektion
//   - Polymorphie
// - SOLID:
//   - Open-Closed Prinzip
