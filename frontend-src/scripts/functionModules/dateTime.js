const dateTimeComponent = function () {
    const setDateTime = function () {
        const phoneTime = document.getElementById('js-time');
        const phoneDate = document.getElementById('js-date');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const dayName = days[today.getDay()];
        const monthName = months[today.getMonth()];
        const formattedDate = today.getDate();
        const date = dayName + ', ' + monthName + ' ' + formattedDate;
        const formattedHours = ((today.getHours() < 10) ? `0${today.getHours()}` : `${today.getHours()}`);
        const formattedMinutes = ((today.getMinutes() < 10) ? `0${today.getMinutes()}` : `${today.getMinutes()}`);
        const time = formattedHours + ':' + formattedMinutes;

        phoneTime ? phoneTime.innerHTML = time : '';
        phoneDate ? phoneDate.innerHTML = date : '';
        // console.log(dayName);
    };

    setDateTime();

    setInterval(function () {
        setDateTime();
    }, 10000);

};
export default dateTimeComponent;