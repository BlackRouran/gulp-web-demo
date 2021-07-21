$('.hoverhandle').hover(
  function () {
    $(this).find('a').addClass("hover")
  },
  function () {
    $(this).find('a').removeClass("hover")
  }
)

$('.concate-us').hover(
  function () {
    $(this).addClass("concate-us-hover")
    $('.concate-us-drop').show()
  },
  function () {
    $(this).removeClass("concate-us-hover")
    $('.concate-us-drop').hide()
  }
)

$('.contact-us-img').hover(
  function () {
    $('.concate-us-left').show()
  },
  function () {
    $('.concate-us-left').hide()
  }
)

$('.go-top-img').on('click', ()=> {
  var body = $('html,body');
  body.animate({scrollTop:0 }, 400);
})

function cooperateDrop(id){
  $('#'+id).hover(
    function () {
      console.log($(this))
      $(this).find('.scrm-drop').show()
    },
    function () {
      $(this).find('.scrm-drop').hide()
    }
  )
}

cooperateDrop('consultingBox3')