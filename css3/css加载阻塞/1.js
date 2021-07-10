console.log('外部js执行了')
console.log(window.getComputedStyle(document.querySelector('h1')).getPropertyValue('color'))
console.log(document.querySelector('.box2'))