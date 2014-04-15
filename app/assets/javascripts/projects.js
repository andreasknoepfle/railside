// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
var codemirror = null;

var codemirror_options = {
        readOnly: true,
        lineNumbers: true,
        theme: "pastel-on-dark",
        matchBrackets:true,
        showTrailingSpace: true,
        keyMap: "sublime",
        tabSize: 2,
        undoDepth: 1000,
        autoCloseBrackets: true
     };

$(document).ready(function () {

  // Set the browser
  CodeMirror.commands.save = function() {
  	if($('#tabs li.active').data("path") && !codemirror.getDoc().isClean()) {  
  		data = {
  			_method:'PUT',
  			path: $('#tabs li.active').data("path"),
  			content: codemirror.getValue()
  		};
  		$.post("/file", data , function(data) {
  			if(data) {
  				codemirror.getDoc().markClean();
  				$('#tabs li.active a .dirty').html('');
  			}
  		} );
  	}

  };

  $(document).keydown(function(e) {
	    if ((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey))
	    {
	    	if(!codemirror.hasFocus()){
	    	  CodeMirror.commands.save();
	    	}
	        e.preventDefault();

	        return false;
	    }
	    if((e.which == '70') && (e.ctrlKey || e.metaKey)) {
	    	e.preventDefault(); 
	    	return false;
	    }
	    return true;
  });

  $('#ide-right').each( function(){
      codemirror = CodeMirror( this, codemirror_options
      );
      codemirror.on("change", function(instance,object) {
      	if(instance.getDoc().isClean()) {
      		$('#tabs li.active a .dirty').html('');
      	} else {
      		$('#tabs li.active a .dirty').html('*');
      	}
      });
    });

  $("#ide").splitter( {
    minAsize:250,
    maxAsize:500,
    splitVertical:true,
    A:$('#ide-left'),
    B:$('#ide-right'),
    closeableto:0
   });

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
