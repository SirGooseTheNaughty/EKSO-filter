const state = {
    type: 'living',
    price: {
        from: null,
        to: null
    },
    rooms: new Set([]),
    square: {
        from: null,
        to: null
    },
    isRooms: true,
    district: '',
    address: '',
    numVariants: 9
};

// отрисовщики
function redrawType() {
    const { type } = state;
    for (let t in types) {
        if (t === type) {
            types[t].classList.add('active');
        } else {
            types[t].classList.remove('active');
        }
    }
}
function redrawRoomsSquares() {
    const { type } = state;
    if (type === 'living') {
        roomsBlock.classList.remove('hidden');
        squaresBlock.classList.add('hidden');
        state.isRooms = true;
    } else {
        roomsBlock.classList.add('hidden');
        squaresBlock.classList.remove('hidden');
        state.isRooms = false;
    }
}
function redrawRoomNumbers() {
    for (let rn in rooms) {
        if (state.rooms.has(rn)) {
            rooms[rn].classList.add('active');
        } else {
            rooms[rn].classList.remove('active');
        }
    }
}
function redrawDistrictResult() {
    district.result.textContent = state.district || 'Все';
}
function checkValidity () {
    let isValid = true;
    allInputs.forEach(input => {
        isValid = isValid && input.validity.valid;
    });
    return isValid;
}
function changeBtnOnValidity () {
    if (checkValidity()) {
        btn.classList.remove('invalid');
    } else {
        btn.classList.add('invalid');
    }
}
function toggleAddVariantsBtns (num) {
    const isMin = state.numVariants === 9;
    const isMax = state.numVariants >= num;
    if (isMin) {
        addResults.minus.style.display = 'none';
    } else {
        addResults.minus.style.display = 'block';
    }
    if (isMax) {
        addResults.plus.style.display = 'none';
    } else {
        addResults.plus.style.display = 'block';
    }
}

// обработчики событий
function clickType(type) {
    state.type = type;
    redrawType();
    redrawRoomsSquares();
    refillCatalogue();
}
function clickRoomNumber(rn) {
    if (state.rooms.has(rn)) {
        state.rooms.delete(rn);
    } else {
        state.rooms.add(rn);
    }
    redrawRoomNumbers();
}
function clickChooseDistrict(e) {
    const isHidden = district.optionsBox.classList.contains('hidden');
    if (isHidden && e.target === district.result) {
        district.optionsBox.classList.remove('hidden');
        district.result.classList.add('opened');
    } else {
        district.optionsBox.classList.add('hidden');
        district.result.classList.remove('opened');
    }
}
function clickDistOption(dist) {
    if (dist === allDistrictsOption) {
        state.district = null;
    } else {
        state.district = dist;
    }
    redrawDistrictResult();
}

// обработчики кликов
for (let type in types) {
    types[type].addEventListener('click', () => {
        clickType(type);
    });
}
for (let rn in rooms) {
    rooms[rn].addEventListener('click', () => {
        clickRoomNumber(rn);
    });
}
document.addEventListener('click', clickChooseDistrict);
district.options.forEach(option => {
    option.addEventListener('click', (e) => {
        clickDistOption(e.target.textContent);
    });
});
allInputs.forEach(input => input.addEventListener('input', changeBtnOnValidity));

prices.from.value = '';
prices.to.value = '';
squares.from.value = '';
squares.to.value = '';
address.value = '';

prices.from.addEventListener('input', function () {
    const number = parseInt(this.value.toString().replace(/\s/g, ''), 10);
    state.price.from = number || null;
    this.value = preformNumbers(number);
});
prices.to.addEventListener('input', function () {
    const number = parseInt(this.value.toString().replace(/\s/g, ''), 10);
    state.price.to = number || null;
    this.value = preformNumbers(number);
});
squares.from.addEventListener('input', function () {
    const number = parseInt(this.value.toString().replace(/\s/g, ''), 10);
    state.square.from = number || null;
    this.value = preformNumbers(number);
});
squares.to.addEventListener('input', function () {
    const number = parseInt(this.value.toString().replace(/\s/g, ''), 10);
    state.square.to = number || null;
    this.value = preformNumbers(number);
});
address.addEventListener('input', function () {
    state.address = this.value || null;
});
addResults.plus.addEventListener('click', () => {
    state.numVariants += 9;
    refillCatalogue();
});
addResults.minus.addEventListener('click', () => {
    state.numVariants -= 9;
    refillCatalogue();
    const newScrollTop = $(window).scrollTop() - $(cards[0]).height() * 3;
    $(window).scrollTop(newScrollTop);
});

function preformNumbers (number) {
    if (!number) {
        return '';
    }
    const numbers = number.toString().split('');
    let i = 0;
    return numbers.reduceRight((acc, val) => {
        if (i === 0 || i % 3) {
            i += 1;
            return val + acc;
        }
        i += 1;
        return val + ' ' + acc;
    }, '');
}