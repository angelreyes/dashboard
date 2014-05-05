function getObjWhenPropertyEquals(parentObj, prop,  val){
  // from http://stackoverflow.com/questions/12946353/javascript-find-object-in-array-by-value-and-append-additional-value
  // by Matt Stone
  for (var i = 0,  l = parentObj.length; i < l; i++) {
    // check the obj has the property before comparing it
    if (typeof parentObj[i][prop] === 'undefined') continue;

    // if the obj property equals our test value return the obj
    if (parentObj[i][prop] === val) return parentObj[i];
  }

  // didn't find an object with the property
  return false;
} //end-of getObjWhenPropertyEquals

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
} //end-of doOpts

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

    drawChart: function () {

      var jsonData = $.ajax({
        url: opts.source, //"data.json",
      dataType:"json",
      async: false
      }).responseText;

      var data = new google.visualization.DataTable(jsonData);

      var filter = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',                          
          'containerId': opts.control, //param
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
          'state' : { 'selectedValues' : opts.filter }
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
            'title': opts.title
          }
      });

      new google.visualization.Dashboard(opts.dash).
        bind(filter, chartwrapper).
        draw(data);

      return filter;
    }, //end-of drawChart
  };
  staticsOverview.init();
} // end-of doChart
