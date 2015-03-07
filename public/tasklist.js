function MyLibrary () {

//    var items = [];
	var LEVEL_CLASSES = {1: 'high', 2: 'medium', 3: 'low'};
	
//	function addItem(content, priority){
//	    var item = {};
//		item['text'] = content;
//		item['level'] = priority;
//		items.push(item);
//		items.sort(function(a, b){
//		    return a.level-b.level;   
//        });	
//        items.forEach(function(item, i){
//            item['id'] = 'item' + i;	
//        });				    	
//	}
	
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
	
//	function removeItem(id){
//	    items = items.filter(function(item){
//		    return item.id !== id;
//			});
//	}
	

	return {'renderItems': renderItems };
}


$(document).ready(function() {
	
	var myLib = MyLibrary();
	
	var clickabletext = $("#clickabletext");
	
	var socket = io();  
	
	$("#add").click( function() {
	    var txtinput = $("#someitemtext").val();
		var priority = $("#priority").val();
		//myLib.addItem(txtinput, priority);
		//myLib.renderItems('#messages');
		$("#someitemtext").val('');
		
		socket.emit('todo item', {'text': txtinput, 'priority': priority });
		
		return false;  // needed or else default click behaviour may refresh page
	});
		
	$('#messages').on('click', '.remove', function(){
		//myLib.removeItem($(this).parent().attr('id'));
		//myLib.renderItems('#messages');
		
		socket.emit('removed id', $(this).parent().attr('id'));

		return false;
	
	});
	
    socket.on('todo list', function(list){
        console.log(list);
		myLib.renderItems('#messages', list);
    });
	    	
});