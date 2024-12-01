
const dayOfWeekNames: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function computeSalaryAndTaxesV2(
    dayOfWeekIndex: number,
    salaryPerDay: number,
    employeeName: string,
    salaries: number[]
): number {
    const baseSalary = computeBaseSalary(dayOfWeekIndex, salaryPerDay);
    const [netSalary, tax] = computeNetSalaryAndTax(baseSalary);
    storeNetSalary(netSalary, salaries);
    printEmployeeInfo(dayOfWeekIndex, employeeName, netSalary, tax);
    return tax;
}

function computeBaseSalary(dayOfWeekIndex: number, salaryPerDay: number): number {
    const daysWorkedThisWeek = dayOfWeekIndex - 1;
    return daysWorkedThisWeek * salaryPerDay;
}

function computeNetSalaryAndTax(baseSalary: number): [number, number] {
    const tax = computeTax(baseSalary);
    const netSalary = baseSalary - tax;
    return [netSalary, tax];
}

function computeTax(baseSalary: number): number {
    if (baseSalary > 500.0 && baseSalary <= 1000.0) {
        return baseSalary * 0.05;
    } else if (baseSalary > 1000.0 && baseSalary <= 2000.0) {
        return baseSalary * 0.1;
    } else {
        return baseSalary * 0.15;
    }
}

function storeNetSalary(netSalary: number, salaries: number[]): void {
    salaries.push(netSalary);
}

function printEmployeeInfo(
    dayOfWeekIndex: number,
    name: string,
    salary: number,
    tax: number
): void {
    const dayOfWeek = getDayOfWeekFromIndex(dayOfWeekIndex);
    console.log(`${name} worked till ${dayOfWeek} and earned $${salary} this week.`);
    console.log(`Their taxes were $${tax}.`);
}

function getDayOfWeekFromIndex(index: number): string {
    return dayOfWeekNames[index - 1];
}

const salaries: number[] = [2345, 1234];
const result = computeSalaryAndTaxesV2(4, 200, "Joe", salaries);
console.log(result);

console.assert(JSON.stringify(salaries) === JSON.stringify([2345, 1234, 570]));
console.assert(result === 30);
