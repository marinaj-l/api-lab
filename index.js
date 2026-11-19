const baseUrl = 'https://api.thingstodoapi.com/v1/search';
const parameters = new URLSearchParams({
    from,
    to,
    limit: "1",
    sort: "time",
});


fetchData();

async function fetchData() {
    try {
        const response = await fetch(`${baseUrl}?${parameters}`)
        if (!response.ok) {
            throw new Error(`Could not fetch resource`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);   
    }}