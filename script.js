const districtsValues = [
    'Квартал М',
    'Квартал Г',
    'Квартал К',
    'Квартал Б',
    'Квартал И',
    'Квартал Е',
    'Квартал Д',
    'Квартал В',
    'Квартал МДЗ-1',
    'Квартал МДЗ-2',
    'Квартал МКЗ',
    'Квартал Л',
    'Квартал Н',
    'Квартал А',
];

const filtersBlock = document.querySelector('.filtersBlock');
const allInputs = filtersBlock.querySelectorAll('input');
const types = {
    living: filtersBlock.querySelector('.living'),
    commerce: filtersBlock.querySelector('.commerce'),
    garages: filtersBlock.querySelector('.garages'),
    townhouses: filtersBlock.querySelector('.townhouses')
};
const prices = {
    from: filtersBlock.querySelector('#price-from'),
    to: filtersBlock.querySelector('#price-to')
};
const roomsBlock = filtersBlock.querySelector('.rooms');
const rooms = {
    st: filtersBlock.querySelector('#st'),
    '1': filtersBlock.querySelector('#r1'),
    '2': filtersBlock.querySelector('#r2'),
    '3': filtersBlock.querySelector('#r3'),
    '4': filtersBlock.querySelector('#r4'),
};
const squaresBlock = filtersBlock.querySelector('.square');
const squares = {
    from: filtersBlock.querySelector('#square-from'),
    to: filtersBlock.querySelector('#square-to')
};
const district = {
    result: filtersBlock.querySelector('.districtResult'),
    optionsBox: filtersBlock.querySelector('.districtOptions'),
};
const address = filtersBlock.querySelector('#address');
const btn = filtersBlock.querySelector('#showResults');

const typesValues = ['living', 'commerce', 'garages', 'townhouses'];

const state = {
    type: 'living',
    price: {
        from: null,
        to: null
    },
    rooms: new Set(['st']),
    square: {
        from: null,
        to: null
    },
    isRooms: true,
    district: '',
    address: ''
};

// добавление опций по кварталам
districtsValues.forEach(value => {
    $(district.optionsBox).append(`<div class="districtOption">${value}</div>`)
});
district.options = filtersBlock.querySelectorAll('.districtOption');

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
    district.result.textContent = state.district;
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

// обработчики событий
function clickType(type) {
    state.type = type;
    redrawType();
    redrawRoomsSquares();
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
    state.district = dist;
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