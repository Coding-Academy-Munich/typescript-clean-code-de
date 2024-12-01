// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Refactoring und Tests</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// - Zum Refactoring brauchen wir Tests
//   - Sonst können wir nicht wissen, ob wir das Verhalten geändert haben
// - Aber: manche Tests erschweren das Refactoring

// %% [markdown]
//
// ## Tests für Refactoring
//
// - Schreiben Sie Tests, die das öffentliche Verhalten testen
// - Vermeiden Sie alle Tests, die sich auf Implementierungs-Details beziehen
//   - Auch für Unit-Tests
// - Dazu testen sich oft Methoden gegenseitig
// - Das ist OK!

// %%
class Stack<T> {
    private _data: T[] = [];

    push(item: T): void {
        this._data.push(item);
    }

    pop(): T {
        if (this._data.length === 0) {
            throw new Error("Stack is empty");
        }
        return this._data.pop()!;
    }
}

// %% [markdown]
//
// **Testen Sie NICHT so!**

// %%
import { assertEquals, assertThrows } from "jsr:@std/assert";

// %%
Deno.test("push pushes an element on the stack", () => {
    const unit = new Stack<number>();
    unit.push(2);

    assertEquals(unit._data.length, 1, "one element was pushed onto the stack");
    assertEquals(unit._data[0], 2, "the first element of the stack is 2");
});

// %%
Deno.test("pop removes and returns the top element", () => {
    const unit = new Stack<number>();
    unit.push(2);
    const result = unit.pop();

    assertEquals(result, 2, "Pop result is 1");
    assertEquals(unit._data.length, 0, "Size after popping is 0");
});

// %% [markdown]
//
// - Wir greifen hier auf die Implementierung zu, die sich jederzeit ändern kann
// - Testen Sie statt dessen so:

// %%
Deno.test("push and pop maintain the stack", () => {
    const unit = new Stack<number>();
    unit.push(2);

    assertEquals(unit.pop(), 2, "Topmost element is 2");
    assertThrows(() => unit.pop(), Error, "Stack is empty");
});

// %% [markdown]
//
// - Diese Tests testen das öffentliche Verhalten
// - Das öffentliche Interface muss geeignet sein, diese Tests zu schreiben
//   - In diesem Fall ist die Testbarkeit unseres Stacks nicht optimal
//   - Versuchen Sie **nicht**, das durch Getter und Setter für jeden
//     Daten-Member zu erreichen
//   - Stattdessen sollten Sie Abfragen oder einen "abstrakten Zustand"
//     öffentlich machen
//   - Für den Stack wären das z.B. die `peek()` und `length()`-Properties
// - Meistens macht das auch die normale Benutzung der Klasse einfacher
// - TDD ist ein Weg um das zu erreichen
//   - Aber: Schreiben Sie auch in TDD Tests für Feature-Inkremente, nicht für
//     Implementierungs-Inkremente

// %%
class Stack<T> {
    private _data: T[] = [];

    push(item: T): void {
        this._data.push(item);
    }

    pop(): T {
        if (this._data.length === 0) {
            throw new Error("Stack is empty");
        }
        return this._data.pop()!;
    }

    peek(): T {
        if (this._data.length === 0) {
            throw new Error("Stack is empty");
        }
        return this._data[this._data.length - 1];
    }

    get length(): number {
        return this._data.length;
    }
}

// %%
Deno.test("push() puts an element on the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);

    assertEquals(stack.length, 1);
    assertEquals(stack.peek(), 1);
});

// %%
Deno.test("pop() removes and returns the top element", () => {
    const stack = new Stack<number>();
    stack.push(1);
    const result = stack.pop();

    assertEquals(result, 1);
    assertEquals(stack.length, 0);
});

// %%
Deno.test("push() and pop() respect LIFO property", () => {
    const stack = new Stack<number>();
    stack.push(5);
    stack.push(10);

    assertEquals(stack.peek(), 10);
    assertEquals(stack.length, 2);

    assertEquals(stack.pop(), 10);

    assertEquals(stack.peek(), 5);
    assertEquals(stack.length, 1);

    assertEquals(stack.pop(), 5);

    assertEquals(stack.length, 0);
});

// %% [markdown]
//
// ## Workshop: Vorrangwarteschlange (Priority Queue)
//
// In diesem Workshop sollen Sie eine Vorrangwarteschlange testen, ohne sich auf
// ihre internen Implementierungsdetails zu verlassen.
//
// ### Hintergrund
//
// Eine Vorrangwarteschlange ist eine Datenstruktur, die Elemente mit
// zugehörigen Prioritäten speichert. Sie unterstützt zwei Hauptoperationen:
// - Enqueue: Füge ein Element mit einer gegebenen Priorität hinzu
// - Dequeue: Entferne und gib das Element mit der höchsten Priorität zurück
//
// Die Herausforderung besteht darin, zu überprüfen, dass die Vorrangwarteschlange
// die Reihenfolge der Elemente korrekt beibehält, ohne direkt auf ihre interne
// Struktur zuzugreifen.

// %% [markdown]
//
// Die folgende `PriorityQueue<T>`-Klasse implementiert die übliche Schnittstelle
// für eine Vorrangwarteschlange mit einer einfachen Listen-basierten
// Repräsentation:
//
// - `void Enqueue(T item, int priority)`: Füge ein Element mit der gegebenen
//   Priorität hinzu
// - `T Dequeue()`: Entferne und gib das Element mit der höchsten Priorität zurück
// - `bool IsEmpty`: Gib true zurück, wenn die Warteschlange leer ist, sonst
//   false

// %%
class PriorityQueue<T> {
    private items: { item: T; priority: number }[] = [];

    enqueue(item: T, priority: number): void {
        this.items.push({ item, priority });
        this.items.sort((a, b) => b.priority - a.priority);
    }

    dequeue(): T {
        if (this.isEmpty) {
            throw new Error("Queue is empty");
        }
        const item = this.items.shift()!;
        return item.item;
    }

    get isEmpty(): boolean {
        return this.items.length === 0;
    }
}
// %% [markdown]
//
// Schreiben Sie Tests, die das korrekte Verhalten der
// Vorrangwarteschlange über ihre öffentliche Schnittstelle verifizieren. Ihre
// Tests sollten folgendes abdecken:
//
// 1. Grundlegende Funktionalität (`enqueue`, `dequeue`, `isEmpty`)
// 2. Korrekte Prioritäten-Reihenfolge beim Herausnehmen von Elementen mit `dequeue`
// 3. Umgang mit Elementen mit gleichen Prioritäten
// 4. Randfälle (leere Warteschlange, einzelnes Element)
//
// Denken Sie daran, dass Sie in Ihren Tests nicht auf die interne Struktur der
// Warteschlange zugreifen können!
//
// - Welche Strategien haben Sie verwendet, um die Prioritäten-Reihenfolge zu
//   testen, ohne auf die interne Struktur zuzugreifen?
// - Wie sicher sind Sie, dass Ihre Tests das Verhalten der Vorrangwarteschlange
//   vollständig verifizieren?

// %%
import { assert, assertFalse } from "jsr:@std/assert";

// %%
Deno.test("isEmpty is true for new queue", () => {
    const queue = new PriorityQueue<string>();
    assert(queue.isEmpty);
});

// %%
Deno.test("isEmpty is false after enqueue()", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    assertFalse(queue.isEmpty);
});

// %%
Deno.test("isEmpty is true after dequeueing last item", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    queue.dequeue();
    assert(queue.isEmpty, "Queue should be empty after dequeuing the last item");
});

// %%
Deno.test("dequeue returns the previously enqueued item", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    assertEquals(queue.dequeue(), "Item");
});

// %%
Deno.test("enqueue and dequeue respect priorities (low enqueued before high)", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Low", 1);
    queue.enqueue("High", 2);
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("enqueue and dequeue respect priorities (high enqueued before low)", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("High", 2);
    queue.enqueue("Low", 1);
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("enqueue and dequeue respect priorities for multiple items", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Lowest", 1);
    queue.enqueue("Highest", 4);
    queue.enqueue("Medium", 2);
    queue.enqueue("High", 3);

    assertEquals(queue.dequeue(), "Highest");
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Medium");
    assertEquals(queue.dequeue(), "Lowest");
    assert(queue.isEmpty)
});

// %%
Deno.test("queue respects insertion order for items with same priority", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("First", 1);
    queue.enqueue("Second", 1);

    const first = queue.dequeue();
    const second = queue.dequeue();

    assert(
        first === "First" && second === "Second",
        "Items with equal priorities must maintain insertion order"
    );
});

// %%
Deno.test("mixed operations preserve priorities", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Low", 1);
    queue.enqueue("High", 3);
    assertEquals(queue.dequeue(), "High");
    queue.enqueue("Medium", 2);
    assertEquals(queue.dequeue(), "Medium");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("dequeue throws for empty queue", () => {
    const queue = new PriorityQueue<string>();
    assertThrows(() => queue.dequeue(), Error, "Queue is empty");
});

// %% [markdown]
//
// ### Heap-basierte Implementierung
//
// Die Listen-basierte Implementierung der Vorrangwarteschlange hat eine
// Komplexität von O(n) für das Einfügen und Entfernen von Elementen. Eine
// effizientere Implementierung verwendet einen Heap, um die Operationen in O(log
// n) durchzuführen.
//
// Hier ist eine einfache Heap-basierte Implementierung der Vorrangwarteschlange:

// %%
class PriorityQueue<T> {
    private heap: { item: T; priority: number }[] = [];
    private comparison = (a: { item: T; priority: number }, b: { item: T; priority: number }) => b.priority - a.priority;

    enqueue(item: T, priority: number): void {
        this.heap.push({ item, priority });
        this.siftUp(this.heap.length - 1);
    }

    dequeue(): T {
        if (this.isEmpty) {
            throw new Error("Queue is empty");
        }
        const item = this.heap[0].item;
        const lastIndex = this.heap.length - 1;
        this.heap[0] = this.heap[lastIndex];
        this.heap.pop();
        if (!this.isEmpty) {
            this.siftDown(0);
        }
        return item;
    }

    get isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private siftUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparison(this.heap[index], this.heap[parentIndex]) >= 0) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private siftDown(index: number): void {
        const size = this.heap.length;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let highest = index;

            if (leftChild < size && this.comparison(this.heap[leftChild], this.heap[highest]) < 0) {
                highest = leftChild;
            }
            if (rightChild < size && this.comparison(this.heap[rightChild], this.heap[highest]) < 0) {
                highest = rightChild;
            }

            if (highest === index) {
                break;
            }

            this.swap(index, highest);
            index = highest;
        }
    }

    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

// %% [markdown]
//
// Funktionieren Ihre Tests für die Listen-basierte Implementierung auch für die
// Heap-basierte Implementierung?
//
// *Hinweis:* Sie können im Notebook einfach die Zelle mit der neuen
// Implementierung der Vorrangwarteschlange ausführen und dann die Zellen mit
// Ihren Tests erneut ausführen.

// %% [markdown]
//
// Die Tests sind eine exakte Kopie der vorherigen Tests. Sie sind hier nochmal
// angegeben, um das Testen der Heap-basierten Implementierung zu erleichtern.

// %%
Deno.test("isEmpty is true for new queue", () => {
    const queue = new PriorityQueue<string>();
    assert(queue.isEmpty);
});

// %%
Deno.test("isEmpty is false after enqueue()", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    assertFalse(queue.isEmpty);
});

// %%
Deno.test("isEmpty is true after dequeueing last item", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    queue.dequeue();
    assert(queue.isEmpty, "Queue should be empty after dequeuing the last item");
});

// %%
Deno.test("dequeue returns the previously enqueued item", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Item", 1);
    assertEquals(queue.dequeue(), "Item");
});

// %%
Deno.test("enqueue and dequeue respect priorities (low enqueued before high)", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Low", 1);
    queue.enqueue("High", 2);
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("enqueue and dequeue respect priorities (high enqueued before low)", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("High", 2);
    queue.enqueue("Low", 1);
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("enqueue and dequeue respect priorities for multiple items", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Lowest", 1);
    queue.enqueue("Highest", 4);
    queue.enqueue("Medium", 2);
    queue.enqueue("High", 3);

    assertEquals(queue.dequeue(), "Highest");
    assertEquals(queue.dequeue(), "High");
    assertEquals(queue.dequeue(), "Medium");
    assertEquals(queue.dequeue(), "Lowest");
    assert(queue.isEmpty)
});

// %%
Deno.test("queue respects insertion order for items with same priority", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("First", 1);
    queue.enqueue("Second", 1);

    const first = queue.dequeue();
    const second = queue.dequeue();

    assert(
        first === "First" && second === "Second",
        "Items with equal priorities must maintain insertion order"
    );
});

// %%
Deno.test("mixed operations preserve priorities", () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue("Low", 1);
    queue.enqueue("High", 3);
    assertEquals(queue.dequeue(), "High");
    queue.enqueue("Medium", 2);
    assertEquals(queue.dequeue(), "Medium");
    assertEquals(queue.dequeue(), "Low");
});

// %%
Deno.test("dequeue throws for empty queue", () => {
    const queue = new PriorityQueue<string>();
    assertThrows(() => queue.dequeue(), Error, "Queue is empty");
});
