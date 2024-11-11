import "./style.css"

const button = document.querySelector('button')
const KEY = '8F9VDEN4SL3X6F9KNK8A8KDWW'
const content = document.querySelector(".content")
const N = 5

function createCards(condition, div){
    div.innerHTML = ''
    condition.forEach(cond => {
        const cards = document.createElement('div')
        cards.className = 'cards'
        cards.innerHTML = cond
        div.appendChild(cards)
        content.appendChild(div)
    });
}

async function show() {
    const input = document.querySelector('input').value
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=us&key=${KEY}&contentType=json`)
        const info =  await response.json()
        const div =  document.querySelector('.weather') || document.createElement('div')   
        if (!document.querySelector('.weather')) {
            div.className = 'weather';
        }
        const condition = info.days.map(temp => temp.conditions).filter((_,index) => index<N)
        createCards(condition, div)
    } catch (error) {
        alert(`${error}`)
    }finally{
        loading.style.display = 'none';
    }
}

button.addEventListener('click', show)