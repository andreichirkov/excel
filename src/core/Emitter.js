export class Emitter {
  constructor() {
    this.listeners = {}
  }

  //Уведомляем слушателей если они есть (принимает произвольную строчку 'formula:select')
  //в ...args соберем все остальные параметры
  //table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  //Подписываемся на уведомления / Добавляем нового слушателя
  //Первый параметр - событие, второй - коллбек
  //formula.subscribe('table.select', () => {})
  subsctibe(event, fn) {
    //объект делаем массивом, если он не определен то пустой массив
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    //функция отписки от события (в реакте такой способ используется)
    return () => {
      //удаляем слушателя fn (оставляем другие)
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}