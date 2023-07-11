function formatTime(time) {
    const date = new Date(time);

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
    };

    const formattedTime = date.toLocaleTimeString('id-ID', optionsTime).replace(/\./g, ':');

    return formattedTime;
}

export default formatTime;