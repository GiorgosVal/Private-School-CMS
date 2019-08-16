var deleteFunction = function (id) {
    let r = confirm('Do you really want to delete this Course?');
    if (r === true) {
        window.location.href = 'http://127.0.0.1:5500/deletecourse?id=' + id;
    }
}

$(document).ready(function () {
    var JSONPath = "https://api.myjson.com/bins/wke43";
    $.getJSON(JSONPath, function (result) {
        let html = "";
        $.each(result, function (objectKey) {
            let id = result[objectKey].id;
            let title = result[objectKey].title;
            let stream = result[objectKey].stream;
            let type = result[objectKey].type;
            let start = result[objectKey].start;
            let end = result[objectKey].end;
            html += '<tr>';
            html += '<th scope="row" hidden>' + id + '</th>';
            html += '<td>' + title + '</td>';
            html += '<td>' + stream + '</td>';
            html += '<td>' + type + '</td>';
            html += '<td>' + start + '</td>';
            html += '<td>' + end + '</td>';
            html += '<td><i class="far fa-edit fa-2x" data-toggle="modal"' +
                'data-target="#Modal" data-message="Edit Course"' +
                'data-id="' + id + '" data-title="' + title + '" data-stream="' + stream + '" ' +
                'data-type="' + type + '" data-start="' + start + '" data-end="' + end + '" ></i></td>';
            html += '<td><i class="far fa-minus-square fa-2x" onclick="deleteFunction(' + id + ')"></i></td></th>';
        });
        $('#tableBody').append(html);
    });


    $('#Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let message = button.data('message') // Extract info from data-* attributes
        var id = button.data('id');
        var title = button.data('title');
        var stream = button.data('stream');
        var type = button.data('type');
        var start = button.data('start');
        var end = button.data('end');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text(message);
        modal.find('.modal-body #id').val(id);
        modal.find('.modal-body #title').val(title);
        modal.find('.modal-body #stream').val(stream);
        modal.find('.modal-body #type').val(type);
        modal.find('.modal-body #start').val(start);
        modal.find('.modal-body #end').val(end);
        modal.find('.modal-body .btn-primary').text(message);
        if (message == "Edit Course") {
            $('#modalForm').attr('action', '/updatecourse');
        } else {
            $('#modalForm').attr('action', '/addcourse');
        }

    

    })

    $('#end').focus(function(){
        $(this).attr('min', $('#start').val())
        ;
    });

    $('#start').focus(function(){
        $(this).attr('max', $('#end').val())
        ;
    });
   

});











