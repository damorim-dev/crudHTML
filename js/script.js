window.addEventListener('load',start);

var globalnames = ['um','dois','tres'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start(){
    console.log("Pagina carregada com sucesso");
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInpute();
    render();
    
}

function preventFormSubmit(){
   function handleFormSubmit(event){
         event.preventDefault();
        }
    var form = document.querySelector('form');
    form.addEventListener('submit',handleFormSubmit);
}

function activateInpute(){
    function insertName(newName){
        globalnames.push(newName);
        render();
    }

    function updateName(newName){
        globalnames[currentIndex] = newName;
        render();
    }

    function handletyping(event){
        if (event.key === "Enter"){
            /*&& event.target.value.trim() !== ''*/
            if (event.target.value == ''){
                window.alert('Digite um nome');
                return;
            }
            if (isEditing){
                updateName(event.target.value);
            }
            else{
                insertName(event.target.value);
            }
            inputName = document.querySelector('#inputName');
             isEditing = false; 
             clearInput();        
        }
    }
    inputName.focus();
    inputName.addEventListener('keyup',handletyping);
}

function render(){
    function createDeleteButton(index){
        function deleteName(){
            globalnames.splice(index,1);
            render();
        }
        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';
        button.addEventListener('click',deleteName);
        return button;
    }

    function createSpan(name,index){
        function editName(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
            
        }
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click',editName);
        return span;
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML='';
    var ul = document.createElement('ul');
    for (var i = 0; i < globalnames.length;i++){
        var currentName = globalnames[i];
        var li = document.createElement('li');

        var button = createDeleteButton(i);

        var span = createSpan(currentName,i);
        
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }
    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value ='';
    inputName.focus();
}

