const baseUrl = 'https://api.thingstodoapi.com/'
const parameters = new URLSearchParams({
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