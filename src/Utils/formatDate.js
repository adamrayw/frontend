function formatDate(date) {
    const dates = new Date(date);

    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    };
    const formattedDate = dates.toLocaleDateString('id-ID', options);

    return formattedDate;
}

export default formatDate;