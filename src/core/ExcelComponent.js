import {DomListener} from '@core/DomListener';

//ExcelComponent это централизованное место для всех компонентов
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    //передаем в DomListener
    //super передает параметры, которые нужны для класса родителя
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter

    this.prepare() //вспомогательный хук
  }

  prepare() {}

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