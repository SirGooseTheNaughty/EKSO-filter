const allDistrictsOption = 'Выбрать все';
const livingTypeKeywords = new Set(['квартира']);
const garageKeywords = new Set(['гараж']);
const townhouseKeywords = new Set(['дача']);

const districtsValues = [
    allDistrictsOption,
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

const catalogueBlock = document.querySelector('#rec323127178');
const noResultsBlock = document.querySelector('#rec330511283');
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

// добавление опций по кварталам
districtsValues.forEach(value => {
    $(district.optionsBox).append(`<div class="districtOption">${value}</div>`)
});
district.options = filtersBlock.querySelectorAll('.districtOption');