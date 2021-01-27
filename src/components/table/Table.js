import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(20)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      // $target должен быть instanceof Dom
      const $target = $(event.target)
      if (event.shiftKey) {
        //групповое выделение если зажат shift
        const target = $target.id(true)
        const current = this.selection.current.id(true)

        //получить диапазон колонок и строк
        const cols = range(current.col, target.col)
        const rows = range(current.row, target.row)

        //получаем все id из диапазона
        const ids = cols.reduce((acc, col) => {
          rows.forEach(row => acc.push(`${row}:${col}`))
          return acc  //чтобы был виден на следующей итерации
        }, [])

        //массив выделенных элементов
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
}
