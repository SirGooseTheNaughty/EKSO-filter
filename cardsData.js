let cards, cardsData;
const livingTypeKeywords = new Set(['квартира']);
const garageKeyword = 'гараж';
const townhouseKeyword = 'дача';

function getType (title) {
    let isLiving = false;
    livingTypeKeywords.forEach(word => isLiving = isLiving || title.toLowerCase().includes(word));
    if (isLiving) {
        return 'living';
    }
    if (title.toLowerCase().includes(garageKeyword)) {
        return 'garages';
    }
    if (title.toLowerCase().includes(townhouseKeyword)) {
        return 'townhouses';
    }
    return 'commerce';
}

function parseNumberFromTitle (title) {
    const numbers = title.match(/\d+/);
    if (numbers) {
        return numbers[0];
    }
    return null;
}

function getCardsData (cards) {
    const cardsData = cards.map(card => {
        const title = card.querySelector('.js-product-name').textContent;
        const price = parseInt(card.querySelector('.js-product-price ').getAttribute('data-product-price-def'));
        const descContainer = card.querySelector('.js-store-prod-descr').querySelectorAll('span');
        const adress = descContainer[0].textContent;
        const district = descContainer[1].textContent;
        const type = getType(title);
        const number = parseNumberFromTitle(title);
        const rooms = type === 'living' ? number : null;
        const square = type === 'living' ? null : number;
    
        return {
            price,
            adress,
            district,
            type,
            rooms,
            square,
            card
        };
    });
    return cardsData;
}

setTimeout(() => {
    cards = Array.from(document.querySelectorAll('.t-store__card'));
    cardsData = getCardsData(cards);

    console.log(cardsData);
}, 500)