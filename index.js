// Dom Element Selectors
var btn = document.querySelector("#sub-but");
var box = document.querySelector("#box");
var email,nam,date;
var notes = [];

// Note constructor
class Note{
    constructor(note,color,date,id){
        this.note = note;
        this.color = color;
        this.date = date;
        this.id = id}}

class Store{
    static addNote(title,note,txt){
                for(let i=0; i<localStorage.length; i++){
                    if(localStorage.key(i) === title){
                        this.updateNote(txt,title);
                       
                    return Ui.displayWarning(`Note "${title}" has been updated.`,'warning');   
                    }
                }
             Ui.displayWarning('New note has been saved!','success');
            localStorage.setItem(title,note);
            Ui.displayInfo();}

    static deleteNote(data,title){
        if(data !== 'x'){return}
        else if(data === 'x') {
            for(let i=0; i<localStorage.length; i++){
            if(localStorage.key(i) == title){
                localStorage.removeItem(title);
                Ui.displayInfo();
                Ui.displayWarning(`Note "${title}" has been deleted!`,'warning');
            }}}}

    static updateNote(note,item){
        let value = JSON.parse(localStorage.getItem(item));
        value.note += `<br><span style="font-weight:700; font-style:italic;">Update</span>: ${note}`;
        localStorage.setItem(item,JSON.stringify(value));
        Ui.displayInfo();
    }        
}
class Ui{

    static changeColor(color,item){
        let value = JSON.parse(localStorage.getItem(item));
        value.color = color;
        localStorage.setItem(item,JSON.stringify(value));
        this.displayInfo();
    }
    static changeSize(status,item){
        let value = JSON.parse(localStorage.getItem(item));
        value.id = status;
        localStorage.setItem(item,JSON.stringify(value));
        this.displayInfo();
    }
    static checkNote(value){
            // Deciding type of note
            let dots = value.split('').filter(e => e == '**');
            let dotSplit = value.split('**');
            let space = [];
            dotSplit.pop();
            notes = value;
           if(dots.length >= 2){
                notes = value+'.';
            }else{
                dotSplit.forEach(el => {
                     space+=(`${el}.<br>`);
                     notes = space;
                });}
            return notes;
    }

    static showJsx(color,title,note,date,id){
        return `<div  class="card text-white bg-${color} mb-3" style="width: 500px;">
        <div class="card-header">
        <span style="font-weight:700;">${title}</span>
        <div style="display:flex; justify-content:center;">
        <button  type="button" class="close" data-dismiss="alert"><i data-="closed" style="font-size:12px; padding: 0 0 6px 2px;" class="fas fa-minus"></i></button>
        <button  type="button" class="close" data-dismiss="alert"><i data-="open" style="font-size:12px; padding: 0 0 8px 2px;" class="far fa-square"></i></button>
        <button data-="x" type="button" class="close" data-dismiss="alert" style="padding-bottom:4px;">&times;</button>

        </div>
        </div>
        <div id="${id}" class="card-body"> <p style="font-weight:500;" class="card-text">${note}</p></div>
        <div id="card-footer" class="card-footer text-muted">${date} 
             <div>
            <span data-="danger" class="badge badge-pill badge-danger"> </span>
            <span data-="success" class="badge badge-pill badge-success"> </span>
            <span data-="info" class="badge badge-pill badge-info"> </span>
            <span data-="dark" class="badge badge-pill badge-dark"> </span>
            <span data-="warning" class="badge badge-pill badge-warning"> </span>
            </div> </div></div>`
    }
    static displayInfo(){
        box.innerHTML = '';
        for(let i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem(key));
            // Decide note type
            this.checkNote(value.note);
            // Show info
            box.innerHTML += this.showJsx(value.color,key,notes,value.date,value.id);
        }}

     static displayWarning(message,color){
        let warningBox = document.querySelector("#warning-box");
         warningBox.innerHTML =
        `<div class="alert alert-dismissible alert-${color}">
        <p class="mb-0">${message}</p> </div>`
        setTimeout(() => warningBox.innerHTML = '', 3000);}

    static clearFields(){
        document.querySelector("#title").value = '';
        document.querySelector("#note").value = '';
    }
   
}

// Event Listeners
document.querySelector("#noteForm").addEventListener("submit",(e) => {
    e.preventDefault()
    let title = document.querySelector("#title").value;
    let txt = document.querySelector("#note").value;
    let date = new Date().toLocaleDateString();
    let note = new Note(txt,'info',date,'closed');
    note = JSON.stringify(note);

    // Validation
    (title == '' || note == '') ? Ui.displayWarning('No inputs found!','danger'): Store.addNote(title,note,txt);
     
     Ui.clearFields();
})
document.addEventListener("DOMContentLoaded", Ui.displayInfo());
box.addEventListener("click", (e) => Store.deleteNote(e.target.getAttribute("data-"),
e.target.parentElement.previousElementSibling.textContent));
box.addEventListener("click", (e) => Ui.changeSize(e.target.getAttribute("data-"),
e.target.parentElement.parentElement.previousElementSibling.textContent));
box.addEventListener("click", (e) => Ui.changeColor(e.target.getAttribute("data-"),
e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.childNodes[1].textContent));


