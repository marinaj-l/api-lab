const baseUrl = "https://api.thingstodoapi.com/v1/search";

/* AI Disclosure:

Prompt used: Using my index.js file and reading (NOT EDITING) the index.html layout of YYYY-MM--DD, please modify the fetchData() function so that it outputs a singular formatted event name from the API in baseUrl for the date provided by the index.html button. Do not add extra functionality outside of this or modify anything outside of the javascript file.

Output: Updated only index.js. fetchData() now reads the date from the HTML input, searches that local calendar day, and logs one result as Event: <title>. Syntax and mocked-fetch checks passed.


*/

async function fetchData() {
    const result = document.getElementById("result");
    try {
        const date = document.getElementById("dateentry").value.trim();
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
        const from = match ? new Date(`${date}T00:00:00`) : new Date(NaN);

        if (
            !match ||
            Number.isNaN(from.getTime()) ||
            from.getFullYear() !== Number(match[1]) ||
            from.getMonth() !== Number(match[2]) - 1 ||
            from.getDate() !== Number(match[3])
        ) {
            throw new Error("Enter a valid date in YYYY-MM-DD format.");
        }

        const to = new Date(from);
        to.setDate(to.getDate() + 1);
        const parameters = new URLSearchParams({
            from: from.toISOString(),
            to: to.toISOString(),
            limit: "1",
            sort: "time",
        });

        const response = await fetch(`${baseUrl}?${parameters}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        /* AI Disclosure:
        Prompt used: Prompt used: Please make it so that the output of the dataentry button presents the result of fetchData() to the webpage.
    
        Output: The Fetch Event button now displays the result in the webpage. I added a live result area and loaded index.js from index.html; fetchData() shows the event name, a no-events message, or an error. Syntax and page-output smoke tests passed.
        
        */
        const data = await response.json();
        const event = data.results?.[0];
        if (!event) {
            result.textContent = "No events found for that date.";
            return;
        }
        result.textContent = `Event: ${event.title}`;
    } catch (error) {
        result.textContent = error.message;
    }
}

/* AI Disclosure:
Prompt used: Please create a new function under fetchData() that uses fetch() and the API found here: https://holidayexplore.com/api/v1/ to find if a United States holiday coincides on the date provided by the prompt in index.html (DO NOT MODIFY THE HTML FILE) and outputs the name of the holiday. If there is no holiday in the US, output "No US Holiday".

Output: Updated index.js to fetch US holidays, match the entered date, and display the holiday name or “No US Holiday”. index.html is unchanged.

Syntax and mocked lookup checks passed. I couldn’t verify against the live API because it returned HTTP 403 in this environment.
*/

async function fetchUSHoliday(date) {
    const result = document.getElementById("holiday-result");
    const response = await fetch("https://holidayexplore.com/api/v1/holidays?country=US");
    if (!response.ok) {
        throw new Error("Could not fetch US holidays.");
    }

    const data = await response.json();
    const holidays = Array.isArray(data) ? data : data?.holidays;
    if (
        !Array.isArray(holidays) ||
        holidays.some(
            (holiday) =>
                !holiday ||
                typeof holiday.date !== "string" ||
                typeof holiday.name !== "string"
        )
    ) {
        throw new Error("Unexpected response from the holiday API.");
    }

    const holiday = holidays.find((entry) => entry.date === date);
    result.textContent = holiday ? holiday.name : "No US Holiday";
}