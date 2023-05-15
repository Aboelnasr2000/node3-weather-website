


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const data1 = document.querySelector('#data1')
const data2 = document.querySelector('#data2')


async function getData(location) {
    try {
        // We are using fetch to get the response
        const response = await fetch('http://localhost:3000/weather?address=' + location);
        const data = await response.json();

        // Trigger the listData function and pass the result
        if (!data.error) {
            data1.textContent = 'In ' + data.address
            data2.textContent = 'The Weather is ' + data.weather.description + " , The Current Tempreture is   " + data.weather.tempreture + ' Degrees, Yet it feels like ' + data.weather.feelslike + ' Degrees. '
        } else {
            data1.textContent = data.error
        }
    } catch (error) {
        data1.textContent = error;
    }
}


weatherForm.addEventListener('submit', (e) => {
    data1.textContent = 'Loading.....'
    data2.textContent = ''
    e.preventDefault()
    getData(search.value)

})