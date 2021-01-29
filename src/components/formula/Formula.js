import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
     <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    //значение текста ячейки нужно вставить в инпут
    this.$on('table:select', $cell => {
      //в инпут передаем эту ячейку
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      //в инпут передаем эту ячейку
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()

      //убрать фоукс с формулы при нажатии ретурна
      this.$emit('formula:done')
    }
  }
}