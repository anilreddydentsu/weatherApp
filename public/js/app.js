console.log('app loaded!!');

const form = document.getElementById('weather');
const search = document.getElementById('search');

document.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('result1').textContent = '...loading';
    const gio = '/weather?address='+search.value;
    fetch(gio)
        .then(response => response.json())
        .then(jsonData => {
            document.getElementById('result1').textContent = jsonData.currentTemp;
        });
});
