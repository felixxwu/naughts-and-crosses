function ajax(callback) {
    $.ajax({
        url: "react/ajax",
        type: "get",
        data: {
            func: "test",
            args: ["arg1", "arg2"]
        }
    })
    .done(function (response) {
        callback(response);
    })
    .fail(function (xhr) {
        console.log(xhr);
    });
}