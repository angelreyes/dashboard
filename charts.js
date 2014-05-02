function doStats(div) {

	var staticsOverview = {

		init: function() {
			console.log("init");
			this.drawChart(div);
		},

		myAlert: function () {
			alert( "inside my alert" );
			console.log("inside my alert" );
		},

		drawChart: function (chartDiv) {

			var jsonData = $.ajax({
				url: "data.json",
				dataType:"json",
				async: false
			}).responseText;

			var options = {
			title: 'Your Chart Title'
			};

			var data = new google.visualization.DataTable(jsonData);

			var chart = new google.visualization.LineChart(chartDiv);

			chart.draw(data, options);
		},

	};

	staticsOverview.init();
}
