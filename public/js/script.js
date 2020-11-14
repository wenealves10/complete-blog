function sendEdit(nameForm) {
    let form = document.querySelector(nameForm)
    form.submit()
}

$(function(){
    $(document).on('click','input[type=text]',function(){ this.select()})
});