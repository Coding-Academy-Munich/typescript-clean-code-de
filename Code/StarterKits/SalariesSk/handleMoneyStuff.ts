const lstDns: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function handleMoneyStuff(
    iDow: number, // Day of week
    fSpd: number, // Salary per day
    strN: string, // Name of the person
    lstSlrs: number[] // List of all salaries paid
): number {
    // Get the day of week from the list of days.
    // We count Sunday as 1, Monday as 2, etc. but the work week starts on Monday.
    const strDow = lstDns[iDow - 1];
    // Compute the salary so far based on the day
    let fSsf = (iDow - 1) * fSpd;
    // The tax
    let fT = 0.0;
    if (fSsf > 500.0 && fSsf <= 1000.0) {
        fT = fSsf * 0.05;
    } else if (fSsf > 1000.0 && fSsf <= 2000.0) {
        fT = fSsf * 0.1;
    } else {
        fT = fSsf * 0.15;
    }
    // Update salary based on the tax to pay
    fSsf = fSsf - fT;
    // Add the salary to the list of all salaries paid
    lstSlrs.push(fSsf);
    console.log(`${strN} worked till ${strDow} and earned $${fSsf} this week.`);
    console.log(`Their taxes were $${fT}.`);
    return fT;
}

const salaries: number[] = [2345, 1234];
const result = handleMoneyStuff(4, 200, "Joe", salaries);
console.log(result);

console.assert(JSON.stringify(salaries) === JSON.stringify([2345, 1234, 570]));
console.assert(result === 30);
