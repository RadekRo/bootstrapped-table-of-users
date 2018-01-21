const users = [
    {firstName: 'Tomasz', lastName: 'Doe', age: 23, city: 'London', id: 1},
    {firstName: 'Monika', lastName: 'Brosman', age: 35, city: 'Sosnowiec', id: 2},
    {firstName: 'Witek', lastName: 'Pitt', age: 40, city: 'Chicago', id: 3},
    {firstName: 'Kasia', lastName: 'Belucci', age: 15, city: 'Bruksela', id: 4}
];

const $table = $('<table class="table table-dark">').appendTo('body');

const getRowsWithUsers = () => {
    return users.map(user => {
        return $(`
        <tr>
            <td><input type="checkbox" class="user-cbx" data-id=${user.id}></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.city}</td>
            <td><button type="button" class="btn btn-danger remove-icon">x</button></td>
        </tr>
        `)
    })
};

$table.append(getRowsWithUsers());
$('tr').addClass('table-row');
$('td').addClass('table-cell');

const $userCbx = $('.user-cbx');

const exposeCheckedUserIDToConsoleLog = function() {
    $(this).prop('checked') ?
        console.log('Checked user id: ' + $(this).data('id')) :
        false ;
};

const $highlightSelectedRowOnMouseOver = function() {
    $(this).toggleClass('bg-primary')
};

const $removeSelectedUser = function() {
    $(this).closest('tr').remove()
};

$(document).on('change', '.user-cbx', exposeCheckedUserIDToConsoleLog);
$(document).on('mouseenter', 'tr', $highlightSelectedRowOnMouseOver);
$(document).on('mouseleave', 'tr', $highlightSelectedRowOnMouseOver);
$(document).on('click', '.remove-icon', $removeSelectedUser);

const $addUserForm = $(`
        <form>
        <div class="form-group row justify-content-around">
            <label for="form-first-name" class="col-1">Imię</label>
            <input type="text" class="form-control col-10" id="form-first-name" placeholder="Wpisz imię">
        </div>
        <div class="form-group row justify-content-around">
            <label for="form-last-name" class="col-1">Nazwisko</label>
            <input type="text" class="form-control col-10" id="form-last-name" placeholder="Wpisz nazwisko">
        </div>
        <div class="form-group row justify-content-around">
            <label for="form-age" class="col-1">Wiek</label>
            <input type="text" class="form-control col-10" id="form-age" placeholder="Wpisz wiek (tylko liczby)">
        </div>
        <div class="form-group row justify-content-around">
            <label for="form-city" class="col-1">Wybierz Miasto</label>
            <select class="form-control col-10" id="form-city">
                  <option>Gdańsk</option>
                  <option>New York</option>
                  <option>Washington</option>
                  <option>Paris</option>
                  <option>Berlin</option>
            </select>
        </div>
        <div class="form-group row justify-content-around">
            <button id="add-user-btn" class="btn btn-primary col-2" disabled>Dodaj użytkownika</button>
            <label for="add-user-btn" class="col-9">Uwaga! Musisz mieć ukończone 18 lat.</label>
        </div>
        </form>`);

$addUserForm.prependTo('body');

const $userAddButton = $('.btn-primary');
const $userAgeInput = $('#form-age');
const $minAge = 18;
const $firstName = $('#form-first-name');
const $lastName = $('#form-last-name');
const $age = $('#form-age');
const $city = $('#form-city');


const addNewUser = function() {
    event.preventDefault();
    users.push({
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        age: $age.val(),
        city: $city.val(),
        id: users.length + 1
    });
    $table.html(getRowsWithUsers());
}

const $toggleUserAddButtonActivation = function () {
    $userAgeInput.val() > $minAge && $firstName.val().length > 3 ?
    $userAddButton.prop('disabled', false) :
    $userAddButton.prop('disabled', true)
};

$userAddButton.on('click', addNewUser);
$userAgeInput.on('keyup', $toggleUserAddButtonActivation);
$firstName.on('keyup', $toggleUserAddButtonActivation);
