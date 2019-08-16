var deleteFunction = function (id) {
    let r = confirm('Do you really want to delete this Assignment?');
    if (r === true) {
        window.location.href = 'http://127.0.0.1:5500/deleteassignment?id=' + id;
    }
}



$(document).ready(function () {
    var coursesJSONPath = "https://api.myjson.com/bins/wke43";
    var JSONPath = "https://api.myjson.com/bins/10w8j3";
    $.when(
        $.getJSON(coursesJSONPath, function (result) {
            courses = result;
        }),
        $.getJSON(JSONPath, function (result) {
            assignments = result;
        })
    ).then(function () {
        let html = "";
        $.each(assignments, function (objectKey) {
            let id = assignments[objectKey].id;
            let title = assignments[objectKey].title;
            let descr = assignments[objectKey].descr;
            let subdate = assignments[objectKey].subdate;
            let co_id = assignments[objectKey].co_id;
            $.each(courses, function (objectKey) {
                if (courses[objectKey].id == co_id) {
                    course = courses[objectKey].title
                }
            });

            html += '<tr>';
            html += '<th scope="row" hidden>' + id + '</th>';
            html += '<td>' + title + '</td>';
            html += '<td>' + descr + '</td>';
            html += '<td>' + subdate + '</td>';
            html += '<td>' + course + '</td>';
            html += '<td><i class="far fa-edit fa-2x" data-toggle="modal"' +
                'data-target="#Modal" data-message="Edit Assignment"' +
                'data-id="' + id + '" data-title="' + title + '" data-descr="' + descr + '" ' +
                'data-subdate="' + subdate + '" data-course="' + course + '" data-co_id="' + co_id + '" ></i></td>';
            html += '<td><i class="far fa-minus-square fa-2x" onclick="deleteFunction(' + id + ')"></i></td></tr>';
        });
        $('#tableBody').append(html);

        $.each(courses, function (objectKey) {
            let html = '';
            html = '<option value="' + courses[objectKey].id + '">' + courses[objectKey].title + '</option>';
            $('form select').append(html);
        });


    });




    $('#Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        let message = button.data('message') // Extract info from data-* attributes
        var id = button.data('id');
        var title = button.data('title');
        var descr = button.data('descr');
        var subdate = button.data('subdate');
        var start = button.data('start');
        var end = button.data('end');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text(message);
        modal.find('.modal-body #id').val(id);
        modal.find('.modal-body #title').val(title);
        modal.find('.modal-body #descr').val(descr);
        modal.find('.modal-body #subdate').val(subdate);
        modal.find('.modal-body #course').val(course);
        modal.find('.modal-body .btn-primary').text(message);
        if (message == "Edit Assignment") {
            $('#modalForm').attr('action', '/updateassignment');
        } else {
            $('#modalForm').attr('action', '/addassignment');
        }
    })



// FUNCTION 1 για ενεργοποίηση τoy submission date

    $('body').on('change', '#course', function () {
        if ($(this).val() === "nocourse") {              
            $('#subdate').attr('disabled');
        } else {
            $('#subdate').removeAttr('disabled');
        }
    });
/*
FUNCTION 2
Αυτή η function είναι εναλλακτική της Function 1. Την έγραψα προσπαθώντας να λύσω το ότι
το onchange event δεν λειτουργεί 2η φορά (για να απενεργοποιηθεί ξανά το πεδίο της ημερομηνίας)

Με αυτη τη function το onchange event λειτουργεί, αλλά με κάποιο τρόπο επηρεάζει τη Function 3
και δεν λειτουργεί το validation.
- 
*/
    // $('body').on('change', '#course', function () {
    //     if ($(this).val() === "nocourse") {  
    //         let html = '<label for="subdate" class="col-form-label">Submission date:</label><input type="date" class="form-control" id="subdate" disabled></input>';
    //         $('#subdate-form').html("");
    //         $('#subdate-form').append(html);
    //     } else {
    //         let html = '<label for="subdate" class="col-form-label">Submission date:</label><input type="date" class="form-control" id="subdate"></input>';            
    //         $('#subdate-form').html("");
    //         $('#subdate-form').append(html);
    //     }
    // });


// FUNCTION 3: για τον έλεγχο της ημερομηνίας βάσει του επιλεγμένου course
    $('#subdate').focus(function () {
        let co_id = $('form select').val();
        $.each(courses, function (objectKey) {
            if (courses[objectKey].id == co_id) {
                let start = courses[objectKey].start;
                let end = courses[objectKey].end;
                $('#subdate').attr('min', start);
                $('#subdate').attr('max', end);
                console.log(start);
                console.log(end);
            }
        });
    });
    




});











