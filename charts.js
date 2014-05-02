function doKpi(div, opts) {
	var staticsOverview = {
		init: function() {
			console.log("init drawing of chart: " + div + " opts: " + opts);
			this.drawChart(div, opts);
		},
		myAlert: function (msg) {
			alert( "inside my alert: " + msg );
			console.log("inside my alert: " + msg);
		},
		drawChart: function (chartDiv, opts) {
			var jsonData = $.ajax({
				url: "data.json",
				dataType:"json",
				async: false
			}).responseText;
			var options = {
				title: 'Your Chart Title'
			};
			var data = new google.visualization.DataTable(jsonData);
			if(!("type" in opts)) { opts["type"] == undefined; }  
			switch(opts["type"])
			{
				case "column":
					var chart = new google.visualization.ColumnChart(chartDiv);
				break;
				case "line":
					var chart = new google.visualization.LineChart(chartDiv);
				break;
				default:
					var chart = new google.visualization.LineChart(chartDiv);
			}
			chart.draw(data, options);
		},
	};
	staticsOverview.init();
}
