import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)

      //const $parent = $resizer.$el.closest('.column') //ближайший родитель с классом => дальше через data атрибут лучше способ
      const $parent = $resizer.closest('[data-type="resizable"]')

      //получаем координаты
      const coords = $parent.getCoords()

      //находим все ячейки с номером кликнутой колонкой
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      //определяем тип: col или row
      const type = $resizer.data.resize

      document.onmousemove = e => {
        //type col ? col : row
        if (type === 'col') {
          //мышь вправо дельта в плюс; влево - в минус
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.css({width: value + 'px'})
          //меняем размер каждой cell в кликнутой column
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}