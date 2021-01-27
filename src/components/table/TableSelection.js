export class TableSelection {
  constructor() {
    //приватная переменная для этого класса
    this.group = []
  }

  //сюда передаем сам элемент полученный из дом-дерева
  //$el instanceof DOM === true (class)
  select($el) {
    this.group.push($el)
    $el.addClass('selected')
  }

  selectGroup() {

  }
}