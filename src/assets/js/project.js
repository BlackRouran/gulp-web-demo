var swiperTrait = new Swiper('#traitSwiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
})

var swiperLifeCycle = new Swiper('#lifeCycleSwiper', {
  loop: true,
  autoplay: true,
  pagination: {
    el: '.life-cycle-pagination-box',
    type: 'custom',
    clickable :true,
    renderCustom: function (swiper, current, total) {
      let paginationHtml = ''
      let activeClass = ''
      for(let i=1; i< total+1; i++){
        if (i == current) {
          paginationHtml += `<li class="life-cycle-pagination-item active-class-custom">
          <div class="number-box">
            <p class="number">0${i}</p>
            <p class="text">获得客户</p>
          </div>
          <p class="line"></p>
        </li>`
        } else {
          paginationHtml += `<li class="life-cycle-pagination-item">
          <div class="number-box">
            <p class="number">0${i}</p>
            <p class="text">获得客户</p>
          </div>
          <p class="line"></p>
        </li>`
        }
      }
      return paginationHtml
    }
  }
})

$('#lifeCycleSwiper').hover(function () {
  swiperLifeCycle.autoplay.stop();
}, function () {
  swiperLifeCycle.autoplay.start();
})

$('.life-cycle-pagination-box').on('click', '.life-cycle-pagination-item', function (){
  swiperLifeCycle.slideTo($(this).index() +1, 1000, false)
})