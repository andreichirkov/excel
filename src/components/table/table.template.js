const CODES = {
  A: 65,
  Z: 90
}

// function toCell(row, col) {
//
// }
function toCell(row) {
  return function(_, col) {
    return `
      <div class="cell"
        contenteditable
        data-col="${col}"
        data-id="${row}:${col}"
      ></div>
     `
  }
}

//index есть потомучто передает метод .map
function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

//приведение элемента массива (число) к символу
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A +1
  const rows = []

  //по сути получим 25 пустых строк в массиве (создаем массив от кол-ва колонок)
  const cols = new Array(colsCount)
      .fill('') //заполняем пустой строкой ['', '', и тд]
      .map(toChar)    // [65, 66, и тд]
      .map(toColumn)  //сокращение колбека от el => createCol(el)
      .join('')       //массив преобразуем в строку

  //помещаем одну строчку -> формируем шапку A, B, и тд
  rows.push(createRow(null, cols))

  //если первая строчка, то в row-data нужно поместить columns
  //если вторая и дальше, то cell

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col)) //элемент и индекс будем принимать
        .map(toCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}