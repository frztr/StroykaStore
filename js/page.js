$("head").append('<script src="js/crypto.js"></script>');

function get_cookie(name) {
  var cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    var pair = cookies[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return null;
}

function load_cities() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "getCities",
    },
    success: function (data) {
      data.forEach((city) => {
        $("#cities").append(
          `<button data-id=` +
            city.id +
            ` class="city">
          <img src="images/right.svg" alt="" />
          <p>` +
            city.name +
            `</p>
        </button>`
        );
      });
    },
  });
}

if (get_cookie("cityId") == null) {
  document.cookie = "cityId=" + 1;
}

$(document).on(
  "click",
  ".locationchoose .content .cities button.city",
  function (e) {
    document.cookie = "cityId=" + e.currentTarget.dataset.id;
    if (get_cookie("token") != null) {
      $.ajax({
        url: "../php/api.php",
        method: "post",
        dataType: "json",
        data: {
          method: "update_location",
          cityId: get_cookie("cityId"),
          token: get_cookie("token"),
        },
        success: function (data) {},
      });
    }
  }
);

$(document).on("click", "#location", function () {
  $("#locationchoose").addClass("overflow_banner_show");
});

$(document).on("click", ".profile_button", function () {
  if(get_cookie("token")== null)
  {
    $("#signup").css("display", "none");
  $("#login").css("display", "flex");
    $("#auth_form").addClass("overflow_banner_show");
  }
  else
  {
    window.location.href="lk.html";
  }
});

$(document).on("click", ".overflow_banner_show", function (e) {
  var i = 0;
  $(e.currentTarget)
    .children()
    .get()
    .forEach((window) => {
      rect = window.getBoundingClientRect();
      if (
        e.clientX > rect.x &&
        e.clientX < rect.x + rect.width &&
        e.clientY > rect.y &&
        e.clientY < rect.y + rect.height
      ) {
        i++;
      }
    });

  if (i == 0) {
    $(e.currentTarget).removeClass("overflow_banner_show");
  }
});

function close_auth_form() {
  $(".overflow_banner_show").removeClass("overflow_banner_show");
}

$(document).on("input", "#search_location", function (e) {
  if (e.currentTarget.value.length != 0) {
    $.ajax({
      url: "../php/api.php",
      method: "post",
      dataType: "json",
      data: {
        method: "getCitiesByName",
        q: e.currentTarget.value,
      },
      success: function (data) {
        $("#cities").empty();
        data.forEach((city) => {
          $("#cities").append(
            `<button data-id=` +
              city.id +
              ` class="city">
          <img src="images/right.svg" alt="" />
          <p>` +
              city.name +
              `</p>
        </button>`
          );
        });
      },
    });
  } else {
    $("#cities").empty();
    load_cities();
  }
});

function load_header(element) {
  $(element).append(`<header class="headerblock">
    <div class="locationblock">
      <div class="blockcontent">
        <div class="header">
          <button id="location" class="location">
            <img src="images/Icon.svg" alt="" srcset="" />
            <p>Москва</p>
          </button>
          <div class="nav">
            <a href="brands.html">Бренды</a>
            <a href="delivery.html">Доставка</a>
            <a href="refund.html">Возврат</a>
            <a href="documentation.html">Документация</a>
            <a href="contacts.html">Контакты</a>
          </div>
        </div>
      </div>
    </div>
    <div class="blockcontent">
      <div class="header">
        <a href="index.html" class="logo">
          <img src="images/Logo.svg" alt="" srcset="" />
          <p>StroykaStore</p>
        </a>
        <div class="menu">
          <button class="button">
            <div class="content">
              <svg
                class="img"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 18L14.5 18"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 12L20.5 12"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 6L10.5 6"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Каталог</p>
            </div>
          </button>
          <div class="searching_div">
            <form class="search" autocomplete="off">
              <input
                type="text"
                name="search"
                id="search_input"
                placeholder="Поиск"
                autocomplete="off"
              />
              <button>
                <img src="images/Search.svg" alt="" />
              </button>
            </form>
            <div id="searching_list"></div>
          </div>
          <div class="lk">
            <button class="profile_button">
              <svg
                class="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p>Профиль</p>
            </button>
            <button>
              <svg
                class="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.5955 22 12 22C12.4045 22 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
                  stroke="parent"
                  stroke-width="2"
                  stroke-miterlimit="16"
                  stroke-linecap="round"
                />
                <path
                  d="M3.27002 6.96L12 12.01L20.73 6.96"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Заказы</p>
            </button>
            <button>
              <svg
                class="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="parent"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Корзина</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="header_nav_block">
      <div class="blockcontent">
        <div class="header_nav">
          <a href="">Акции</a>
          <a href="">Строительные материалы</a>
          <a href="">Керамическая плитка</a>
          <a href="">Краски</a>
          <a href="">Сантехника</a>
          <a href="">Напольные покрытия</a>
          <a href="">Инструменты</a>
          <a href="">Обои</a>
          <a href="">Окна</a>
        </div>
      </div>
    </div>
  <div id="locationchoose" class="overflow_banner">
      <div id="locationchoose_content" class="content">
        <p class="title">Выберите ваш город</p>
        <div class="search">
          <input type="text" name="" id="search_location" placeholder="Поиск" />
          <button>
            <img src="images/Search.svg" alt="" />
          </button>
        </div>
        <div id="cities" class="cities"></div>
        <script>
          load_cities();
        </script>
      </div>
    </div>`);
}

 function load_footer(element) {
  $(element).append(`<footer>
    <div class="blockcontent">
      <div class="footer_content">
        <div class="nav">
          <div class="feedback">
            <a href="" class="logo">
              <img src="images/Logo.svg" alt="" srcset="" />
              <p>StroykaStore</p>
            </a>
            <div class="contacts">
              <a href=""
                ><img src="images/Mail.svg" alt="" class="mark" />
                <p>info@stroykastore.ru</p></a
              >
              <a href=""
                ><img src="images/Location.svg" alt="" />
                <p>Москва, ул. Камушкина 10</p></a
              >
            </div>
          </div>
          <div class="links">
            <a href="lk.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Личный кабинет</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Каталог</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Стать продавцом</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Заказы</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Акции</p></a
            >
            <a href="delivery.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Доставка</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Избранное</p></a
            >
            <a href="brands.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Бренды</p></a
            >
            <a href="refund.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Возврат</p></a
            >
            <a href=""
              ><img src="images/rightW.svg" alt="" />
              <p>Корзина</p></a
            >
            <a href="contacts.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Контакты</p></a
            >
            <a href="documentation.html"
              ><img src="images/rightW.svg" alt="" />
              <p>Документация</p></a
            >
          </div>
        </div>
        <div class="credits">
          <p>© СтройкаСтор</p>
          <div class="logos">
            <img src="images/Visa.svg" alt="" srcset="" />
            <img src="images/Mastercard.svg" alt="" srcset="" />
            <img src="images/Maestro.svg" alt="" srcset="" />
            <img src="images/Mir.svg" alt="" srcset="" />
          </div>
          <p>Cделано в KRUGLOV STUDIO</p>
        </div>
      </div>
    </div>
  </footer>
  <div id="notifications" class="notifications">
      
  </div>
  <div id="auth_form" class="overflow_banner">
        <div id="login" class="login_form form">
          <p class="title">Вход</p>
          <div class="input_for">
            <p class="for">E-mail</p>
            <div class="input" ><input id="email_login" type="text" placeholder="youmail@mail.com"></div>
          </div>
          <div class="input_for">
            <p class="for">Пароль</p>
            <div class="input" ><input id="password_login" type="password" placeholder="****************"></div>
            <a href="">Забыли пароль?</a>
          </div>
          <div class="password_alert"><img src="images/alert-circle-outline.svg" alt="" srcset=""><p>Неверный логин/пароль.</p></div>
          <div class="buttons">
            <button class="button"><div class="content">
              <p>Войти</p>
            </div></button>
            <button class="button"><div class="content">
              <p>Создать учетную запись</p>
            </div></button>
          </div>
        </div>
        <div id="signup" class="signup_form form">
          <p class="title">Регистрация</p>
          <div class="inputs">
            <div class="input_for">
              <p class="for">Имя</p>
              <div class="input"><input id="name" placeholder="Богдан" type="text"></div>
            </div>
            <div class="input_for">
              <p class="for">E-mail</p>
              <div class="input"><input id="email" placeholder="youmail@mail.com" type="text"></div>
            </div>
            <div class="input_for">
              <p class="for">Новый пароль</p>
              <div class="input"><input id="password" placeholder="****************" type="password"></div>
            </div>
            <div class="input_for">
              <p class="for">Подтверждение пароля</p>
              <div class="input"><input id="password_verify" placeholder="****************" type="password"></div>
            </div>
          </div>
          <div class="password_alert"><img src="images/alert-circle-outline.svg" alt="" srcset=""><p>Пароли не совпадают.</p></div>
          <div class="buttons"><button class="button"><div class="content">
            <p>Зарегистрироваться</p>
          </div></button></div>
        </div>
    </div>`);
}


$(document).on("input", "#search_input", (e) => search(e));
$(document).on("focus", "#search_input", (e) => search(e));
function search(e) {
  if (e.currentTarget.value.toString().length >= 3) {
    if ($("#searching_list").hasClass("closed")) {
      $("#searching_list").removeClass("closed");
    }

    $("#searching_list").empty();
    $.ajax({
      url: "../php/api.php",
      method: "post",
      dataType: "json",
      data: {
        method: "get_search_results",
        q: e.currentTarget.value.toString(),
      },
      success: function (data) {
        if (data.categories.length != 0) {
          $("#searching_list").append(`<div class="title">
            <p>Категории</p>
          </div>`);
          data.categories.forEach((category) => {
            $("#searching_list").append(
              `
          <a href="" class="category_item">
          <p class="supercategory">` +
                category.supercategoryName +
                `</p>
          <p class="category">
            ` +
                category.categoryName +
                `
          </p>
        </a>`
            );
          });
        }
        if (data.products.length != 0) {
          $("#searching_list").append(`<div class="title">
            <p>Товары</p>
          </div>`);
          data.products.forEach((product) => {
            $("#searching_list").append(
              `
            <a href="" class="list_item">
            <div class="list_item_img"><img src="images/` +
                product.img +
                `" alt="" ></div>
            <div class="list_item_desc">
            <p class="desc">` +
                product.name +
                `</p>
            <p class="price">` +
                product.price +
                ` ₽</p>
            </div>
            </a>`
            );
          });
        }
      },
    });
  } else {
    if (!$("#searching_list").hasClass("closed")) {
      $("#searching_list").addClass("closed");
    }
  }
}
$(document).on("focusout", "#search_input", function (e) {
  if (!$("#searching_list").hasClass("closed")) {
    $("#searching_list").addClass("closed");
    $("#searching_list").empty();
  }
});

$(document).on("DOMNodeInserted", ".notification", (e) => {
  $(e.target.parentElement)[0].animate(
    [{ transform: "translateY(100px)" }, { transform: "translateY(0)" }],
    { duration: 300 }
  );
  show(e.target);
});

function show(target) {
  var x = target.animate(
    [
      { transform: "translateY(100%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    { duration: 300, easing: "ease" }
  );
  x.onfinish = () => {
    fadeout(target, 10000);
  };
}

function fadeout(target, delay) {
  var y = target.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-100%)", opacity: 0 },
    ],
    { duration: 300, delay: delay, easing: "ease" }
  );
  y.onfinish = () => {
    $(target).remove();
  };
}

$(document).on("click", ".notification button", function (e) {
  var animation1 = e.currentTarget.parentElement.animate(
    [
      { transform: "translateX(0)", opacity: 1 },
      { transform: "translateX(100%)", opacity: 0 },
    ],
    { duration: 300, easing: "ease" }
  );
  animation1.onfinish = () => {
    var animation2 = e.currentTarget.parentElement.animate(
      [
        { height: "100px", opacity: 0, margin: "0.25rem" },
        { height: "0px", opacity: 0, margin: "0" },
      ],
      { duration: 300, easing: "ease" }
    );
    animation2.onfinish = () => {
      e.currentTarget.parentElement.remove();
    };
  };
});

$(document).on("click", "#signup .buttons .button:nth-child(1)", function (e) {
  if ($("#password_verify").get()[0].value == $("#password").get()[0].value) {
    $.ajax({
      url: "../php/api.php",
      method: "post",
      dataType: "json",
      data: {
        method: "signup",
        name: $("#name").get()[0].value,
        password: MD5($("#password").get()[0].value),
        cityId: get_cookie("cityId"),
        email: $("#email").get()[0].value,
      },
      success: function (data) {
        if (data.error == null) {
          login($("#email").get()[0].value, $("#password").get()[0].value);
        } else {
          console.log(data.error);
        }
      },
    });
  } else {
    $("#signup div.password_alert").css('opacity',1).delay(4000).animate({opacity:0},{duration:1000,complete:function()
      {
        $("#signup div.password_alert").css('opacity',0);
      }});

  }
});

$(document).on("click", "#login .buttons .button:nth-child(2)", function (e) {
  var lwidth = $("#login").get()[0].scrollWidth;
  var lheight = $("#login").get()[0].scrollHeight;

  $("#login").css("display", "none");
  $("#signup").css("display", "flex");
  $("#signup p.title, #signup div.inputs, #signup div.buttons").css("opacity", 0);

  var width =
    $("#signup").get()[0].scrollWidth -
    $("#signup").css("padding").replace("px", "") * 2;
  var height =
    $("#signup").get()[0].scrollHeight -
    $("#signup").css("padding").replace("px", "") * 2;

  $("#signup").css("width", lwidth).css("height", lheight);
  $("#signup p.title, #signup div.inputs, #signup div.buttons").animate({ opacity: 1 }, { duration: 300 });
  $("#signup").animate({ width: width, height: height }, { duration: 300 });
});

function login(email, password) {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "login",
      email: email,
      password: MD5(password),
    },
    success: function (data) {
      if (data.error == null) {
        document.cookie = "token=" + data.token;
        close_auth_form();
      } else {
        $("#login div.password_alert").css('opacity',1).delay(4000).animate({opacity:0},{duration:1000,complete:function()
          {
            $("#login div.password_alert").css('opacity',0);
          }});
      }
    },
  });
}

$(document).on("click", "#login .buttons .button:nth-child(1)", function (e) {
  login($("#email_login").get()[0].value, $("#password_login").get()[0].value);
});

