var deleteFunction = function (id) {
    let r = confirm('Do you really want to delete this student?');
    if (r === true) {
        window.location.href = 'http://127.0.0.1:5500/deletestudent?id=' + id;
    }
}

$(document).ready(function () {
    var studJSONPath = "https://api.myjson.com/bins/117cwz";
    // old path https://api.myjson.com/bins/nlr57
    $.getJSON(studJSONPath, function (result) {
        let html = "";
        $.each(result, function (objectKey) {
            let id = result[objectKey].id;
            let name = result[objectKey].name;
            let surname = result[objectKey].surname;
            let dob = result[objectKey].dob;
            let fees = result[objectKey].fees;
            html += '<tr>';
            html += '<th scope="row" hidden>' + id + '</th>';
            html += '<td>' + name + '</td>';
            html += '<td>' + surname + '</td>';
            html += '<td>' + dob + '</td>';
            html += '<td>' + fees + '</td>';
            html += '<td><i class="far fa-edit fa-2x" data-toggle="modal"' +
                'data-target="#Modal" data-message="Edit Student"' +
                'data-id="' + id + '" data-name="' + name + '" data-surname="' + surname + '" data-dob="' + dob + '" data-fees="' + fees + '"></i></td>';
            html += '<td><i class="far fa-minus-square fa-2x" onclick="deleteFunction(' + id + ')"></i></td></tr>';
        });
        $('#tableBody').append(html);
    });


    $('#Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let message = button.data('message') // Extract info from data-* attributes
        var id = button.data('id');
        var name = button.data('name');
        var surname = button.data('surname');
        var dob = button.data('dob');
        var fees = button.data('fees');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text(message);
        modal.find('.modal-body #id').val(id);
        modal.find('.modal-body #name').val(name);
        modal.find('.modal-body #surname').val(surname);
        modal.find('.modal-body #dob').val(dob);
        modal.find('.modal-body #fees').val(fees);
        modal.find('.modal-body .btn-primary').text(message);
        if(message == "Edit Student") {
            $('#modalForm').attr('action', '/updatestudent' );
        } else {
            $('#modalForm').attr('action', '/addstudent' );
        }
      })


});




    
    





