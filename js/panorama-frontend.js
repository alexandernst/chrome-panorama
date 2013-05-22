var DataView = Backbone.Marionette.CompositeView.extend({
	
	initialize: function(){
		if(this.model.tabs){
			this.isWindow = true;
			this.template = "#window-template";
		}else{
			this.isWindow = false;
			this.template = "#tab-template";
		}
		this.collection = this.model.tabs;
	},
	
	appendHtml: function(cv, iv){
		cv.$("#tabs").append(iv.el);
	},

	onRender: function() {

		if(_.isUndefined(this.collection)){
			this.$("#tabs").remove();
		}

		if(this.isWindow){
			var w_data = this.model.get("window");
			this.$el.find('.badge').tooltip({
				title: function(){
					var w_info = "<div style='text-align: left;'>";
					_.each(w_data, function(v, k){
						w_info += k + ": " + v + "<br>";
					});
					w_info += "</div>"
					return w_info;
				},
				html: true,
				placement: "bottom"
			});

			this.$el.find(".window").resizable();
		}

	}
});

var PanoramaView = Backbone.Marionette.CollectionView.extend({
	tagName: "div",
	itemView: DataView
});

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
	model: DataModel
});

var pnrm_data = new PanoramaCollection();
var pnrm_view = new PanoramaView({
	collection: pnrm_data
});

function renderData(){
	chrome.storage.local.get("panorama", function(data){
		data = data.panorama;
		pnrm_data.reset(data);
	});
}

$(document).ready(function(){
	pnrm_view.render();
	$("#tree").html(pnrm_view.el);

	renderData();

	chrome.storage.onChanged.addListener(function(changes, namespace){
		renderData();
	});
});