var layout = {xaxis: {title: "X (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in x- direction"};
var layout1 = {xaxis: {title: "Y (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in y- direction"};
var layout2 = {xaxis: {title: "Z (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in z- direction"};

var demo = [{x: 0, y: 0, mode:"lines"}];

Plotly.newPlot("myPlot", demo, layout);
Plotly.newPlot("myPlot1", demo, layout1);  
Plotly.newPlot("myPlot2", demo, layout2);  

const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];

var data = [{x: data1, y: data4, mode:"lines"}];
var datax1 = [{x: data2, y: data4, mode:"lines"}];
var datax2 = [{x: data3, y: data4, mode:"lines"}];

let k = 0;
let s = 1;
let check = 1;

let url1 = '';


firebase
.database()
.ref("SLM")
.on("value", function(snap){if(snap.val().control == 2){
  // location.reload();
  var number = snap.val().section + 1;
  var layout = {xaxis: {title: "X (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in x- direction"};
  var layout1 = {xaxis: {title: "Y (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in y- direction"};
  var layout2 = {xaxis: {title: "Z (mm)"}, yaxis: {title: "Displacement"}, title: "Deformed shape in z- direction"};
  var demo = [{x: 0, y: 0, mode:"lines"}];
  Plotly.newPlot("myPlot", demo, layout);
  Plotly.newPlot("myPlot1", demo, layout1);  
  Plotly.newPlot("myPlot2", demo, layout2); 
  
  data1 = [];
  data2 = [];
  data3 = [];
  data4 = [];

  firebase
  .database()
  .ref("SLM")
  .update({section: number, control: 0, k: 1}) 
}})

firebase
.database()
.ref("SLM")
.on("value", function (snap) {
  (async() => {
        if (snap.val().control == 1){

            let value = snap.val().data;  
            value = value * 100;
            let value1 = Math.ceil(value);

            if(value1 >= 100){
               value1 = 100;
            }
  
            k = snap.val().k;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value1.toString() + ".csv";
          
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());

            function data_update(i){
                const locale1 = "A"+i;
                const locale2 = "B"+i; 
                const locale3 = "C"+i;
                const locale4 = "D"+i; 
                data4[i-1] =  Math.abs(workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale4].v.length-1));
                data1[i-1] =  workbook1.Sheets.Sheet1[locale1].v;      
                data2[i-1] =  workbook1.Sheets.Sheet1[locale2].v;     
                data3[i-1] =  workbook1.Sheets.Sheet1[locale3].v;       
            }

           function update(){
            console.log("aa");
             if (k<18011){
                s = s + 1;
                if(s%10==1){
                  firebase
                  .database()
                  .ref("SLM")
                  .on("value", function (snap) {
                     check = snap.val().control;
                     if(snap.val().k == 18010){
                        k = 18010;
                     }
                  })
                }

                if(check == 5){
                  firebase
                  .database()
                  .ref("SLM")
                  .update({k: k}) 
                }

                if(check == 1){
                  k = k+1;
                  if(k>18010){
                     k = 18010;
                  }
                  data_update(k);
                  Plotly.newPlot("myPlot", data, layout);
                  Plotly.newPlot("myPlot1", datax1, layout1);
                  Plotly.newPlot("myPlot2", datax2, layout2); 
                }
                if(check != 0){
                  requestAnimationFrame(update);
                }
           }}
            requestAnimationFrame(update);
}})();

if(snap.val().print == 1){
(async() => {
   
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

  Plotly.newPlot("myPlot", data, layout);
  Plotly.newPlot("myPlot1", datax1, layout1);
  Plotly.newPlot("myPlot2", datax2, layout2); 

})();}

}) 