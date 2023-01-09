var layout = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: " 1850"};
var layout1 = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: " 1322"};
var layout2 = {xaxis: {title: "Time (s)"}, yaxis: {title: "Temperature (<sup>o</sup>C)"}, title: " 19299"};

var demo = [{x: 0, y: 0, mode:"lines"}];

Plotly.newPlot("myPlot", demo, layout);
Plotly.newPlot("myPlot1", demo, layout1);  
Plotly.newPlot("myPlot2", demo, layout2);  

firebase
.database()
.ref("SLM")
.on("value", function (snap) {

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

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
  
            let k=2;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value.toString() + ".csv";
          
            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());


           function data_update(k){
            for(let i = 2; i < k; i++){
                const locale1 = "A"+i;
                const locale2 = "B"+i; 
                const locale3 = "C"+i;
                const locale4 = "D"+i; 

                data4[i-2] = workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale2].v.length-1);
                data1[i-2] = workbook1.Sheets.Sheet1[locale1].v;      
                data2[i-2] = workbook1.Sheets.Sheet1[locale2].v;     
                data3[i-2] = workbook1.Sheets.Sheet1[locale3].v;       
            }}
  
            // Define Data
            var data = [{x: data1, y: data4, mode:"lines"}];
            var datax1 = [{x: data2, y: data4, mode:"lines"}];
            var datax2 = [{x: data3, y: data4, mode:"lines"}];

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