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
            value = value.toFixed(2);
            let value1 = Math.round( value );
            // if(value - value1  == 0){
            //    value = value1;
            // }

            if(value1 >= 100){
               value1 = 100;
            }
            
            console.log(value);

            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
  
            let k=1;

            url1 = 'https://raw.githubusercontent.com/lamtacta2/Forming/main/Data/data' + value1.toString() + ".csv";
          
            console.log(url1);

            let workbook1 = XLSX.read(await (await fetch(url1)).arrayBuffer());


           function data_update(k){
            for(let i = 1; i < k; i++){
                const locale1 = "A"+i;
                const locale2 = "B"+i; 
                const locale3 = "C"+i;
                const locale4 = "D"+i; 

                data4[i] = workbook1.Sheets.Sheet1[locale4].v.slice(1,workbook1.Sheets.Sheet1[locale4].v.length-1);
                data1[i] = workbook1.Sheets.Sheet1[locale1].v;      
                data2[i] = workbook1.Sheets.Sheet1[locale2].v;     
                data3[i] = workbook1.Sheets.Sheet1[locale3].v;       
            }}
  
            // Define Data
            var data = [{x: data1, y: data4, mode:"lines"}];
            var datax1 = [{x: data2, y: data4, mode:"lines"}];
            var datax2 = [{x: data3, y: data4, mode:"lines"}];

           function update(){

             if (k<18071){
                k = k+50;
                data_update(k);
                Plotly.newPlot("myPlot", data, layout);
                Plotly.newPlot("myPlot1", datax1, layout1);
                Plotly.newPlot("myPlot2", datax2, layout2); 
             requestAnimationFrame(update);
           }}
           requestAnimationFrame(update);}})(); }) 