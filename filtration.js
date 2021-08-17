function filterCards () {
    return cardsData.filter(card => {
        const {
            type,
            price,
            isRooms,
            rooms,
            square,
            district,
            address
        } = state;

        if (type !== card.type) {
            console.log(card.address, 'by type');
            return false;
        }
        if (price.from && card.price < price.from) {
            console.log(card.address, 'by price from');
            return false;
        }
        if (price.to && card.price > price.to) {
            console.log(card.address, 'by price to');
            return false;
        }
        if (isRooms && rooms.size && card.rooms && !rooms.has(card.rooms)) {
            console.log(card.address, 'by rooms');
            return false;
        }
        if (!isRooms && square.from && card.square < square.from) {
            console.log(card.address, 'by square from');
            return false;
        }
        if (!isRooms && square.to && card.square > square.to) {
            console.log(card.address, 'by square to');
            return false;
        }
        if (district) {
            const stateDistrict = state.district.toLowerCase().split(' ')[1];
            if (card.district !== stateDistrict) {
                console.log(card.address, 'by district');
                return false;
            }
        }
        if (address) {
            if (!card.address.toLowerCase().includes(address.toLowerCase())) {
                console.log(card.address, 'by adress');
                return false;
            }
        }
        return true;
    });
}

function refillCatalogue () {
    cardsContainer.innerHTML = '';
    let drawnCards = 0;
    const filteredCards = filterCards();
    if (filteredCards.length) {
        updateResultsBlocks(true);
        filteredCards.forEach((card, i) => {
            if (i > state.numVariants - 1) {
                return;
            }
            $(cardsContainer).append(card.card);
            drawnCards += 1;
            if (drawnCards === 3) {
                drawnCards = 0;
                $(cardsContainer).append($(separator).clone());
            }
        });

    } else {
        updateResultsBlocks(false);
    }
    toggleAddVariantsBtns(filteredCards.length);
}

function updateResultsBlocks (isVisible) {
    if (isVisible) {
        noResultsBlock.style.display = 'none';
        catalogueBlock.style.display = 'block';
    } else {
        noResultsBlock.style.display = 'block';
        catalogueBlock.style.display = 'none';
    }
}

btn.addEventListener('click', refillCatalogue);