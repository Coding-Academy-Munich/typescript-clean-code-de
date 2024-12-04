// -*- coding: utf-8 -*-
// %% [markdown]
// <!--
// clang-format off
// -->
//
// <div style="text-align:center; font-size:200%;">
//   <b>SOLID: Interface-Segregations-Prinzip</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## SOLID : Interface-Segregations-Prinzip
//
// - Kein Client einer Klasse `C` sollte von Methoden abhängen, die er nicht
//   benutzt.
// - Wenn das nicht der Fall ist
// - Unterteile die Schnittstelle von `C` in mehrere unabhängige Schnittstellen.
// - Ersetze `C` in jedem Client durch die vom Client tatsächlich verwendeten
//   Schnittstellen.

// %%
class Car {
    drive(): void {
        console.log("Accelerating.");
    }

    repair(): void {
        console.log("Repairing.");
    }
}

// %%
class Driver {
    drive(car: Car): void {
        car.drive();
    }
}

// %%
class Mechanic {
    workOn(car: Car): void {
        car.repair();
    }
}

// %%
const driver = new Driver();
const mechanic = new Mechanic();
const car = new Car();

// %%
driver.drive(car);

// %%
mechanic.workOn(car);

// %%
interface Drivable {
    drive(): void;
}

// %%
interface Repairable {
    repair(): void;
}

// %%
class CarV2 implements Drivable, Repairable {
    drive(): void {
        console.log("Accelerating.");
    }

    repair(): void {
        console.log("Repairing.");
    }
}

// %%
class DriverV2 {
    drive(car: Drivable): void {
        car.drive();
    }
}

// %%
class MechanicV2 {
    workOn(car: Repairable): void {
        car.repair();
    }
}

// %%
const driverV2 = new DriverV2();
const mechanicV2 = new MechanicV2();
const carV2 = new CarV2();

// %%
driverV2.drive(carV2);

// %%
mechanicV2.workOn(carV2);

// %% [markdown]
//
// ## Workshop:
//
// In diesem Workshop werden wir an einem Restaurant-Management-System arbeiten.
//
// Stellen Sie sich vor, Sie haben den Code eines Restaurant-Management-Systems
// erhalten. Das System hat derzeit eine einzige Schnittstelle
// `IRestaurantOperations`, die alle Operationen definiert, die in einem
// Restaurant durchgeführt werden können. Verschiedene Rollen im Restaurant, wie
// der Kunde, der Koch, der Kassierer und der Hausmeister, verwenden alle
// dieselbe Schnittstelle, aber jede Rolle verwendet nur einen Teil ihrer
// Funktionen.
//
// Ihre Aufgabe ist es, dieses System so umzubauen, dass es dem
// Interface-Segregations-Prinzip entspricht. Das bedeutet, dass kein Client
// gezwungen werden sollte, von Schnittstellen abhängig zu sein, die er nicht
// verwendet.

// %% [markdown]
//
// 1. Identifizieren Sie, welche Operationen für welche Rollen relevant sind.
// 2. Teilen Sie das `IRestaurantOperations`-Interface in kleinere,
//    rollenspezifische Schnittstellen auf.
// 3. Passen Sie die `Restaurant`-Klasse und die rollenbasierten Client-Klassen
//    (`Customer`, `Chef`, `Cashier`, `Janitor`) an die neuen Schnittstellen an.
// 4. Stellen Sie sicher, dass jede Client-Klasse nur über die für ihre Rolle
//    relevanten Operationen Bescheid weiß.

// %%
interface RestaurantOperations {
    placeOrder(): void;
    cookOrder(): void;
    calculateBill(): void;
    cleanTables(): void;
}

// %%
class Restaurant implements RestaurantOperations {
    placeOrder(): void {
        console.log("Order has been placed.");
    }

    cookOrder(): void {
        console.log("Order is being cooked.");
    }

    calculateBill(): void {
        console.log("Bill is being calculated.");
    }

    cleanTables(): void {
        console.log("Tables are being cleaned.");
    }
}

// %%
class Customer {
    private restaurant: RestaurantOperations;

    constructor(restaurant: RestaurantOperations) {
        this.restaurant = restaurant;
    }

    makeOrder(): void {
        this.restaurant.placeOrder();
        this.restaurant.calculateBill();
    }
}

// %%
class Chef {
    constructor(private restaurant: RestaurantOperations) {}

    prepareFood(): void {
        this.restaurant.cookOrder();
    }
}

// %%
class Cashier {
    constructor(private restaurant: RestaurantOperations) { }

    generateBill(): void {
        this.restaurant.calculateBill();
    }
}

// %%
class Janitor {
    constructor(private restaurant: RestaurantOperations) {
        this.restaurant = restaurant;
    }

    clean(): void {
        this.restaurant.cleanTables();
    }
}

// %%
const restaurant = new Restaurant();
const customer = new Customer(restaurant);
const chef = new Chef(restaurant);
const cashier = new Cashier(restaurant);
const janitor = new Janitor(restaurant);

// %%
customer.makeOrder();
chef.prepareFood();
cashier.generateBill();
janitor.clean();

// %%
interface Ordering {
    placeOrder(): void;
}

// %%
interface Cooking {
    cookOrder(): void;
}

// %%
interface Billing {
    calculateBill(): void;
}

// %%
interface Cleaning {
    cleanTables(): void;
}

// %%
class RestaurantV2 implements Ordering, Cooking, Billing, Cleaning {
    placeOrder(): void {
        console.log("Order has been placed.");
    }

    cookOrder(): void {
        console.log("Order is being cooked.");
    }

    calculateBill(): void {
        console.log("Bill is being calculated.");
    }

    cleanTables(): void {
        console.log("Tables are being cleaned.");
    }
}

// %%
class CustomerV2 {
    constructor(private ordering: Ordering, private billing: Billing) {}

    makeOrder(): void {
        this.ordering.placeOrder();
        this.billing.calculateBill();
    }
}

// %%
class ChefV2 {
    constructor(private cooking: Cooking) {
        this.cooking = cooking;
    }

    prepareFood(): void {
        this.cooking.cookOrder();
    }
}

// %%
class CashierV2 {
    constructor(private billing: Billing) {
        this.billing = billing;
    }

    generateBill(): void {
        this.billing.calculateBill();
    }
}

// %%
class JanitorV2 {
    constructor(private cleaning: Cleaning) {}

    clean(): void {
        this.cleaning.cleanTables();
    }
}

// %%
const restaurantV2 = new RestaurantV2();
const customerV2 = new CustomerV2(restaurantV2, restaurantV2);
const chefV2 = new ChefV2(restaurantV2);
const cashierV2 = new CashierV2(restaurantV2);
const janitorV2 = new JanitorV2(restaurantV2);

// %%
customerV2.makeOrder();
chefV2.prepareFood();
cashierV2.generateBill();
janitorV2.clean();
