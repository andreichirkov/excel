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

      console.log(coords)

      document.onmousemove = e => {
        //мышь вправо дельта в плюс; влево - в минус
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}