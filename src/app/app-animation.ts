import { animate, group, keyframes, stagger, query, state, style, transition, trigger } from "@angular/animations";

export const routerAnimate = trigger('routerFadeIn', [
  transition("* <=> *", [
    style({ opacity: 0, background:'white', transform:'translateX(20px)'}),    
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

export const contactAnimate = trigger('contacts', [
  

]);