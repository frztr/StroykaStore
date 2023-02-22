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
        // $("#brandsblock").append(
        //   `<div class="img">
        //     <img src="images/` +
        //     brand.img +
        //     `" alt="" />
        //     </div>`
        // );

        var div = jQuery("<div>",{class:"img"});
        var img = jQuery("<img>",{src:"images/"+brand.img });
        img.appendTo(div);
        div.appendTo("#brandsblock");
      });
    },
  });
}

function load_categories() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getPopularCategories",
    },
    success: function (data) {
      data.forEach((item) => {
        // $("#categoriesblock").append(
        //   `<a href="" class="category">
        //   <div class="name">
        //   <p>` +
        //     category.name +
        //     `</p>
        //   </div>
        //   <div class="img">
        //   <img src="images/` +
        //     category.img +
        //     `" alt="" srcset="" />
        //   </div>
        // </a>`
        // );
        var categoriesblock = $("#categoriesblock");
        var category = jQuery("<a>",{class:"category"});
        var name = jQuery("<div>",{class:"name"});
        var p = jQuery("<p>",{class:"p"});
        p.innerText = item.name;
        var div_img = jQuery("<div>",{class:"img"});
        var img = jQuery("<img>",{src:"images/"+item.img});
        category.appendTo(categoriesblock);
        name.appendTo(category);
        p.appendTo(name);
        img.appendTo(category);
      });
    },
  });
}

function load_products() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getPopularProducts",
    },
    success: function (data) {
      data.forEach((product) => {
        $("#products_block").append(
          `<div class="product" data-id="` +
            product.id +
            `">
        <div class="img">
          <img src="images/` +
            product.img +
            `" alt="" />
        </div>
        <div class="desc">
          <div class="text">
            <p class="name">
              ` +
            product.name +
            `
            </p>
            <p class="price">` +
            product.price +
            ` ₽</p>
          </div>
          <div class="buy">
            <button class="button">
              <div class="content"><p>В корзину</p></div>
            </button>
            <div class="counter">
              <button class="button">
                <div class="content">
                  <svg
                    class="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <input value="1" type="number" data-max="` +
            product.countLeft +
            `" />
              <button class="button">
                <div class="content">
                  <svg
                    class="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>`
        );
      });
    },
  });
}

function load_discounts() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getDiscounts",
    },
    success: function (data) {
      data.forEach((discount) => {
        $("#promoblock").append(
          `<div class="promo" data-id="` +
            discount.id +
            `">
        <div class="img">
          <img src="images/` +
            discount.img +
            `" alt="" />
          <div class="promo_size">
            <p>-` +
            discount.size +
            `%</p>
          </div>
        </div>
        <div class="desc">
          <div class="text">
            <p class="name">
              ` +
            discount.name +
            `
            </p>
            <div class="price">
              <p class="today">` +
            Math.round(discount.price * (1 - discount.size * 0.01)) +
            ` ₽</p>
              <p class="last">` +
            discount.price +
            ` ₽</p>
            </div>
          </div>
          <div class="buy">
            <button class="button">
              <div class="content"><p>В корзину</p></div>
            </button>
            <div class="counter">
              <button class="button">
                <div class="content">
                  <svg
                    class="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <input value="1" type="number" data-max="` +
            discount.countLeft +
            `" />
              <button class="button">
                <div class="content">
                  <svg
                    class="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="parent"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>`
        );
      });
    },
  });
}

function load_comments() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getComments",
    },
    success: function (data) {
      data.forEach((cmnt) => {
        var comment = jQuery("<div>", { class: "comment" });
        var comment_content = jQuery("<div>", { class: "comment_content" });
        var head = jQuery("<div>", { class: "head" });
        var logo = jQuery("<img>", {
          class: "logo",
          src: "images/" + cmnt.profile.img,
        });
        var name = jQuery("<p>", {
          class: "name",
        });
        name.get()[0].innerText = cmnt.profile.name;

        var quote = jQuery("<img>", {
          class: "quote",
          src: "images/Quote.svg",
        });
        var text = jQuery("<p>", {
          class: "text",
        });
        text.get()[0].innerText = cmnt.comment.text;
        var date = jQuery("<p>", {
          class: "date",
        });
        date.get()[0].innerText = new Date(cmnt.comment.date).toLocaleString(
          "ru",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        comment.appendTo("#commentsblock");
        comment_content.appendTo(comment);
        head.appendTo(comment_content);
        logo.appendTo(head);
        name.appendTo(head);
        quote.appendTo(head);
        text.appendTo(comment_content);
        date.appendTo(comment);
      });
    },
  });
}

$(document).on("keypress", ".counter input", function (e) {
  if (e.key == "Enter") {
    $.ajax({
      url: "../php/api.php",
      method: "post",
      dataType: "json",
      data: {
        method: "addToShoppingCart",
        token: get_cookie("token"),
        productId:
          e.target.parentElement.parentElement.parentElement.parentElement
            .dataset.id,
        count: parseInt(e.target.value, 10),
      },
      success: function (cart_product) {
        load_shopping_cart_notification(
          cart_product.name,
          cart_product.price,
          cart_product.count,
          cart_product.image
        );
      },
    });
    e.target.parentElement.parentElement.classList.remove("counter_show");
    e.target.value = 1;
  }
});

function load_shopping_cart_notification(name, price, count, image) {
//   $("#notifications").append(
//     `<div class="shopping_cart_notification notification">
//   <div class="info">
//     <div class="product">
//       <img src="images/` +
//       image +
//       `" alt="" />
//       <div class="desc">
//         <div class="product_info">
//           <p class="name">
//             ` +
//       name +
//       `
//           </p>
//           <p class="price">` +
//       price +
//       ` ₽ x ` +
//       count +
//       ` шт.</p>
//         </div>
//         <a href="" class="get_to_cart"></a>
//       </div>
//     </div>
//   </div>
//   <button>
//     <img src="images/close.svg" alt="" />
//   </button>
// </div>`
//   );
      var notifications = $("#notifications");
      var shopping_cart_notification = jQuery("<div>",{class:"shopping_cart_notification notification"});
      var info = jQuery("<div>",{class : "info"});
      var product = jQuery("<div>",{class:"product"});
      var img = jQuery("<img>",{src:"images/"+image});
      var desc = jQuery("<div>",{class:"desc"});
      var product_info = jQuery("<div>",{class:"product_info"});
      var name = jQuery("<p>",{class:"name"});
      name.innerText = name;
      var price = jQuery("<p>",{class:"price"});
      price.innerText = price +" ₽ x " + count + " шт.";
      var get_to_cart = jQuery("<a>",{class:"get_to_cat"});
      var button = jQuery("<button>");
      var img_button = jQuery("<img>",{src:"images/close.svg"});

      shopping_cart_notification.appendTo(notifications);
      info.appendTo(shopping_cart_notification);
      button.appendTo(shopping_cart_notification);
      img_button.appendTo(button);
      product.appendTo(info);
      img.appendTo(product);
      desc.appendTo(product);
      product_info.appendTo(desc);
      name.appendTo(product_info);
      price.appendTo(product_info);
      get_to_cart.appendTo(desc);
  if ($("#notifications")[0].children.length > 5) {
    fadeout($("#notifications")[0].children[0], 0);
  }
}

$(document).on("click", "#slider_right", function () {
  var slider = $("#slider");
  slider.animate(
    {
      scrollLeft: document.getElementById("slider").getBoundingClientRect()
        .width,
    },
    300
  );
});
$(document).on("click", "#slider_left", function () {
  var slider = $("#slider");
  slider.animate(
    {
      scrollLeft: -document.getElementById("slider").getBoundingClientRect()
        .width,
    },
    300
  );
});
$(document).on("click", "#comments_left", function () {
  var slider = $("#commentsblock");
  var comment = document
    .getElementsByClassName("comment")[0]
    .getBoundingClientRect();
  var scrollvalue = 0;
  if (slider[0].scrollLeft >= comment.width) {
    scrollvalue = comment.width;
  } else {
    scrollvalue = slider[0].scrollLeft;
  }

  slider.animate(
    {
      scrollLeft: slider[0].scrollLeft - scrollvalue,
    },
    300
  );
});
$(document).on("click", "#comments_right", function () {
  var slider = $("#commentsblock");
  var comment = document
    .getElementsByClassName("comment")[0]
    .getBoundingClientRect();
  var scrollvalue = 0;
  if (
    slider[0].scrollWidth - (slider[0].scrollLeft + slider[0].clientWidth) >=
    comment.width
  ) {
    scrollvalue = comment.width;
  } else {
    scrollvalue =
      slider[0].scrollWidth - (slider[0].scrollLeft + slider[0].clientWidth);
  }
  slider.animate(
    {
      scrollLeft: slider[0].scrollLeft + scrollvalue,
    },
    300
  );
});

$(document).on("click", ".buy button.button", function (e) {
  e.currentTarget.parentElement.classList.add("counter_show");
});

$(document).on(
  "click",
  ".buy div.counter button.button:nth-of-type(1)",
  function (e) {
    var input = e.currentTarget.parentElement.getElementsByTagName("input")[0];
    var max = input.dataset.max;
    if (parseInt(input.value, 10) + 1 <= max) {
      input.value = parseInt(input.value, 10) + 1;
      $(input).change();
    }
  }
);

$(document).on(
  "click",
  ".buy div.counter button.button:nth-of-type(2)",
  function (e) {
    e.currentTarget.parentElement.getElementsByTagName("input")[0].value =
      parseInt(
        e.currentTarget.parentElement.getElementsByTagName("input")[0].value,
        10
      ) - 1;
    $(e.currentTarget.parentElement.getElementsByTagName("input")[0]).change();
  }
);

$(document).on("change", ".counter input", (e) => reset(e));

function reset(e) {
  if (e.target.value <= 0) {
    e.target.parentElement.parentElement.classList.remove("counter_show");
    e.target.value = 1;
  }
}

$("#slider_right").click(function () {
  $("#slider").scroll(100, 0);
});
