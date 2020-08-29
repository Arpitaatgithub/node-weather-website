console.log('Client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});



const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const coords = searchTerm.value;
    console.log(coords);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + coords).then((response) => {
    response.json().then((data) => {
        if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.temperature;
                messageTwo.textContent = data.location;
                console.log(data.temperature);
                console.log(data.location);
            }
        });
    });
});




