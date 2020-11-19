function sendEdit(nameForm) {
    let form = document.querySelector(nameForm)
    form.submit()
}

$(function(){
    $(document).on('click','input[type=text]',function(){ this.select()})
});

Holder.addTheme('thumb', {
  bg: '#55595c',
  fg: '#eceeef',
  text: 'Imagens'
});

tinymce.init({
    selector: '#article',
    language:'pt_BR',
    plugins: [
      'advlist autolink link image lists charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'table emoticons template paste help'
    ],
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image | print preview media fullpage | ' +
      'forecolor backcolor emoticons',
    menubar: 'favs file edit view insert format tools table help',
    content_css: 'css/content.css',
  });