function load_brands() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getPopularBrands",
    },
    success: function (data) {
      data.forEach((brand) => {
        $("#brandsblock").append(
          `<div class="img">
            <img src="images/` +
            brand.img +
            `" alt="" />
            </div>`
        );
      });
    },
  });
}

function load_alphavite() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getBrandsAlphavite",
    },
    success: function (alphs) {
      alphs.array.forEach((element) => {
        $("#alphavite").append(`<button>` + element + `</button>`);
      });
      $("#alphavite button:nth-child(1)").addClass("checked");
    },
  });
}

function load_all_brands() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "get_all_brands",
    },
    success: function (data) {
      load_result(data);
    },
  });
}

$(document).on(
  "click",
  ".thirdblock .blockcontent .brands_list .alphavite button",
  function (e) {
    if ($(e.target).hasClass("checked")) {
      $(e.target).removeClass("checked");
    } else {
      $(e.target).addClass("checked");
    }

    if (e.target.textContent == "Все") {
      $(".thirdblock .blockcontent .brands_list .alphavite button.checked")
        .get()
        .forEach((button) => {
          if (button.textContent != "Все") {
            $(button).removeClass("checked");
          }
        });
    } else {
      $(".thirdblock .blockcontent .brands_list .alphavite button.checked")
        .get()
        .forEach((button) => {
          if (button.textContent == "Все") {
            $(button).removeClass("checked");
          }
        });
    }

    if (e.target.textContent != "Все") {
      var string = "";
      $(".thirdblock .blockcontent .brands_list .alphavite button.checked")
        .get()
        .forEach((item) => {
          string += "'" + item.textContent + "',";
        });
      $.ajax({
        url: "../php/api.php",
        method: "post",
        dataType: "json",
        data: {
          method: "get_brands_by_ids",
          chars: string.substring(0, string.length - 1),
        },
        success: function (data) {
          load_result(data);
        },
      });
    } else {
      load_all_brands();
    }

    if (
      $(".thirdblock .blockcontent .brands_list .alphavite button.checked")
        .length == 0
    ) {
      $(
        $(".thirdblock .blockcontent .brands_list .alphavite button").get()[0]
      ).addClass("checked");
      load_all_brands();
    }
  }
);

function load_result(data)
{
  $("#brands_list_content").animate(
    { opacity: 0, height: $("#brands_list_content").scrollHeight },
    {
      duration: 300,
      complete: function () {
        $("#brands_list_content").empty();
        data.response.forEach((group) => {
          var inside = "";

          group.list.forEach((item) => {
            inside =
              inside +
              `<a href="" class="item">
              <div class="content">
                <img class="img" src="images/right.svg" />
                <p>` +
              item +
              `</p>
              </div>
            </a>`;
          });

          $("#brands_list_content").append(
            `<div class="list_item">
          <p class="char">` +
              group.char +
              `</p>
          <div class="items_div">` +
              inside +
              `</div>
        </div>`
          );
        });
        
        var actualheight = 0;
        $("#brands_list_content .list_item").get().forEach((x) => {
          actualheight += x.scrollHeight;
        });
        $("#brands_list_content").animate(
          { opacity: 1, height:actualheight },
          { duration: 300 }
        );
      },
    }
  );
}