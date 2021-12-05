import { animate, group, keyframes, stagger, query, state, style, transition, trigger } from "@angular/animations";

export const routerAnimate = trigger('routerFadeIn', [
  transition("* <=> *", [
    style({ opacity: 0, background:'white', transform:'translateY(20px)'}),    
    animate(1000)
  ])
]);

export const productAnimate = trigger('productSlider', [
  state('next', style({
      opacity:1,
      transform:'translateX(10px)',
      overflow:"hidden"
    })
  ),
  state(
    'prev', style({
      opacity:1,
      transform:'translateX(-10px)',
      overflow:"hidden"
    })
  ),

  transition('next => prev', animate(1000)),

  transition('prev => next', animate(1000))

]);

export const validationAnimate = trigger('toggleError', [
  state('show', style({
      opacity:1
    })
  ),
  state(
    'hide', style({
      opacity:0
    })
  ),

  transition('hide => show', animate(1000, keyframes([
    style({left: '0', transform:'translateX(0)', opacity:0, offset : 0.3}),
    style({left: '20px', transform:'translateX(50px)', opacity:0.5, offset : 0.5}),
    style({left: '40px', transform:'translateX(100px)', opacity:1, offset : 0.7})
  ]))),
  
  transition('show => hide', animate(1000, keyframes([    
    style({left: '40px', transform:'translateX(100px)', opacity:1, offset : 0.3}),
    style({left: '20px',transform:'translateX(50px)', opacity:0.5, offset : 0.5}),
    style({left: '0', transform:'translateX(0)', opacity:0, offset : 0.7})
  ])))


]);

export const loaderAnimate = trigger('spin', [
  transition("off => on", [
    animate('4s linear', keyframes([
      style({transform : 'rotate(0deg)'}),
      style({transform : 'rotate(360deg)'})
    ]))
  ])
])