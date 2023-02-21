if (get_cookie("token") != null) {
  load_info();
} else {
  window.location.href = "index.html";
}

function load_info() {
  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: {
      method: "get_user_info",
      token: get_cookie("token"),
    },
    success: function (data) {
      if (data.name != null) {
        $("#lk_name").get()[0].value = data.name;
      }
      if (data.surname != null) {
        $("#lk_surname").get()[0].value = data.surname;
      }
      if (data.birthdate != null) {
        $("#lk_bdate").get()[0].value = data.birthdate;
      }
      if (data.phone != null) {
        $("#lk_phone").get()[0].value = data.phone;
        $("#lk_phone").parent().find("p.input_show").get()[0].innerText =
          string_to_tel(data.phone);
      }
      if (data.email != null) {
        $("#lk_email").get()[0].value = data.email;
      }
    },
  });
}

function string_to_tel(string) {
  if (string.length != 0) {
    var tel = "+ " + string[0];
    if (string.length >= 4) {
      tel += " (" + string.substring(1, 4) + ") ";
    } else {
      tel += string.substring(1, 4);
    }

    tel += string.substring(4, 7);
    if (string.length > 7) {
      tel += "-" + string.substring(7, 9);
    }
    if (string.length > 9) {
      tel += "-" + string.substring(9, 11);
    }

    return tel;
  } else {
    return "";
  }
}

$(document).on("input", "#lk_phone", function (e) {
  $($(e.currentTarget).get()[0].parentElement)
    .find("p.input_show")
    .get()[0].innerText = string_to_tel($(e.currentTarget).get()[0].value);
});

$(document).on("input", "#lk_email", function (e) {
  var alert = $(e.currentTarget).parent().parent().find("div.alert");
  if (check_email(e.currentTarget.value)==false) {
    if(alert.hasClass("show")==false){
    alert.addClass("show");
    }
  }
  else
  {
    if(alert.hasClass("show")==true){
      alert.removeClass("show");
      }
  }
});

function check_email(string)
{
  return /\w+@{1}\w+\.\w+/.test(string);
}

$(document).on('click','#save_changes',function ()
{

  data = new Object();

  data.method = "save_changes_lk";
  data.token = get_cookie("token");
  
  if($("#lk_name").get()[0].value!='')
  {
      data.name = $("#lk_name").get()[0].value;
  }

  if($("#lk_surname").get()[0].value!='')
  {
      data.surname = $("#lk_surname").get()[0].value;
  }

  if($("#lk_bdate").get()[0].value!='')
  {
      data.bdate = $("#lk_bdate").get()[0].value.toString();
  }

  if($("#lk_phone").get()[0].value!='')
  {
      data.phone = $("#lk_phone").get()[0].value;
  }

  if(check_email($("#lk_email").get()[0].value))
  {
      data.email = $("#lk_email").get()[0].value;
  }

  if($("#lk_password").get()[0].value!=''&&$("#lk_password").get()[0].value==$("#lk_confirm_password").get()[0].value)
  {
      data.newpassword = MD5($("#lk_password").get()[0].value);
  }

  $.ajax({
    url: "../php/api.php",
    method: "post",
    dataType: "json",
    data: data,
    success: function (data) 
    {
      window.location.reload();
    },
  });
});

$(document).on('input',"#lk_password,#lk_confirm_password",function()
{
  var alert = $("#lk_password").parent().parent().find("div.alert");
  if ($("#lk_password").get()[0].value != $("#lk_confirm_password").get()[0].value) {
    if(alert.hasClass("show")==false){
    alert.addClass("show");
    }
  }
  else
  {
    if(alert.hasClass("show")==true){
      alert.removeClass("show");
      }
  }
});
