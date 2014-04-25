$(document).ready(function () {

    $("#ide-left").on('click',".folder > a", function (event) {
      if ($(this).siblings("ul").length != 0) {
        // Dont do a thing if tree is already loaded
        // Just make it toggleing
        $(this).siblings("ul").toggle();
        event.stopPropagation();
        event.preventDefault();
      }
      $(this).children("i").toggleClass("fa-folder-o fa-folder-open-o"); // do this everytime :)
    });

   $("#pin_file").on('click', function(event) {
   	  if($(this).parent().hasClass("active") && $(this).parent().data("name")) {
   	      newtab = $(this).parent().clone(true);
	   	  $("#tabs li").removeClass("active");
	   	  $("#tabs").append(newtab);
	      newtab.find("a").replaceWith(
            "<a href=\"#\">"+newtab.data("name")+
            "<span class=\"dirty\">" +
            (codemirror.getDoc().isClean() ? '' : '*') +
            "</span> "+
            "<i class=\"fa fa-times closex\"></i> </a>");
	      $(this).parent().data("name",null);
	      $(this).parent().data("document",null);
	      $(this).parent().data("path",null);
	      $(this).parent().find("a #editor_filename").html('');
          $(this).parent().find("a .dirty").html('');
   	  }
   	  event.preventDefault();
   });

   $("#tabs").on('click','li a', function(event) {
   	 if((!($(this).parent().hasClass("active"))) && $(this).parent().data("name")) {
   	 	$('#tabs li.active').data("document",codemirror.swapDoc($(this).parent().data("document")));

		$('#tabs li').removeClass('active');
		$(this).parent().addClass('active');
   	 }
   	 event.preventDefault();
   });

   $("#tabs").on('click','li a i.closex', function() {
     $(this).parent().parent().remove();
     if ($(this).parent().parent().hasClass("active")) {
       if($('#tabs li').first().data("document")) {
          codemirror.swapDoc($('#tabs li').first().data("document"));
          $('#tabs li').first().addClass('active');
       } else {
          codemirror.swapDoc(CodeMirror.Doc(""));
          codemirror.setOption("readOnly",true);
          $('#tabs li').first().addClass('active');
       }
     }

     event.preventDefault();
   });

});