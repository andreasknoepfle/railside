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
        autoCloseBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
     };



$(document).ready(function () {



  CodeMirror.commands.autocomplete = function(cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.anyword);
  };

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


  $("#ide").splitter(
  	{
  		anchorToWindow: true,

  		sizeLeft: 250,
  		resizeToWidth : true
  	}
  );



});