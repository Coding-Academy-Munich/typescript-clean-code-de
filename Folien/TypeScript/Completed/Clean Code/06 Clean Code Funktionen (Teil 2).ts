// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Clean Code: Funktionen (Teil 2)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Typ-Tags und Switch-Anweisungen

// %%
enum EmployeeType {
    COMMISSIONED,
    HOURLY,
    SALARIED
}

// %%
class EmployeeV1 {
    constructor(public type: EmployeeType) {}
}

// %%
function calculatePay(e: EmployeeV1): number {
    switch (e.type) {
    case EmployeeType.COMMISSIONED:
        return calculateCommissionedPay(e);
    case EmployeeType.HOURLY:
        return calculateHourlyPay(e);
    case EmployeeType.SALARIED:
        return calculateSalariedPay(e);
    default:
        throw new Error("No valid employee type.");
    }
}

// %%
function calculateCommissionedPay(e: EmployeeV1): number {
    return 100.0;
}

// %%
function calculateHourlyPay(e: EmployeeV1): number {
    return 120.0;
}

// %%
function calculateSalariedPay(e: EmployeeV1): number {
    return 80.0;
}

// %%
const e1 = new EmployeeV1(EmployeeType.HOURLY);
const e2 = new EmployeeV1(EmployeeType.SALARIED);

// %%
console.log(calculatePay(e1));
console.log(calculatePay(e2));

// %% [markdown]
//
// - Switch-Anweisungen führen oft Operationen auf der gleichen Abstraktionsebene
//   aus. (für "Subtypen" anstelle des ursprünglichen Typs)
// - "Subtypen" werden oft durch Typ-Tags unterschieden
// - In Python wird das mit `if`-`elif`-`else`-Ketten realisiert, da es keine
//   `switch`-Anweisung gibt

// %% [markdown]
//
// ## Ersetze Switch-Anweisung durch Polymorphie
//
// Es ist oft besser, switch-Anweisungen durch Vererbung und Polymorphie zu
// ersetzen:

// %%
abstract class EmployeeV2 {
    abstract calculatePay(): number;
}

// %%
class CommissionedEmployee extends EmployeeV2 {
    calculatePay(): number { return 100.0; }
}

// %%
class HourlyEmployee extends EmployeeV2 {
    calculatePay(): number { return 120.0; }
}

// %%
class SalariedEmployee extends EmployeeV2 {
    calculatePay(): number { return 80.0; }
}

// %%
function createEmployeeV2(employeeType: EmployeeType): EmployeeV2 {
    switch (employeeType) {
    case EmployeeType.COMMISSIONED:
        return new CommissionedEmployee();
    case EmployeeType.HOURLY:
        return new HourlyEmployee();
    case EmployeeType.SALARIED:
        return new SalariedEmployee();
    default:
        throw new Error("Not a valid employee type.");
    }
}

// %%
const employee1 = createEmployeeV2(EmployeeType.HOURLY);
const employee2 = createEmployeeV2(EmployeeType.SALARIED);

// %%
console.log(employee1.calculatePay());
console.log(employee2.calculatePay());

// %% [markdown]
//
// ## Trade-Offs: Vererbungsvariante
//
// - Neue "Bezahlvarianten" könne ohne Änderung des bestehenden Codes hinzugefügt
//   werden
// - Potentiell Explosion von Unterklassen (bei mehreren Enumerationstypen)

// %% [markdown]
//
// ## Trade-Offs: Switch-Variante
//
// - Einfacher zu verstehen
// - Erleichtert die Definition von Funktionen, die auf die Enumeration zugreifen
//   - In Python gibt es aber `functools.singledispatch` für die Vererbungsvariante

// %% [markdown]
//
// ## Trade-Offs: Design
//
// - Spiegelt sich die Unterscheidung zwischen den Subtypen im Domänenmodell
//   wieder?

// %% [markdown]
//
// ## Ersetzen der Enumeration durch Vererbung
//
// - Polymorphie statt Enumeration
// - Nicht auf der Ebene der gesamten Klasse
// - Mildert die Nachteile der Vererbungsvariante

// %% [markdown]
//
// ### Beispiel
//
// - Abstrakte Klasse `PaymentCalculator` statt `EmployeeType`
// - Konkrete Unterklasse pro "Bezahlvariante"
// - `Employee` delegiert Berechnung an `PaymentCalculator`

// %%
abstract class PaymentCalculator {
    abstract calculatePay(): number;
}

// %%
class CommissionedPaymentCalculator extends PaymentCalculator {
    calculatePay(): number { return 100.0; }
}

// %%
class HourlyPaymentCalculator extends PaymentCalculator {
    calculatePay(): number { return 120.0; }
}

// %%
class SalariedPaymentCalculator extends PaymentCalculator {
    calculatePay(): number { return 80.0; }
}
// %%
interface PaymentCalculator {
    calculatePay(employee: EmployeeV3): number;
}

class EmployeeV3 {
    constructor(private paymentCalculator: PaymentCalculator) {}

    calculatePay(): number {
        return this.paymentCalculator.calculatePay(this);
    }
}

// %%
function createEmployeeV3(employeeType: EmployeeType): EmployeeV3 {
    switch (employeeType) {
        case EmployeeType.COMMISSIONED:
            return new EmployeeV3(new CommissionedPaymentCalculator());
        case EmployeeType.HOURLY:
            return new EmployeeV3(new HourlyPaymentCalculator());
        case EmployeeType.SALARIED:
            return new EmployeeV3(new SalariedPaymentCalculator());
        default:
            throw new Error("Not a valid employee type.");
    }
}

// %%
const employee1 = createEmployeeV3(EmployeeType.HOURLY);
const employee2 = createEmployeeV3(EmployeeType.SALARIED);

// %%
console.log(employee1.calculatePay());
console.log(employee2.calculatePay());

// %% [markdown]
//
// ## Workshop: Ersetzen von Switch-Anweisungen
//
// Strukturieren Sie den folgenden Code so um, dass nur noch bei der Erzeugung
// der Objekte eine "switch-Anweisung" verwendet wird:

// %%
enum ComputerType {
    PC,
    MAC,
    CHROMEBOOK
}

// %%
class ComputerV1 {
    constructor(public computerType: ComputerType) {}
}

// %%
function compileCode(computer: ComputerV1): void {
    switch (computer.computerType) {
        case ComputerType.PC:
        console.log("Compiling code for PC.");
            break;
        case ComputerType.MAC:
        console.log("Compiling code for Mac.");
            break;
        case ComputerType.CHROMEBOOK:
        console.log("Compiling code for Chromebook.");
            break;
        default:
        throw new Error("Don't know how to compile code for this computer.");
    }
}

// %%
const myPc = new ComputerV1(ComputerType.PC);
const myMac = new ComputerV1(ComputerType.MAC);
const myChromebook = new ComputerV1(ComputerType.CHROMEBOOK);

// %%
compileCode(myPc);
compileCode(myMac);
compileCode(myChromebook);

// %%
abstract class ComputerV2 {
    abstract compileCode(): void;
}

// %%
class PC extends ComputerV2 {
    compileCode(): void {
        console.log("Compiling code for PC.");
    }
}

// %%
class Mac extends ComputerV2 {
    compileCode(): void {
        console.log("Compiling code for Mac.");
    }
}

// %%
class Chromebook extends ComputerV2 {
    compileCode(): void {
        console.log("Compiling code for Chromebook.");
    }
}

// %%
function createComputerV2(type: ComputerType): ComputerV2 {
    switch (type) {
        case ComputerType.PC:
            return new PC();
        case ComputerType.MAC:
            return new Mac();
        case ComputerType.CHROMEBOOK:
            return new Chromebook();
        default:
            throw new Error(`Don't know how to create computer of type ${type}.`);
    }
}

// %%
const myPcV2 = createComputerV2(ComputerType.PC);
const myMacV2 = createComputerV2(ComputerType.MAC);
const myChromebookV2 = createComputerV2(ComputerType.CHROMEBOOK);

// %%
myPcV2.compileCode();
myMacV2.compileCode();
myChromebookV2.compileCode();

// %%
interface Compiler {
    compileCode(): void;
    get name(): string;
}

// %%
class PCCompiler implements Compiler {
    compileCode(): void {
        console.log("Compiling code for PC.");
    }
    get name(): string {
        return "PC Compiler";
    }
}

// %%
class MacCompiler implements Compiler {
    compileCode(): void {
        console.log("Compiling code for Mac.");
    }
    get name(): string {
        return "Mac Compiler";
    }
}

// %%
class ChromebookCompiler implements Compiler {
    compileCode(): void {
        console.log("Compiling code for Chromebook.");
    }
    get name(): string {
        return "Chromebook Compiler";
    }
}

// %%
class ComputerV3 {
    constructor(private compiler: Compiler) {}
    compileCode(): void {
        this.compiler.compileCode();
    }
    toString(): string {
        return `Computer with compiler ${this.compiler.name}`
    }
}

// %%
function createComputerV3(type: ComputerType): ComputerV3 {
    switch (type) {
        case ComputerType.PC:
            return new ComputerV3(new PCCompiler());
        case ComputerType.MAC:
            return new ComputerV3(new MacCompiler());
        case ComputerType.CHROMEBOOK:
            return new ComputerV3(new ChromebookCompiler());
        default:
            throw new Error(`Don't know how to create computer of type ${type}.`);
    }
}
// %%

const myPcV3 = createComputerV3(ComputerType.PC);
const myMacV3 = createComputerV3(ComputerType.MAC);
const myChromebookV3 = createComputerV3(ComputerType.CHROMEBOOK);

const computers: Computer[] = [myPcV3, myMacV3, myChromebookV3];

for (const computer of computers) {
    computer.compileCode();
}

// %%
