function MyLibrary () {

	var LEVEL_CLASSES = {1: 'high', 2: 'medium', 3: 'low'};
	
	function renderItems(outerElement, items){
	    $(outerElement).empty();
		var doneButton = document.createElement('button');
		$(doneButton).text('x');
		$(doneButton).addClass('remove');
		$(doneButton).addClass('btn btn-default');
	    items.forEach(function(entry, i){
		    var listItem = document.createElement('li');
			$(listItem).text(entry['text']);
			$(listItem).wrapInner("<span class='label label-default " + LEVEL_CLASSES[entry['level']] + " '></span>");
			$(listItem).attr('id', entry['id']);
			$(listItem).addClass("list-group-item");
			$(listItem).append($(doneButton).clone(true));
		    $(outerElement).append(listItem);	
		});
	    
	
	}
	

	return {'renderItems': renderItems };
}


$(document).ready(function() {
	
	var myLib = MyLibrary();
	
	var clickabletext = $("#clickabletext");
	
	var socket = io();  
	
	$("#add").click( function() {
	    var txtinput = $("#someitemtext").val();
		var priority = $("#priority").val();
		$("#someitemtext").val('');
		
		socket.emit('todo item', {'text': txtinput, 'priority': priority });
		
		return false;  // needed or else default click behaviour may refresh page
	});
		
	$('#messages').on('click', '.remove', function(){
		
		socket.emit('removed id', $(this).parent().attr('id'));

		return false;
	
	});
	
    socket.on('todo list', function(list){
        console.log(list);
		myLib.renderItems('#messages', list);
    });
	    	
});