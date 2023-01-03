var layout = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 1850"};
var layout1 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 1322"};
var layout2 = {xaxis: {title: "time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: "Clab 19299"};

var demo = [{x: 0, y: 0, mode:"lines"}];

Plotly.newPlot("myPlot", demo, layout);
Plotly.newPlot("myPlot1", demo, layout1);  
Plotly.newPlot("myPlot2", demo, layout2);  

firebase
.database()
.ref("Forming")
.on("value", function (snap) {

  (async() => {

        if (snap.val().control == 1){

            let value = snap.val().data;  

            value = value.toFixed(2);

            if(value >= 1){
               value = 1;
            }

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const data5 = [];
            const data6 = [];
  
            let k=2;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/SLM/main/Data/data' + value.toString() + ".csv";
            url2 = 'https://raw.githubusercontent.com/lamtacta2/SLM/main/Data/data1' + value.toString() + ".csv";
            url3 = 'https://raw.githubusercontent.com/lamtacta2/SLM/main/Data/data2' + value.toString() + ".csv";
            
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());
            let workbook2 = XLSX.read(await (await fetch(url2)).arrayBuffer());
            let workbook3 = XLSX.read(await (await fetch(url3)).arrayBuffer());

           function data_update(k){
            for(let i = 2; i < k; i++){
                const locale1 = "A"+i;
                const locale2 = "B"+i; 

                data1[i-2] = workbook1.Sheets.Sheet1[locale2].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
                data2[i-2] = workbook2.Sheets.Sheet1[locale2].v.slice(1,workbook2.Sheets.Sheet1[locale2].v.length-1);
                data3[i-2] = workbook3.Sheets.Sheet1[locale2].v.slice(1,workbook3.Sheets.Sheet1[locale2].v.length-1);

                data4[i-2] = workbook1.Sheets.Sheet1[locale1].v;
                data5[i-2] = workbook2.Sheets.Sheet1[locale1].v;
                data6[i-2] = workbook3.Sheets.Sheet1[locale1].v;
           
            }}
  
            // Define Data
            var data = [{x: data4, y: data1, mode:"lines"}];
            var datax1 = [{x: data5, y: data2, mode:"lines"}];
            var datax2 = [{x: data6, y: data3, mode:"lines"}];

           function update(){

             if (k<420){
                k = k+1;
             if (k < 420){data_update(k);}
                Plotly.newPlot("myPlot", data, layout);
                Plotly.newPlot("myPlot1", datax1, layout1);
                Plotly.newPlot("myPlot2", datax2, layout2); 
             requestAnimationFrame(update);

           }}
           requestAnimationFrame(update);}})(); }) 