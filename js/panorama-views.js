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
			var self = this;
			this.$el.find(".window").droppable({
				drop: function(event, ui){
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