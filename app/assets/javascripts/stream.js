var es = null;

function event_processor (event) {
	data = null;
	if(!event.data) {
		return;
	} else {
		data = eval(event.data);
		if(data == "ping") return;
	}
	console.log(event.data);

	added = data["added"];
	modified = data["modified"];
	removed = data["removed"];

	if(added) {
		$(added).each(function (file) {
			console.log(file);
		});
	}


}

function init_event_source() {
	if( $(".project").length != 0 ) {
  	if($(".project").data("path")) {
  		es= new EventSource('/file/listen?path='+encodeURIComponent($(".project").data("path")));
		$(es).data("path",$(".project").data("path") );
	  	es.onmessage = function(e) {
	  		if(  $(".project").length != 0  && $(".project").data("path") == $(es).data("path")) {
	    		event_processor(event);
	    	}
	  	};
  	}
  }
}

//$(document).on("page:load",function () {
//	init_event_source();
//});

$(document).ready( function() {
	init_event_source();
});
