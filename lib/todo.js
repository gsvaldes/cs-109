var items = [];
var LEVEL_CLASSES = {1: 'high', 2: 'medium', 3: 'low'};
	
exports.addItem = function (content, priority){
	var item = {};
    item['text'] = content;
	item['level'] = priority;
	items.push(item);
	items.sort(function(a, b){
		return a.level-b.level;   
    });	
    items.forEach(function(item, i){
        item['id'] = 'item' + i;	
    });	

    return items;	
}

exports.removeItem = function (id){
	items = items.filter(function(item){
		return item.id !== id;
    });
	return items;
}

exports.items = function(){
    return items;
}