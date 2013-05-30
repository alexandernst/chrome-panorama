PanoramaApp = new Backbone.Marionette.Application();
PanoramaApp.addRegions({
  mainRegion: "#main-content"
});

var windows_collection = new WindowsCollection();

PanoramaApp.addInitializer(function(options){
  var windows_collection_view = new WindowsCollectionView({
    collection: windows_collection
  });
  PanoramaApp.mainRegion.show(windows_collection_view);
});

$(document).ready(function(){

	PanoramaApp.start();
	windows_collection.fetch();

});