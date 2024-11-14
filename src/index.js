import "./style.css"
import clear from './clear.png'
import overcast from './overcast.png'
import rain from './rainy.png'

const button = document.querySelector('button')
const KEY = '8F9VDEN4SL3X6F9KNK8A8KDWW'
const content = document.querySelector(".content")
const N = 5

function createCards(condition, div){
    div.innerHTML = ''
    condition.forEach(cond => {
        const cards = document.createElement('div')
        cards.className = 'cards'
        const img = document.createElement('img')
        if(cond.condition == 'Clear'){
            img.alt = 'clear'
            img.src = clear
        }
        else if (cond.condition == 'Overcast'){
            img.alt = 'overcast'
            img.src = overcast
        }
        else{
            img.alt = 'Rain/partially cloud'
            img.src = rain
        }
        const date = document.createElement('h1').textContent = cond.date
        const weather = document.createElement('p').innerHTML = cond.condition
        const space = document.createElement('br')
        cards.append(img)
        cards.append(date)
        cards.append(space)
        cards.append(weather)
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
        const condition = info.days.map(temp => {return {date: temp.datetime, condition: temp.conditions}}).filter((_,index) => index<N)
        createCards(condition, div)
    } catch (error) {
        alert(`${error}`)
    }finally{
        loading.style.display = 'none';
    }
}

button.addEventListener('click', show)