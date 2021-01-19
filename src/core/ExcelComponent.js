import {DomListener} from '@core/DomListener';

//ExcelComponent это централизованное место для всех компонентов
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    //передаем в DomListener
    super($root, options.listeners)
    this.name = options.name || ''
  }

  //возвращает шаблон компонента
  toHTML() {
    return ''
  }

  //сюда помещается все то, что будет иниализированно для компонента
  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}