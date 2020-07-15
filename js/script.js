window.addEventListener("load", start);

var ArrayNames = [];
var inputName = null;
var isEdit = false;
var currentId = null;

function start() {
    inputName = document.querySelector('#inputName');

    preventFormSubmit();
    activateInput();
    render();
}

//funcao para evitar o recarregamento da pagina
function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function handleTyping(event) {
        var keyPress = event.key;
        if (keyPress === "Enter") {
            var newName = event.target.value.trim();

            if (isEdit == false) {
                //Add no array
                if (newName || newName.trim() != "") {
                    ArrayNames.push(newName);
                }
            } else {
                ArrayNames[currentId] = newName;
                isEdit = false;
            }
            render();
            clearInput();
            return;
        }
    }

    inputName.addEventListener('keyup', handleTyping)
    inputName.focus();
}

function render() {
    function newButton(index) {
        function handleClickButton(event) {
            if (event.clientX) {
                ArrayNames.splice(index, 1);
                render();
                clearInput();
            }
        }
        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';

        button.addEventListener('click', handleClickButton);
        return button;
    }
    function newSpan(name, index) {
        function handleClickSpan() {
            inputName.value = name;
            currentId = index;
            isEdit = true;
            // console.log("editar");
        }
        var span = document.createElement('span');
        span.textContent = name;
        span.classList.add('clickable');
        span.addEventListener('click', handleClickSpan);
        return span;
    }
    var divNames = document.querySelector('.listNames');

    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for (var i = 0; i < ArrayNames.length; i++) {
        var currentName = ArrayNames[i];

        var li = document.createElement('li');
        var button = newButton(i);
        var span = newSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }

    divNames.appendChild(ul);

}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}