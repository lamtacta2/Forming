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

      document.getElementById("value").innerHTML = value;

      value = value * 100;
      let value1 = Math.ceil(value);

      if(value1 >= 100){
         value1 = 100;
      }
      
      console.log(value1);

      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];

      url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value1.toString() + ".csv";
    
      console.log(url1);

      let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
    
    for(let i = 1; i < 18011; i++){
      const locale1 = "A"+i;
      const locale2 = "B"+i; 
      const locale3 = "C"+i;
      const locale4 = "D"+i;
      console.log()
      data1[i-1] = workbook1.Sheets.Sheet1[locale1].v;      
      data2[i-1] = workbook1.Sheets.Sheet1[locale2].v;     
      data3[i-1] = workbook1.Sheets.Sheet1[locale3].v;      
      data4[i-1] = workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale4].v.length-1);
       
    }

    // Define Data
    var data = [{x: data1, y: data4, mode:"lines"}];
    var datax1 = [{x: data2, y: data4, mode:"lines"}];
    var datax2 = [{x: data3, y: data4, mode:"lines"}];
    
    var layout = {xaxis: {title: "X"}, yaxis: {title: "Displacement"}, title: ""};
    var layout1 = {xaxis: {title: "Y"}, yaxis: {title: "Displacement"}, title: ""};
    var layout2 = {xaxis: {title: "Z"}, yaxis: {title: "Displacement"}, title: ""};

    Plotly.newPlot("myPlot3", data, layout);
    Plotly.newPlot("myPlot4", datax1, layout1);
    Plotly.newPlot("myPlot5", datax2, layout2);

  }})();
});
