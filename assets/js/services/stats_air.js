(function ($) {
    // Default ajax
    var location_choice = $("#location-choices");
    var daterange_choice = $("#daterange-choices");
    var year_choice = $("#year-choices");
    var measured_choice = $("#measured-choices");
    var month_choice = $("#month-choices");

    var sourceList = [];
    month_choice.parent().hide();

    // UTILS FUNCTION
    function measure_choice(item, type) {
        if (type == "measure") {
            if (measured_choice.val() == "tsp") {
                return item.tsp.value;
            }
            if (measured_choice.val() == "so2") {
                return item.so2.value;
            }
            if (measured_choice.val() == "no2") {
                return item.no2.value;
            }
        }
        if (type == "aqi") {
            if (measured_choice.val() == "tsp") {
                return item.tsp.aqi;
            }
            if (measured_choice.val() == "so2") {
                return item.so2.aqi;
            }
            if (measured_choice.val() == "no2") {
                return item.no2.aqi;
            }
        }
    }

    // BAR CHART
    var myBarChart = echarts.init(document.getElementById("e-basic-bar"));

    var baroption = {
        visualMap: {
            orient: "horizontal",
            left: "center",
            min: 0,
            max: 500,
            text: ["AQI max", "AQI min"],
            // Map the aqi column to color
            dimension: 0,
            inRange: {
                color: ["#00e400", "#ff0", "#ff7e00", "#f00", "#8f3f97", "#7e0023"],
            },
        },
        grid: { containLabel: true },
        xAxis: { name: "" },
        yAxis: {
            type: "category",
            sort: false, // Ngăn sắp xếp thứ tự trục y
        },
    };

    function barChartShow_avgAllLocationOfState_allMonthInYear() {
      $.ajax({
        url: `/api/v1/stations/airs/filter`,
        type: "GET",
        data: {
          fromdate: year_choice.val() + "-01-01",
          todate: year_choice.val() + "-12-31",
        },
        dataType: "json",
        success: function (res) {
          var listObject = res.reduce(function (accumulator, item) {
            var aqi_val = measure_choice(item, "aqi");
            var measured_val = measure_choice(item, "measure");
            var month = item.date.month;

            var existingMonth = accumulator.find(function (obj) {
              return obj.month === month;
            });

            if (existingMonth) {
              existingMonth.aqi_total += aqi_val;
              existingMonth.measured_total += measured_val;
              existingMonth.count++;
            } else {
              accumulator.push({
                aqi_total: aqi_val,
                measured_total: measured_val,
                month: month,
                count: 1,
              });
            }

            return accumulator;
          }, []);

          listObject.forEach(function (item) {
            item.aqi_avg = item.aqi_total / item.count;
            item.measured_avg = item.measured_total / item.count;
            delete item.aqi_total;
            delete item.measured_total;
            delete item.count;
          });

          var sourceList = listObject.map(function (obj) {
            return [obj.aqi_avg, obj.measured_avg, obj.month];
          });

          sourceList.unshift(["aqi", "measured_val", "month"]);

          myBarChart.setOption({
            dataset: {
              source: sourceList,
            },
            series: [
              {
                type: "bar",
                encode: {
                  x: "measured_val",
                  y: "month",
                },
              },
            ],
            ...baroption,
          });
        },
      });
    }

    function barChartShow_eachLocationOfState_allMonthInYear() {
      $.ajax({
        url: `/api/v1/stations/airs/filter`,
        type: "GET",
        data: {
          fromdate: year_choice.val() + "-01-01",
          todate: year_choice.val() + "-12-31",
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        },
        dataType: "json",
        success: function (res) {
          var sourceList = res.map(function (item) {
            var aqi_val = measure_choice(item, "aqi");
            var measured_val = measure_choice(item, "measure");
            var month = "Tháng " + item.date.month;

            return [aqi_val, measured_val, month];
          });

          sourceList.unshift(["aqi", "measured_val", "month"]);

          myBarChart.setOption({
            dataset: {
              source: sourceList,
            },
            series: [
              {
                type: "bar",
                encode: {
                  x: "measured_val",
                  y: "month",
                },
              },
            ],
            ...baroption,
          });
        },
      });
    }

    function barChartShow_avgAllLocationOfState_allDayInMonth() {
      $.ajax({
        url: `/api/v1/stations/airs/filter`,
        type: "GET",
        data: {
          fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
          todate: year_choice.val() + "-" + month_choice.val() + "-31",
        },
        dataType: "json",
        success: function (res) {
          var listObject = res.reduce(function (accumulator, item) {
            var aqi_val = measure_choice(item, "aqi");
            var measured_val = measure_choice(item, "measure");
            var day = item.date.day;

            var existingDay = accumulator.find(function (obj) {
              return obj.day === day;
            });

            if (existingDay) {
              existingDay.aqi_total += aqi_val;
              existingDay.measured_total += measured_val;
              existingDay.count++;
            } else {
              accumulator.push({
                aqi_total: aqi_val,
                measured_total: measured_val,
                day: day,
                count: 1,
              });
            }

            return accumulator;
          }, []);

          listObject.forEach(function (item) {
            item.aqi_avg = item.aqi_total / item.count;
            item.measured_avg = item.measured_total / item.count;
            delete item.aqi_total;
            delete item.measured_total;
            delete item.count;
          });

          var sourceList = listObject.map(function (obj) {
            return [obj.aqi_avg, obj.measured_avg, obj.day];
          });

          sourceList.unshift(["aqi", "measured_val", "day"]);

          myBarChart.setOption({
            dataset: {
              source: sourceList,
            },
            series: [
              {
                type: "bar",
                encode: {
                  x: "measured_val",
                  y: "day",
                },
              },
            ],
            ...baroption,
          });
        },
      });
    }

    function barChartShow_eachLocationOfState_allDayInMonth() {
      $.ajax({
        url: `/api/v1/stations/airs/filter`,
        type: "GET",
        data: {
          fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
          todate: year_choice.val() + "-" + month_choice.val() + "-31",
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        },
        dataType: "json",
        success: function (res) {
          var sourceList = res.map(function (item) {
            var aqi_val = measure_choice(item, "aqi");
            var measured_val = measure_choice(item, "measure");
            var day = "Ngày " + item.date.day;

            return [aqi_val, measured_val, day];
          });

          sourceList.unshift(["aqi", "measured_val", "day"]);

          myBarChart.setOption({
            dataset: {
              source: sourceList,
            },
            series: [
              {
                type: "bar",
                encode: {
                  x: "measured_val",
                  y: "day",
                },
              },
            ],
            ...baroption,
          });
        },
      });
    }

    // Default chart when component loaded
    if (location_choice && year_choice && measured_choice && daterange_choice) {
        barChartShow_avgAllLocationOfState_allMonthInYear();
    }

    // Handle logic
    $("#location-choices, #year-choices, #measured-choices, #daterange-choices").change(function () {
        // Thực hiện hành động khi một thẻ select thay đổi
        var location_choice_val = location_choice.val();
        var daterange_choice_val = daterange_choice.val();

        // Gọi hàm hoặc thực hiện các hành động khác tại đây
        if (daterange_choice_val == "all_month_in_year") {
            // ui-logic
            location_choice.parent().removeClass("col-md-4");
            location_choice.parent().addClass("col-md-6");
            month_choice.parent().hide();

            // Handle event
            if (location_choice_val == "avg_all_location_in_state") {
              barChartShow_avgAllLocationOfState_allMonthInYear();
            } else {
              barChartShow_eachLocationOfState_allMonthInYear();
            }
        }

        if (daterange_choice_val == "all_day_in_month") {
          // ui-logic
          location_choice.parent().removeClass("col-md-6");
          location_choice.parent().addClass("col-md-4");
          month_choice.parent().show();

          // Handle event
          if (location_choice_val == "avg_all_location_in_state") {
            barChartShow_avgAllLocationOfState_allDayInMonth();
          } else {
            barChartShow_eachLocationOfState_allDayInMonth();
          }
        }
    });

    month_choice.change(function () {
        if (location_choice.val() == "avg_all_location_in_state") {
          barChartShow_avgAllLocationOfState_allDayInMonth();
        } else {
          barChartShow_eachLocationOfState_allDayInMonth();
        }
    });

    $(window).on("resize", function () {
        if (myBarChart != null && myBarChart != undefined) {
            myBarChart.resize();
        }
    });
})(jQuery);
