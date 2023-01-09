var today = new Date();
var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time+' '+date;

document.getElementById("Time_S").innerHTML = dateTime;

firebase
.database()
.ref("SLM")
.on("value", function (snap) {

  if (snap.val().print == 1){
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("Time_St").innerHTML = dateTime1;
  }

  (async() => {

    if (snap.val().control == 1){
      
      let value = snap.val().data;  
      let value1 = value.toFixed(1)

      value = value.toFixed(2);

      if(value - value1  == 0){
         value = value1;
      }

      if(value >= 1){
         value = 1;
      }
      
      console.log(value);

      document.getElementById("value").innerHTML = value;

      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];

      url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value.toString() + ".csv";
      let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
     
    for(let i = 2; i < 420; i++){
      const locale1 = "A"+i;
      const locale2 = "B"+i; 
      const locale3 = "C"+i;
      const locale4 = "D"+i; 

      data4[i-2] = workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
      data1[i-2] = workbook1.Sheets.Sheet1[locale1].v;      
      data2[i-2] = workbook1.Sheets.Sheet1[locale2].v;     
      data3[i-2] = workbook1.Sheets.Sheet1[locale3].v;       
    }

    // Define Data
    var data = [{x: data1, y: data4, mode:"lines"}];
    var datax1 = [{x: data2, y: data4, mode:"lines"}];
    var datax2 = [{x: data3, y: data4, mode:"lines"}];
    
    layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout2 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};

    Plotly.newPlot("myPlot3", data, layout);
    Plotly.newPlot("myPlot4", datax1, layout1);
    Plotly.newPlot("myPlot5", datax2, layout2);

  }})();
});
