(function ($) {
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    $("#login-form").submit(function (e) {
        e.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();
        const data = {
            email: email,
            password: password,
        };

        if (email && password) {
            $.ajax({
                url: "/admin/login/auth",
                type: "POST",
                data: data,
                success: function (data) {
                setCookie("token", data.token, 1); // 1 là hạn 1 ngày
                window.location.href = "/admin/dashboard/stats/open-api/openweathermap";
                },
                error: function () {
                    // Xử lý khi xác thực thất bại
                    alert("Đăng nhập thất bại!");
                },
            });
        }
    });
})(jQuery);
