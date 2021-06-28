let cards, cardsData, separator;

function getType (title) {
    let isLiving = false;
    let isGarage = false;
    let isTownhouse = false;
    livingTypeKeywords.forEach(word => isLiving = isLiving || title.toLowerCase().includes(word));
    if (isLiving) {
        return 'living';
    }
    garageKeywords.forEach(word => isGarage = isGarage || title.toLowerCase().includes(word));
    if (isGarage) {
        return 'garages';
    }
    townhouseKeywords.forEach(word => isTownhouse = isTownhouse || title.toLowerCase().includes(word));
    if (isTownhouse) {
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

function replaceCardImage (card) {
    const imgElement = card.querySelector('.js-product-img');
    const url = imgElement.getAttribute('data-original');
    imgElement.style.backgroundImage = `url(${url})`;
}

function getCardsData (cards) {
    const cardsData = cards.map(card => {
        const title = card.querySelector('.js-product-name').textContent;
        const price = parseInt(card.querySelector('.js-product-price ').getAttribute('data-product-price-def'));
        const descContainer = card.querySelector('.js-store-prod-descr').querySelectorAll('span');
        const address = descContainer[0].textContent;
        const districtFull = descContainer[1].textContent.split('квартал ');
        const district = districtFull.length > 1 ? districtFull[1] : null;
        const type = getType(title);
        const number = parseNumberFromTitle(title);
        const rooms = type === 'living' ? number : null;
        const square = type === 'living' ? null : number;

        replaceCardImage(card);
    
        return {
            price,
            address,
            district,
            type,
            rooms,
            square,
            card
        };
    });
    return cardsData;
}

function findElements () {
    cards = Array.from(cardsContainer.querySelectorAll('.t-store__card'));
    if (!cards.length) {
        console.log('waiting');
        setTimeout(findElements, 50);
        return;
    }
    separator = cardsContainer.querySelector('.t-store__grid-separator');
    cardsData = getCardsData(cards);
    refillCatalogue();
    console.log(cardsData);
}

const cardsContainer = document.querySelector('.js-store-grid-cont');
setTimeout(findElements, 50);