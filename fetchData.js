async function fetchCardsData () {
    const res = await fetch("https://store.tildacdn.com/api/getproductslist/?storepartuid=481116323611&recid=323127178&c=1628693243170&getparts=true&getoptions=true&slice=1&size=100", {
        "method": "GET",
    });
    return res.json();
}

async function parseCardsData () {
    const rawData = await fetchCardsData();
    const data = [];
    rawData.products.forEach(prod => {
        const img = JSON.parse(prod.gallery)[0].img;
        const price = parseInt(prod.price, 10);
        const title = prod.title;
        const descNodes = jQuery.parseHTML(prod.descr);
        const spanNodes = descNodes.filter(node => node.nodeName === 'SPAN');
        const type = getType(title);
        const number = parseNumberFromTitle(title);
        const rooms = type === 'living' ? number : null;
        const square = type === 'living' ? null : number;
        let address, district = null;
        
        if (spanNodes.length) {
            address = spanNodes[0].innerText;

            if (spanNodes[1]) {
                const districtFull = spanNodes[1].innerText.toLowerCase().split('квартал ');
                district = districtFull.length > 1 ? districtFull[1] : null;
            }
        }

        data.push({
            link: prod.buttonlink,
            uid: prod.uid,
            img,
            price,
            title,
            address,
            district,
            type,
            number,
            rooms,
            square,
            rawDesc: prod.descr,
            priceStr: preformNumbers(price)
        });
    });

    return data;
}

async function findElements () {
    cardsData = await parseCardsData();
    cardsData.forEach(card => card.card = getCard(card));
    refillCatalogue();
    console.log(cardsData);
}

let cardsData;
setTimeout(findElements, 50);