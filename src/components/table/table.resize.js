import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)

  //const $parent = $resizer.$el.closest('.column') //ближайший родитель с классом => дальше через data атрибут лучше способ
  const $parent = $resizer.closest('[data-type="resizable"]')

  //получаем координаты
  const coords = $parent.getCoords()

  //определяем тип: col или row
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    //type col ? col : row
    if (type === 'col') {
      //мышь вправо дельта в плюс; влево - в минус
      const delta = e.pageX - coords.right
      //value определяем здесь, а сработает когда клик отпустить
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      //меняем размер каждой cell в кликнутой column
      //находим все ячейки с номером кликнутой колонкой
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }


    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}