document.getElementById("section2").style.display = "none";
document.getElementById("section3").style.display = "none";

firebase
.database()
.ref("SLM")
.on("value", function (snap) {
  if(snap.val().section%3 == 1 ){
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_1").innerHTML = dateTime;
  } else if(snap.val().section%3 == 2){
    document.getElementById("section2").style.display = "block";
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_2").innerHTML = dateTime;
  } else {
    document.getElementById("section3").style.display = "block";
    var today = new Date();
    var date = today.getDate() + '/' +(today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+' '+date;
    document.getElementById("S_3").innerHTML = dateTime;
  }

  if (snap.val().print == 1 || snap.val().control == 3){
    if(snap.val().section%3 == 1){
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_1").innerHTML = dateTime1;
  } else if(snap.val().section%3 == 2){
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_2").innerHTML = dateTime1;
  } else {
    var today1 = new Date();
    var date1 = today1.getDate() + '/' +(today1.getMonth()+1)+'/'+ today1.getFullYear();
    var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    var dateTime1 = time1+' '+date1;
    document.getElementById("ST_3").innerHTML = dateTime1;
  }

    firebase
    .database()
    .ref("SLM")
    .update({print: 0, control: 0}) 
  }

  (async() => {

    if (snap.val().control == 1){
      
      let value = snap.val().data;  

      value = value * 100;
      let value1 = Math.ceil(value);

      if(value1 >= 100){
         value1 = 100;
      }

      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];

      url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value1.toString() + ".csv";

      let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
    
    for(let i = 1; i < 18011; i++){
      const locale1 = "A"+i;
      const locale2 = "B"+i; 
      const locale3 = "C"+i;
      const locale4 = "D"+i;
      data1[i-1] = workbook1.Sheets.Sheet1[locale1].v;      
      data2[i-1] = workbook1.Sheets.Sheet1[locale2].v;     
      data3[i-1] = workbook1.Sheets.Sheet1[locale3].v;      
      data4[i-1] = Math.abs(workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale4].v.length-1));
    }

    // Define Data
    var data = [{x: data1, y: data4, mode:"lines"}];
    var datax1 = [{x: data2, y: data4, mode:"lines"}];
    var datax2 = [{x: data3, y: data4, mode:"lines"}];
    
    var layout = {xaxis: {title: "X (mm)"}, yaxis: {title: "Displacement"}};
    var layout1 = {xaxis: {title: "Y (mm)"}, yaxis: {title: "Displacement"}};
    var layout2 = {xaxis: {title: "Z (mm)"}, yaxis: {title: "Displacement"}};

    if(snap.val().section%3 == 1){
      document.getElementById("V_1").innerHTML = value;
      Plotly.newPlot("myPlot1_3", data, layout);
      Plotly.newPlot("myPlot1_4", datax1, layout1);
      Plotly.newPlot("myPlot1_5", datax2, layout2);
    } else if(snap.val().section%3 == 2){
      document.getElementById("V_2").innerHTML = value;
      Plotly.newPlot("myPlot2_3", data, layout);
      Plotly.newPlot("myPlot2_4", datax1, layout1);
      Plotly.newPlot("myPlot2_5", datax2, layout2);
    } else {
      document.getElementById("V_3").innerHTML = value;
      Plotly.newPlot("myPlot3_3", data, layout);
      Plotly.newPlot("myPlot3_4", datax1, layout1);
      Plotly.newPlot("myPlot3_5", datax2, layout2);
    }

  }})();
});
