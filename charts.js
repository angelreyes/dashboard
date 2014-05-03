function doKpi(div, opts) {
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
        }
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
}
