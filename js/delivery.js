$(document).on(
  "click",
  ".thirdblock .blockcontent .content .questions_block .questions .question",
  function (e) {
    if ($(e.currentTarget).hasClass("show")) {
      $(e.currentTarget).find(".title").removeClass("show");
      $(e.currentTarget)
        .find(".desc")
        .animate(
          {
            height: 0,
            marginTop: 0,
            opacity:0
          },
          {
            duration: 300,
            complete: function () {
              $(e.currentTarget).removeClass("show");
            },
          }
        );
    } else {
      $(e.currentTarget).find(".title").addClass("show");
      $(e.currentTarget)
        .find(".desc")
        .animate(
          {
            height: $(e.currentTarget).find(".desc").find("p").get()[0].scrollHeight,
            marginTop: "1.5rem",
            opacity: 1
          },
          {
            duration: 300,
            complete: function () {
              $(e.currentTarget).addClass("show");
            },
          }
        );
    }
  }
);
