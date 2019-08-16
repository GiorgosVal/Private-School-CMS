$(document).ready(function () {

    var studJSONPath = "https://api.myjson.com/bins/nlr57";

    // STUDENTS TABLE
    $("#stud").click(function () {

        $.getJSON(studJSONPath, function (result) {
            var data = result;
            console.log(result);

            $('#example').DataTable({
                data: data,
                columns: [
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'surname' },
                    { data: 'dob' },
                    { data: 'fees' }
                ],
                "columnDefs": [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false,
                    }
                ],
                destroy: true

            });
        });

        $("#studTable").toggleClass('display-no');


    });














});