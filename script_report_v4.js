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
      value = value.toFixed(2);

      document.getElementById("value").innerHTML = value;

      if(value >= 1){
         value = 1;
      }

      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];
      const data5 = [];
      const data6 = [];

      url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value.toString() + ".csv";
      url2 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data1' + value.toString() + ".csv";
      url3 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data2' + value.toString() + ".csv";
      
      let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
      let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
      let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());

    for(let i = 2; i < 420; i++){
      const locale1 = "A"+i;
      const locale2 = "B"+i; 

      data1[i-2] = workbook1.Sheets.Sheet1[locale2].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
      data2[i-2] = workbook2.Sheets.Sheet1[locale2].v.slice(1,workbook2.Sheets.Sheet1[locale2].v.length-1);
      data3[i-2] = workbook3.Sheets.Sheet1[locale2].v.slice(1,workbook3.Sheets.Sheet1[locale2].v.length-1);

      data4[i-2] = workbook1.Sheets.Sheet1[locale1].v;
      data5[i-2] = workbook2.Sheets.Sheet1[locale1].v;
      data6[i-2] = workbook3.Sheets.Sheet1[locale1].v;
    }

    // Define Data
    var data = [{x: data4, y: data1, mode:"lines"}];
    var datax1 = [{x: data5, y: data2, mode:"lines"}];
    var datax2 = [{x: data6, y: data3, mode:"lines"}];
    
    layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};
    layout2 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}};

    Plotly.newPlot("myPlot3", data, layout);
    Plotly.newPlot("myPlot4", datax1, layout1);
    Plotly.newPlot("myPlot5", datax2, layout2);

  }})();
});
