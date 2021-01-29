import {DomListener} from '@core/DomListener';

//ExcelComponent это централизованное место для всех компонентов
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    //передаем в DomListener
    //super передает параметры, которые нужны для класса родителя
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare() //вспомогательный хук
  }
  //настройка до эмита
  prepare() {}

  //возвращает шаблон компонента
  toHTML() {
    return ''
  }

  //уведомляем слушателей о событии event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  //подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subsctibe(event, fn)
    this.unsubscribers.push(unsub)
  }

  //сюда помещается все то, что будет иниализированно для компонента
  init() {
    this.initDOMListeners()
  }

  //удяляем компонент
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}