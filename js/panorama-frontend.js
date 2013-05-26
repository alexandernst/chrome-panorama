var windows_collection = new WindowsCollection();
var windows_collection_view = new WindowsCollectionView({
	collection: windows_collection
});

$(document).ready(function(){

	windows_collection.fetch({
		success: function(collection, response, options){
			windows_collection_view.render();
			$("#tree").html(windows_collection_view.el);
		}
	});

});