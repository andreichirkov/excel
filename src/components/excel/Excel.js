import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

//class Excel главная точка входа и рендера, сюда пишем компоненты нужные в index.js
export class Excel {
  //#app и options
  constructor(selector, options) {
    //получаем из инстанса класса Dom, где $ по сути
    this.$el = $(selector)
    //через || (или) определяем значение по-умолчанию [] (пустой массив)
    this.components = options.components || []
    //создаем эмиттер для взаимодействий событий между компонентами
    //нужно передать этот объект по ссылке для всех компонентов - будет общий объект
    this.emitter = new Emitter()
  }
  getRoot() {
    const $root = $.create('div', 'excel')

    //эмиттер будет во всех 4 компонентах: Table и тд
    const componentOptions = {
      emitter: this.emitter
    }

    //Component - с большой буквы так как это класс
    //переопределяем массив components для доступа в render
    //нужно вернуть новый массив поэтому map, а forEach не подойдет
    this.components = this.components.map(Component => {

      //для каждого компонента forEach создаем $el - это div с классом excel__formula и тп (4)
      const $el = $.create('div', Component.className)

      //можно созвать инстансы так как это опять же класс
      //создаем главний div компонента с классом, чтобы потом поместить туда контент
      const component = new Component($el, componentOptions)

      //вставляем созданные элементы в каждый компонент, а потом в корень $root
      // $el.innerHTML = component.toHTML() ??? МОМЕНТ ПЕРЕДЕЛАН!
      $el.html(component.toHTML())
      $root.myAppend($el)
      return component
    })

    return $root
  }
  //render что то складывает в шаблон
  render() {
    this.$el.myAppend(this.getRoot())
    console.log(this.components)

    this.components.forEach(component => component.init())
  }

  //уничтожить все помпоненты экселя когда выходим
  destroy() {
    this.components.forEach(component => component.destroy())
  }
}