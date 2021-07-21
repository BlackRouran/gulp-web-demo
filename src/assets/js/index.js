cooperateDrop('consultingBox')
cooperateDrop('consultingBox2')

var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: true,
  effect: 'flip',
  flipEffect: {
    slideShadows: true,
    limitRotation: true,
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
})
$('.swiper-container').hover(function () {
  mySwiper.autoplay.stop();
}, function () {
  mySwiper.autoplay.start();
})
