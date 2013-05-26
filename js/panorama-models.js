var TabModel = Backbone.Model.extend({

});

var TabsCollection = Backbone.Collection.extend({
	chromeStorage: new Backbone.ChromeStorage("panorama", "local"),
	model: TabModel
});

var WindowModel = Backbone.Model.extend({
	initialize: function(){
		var tabs = new TabsCollection(this.get("tabs"));
		this.set("tabs", tabs);
	}
});

var WindowsCollection = Backbone.Collection.extend({
	chromeStorage: new Backbone.ChromeStorage("panorama", "local"),
	model: WindowModel
});