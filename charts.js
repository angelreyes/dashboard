function doKpi(div, opts) {
	var staticsOverview = {
		init: function() {
			console.log("init drawing of chart: " + div + " opts: " + opts);
			this.drawChart();
		},
		myAlert: function (msg) {
			alert( "inside my alert: " + msg );
			console.log("inside my alert: " + msg);
		},
		drawChart: function () {
			var jsonData = $.ajax({
				url: "data.json",
				dataType:"json",
				async: false
			}).responseText;
			var options = {
				title: 'Your Chart Title'
			};
			var data = new google.visualization.DataTable(jsonData);
			switch(opts["type"])
			{
				case "column":
					var chart = new google.visualization.ColumnChart(div);
				break;
				case "line":
					var chart = new google.visualization.LineChart(div);
				break;
				default:
					var chart = new google.visualization.LineChart(div);
			}
			chart.draw(data, options);
		},
	};
	staticsOverview.init();
}
