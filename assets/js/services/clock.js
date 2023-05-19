(function ($) {
    function updateTime() {
    var now = new Date();

    var dateElement = $("#date");
    dateElement.text(now.toLocaleDateString());

    var timeElement = $("#time");
    timeElement.text(
        now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        })
    );
    }

    setInterval(updateTime, 1000);
})(jQuery);
