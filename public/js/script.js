function sendEdit(nameForm) {
    let form = document.querySelector(nameForm)
    form.submit()
}

$(function(){
    $(document).on('click','input[type=text]',function(){ this.select()})
});

tinymce.init({
    selector: 'textarea#article', 
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent'
  });
  