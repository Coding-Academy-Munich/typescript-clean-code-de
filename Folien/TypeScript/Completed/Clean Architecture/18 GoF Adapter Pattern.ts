// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>GoF Adapter Pattern</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Zweck
//
// - Anpassung der Schnittstelle einer Klasse an ein erwartetes Interface
// - Zusammenarbeit von Klassen, die aufgrund inkompatibler Schnittstellen nicht
//   zusammenarbeiten können

// %% [markdown]
//
// ## Auch bekannt als
//
// - Wrapper

// %% [markdown]
//
// ## Motivation
//
// - Nutzung einer Bibliotheks-Klasse aufgrund inkompatibler Schnittstellen nicht
//   möglich
// - Beispiel: Grafischer Editor
//   - Grafik-Objekte sind relativ einfach zu realisieren
//   - Text ist komplexer, möglicherweise ist der Einsatz einer externen Bibliothek
//     sinnvoll
// - Die Schnittstelle dieser Bibliothek ist nicht kompatibel mit der Schnittstelle,
//   die unser Editor erwartet
// - Mit einem Adapter können wir die Schnittstelle der Bibliothek an die
//   Schnittstelle unseres Editors anpassen

// %% [markdown]
//
// <img src="img/adapter_example.png"
//      style="display:block;margin:auto;width:80%"/>

// %% [markdown]
//
// ## Anwendbarkeit
//
// - Nutzung einer bestehenden Klasse mit inkompatibler Schnittstelle
// - [...]

// %% [markdown]
//
// ## Struktur
//
// - Es werden zwei Varianten definiert: Klassenadapter und Objektadapter
// - Klassenadapter verwenden Mehrfachvererbung und werden seltener eingesetzt
// - Klassendiagramm für Objektadapter:
//
// <img src="img/pat_adapter.png"
//      style="display: block; margin: auto; width: 80%;"/>

// %% [markdown]
//
// ## Teilnehmer
//
// - `Client`
//   - Nutzt das Interface von `Target`
// - `Target`
//   - Definiert das Interface, das vom `Client` verwendet wird
// - `Adapter`
//   - Implementiert das Interface von `Target` und hält eine Referenz auf das `Adaptee`
// - `Adaptee`
//   - Die Klasse, deren Schnittstelle angepasst werden soll

// %% [markdown]
//
// ## Interaktionen
//
// - Der Client ruft eine Target-Methode auf einem Adapter-Objekt auf
// - Der Adapter ruft die entsprechende Methode auf dem Adaptee auf

// %% [markdown]
//
// ## Konsequenzen
//
// - Klassenadapter
//   - ...
// - Objektadapter
//   - ein Adapter kann mit mehreren adaptierten Objekten zusammenarbeiten
//   - erschwert das Überschreiben von Adaptee-Methoden

// %% [markdown]
//
// ## Beispielcode
//
// - Verwaltung von Mitarbeitern in einer Firma
// - Ein Teil der Daten wird von einem Legacy-System bereitgestellt
// - Die Schnittstelle des Legacy-Systems ist nicht kompatibel mit der Schnittstelle
//   der neuen Software
// - Wir erstellen einen Adapter, der die Schnittstelle des Legacy-Systems an die
//   Schnittstelle der neuen Software anpasst

// %%
interface Employee {
    readonly name: string;
    readonly salary: number;
}

// %%
class NewEmployee implements Employee {
    constructor(
        readonly name: string,
        readonly salary: number
    ) {}
}

// %%
class LegacyEmployee {
    constructor(
        public firstName: string,
        public lastName: string,
        public pay: number  // In cents
    ) {}
}

// %%
class Company {
    constructor(readonly employees: Employee[], readonly monthlyRent: number = 1000.0) {
        this.employees = employees;
        this.monthlyRent = monthlyRent;
    }

    monthlyExpenses(): number {
        const totalSalary = this.employees.reduce((acc, employee) => acc + employee.salary, 0.0);
        return totalSalary + this.monthlyRent;
    }

    employeesAsString(): string {
        return this.employees.reduce((acc, employee) => acc + employee.name + "\n", "");
    }
}
// %%
class LegacyEmployeeAdapter implements Employee {
    constructor(readonly legacyEmployee: LegacyEmployee) {
    }

    get name(): string {
        return `${this.legacyEmployee.firstName} ${this.legacyEmployee.lastName}`;
    }

    get salary(): number {
        return this.legacyEmployee.pay / 100.0;
    }
}

// %%
const legacyEmployee1 = new LegacyEmployeeAdapter(new LegacyEmployee("John", "Doe", 150_000));
const legacyEmployee2 = new LegacyEmployeeAdapter(new LegacyEmployee("Jane", "Miller", 200_000));
const newEmployee1 = new NewEmployee("Max Mustermann", 2500.0);
const newEmployee2 = new NewEmployee("Erica Jones", 3000.0);

// %%
const employees: Employee[] = [
    legacyEmployee1,
    legacyEmployee2,
    newEmployee1,
    newEmployee2
];

// %%
const company = new Company(employees);

// %%
console.log("Monthly expenses: " + company.monthlyExpenses());

// %%
console.log("Employees:\n" + company.employeesAsString());

// %% [markdown]
//
// ## Praxisbeispiele
//
// - ET++ Draw
// - InterViews 2.6
// - ...

// %% [markdown]
//
// ## Verwandte Muster
//
// - Bridge: ähnliche Struktur, aber andere Absicht (Trennung von Schnittstelle und
//   Implementierung)
// - Decorator: erweitert anderes Objekt, ohne die Schnittstelle zu ändern
// - Proxy: Stellvertreter für ein Objekt, das die gleiche Schnittstelle hat

// %% [markdown]
//
// ## Workshop: Einheitliche Schnittstelle für einen Chat-Client
//
// In diesem Workshop sollen verschiedene Messaging-Dienste, wie SMS, E-Mail und
// eine In-App-Chat-System, zu einer Chat Applikation hinzugefügt werden. Die
// Herausforderung besteht darin, dass jeder dieser Dienste seine eigene Art
// hat, Nachrichten zu senden und zu empfangen.
//
// Im Folgenden finden Sie den Startercode mit einer Klasse für Benutzer des
// Dienstes und separaten Klassen für jeden Messaging-Dienst.

// %%
class User {
    constructor(
        readonly userName: string,
        readonly phoneNumber: string,
        readonly emailAddress: string
    ) {
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }
}

// %%
class SMS {
    sendText(number: string, message: string): void {
        console.log(`Sending SMS to ${number}: ${message}`);
    }

    receiveText(number: string): void {
        console.log(`Receiving a SMS from ${number}`);
    }
}

// %%
class Email {
    sendEmail(emailAddress: string, subject: string, message: string): void {
        console.log(`Sending email to ${emailAddress} with subject '${subject}': ${message}`);
    }

    receiveEmail(emailAddress: string): void {
        console.log(`Receiving an email from ${emailAddress}`);
    }
}

// %%
class InAppChat {
    sendMessage(user: User, message: string): void {
        console.log(`Sending message to ${user.userName}: ${message}`);
    }

    receiveMessage(user: User) {
        console.log(`Receiving a message from ${user.userName}`);
    }
}

// %%
interface MessagingService {
    send(to: User, message: string): void;
    receive(from: User): void;
}

// %%
class ChatApplication {
    private adapters: MessagingService[];

    constructor(adapters: MessagingService[]) {
        this.adapters = adapters;
    }

    sendMessage(to: User, message: string): void {
        this.adapters.forEach(adapter => adapter.send(to, message));
    }

    receiveMessage(from: User): void {
        this.adapters.forEach(adapter => adapter.receive(from));
    }
}

// %% [markdown]
//
// Die folgenden Variablen definieren die Messaging-Dienste, die von der Chat-Anwendung
// verwendet werden sollen. Sie müssen nicht geändert werden.

// %%
const sms = new SMS();
const email = new Email();
const chat = new InAppChat();

// %% [markdown]
//
// - Definieren Sie Adapter für die drei Messaging-Dienste

// %%
class SMSAdapter implements MessagingService {
    constructor(private readonly sms: SMS) {}

    send(to: User, message: string): void {
        this.sms.sendText(to.phoneNumber, message);
    }

    receive(from: User): void {
        this.sms.receiveText(from.phoneNumber);
    }
}

// %%
class EmailAdapter implements MessagingService {
    constructor(private readonly email: Email) {}

    send(to: User, message: string): void {
        this.email.sendEmail(to.emailAddress, "Mail from Chat App", message);
    }

    receive(from: User): void {
        this.email.receiveEmail(from.emailAddress);
    }
}

// %%
class InAppChatAdapter implements MessagingService {
    constructor(private readonly chat: InAppChat) {}

    send(to: User, message: string): void {
        this.chat.sendMessage(to, message);
    }

    receive(from: User): void {
        this.chat.receiveMessage(from);
    }
}

// %% [markdown]
//
// - Erstellen Sie hier Adapter für die Messaging-Dienste:

// %%
const smsAdapter = new SMSAdapter(sms);
const emailAdapter = new EmailAdapter(email);
const chatAdapter = new InAppChatAdapter(chat);

// %%
const messagingServices: MessagingService[] = [];

// %% [markdown]
//
// - Fügen Sie die Adapter zur Liste `messagingServices` hinzu

// %%
messagingServices.push(smsAdapter);
messagingServices.push(emailAdapter);
messagingServices.push(chatAdapter);
undefined;

// %% [markdown]
//
// - Überprüfen Sie, dass Ihre Adapter funktionieren, indem Sie die folgenden
//   Zeilen ausführen
// - Sie sollten eine Ausgabe für jeden Messaging-Dienst sehen, in der die
//   entsprechende Nachricht angezeigt wird

// %%
const chatApp = new ChatApplication(messagingServices);

// %%
chatApp.sendMessage(new User("Joe Example", "555-1234", "joe@example.org"), "Hello!");

// %%
chatApp.receiveMessage(new User("Joe Example", "555-1234", "joe@example.org"));
