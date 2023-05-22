(function ($) {
  /**
   * @description UTILS FUNCTION
   */
  // suitable format for conversion dd/mm/yyyy
  function convertStringToDate(dateString) {
    const [day, month, year] = dateString.split("/");
    const isoDate = new Date(`${year}-${month}-${day}`);
    return isoDate;
  }
  // Convert
  let formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toISOString().substring(0, 16);
    return formattedDate;
  };

  /**
   * @description DATATABLE AREA
   */
  var dataTable = $("#example").DataTable({
    dom: "lBfrtip",
    buttons: [
      {
        className: "insert-btn",
        text: " <i class='fas fa-plus'></i> Thêm",
      },
      {
        extend: "collection",
        text: "<i class='fas fa-exchange-alt'></i> Chuyển",
        buttons: [
          {
            text: "Dữ liệu không khí</a>",
            action: function () {
              window.location.href = "/admin/management/env-data/stations/air";
            },
          },
        ],
      },
      {
        className: "open-file-modal",
        text: " <i class='fas fa-file-import'></i> Nhập",
      },
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
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "csv",
            text: "Định dạng CSV",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "excel",
            text: "Định dạng Excel",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // chỉ xuất các cột 0, 1, 3
            },
            title: "Dữ liệu môi trường",
          },
          {
            extend: "print",
            text: "In",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // chỉ xuất các cột 0, 1, 3
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
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      data: { actionType: "getAllData" },
      dataType: "json",
    },
    columns: [
      { data: "index", name: "STT" },
      { data: "_id", name: "Id" },
      { data: "address", name: "Địa chỉ" },
      { data: "state", name: "Tỉnh" },
      { data: "commune", name: "Xã" },
      { data: "latitude", name: "Latitude" },
      { data: "longitude", name: "Longitude" },
      { data: "date", name: "Ngày giờ" },
      { data: "tsp", name: "TSP" },
      { data: "so2", name: "SO2" },
      { data: "no2", name: "NO2" },
      { data: "aqi_tsp", name: "AQI-TSP" },
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
              <!-- EDIT BTN -->
              <span>
                <a href="#" class="text-info table-edit-btn" id="${row._id}">
                  <i class="fas fa-pencil-alt"></i>
                </a>
              </span>
              <!-- DELETE BTN -->
              <span>
                <a href="#" class="text-danger table-delete-btn" id="${row._id}">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </span>
            </div>
          `;
        },
      },
    ],
  });

  var insert_btn = $(".insert-btn");
  var table_action_modal = $("#table-action-modal");
  var form_action_modal = $("#form-action-modal");
  var table_modal_title = $("#tableModalTitle");
  var table_save_change = $(".modal-footer #tableSaveChange");
  var table_action_id = $("#actionId");
  var table_action_type = $("#actionType");

  var address_valid = $("#AdressValid");
  var state_valid = $("#StateValid");
  var commune_valid = $("#CommuneValid");
  var latitude_valid = $("#LatitudeValid");
  var longitude_valid = $("#LongitudeValid");
  var date_valid = $("#DateValid");
  var tsp_valid = $("#TspValid");
  var so2_valid = $("#So2Valid");
  var no2_valid = $("#No2Valid");

  // Edit action form is Insert Data
  insert_btn.click(function () {
    table_action_modal.modal("show");
    form_action_modal[0].reset();
    table_modal_title.html("Thêm dữ liệu");
    table_action_type.val("insertData"); // define action
    table_save_change.val("Thêm");
  });

  $("#example").on("click", ".table-edit-btn", function () {
    var targetId = $(this).attr("id");
    table_action_id.val(targetId);


    $.ajax({
      url: "/api/v1/stations/airs/" + targetId,
      type: "GET",
      dataType: "json",
      success: function (res) {
        table_action_modal.modal("show");
        table_action_type.val("updateDataById"); // define action
        table_modal_title.html("Sửa dữ liệu");
        table_save_change.val("Cập nhật");
        // lấy dữ liệu để truyền vào form
        address_valid.val(res.location.address);
        state_valid.val(res.location.state);
        commune_valid.val(res.location.commune);
        latitude_valid.val(res.location.latitude);
        longitude_valid.val(res.location.longitude);
        date_valid.val(formatDate(res.date.string_type));
        tsp_valid.val(res.tsp);
        so2_valid.val(res.so2);
        no2_valid.val(res.no2);
      },
    });
  });

  table_action_modal.on("hidden.bs.modal", function () {
    table_action_id.val("");
  });

  // Form Handler
  table_action_modal.on("submit", "#form-action-modal", function (event) {
    event.preventDefault();
    let actionData = {
      location: {
        address: address_valid.val(),
        state: state_valid.val(),
        commune: commune_valid.val(),
        latitude: latitude_valid.val(),
        longitude: longitude_valid.val(),
      },
      date: {
        string_type: date_valid.val(),
        date_type: date_valid.val(),
      },
      tsp: tsp_valid.val(),
      so2: so2_valid.val(),
      no2: no2_valid.val(),
    };

    // Nếu có id, nghĩa là thực hiện tính năng update
    if (table_action_id.val()) {
      // truyền thêm action id vào actionData
      actionData._id = table_action_id.val();
    }
    $.ajax({
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      dataType: "json",
      data: { actionData: actionData, actionType: table_action_type.val() },
      success: function (res) {
        event.preventDefault();
        form_action_modal[0].reset();
        table_action_modal.modal("toggle");
        if (actionType == "insertData") {
          Swal.fire(
            "Thêm thành công!",
            "Bản ghi đã được thêm vào CSDL",
            "success"
          );
        } else {
          Swal.fire(
            "Cập nhật thành công!",
            "Bản ghi đã được cập nhật vào CSDL",
            "success"
          );
        }
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
  });

  $("#example").on("click", ".table-delete-btn", function () {
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
          url: "/admin/management/env-data/stations/air/datatables",
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

  /**
   * @description SUB DATATABLE AREA
   */
  $(".sub-datatable").hide();
  var subDataTable = $("#sub-datatable").DataTable({
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
    // lengthMenu: [5, 10, 25, 50, 75, 100],
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
  });

  var file_modal_handler = $("#file-modal-handler");
  var file_input = $("#file_input");
  var show_sub_datatable = $("#show-sub-datatable");
  var select_sheet_wrapper = $(".select-sheet-wrapper");
  var sheet_select = $("#sheet-select");
  var table_sheet_select = $("#table-sheet-select");
  var open_file_modal = $(".open-file-modal");

  file_modal_handler.on("hidden.bs.modal", function () {
    file_input
      .siblings(".custom-file-label")
      .removeClass("selected")
      .html("Choose file");
  });

  // FILE IMPORT TO SUB-DATATABLE
  open_file_modal.click(function () {
    file_modal_handler.modal("show");
    // Chặn nút show subdatatable
    show_sub_datatable.prop("disabled", true);
    show_sub_datatable.css("cursor", "not-allowed");
    select_sheet_wrapper.hide();
    file_input.val(null);
    sheet_select.val(null);
  });

  show_sub_datatable.on("click", function (e) {
    let fileName = file_input.val().split("\\").pop();
    if (fileName == "") {
      Swal.fire({
        icon: "error",
        title: "File không được dể trống!",
        text: "Vui lòng nhập file!",
        footer: '<a href="">Hãy nhập lại file trước khi hiển thị</a>',
      });
    }
  });

  var workbook;
  // Khi người dùng chọn file
  file_input.change(function (event) {
    // Show file name
    let fileName = $(this).val().split("\\").pop();
    let fileExt = fileName.split(".").pop().toLowerCase();
    if (!fileExt) {
      $(this)
        .siblings(".custom-file-label")
        .removeClass("selected")
        .html("Choose file");
    } else {
      $(this)
        .siblings(".custom-file-label")
        .addClass("selected")
        .html(fileName);
    }

    if (fileExt === "xlsx") {
      show_sub_datatable.prop("disabled", false);
      show_sub_datatable.css("cursor", "pointer");
      // Check file type
      select_sheet_wrapper.show();
      // Đọc file Excel
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        workbook = XLSX.read(data, { type: "array" });
        // Đổi tên các sheet vào select option
        sheet_select.empty();
        $.each(workbook.SheetNames, function (index, sheetName) {
          sheet_select.append($("<option>").text(sheetName));
        });

        show_sub_datatable.on("click", function (e) {
          table_sheet_select.val("");
          file_modal_handler.modal("hide");
          $(".sub-datatable").show();
          var sheetToShow = sheet_select.val();
          displaySheetData(sheetToShow);
          $.each(workbook.SheetNames, function (index, sheetName) {
            table_sheet_select.append($("<option>").text(sheetName));
          });
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "File không được hỗ trợ!",
        text: "Định dạng phù hợp: xlxs, csv, json!",
        footer: '<a href="">Hãy nhập lại file</a>',
      });
    }
  });

  table_sheet_select.change(function (e) {
    displaySheetData($(this).val());
  });

  function displaySheetData(sheetName) {
    $(".sub-datatable").show();
    // Lấy dữ liệu của sheet
    var worksheet = workbook.Sheets[sheetName];
    var data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // xoá header của sheet
    var datarows = data.slice(1);
    // Xóa tất cả các dòng cũ trong subDataTable
    subDataTable.clear().draw();
    // Thêm các dòng mới vào subDataTable
    subDataTable.rows.add(datarows).draw();
  }

  $("#cancelSendData").click(function(e) {
    $(".sub-datatable").hide();
  });

  /**
   * @description INSERT DATA FROM SUBDATA TABLE
   */
  $("#sendData").click(function (e) {
    var rows = subDataTable.rows().data().toArray();

    // Map each row to a JSON object
    var data = rows.map(function (row) {
      return {
        location: {
          address: row[0],
          state: row[1],
          commune: row[2],
          latitude: row[3],
          longitude: row[4],
        },
        date: {
          string_type: convertStringToDate(row[5]),
          date_type: convertStringToDate(row[5]),
        },
        tsp: row[6],
        so2: row[7],
        no2: row[8],
      };
    });

    $.ajax({
      url: "/api/v1/stations/airs/bulk",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
      // Clean up duplicate records
      $.ajax({
        url: "/api/v1/delete-duplicates/collection/air",
        type: "DELETE",
        success: function (response) {
          Swal.fire(
            "Thêm thành công!",
            "Bản ghi đã được thêm vào CSDL",
            "success"
          );
          $(".sub-datatable").hide();
          dataTable.ajax.reload();
        },
      });
      },
      error: function (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi nhập dữ liệu từ file!",
        text: "Hãy nhập lại định dạng của file phù hợp: Ví dụ trường date: dd/mm/yyyy!",
        footer: '<a href="">Hãy nhập lại file</a>',
      });
      },
    });
  });
})(jQuery);
