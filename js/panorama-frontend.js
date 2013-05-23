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

		//Attach the model to the view so we can get it later
		this.$el.find(":first").data("backbone-view", this);

		//If current view belongs to a window, then make the view droppable and resizable.
		//Else make it draggable.
		if(this.isWindow){
			//Set the tooltip information
			this.$el.find('.badge').tooltip({
				title: this.$el.find("#popup-data").html(),
				html: true,
				placement: "bottom"
			});

			//Make is resizable
			this.$el.find(".window").resizable();

			//Make it droppable
			this.$el.find(".window").droppable({
				drop: function(event, ui){
					//Get the model from the tab which the user just dropped
					var model = $(ui.draggable).data("backbone-view").model;
					console.log(model);
				}
			});
		}else{
			//Make it draggable
			this.$el.find(".tab").draggable();
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