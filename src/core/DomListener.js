import {capitalize} from '@core/utils';

export class DomListener {
  //$root - корневой элемент на который будут вешаться различные слушатели
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided to DOMListener`)
    }
    this.$root = $root
    //this.listeners = listeners и прочее указываем для доступности в методах ниже
    this.listeners = listeners
  }

  //листенеры должны вызываться для всех компонентов header и тд, только после render
  initDOMListeners() {
    //если listeners массив пустой, то он просто игнорируется
    //принципиально использовать =>f чтобы не создавался свой контекст this
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        //name указан к компонентах Formula и тд
        const name = this.name || ''
        throw new Error(`Метод ${method} не имплементирован в ${name} Component`)
      }
      //ключевой момент: МЕТОД BIND СОЗДАЕТ НОВУЮ ФУНКЦИЮ, поэтому байндим метод на свой собственный контекст
      this[method] = this[method].bind(this)
      //on так как в dom.js есть this.$el.addEventListener, конкретно $el мешал бы тут использовать нативный листенер
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

//эта функция не в классе и будет использоваться только здесь
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}