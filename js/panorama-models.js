var TabModel = Backbone.Model.extend({

});

var TabsCollection = Backbone.Collection.extend({
	chromeStorage: new Backbone.ChromeStorage("panorama", "local"),
	model: TabModel	
});

var WindowModel = Backbone.Model.extend({
	initialize: function(){
		var tabs = this.get("tabs");
		if(tabs){
			this.tabs = new TabsCollection(tabs);
			this.unset("tabs");
		}
	}
});

var PanoramaCollection = Backbone.Collection.extend({
	chromeStorage: new Backbone.ChromeStorage("panorama", "local"),
	model: WindowModel
});