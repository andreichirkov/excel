export class TableSelection {
  static className = 'selected'

  constructor() {
    //приватная переменная для этого класса
    this.group = []
    this.current = null
  }

  //сюда передаем сам элемент полученный из дом-дерева
  //$el instanceof DOM === true (class) - чтобы работали методы принадлежащие DOM
  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el    //для выделения первой ячейки, понадобится в группе ячеек
  }

  clear() {
    //очистка выбранных ячеек
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}