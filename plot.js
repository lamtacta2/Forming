document.getElementById("MP").onclick = function plot_all(){
  (
      async() => {

          const data1 = [];
          const data2 = [];
          const data3 = [];
          const labelsa = [];

          const data4 = [];
          const data5 = [];
          const data6 = [];
          const labelsb = [];

          let k=2;
          
          let workbook = XLSX.read(await (await fetch("./data.csv")).arrayBuffer());
          console.log(workbook);
          const name = [workbook.Sheets.Sheet1.A1.v, workbook.Sheets.Sheet1.B1.v, workbook.Sheets.Sheet1.C1.v];
          console.log(name);

          for(let i = 1; i < 1978; i++){

            const locale4 = "A"+i;
            const locale5 = "B"+i;
            const locale6 = "C"+i;

            data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
            data5[i-1] = workbook.Sheets.Sheet1[locale5].v.slice(1,workbook.Sheets.Sheet1[locale5].v.length-1);
            data6[i-1] = workbook.Sheets.Sheet1[locale6].v.slice(1,workbook.Sheets.Sheet1[locale6].v.length-1);

            labelsb[i] = i;
        }

        // Define Data
        var datax = [
          {x: labelsb, y: data4, mode:"lines", name: name[0]},
          {x: labelsb, y: data5, mode:"lines", name: name[1]},
          {x: labelsb, y: data6, mode:"lines", name: name[2]}
        ];

        //Define Layout
        var layoutx = {title: "Melt Prediction"};

        // Display using Plotly
        Plotly.newPlot("myPlot", datax, layoutx);
   
         function data_update(k){
          for(let i = 2; i < k; i++){
   
              const locale1 = "A"+i;
              const locale2 = "B"+i;
              const locale3 = "C"+i;
   
              data1[i-2] = workbook.Sheets.Sheet1[locale1].v.slice(1,workbook.Sheets.Sheet1[locale1].v.length-1);
              data2[i-2] = workbook.Sheets.Sheet1[locale2].v.slice(1,workbook.Sheets.Sheet1[locale2].v.length-1);
              data3[i-2] = workbook.Sheets.Sheet1[locale3].v.slice(1,workbook.Sheets.Sheet1[locale3].v.length-1);
   
              labelsa[i-2] = i-2;   
          }}
   
          // Define Data
          var data = [
            {x: labelsa, y: data1, mode:"lines", name: name[0]},
            {x: labelsa, y: data2, mode:"lines", name: name[1]},
            {x: labelsa, y: data3, mode:"lines", name: name[2]}
          ];
   
          //Define Layout
          var layout = {title: "Melt Prediction"};
   
          // Display using Plotly
          Plotly.newPlot("myPlot1", data, layout);
   
         function update(){
           if (k<1978){
            k = k+1
           }

           if (k < 1978){data_update(k);}
           Plotly.animate('myPlot1', {
             data: data
           },
           {layout:{
             xaxis: {range: [labelsa[k]-100, labelsa[k]]},
           }},
           {
             transition: {
               duration: 0,
             },
             frame: {
               duration: 0,
               redraw: true,
             }
           });
           requestAnimationFrame(update);
         }
         requestAnimationFrame(update);
   })();
}

document.getElementById("PP").onclick = function plot_PP(){
  (
      async() => {

          const data1 = [];
          const data2 = [];

          const data4 = [];
          const data5 = [];

          let k=2;
          
          let workbook = XLSX.read(await (await fetch("./data1.csv")).arrayBuffer());

          for(let i = 1; i < 1978; i++){

            const locale4 = "A"+i;
            const locale5 = "B"+i;

            data4[i-1] = workbook.Sheets.Sheet1[locale4].v.slice(1,workbook.Sheets.Sheet1[locale4].v.length-1);
            data5[i-1] = workbook.Sheets.Sheet1[locale5].v;
        }

        // Define Data
        var datax = [
          {x: data4, y: data5, mode:"lines", name: "PP"}
        ];

        //Define Layout
        var layoutx = {title: "Point Prediction"};

        // Display using Plotly
        Plotly.newPlot("myPlot", datax, layoutx);
   
         function data_update(k){
          for(let i = 2; i < k; i++){
   
              const locale1 = "A"+i;
              const locale2 = "B"+i;
   
              data1[i-2] = workbook.Sheets.Sheet1[locale1].v.slice(1,workbook.Sheets.Sheet1[locale1].v.length-1);
              data2[i-2] = workbook.Sheets.Sheet1[locale2].v;

          }}
   
          // Define Data
          var data = [
            {x: data1, y: data2, mode:"lines", name: "PP"}
          ];
   
          //Define Layout
          var layout = {title: "Point Prediction"};
   
          // Display using Plotly
          Plotly.newPlot("myPlot1", data, layout);
   
         function update(){
           if (k<1978){
            k = k+1
           }

           if (k < 1978){data_update(k);}
           Plotly.animate('myPlot1', {
             data: data
           },
           {layout:{
             xaxis: {range: [data1[k]-100, data1[k]]},
           }},
           {
             transition: {
               duration: 0,
             },
             frame: {
               duration: 0,
               redraw: true,
             }
           });
           requestAnimationFrame(update);
         }
         requestAnimationFrame(update);
   })();
}