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
"<div class='w'>" +

"	<% _.each(tabs, function(tab){ %>" +

"		<div class='tab'>" +
"			<%= tab.title %>" +
"		</div><br>" +

"	<% }); %>" +

"</div>";

function showTabs(){

	chrome.storage.local.get("tabs", function(data){

		$('.w').remove();

		_.each(data, function(w){

			$('#panorama-view').append(
				_.template(w_tpl, {
					tabs: _.first(w)
				})
			);

		});

	});

}