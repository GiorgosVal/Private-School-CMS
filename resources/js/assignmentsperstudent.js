var deleteFunction = function (id) {
    let r = confirm('Do you really want to delete this Student for this Course?');
    if (r === true) {
        window.location.href = 'http://127.0.0.1:5500/deleteenrollmentl?id=' + id;
    }
}


// $(document).ready(function () {
//     var JSONPath = "https://api.myjson.com/bins/wke43";
//     $.getJSON(JSONPath, function (result) {
//         let html = "";
//         $.each(result, function (objectKey) {
//             let id = result[objectKey].id;
//             let title = result[objectKey].title;
//             html += '<option id="co' + id + '" value="' + id + '">' + title + '</option>';
//         });
//         $('#coursesShow').append(html);
//     });


    $('#coursesShow').change(function () {
        let coID = $(this).val();
        console.log(coID);
        $('#tableBody').text('');
        let html = '';
        
        var personnelJSONPath = "https://api.myjson.com/bins/169s77";
        $.getJSON(personnelJSONPath, function (result) {
            console.log(result);
            $.each(result, function (objectKey) {
                if (result[objectKey].co_id == coID) {
                    let pid = result[objectKey].id;
                    let id = result[objectKey].tr_id;
                    let name = result[objectKey].name;
                    let surname = result[objectKey].surname;
                    // let subject = result[objectKey].subject;
                    html += '<tr>';
                    html += '<th scope="row" hidden>' + id + '</th>';
                    html += '<td>' + name + '</td>';
                    html += '<td>' + surname + '</td>';
                    // html += '<td>' + subject + '</td>';
                    // html += '<td><i class="far fa-edit fa-2x" data-toggle="modal"' +
                    //     'data-target="#Modal" data-message="Edit Trainer"' +
                    //     'data-id="' + id + '" data-name="' + name + '" data-surname="' + surname + '" data-subject="' + subject + '" ></i></td>';
                    html += '<td><i class="far fa-minus-square fa-2x" onclick="deleteFunction(' + pid + ')"></i></td></tr>';
                }
            });
            $('#tableBody').append(html);
        });

        if ($('#coursesShow').val() == 0) {
            $('#addTrainer').empty();
                //alert(addTrainer.attr("class"));
        } else {
            let html = '<button type="button" id="add-btn" class="btn btn-success" data-toggle="modal" data-target="#Modal" data-message="Add this Student" data-course="'+coID+'"><i class="far fa-plus-square"></i> Add a new Student to this Course</button>';
            $('#addTrainer').html(html);
        }
    });


    $('#Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let message = button.data('message') // Extract info from data-* attributes
        var id = button.data('id');
        var name = button.data('name');
        var surname = button.data('surname');
        var subject = button.data('subject');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text(message);
        modal.find('.modal-body #id').val(id);
        modal.find('.modal-body #name').val(name);
        modal.find('.modal-body #surname').val(surname);
        // modal.find('.modal-body #subject').val(subject);
        modal.find('.modal-body .btn-primary').text(message);
        $('#modalForm').attr('action', '/addpersonnel');    // νομίζω πρέπει κάπως να βάζω το id του course
      })





    $('#end').focus(function () {
        $(this).attr('min', $('#start').val())
            ;
    });

    $('#start').focus(function () {
        $(this).attr('max', $('#end').val())
            ;
    });


});





