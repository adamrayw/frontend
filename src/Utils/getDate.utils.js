
// This function will return the current date in the format of "DD Month YYYY"
// Example: 01 January 2021
function getDate() {
    const date = new Date(); // Replace with your desired date

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}

export default getDate;