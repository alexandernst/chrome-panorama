var TabView = Backbone.Marionette.CompositeView.extend({
	template: "#tab-template",

	onRender: function() {
		//Attach the model to the view so we can get it later
		this.$el.find(":first").data("backbone-view", this);

		//Make it draggable.
		this.$el.draggable();
	}
});

var TabsCollectionView = Backbone.Marionette.CollectionView.extend({
	tagName: "div",
	itemView: TabView
});

var WindowView = Backbone.Marionette.CompositeView.extend({
	template: "#window-template",

	initialize: function(){
		this.tabs_view = new TabsCollectionView({
			collection: this.model.get("tabs")
		});
	},
	
	appendHtml: function(cv, iv){
		cv.$("#tabs").append(iv.el);
	},

	onRender: function() {
		//Render the tabs collection
		this.tabs_view.render();
		this.appendHtml(this, this.tabs_view);

		//Attach the model to the view so we can get it later
		this.$el.find(":first").data("backbone-view", this);

		//Make is resizable
		this.$el.find(".window").resizable();

		//Make it droppable
		var self = this;
		this.$el.find(".window").droppable({
			drop: function(event, ui){

				/*

				//Get the model from the tab which the user just dropped
				var model = $(ui.draggable).data("backbone-view").model;

				//Search and remove tab from old collection
				_.each(pnrm_data.models, function(window){
					if(!_.isUndefined(window.tabs.get(model))){
						window.tabs.remove(model);
					}
				});

				//Add tab to new collection
				self.collection.add(model);

				//Save data to storage
				//pnrm_data.sync(); // <-- avoid boilerplate
				var new_pnrm_data = [];
				_.each(pnrm_data.models, function(window){
					var w_data = {};
					_.extend(w_data, window.toJSON());
					w_data.tabs = window.tabs.toJSON();
					new_pnrm_data.push(w_data);
				});
				chrome.storage.local.set({
					'panorama': new_pnrm_data
				});

				*/

			}
		});

	}
});

var WindowsCollectionView = Backbone.Marionette.CollectionView.extend({
	tagName: "div",
	itemView: WindowView
});