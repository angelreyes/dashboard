function doStats() {

	var staticsOverview = {

		init: function() {
			console.log("init");
			//google.load("visualization", "1", {packages: ["corechart"]});
			//google.setOnLoadCallback(this.drawChart());
			this.drawChart();
		},

		myAlert: function () {
			alert( "inside my alert" );
			console.log("inside my alert" );
		},

		drawChart: function drawChart() {

			var jsonData = $.ajax({
				url: "data.json",
				dataType:"json",
				async: false
			}).responseText;

			var options = {
			title: 'Your Chart Title'
			};

			this.myAlert();

			var data = new google.visualization.DataTable(jsonData);

			var chart = new google.visualization.LineChart(document.getElementById('chart'));
			chart.draw(data, options);
		},

	};

	staticsOverview.init();
}
