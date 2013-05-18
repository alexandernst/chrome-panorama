$(document).ready(function(){
	$("#panorama-view").resizable({
		handles: "n, e, s, w, ne, se, sw, nw"
	});

	chrome.storage.onChanged.addListener(function(changes, namespace){
		showTabs();
	});

	showTabs();
});

var w_tpl = "" +
"<div style='border: 1px solid black;'>" +

"	<% _.each(tabs, function(tab){ %>" +

"		<div style='border: 1px solid blue';>" +
"			<%= tab.title %>" +
"		</div>" +

"	<% }); %>" +

"</div>";

function showTabs(){

	chrome.storage.local.get("tabs", function(data){

		_.each(data, function(w){

			$('#panorama-view').append(
				_.template(w_tpl, {
					tabs: _.first(w)
				})
			);

		});

	});

}