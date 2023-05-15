(function ($) {
  /**
   * @description UTILS FUNCTION
   */
  
  /**
   * @description DATATABLE AREA
   */
  var dataTable = $("#example").DataTable({
    dom: "lBfrtip",
    buttons: [
      {
        extend: "collection",
        text: "<i class='fas fa-file-export'></i> Xuất",
        buttons: [
          {
            extend: "copy",
            text: "Sao chép",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "csv",
            text: "Định dạng CSV",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "excel",
            text: "Định dạng Excel",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "print",
            text: "In",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
        ],
      },
    ],
    responsive: true,
    processing: true,
    serverSide: true,
    searching: true,
    searchDelay: 800,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    order: [],
    language: {
      search: "",
      searchPlaceholder: "Tìm kiếm",
      processing: "Đang xử lý...",
      lengthMenu: "Hiển thị _MENU_ bản ghi trên mỗi trang",
      zeroRecords: "Không tìm thấy dữ liệu",
      info: "Hiển thị trang _PAGE_ của _PAGES_",
      infoEmpty: "Không có dữ liệu để hiển thị",
      infoFiltered: "(được lọc từ _MAX_ bản ghi)",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp theo",
        previous: "Trước",
      },
    },

    ajax: {
      url: "/admin/management/env-data/open-api/openweathermap/datatables",
      type: "POST",
      data: { actionType: "getAllData" },
      dataType: "json",
    },
    columns: [
      { data: "index", name: "STT" },
      { data: "_id", name: "Id" },
      { data: "district_city", name: "Quận" },
      { data: "latitude", name: "Latitude" },
      { data: "longitude", name: "Longitude" },
      { data: "date", name: "Ngày giờ" },
      { data: "o3", name: "O3" },
      { data: "pm2_5", name: "PM2.5" },
      { data: "pm10", name: "PM10" },
      { data: "co", name: "CO" },
      { data: "so2", name: "SO2" },
      { data: "no2", name: "NO2" },
      { data: "aqi_o3", name: "AQI-O3" },
      { data: "aqi_pm2_5", name: "AQI-PM2.5" },
      { data: "aqi_pm10", name: "AQI-PM10" },
      { data: "aqi_co", name: "AQI-CO" },
      { data: "aqi_so2", name: "AQI-SO2" },
      { data: "aqi_no2", name: "AQI-NO2" },
      {
        // Thêm cột "Action"
        orderable: false,
        data: null,
        name: "Hành Động",
        render: function (data, type, row) {
          return `
            <div class="d-flex justify-content-center">
              <!-- DELETE BTN -->
              <span>
                <a href="#" class="text-danger table-only-delete-btn" id="${row._id}">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </span>
            </div>
          `;
        },
      },
    ],
  });

  $("#example").on("click", ".table-only-delete-btn", function () {
    var targetId = $(this).attr("id");
    // sweetalert2
    Swal.fire({
      title: "Xác nhận xoá",
      text: "Bản ghi sẽ bị xoá và không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f64e60",
      cancelButtonColor: "#1e3d73",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/admin/management/env-data/open-api/openweathermap/datatables",
          type: "POST",
          data: { actionId: targetId, actionType: "delDataById" },
          dataType: "json",
          success: function (res) {
            Swal.fire(
              "Xoá thành công!",
              "Bản ghi đã được xoá khỏi CSDL",
              "success"
            );
            dataTable.ajax.reload();
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
      } else {
        return false;
      }
    });
  });
})(jQuery);
