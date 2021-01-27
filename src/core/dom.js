class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'//проверим
      ? document.querySelector(selector) //строка?
      : selector                        //или нода?
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  //метод on дублирует addEventListener
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  myAppend(node) {
    if (node instanceof Dom) {
      //проверка только для Dom-инстанса
      node = node.$el
    }
    //если у элемента присутствует метод append или старый метод appendChild
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    //вызываем у нативного элемента closest, $(this.$el чтобы потом везде не писать $el
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    // Object.keys(styles)
    Object.keys(styles).forEach(key => {
      //контекст сохранен старый
      this.$el.style[key] = styles[key]
    })
  }

  id(parse) {
    //передали parse => получили в виде объекта
    if (parse) {
      const parsed = this.id().split(':') //через рекурсию (тут if не пройдет и будет след строка)
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    //не передали parse => получим id как указали в table template через :
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

//чтобы не экспортировать класс и не писать постоянно new
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}