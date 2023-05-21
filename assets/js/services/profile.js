(function ($) {
  $("#user-update-info").submit(function (event) {
    event.preventDefault();
    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const password = $("#password").val();

    const data = {
      fullname: fullname,
      email: email,
      password: password,
    };

    $.ajax({
      url: "/admin/config/profile-update",
      type: "PUT",
      data: data,
      success: function (data) {
        Swal.fire(
          "Cập nhật thành công!",
          "Tài khoản của bạn đã được cập nhật",
          "success"
        );
      },
      error: function (xhr, status, error) {
        Swal.fire({
          icon: "error",
          title: status,
          text: error,
          footer: '<a href="">Hãy nhập lại thông tin chính xác!</a>',
        });
      },
    });
  });
})(jQuery);
