function doOpts(div, key, value) {

	if(typeof div === 'undefined') {
		alert("ERROR: No div info for opts function");
		return {};
	}

	if(typeof key === 'undefined') {
		return jQuery.data(div);
	}

	if(typeof value === 'undefined') {
		var value = "";
	}

	return jQuery.data(div,  key,  value);
	
} //end-of opts

function getMonths(frame) {
	var data = $.ajax("months.json", { async : false });
	months = data.responseJSON.months;
	months.sort();
	months.reverse();
	switch( frame )
	{
		case "last12": 
			return months.slice(0, 12);
			break;
		case "last6":
			return months.slice(0, 6);
			break;
		case "last3":
			return months.slice(0, 3);
			break;
		case "previousYear":
			alert("Ups not implemented,  returning last 12 months");
			return months.slice(0, 12);
			break;
		default:
			return months.slice(0, 12);
	}
	var slice = months.slice(0,  qty);
	return slice;
} // end-of getMonths

function doChart(div, opts) {
  var staticsOverview = {
    init: function() {
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
        title: 'Your Chart Title' // param
      };

      var data = new google.visualization.DataTable(jsonData);

      var filter = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',                          
        'containerId': 'control1', //param
        'options': {                                              
          'filterColumnLabel': 'Month',
          'ui': {
            'labelStacking': 'vertical', 
            'allowTyping': false,
            'allowMultiple': true,
            'allowNone' : false,
            'label' : 'Month '
          }                
				},
				'state' : { 'selectedValues' : opts["filter"] }
      });

      var charttype = "";
      switch(opts["type"])
      {
        case "column":
          charttype = "ColumnChart";
          break;
        case "line":
          charttype = "LineChart";
          break;
        default:
          charttype = "LineChart";
      }

      var chartwrapper = new google.visualization.ChartWrapper({
        'chartType': charttype,
        'containerId': div,
        'options': {
        }
      });

      new google.visualization.Dashboard(div).
      bind(filter, chartwrapper).
      draw(data, options);

      return filter;
    },
  };
  staticsOverview.init();
} // end-of doChart
