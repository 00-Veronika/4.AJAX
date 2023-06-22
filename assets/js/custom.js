$(function() {
    // Imitates loading data
    var initialDelay = 500;
    setTimeout(loadData, initialDelay);

    var form = $('form')[0];
    form.addEventListener('submit', handleSubmit);
})

function handleSubmit(event) {
    event.preventDefault();

    var result = null;
    var idValue = $('#id').val();

    if (idValue.length > 0) {
        var toInt = parseInt(idValue);
        var result = isNaN(toInt) ? 'invalid' : toInt;
    }

    loadData(result);
}

function loadData(id) {
    var msg;
    var spinner = $('.loading')[0];
    var table = $('table')[0];

    var tbodyWrapper = $("#userInfo");
    var tbody = tbodyWrapper[0];

    var error = $('.error')[0];
    error.style.display = 'none';

    var url = 'https://old.blacatzacademy.com/api/users';

    if (id) {
        if (id === 'invalid') {
            msg = 'Invalid search expression!';
            hideTable(error, table, msg);
            return;
        } else {
            url += '?id=' + id;
        }
    }

    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            if (result && result.length === 0) {
                msg = 'No results!';
                hideTable(error, table, msg);
                return;
            }

            spinner.style.display = 'none';
            table.style.display = 'inline-table';
            tbodyWrapper.empty();

            populateTable(result);
        },
        error: function (err) {
            msg = 'Unexpected error!';
            hideTable(error, table, msg);
        }
    });

    function hideTable(error, table, msg) {
        table.style.display = 'none';
        error.style.display = 'flex';
        error.textContent = msg;
    }

    function populateTable(users) {
        users.forEach((user, index) => {
            let row = tbody.insertRow();

            let id = row.insertCell(0);
            id.innerHTML = user.id;

            let name = row.insertCell(1);
            name.innerHTML = user.name;

            let lastName = row.insertCell(2);
            lastName.innerHTML = user.lastName;

            let age = row.insertCell(3);
            age.innerHTML = user.age;

            let salary = row.insertCell(4);
            salary.innerHTML = user.salary;

            if (index == users.length - 1) {
                let rowCount = tbody.insertRow();
                let count = rowCount.insertCell(0);

                count.className = 'resultRow';
                count.colSpan = 5;
                count.innerHTML = 'Results: <span id="resultCount">' + users.length + '</span>';
            }
        });
    }
}