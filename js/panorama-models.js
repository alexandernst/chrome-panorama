var DataModel = Backbone.Model.extend({
	initialize: function(){
		var tabs = this.get("tabs");
		if(tabs){
			this.tabs = new PanoramaCollection(tabs);
			this.unset("tabs");
		}
	}
});

var PanoramaCollection = Backbone.Collection.extend({
	chromeStorage: new Backbone.ChromeStorage("panorama", "local"),
	model: DataModel
});