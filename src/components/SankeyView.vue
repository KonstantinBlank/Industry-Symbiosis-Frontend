<template>

  <nav class="navbar navbar-expand-md navbar-light bg-light">
       <div class="container-fluid">
         <a class="navbar-brand" href="/Home">Industry Symbiosis 5.0</a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
         </button>
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
           <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/Dashboard/' + enterpriseId + '/' + firstname">Dashbord</a>
         </li>
         <li class="nav-item">
           <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/UserData/' + enterpriseId + '/' + firstname">Standortdaten</a>
         </li>
         <li class="nav-item">
           <a class="nav-link activ" style="color:rgb(0, 50, 14)"  :href="'/MatchView/' + enterpriseId + '/' + firstname">Matches</a>
         </li>
         <li class="nav-item">
           <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page" :href="'/SankeyView/' + enterpriseId + '/' + firstname">Sankey</a>
         </li>
         <li class="nav-item">
           <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/MapView/' + enterpriseId + '/' + firstname">Map</a>
         </li>
       </ul>
       <a class="Abmelden" v-if="isAbmelden" href="/Login">{{firstname}} abmelden</a>
       <button class="AvatarButton bg-light" type="button" @click="isAbmelden=!isAbmelden">
         <avatar :fullname= this.firstname :size="36" color="rgb(0, 50, 14)"></avatar>
       </button>
       </div>
       </div>
     </nav>


 <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Sankey-Darstellung</h5>
 <div class="border-bottom"></div>
     <div class="d-flex align-items-start">
       <div class="btn-group-vertical m-3">
         <button type="button" class="btn btn-success" @click="createChartAll()">Alle</button>
         <button v-for="line in Lines" :key="line.id" class="btn btn-success" type="button" @click="createChart(line.id)">{{line.name}}</button>
       </div>
     
       <div class="border-start" style="margin-top: 1rem; margin-bottom: 1rem; width: 85%;">
         <div class="chart"><canvas class="border-start" id="chart"></canvas></div>
       </div>
     </div>
 
 <!-- {{this.chartData}} -->


 
 </template>
 
 
 
 <script>
 
 import { Chart, LinearScale } from "chart.js";
 import { SankeyController, Flow } from "chartjs-chart-sankey";
 import Avatar from 'vue-avatar-component';
 import axios from 'axios';
 
 
 Chart.register(LinearScale, SankeyController, Flow);
 
 export default {
   components: {Avatar},
   name: "App",
 
 
   async created() {
 
           var  enterpriseId= 1;
         
         try {
           const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/get/' + enterpriseId)
           this.enterprise = res.data;
         }
           catch(e) {
             console.error(e);
           }
    },
 
  mounted: function() {
    
      var ctx = document.getElementById("chart").getContext("2d");
       var ArLength = this.Self_Streams.length;
       var chartData= [];
       
       for (let i = 0 ;i <= ArLength - 1; i++) {
          if (this.Self_Streams[i].is_input) {
            let obj = {
             from: this.Self_Streams[i].name + ' Input',
             to: this.Self_Streams[i].production_line,
             flow: this.Self_Streams[i].amount
           }
           
           chartData.push(obj)
          } else if (!this.Self_Streams[i].is_input) {
            let obj = {
              from: this.Self_Streams[i].production_line,
              to: this.Self_Streams[i].name + ' Output',
             flow: this.Self_Streams[i].amount
           }
           
           chartData.push(obj)
          }
       }
 
           var colors = {
              'Strom Output': "yellow",
              'Strom Input': "yellow",
              'Co2 Output': "black",
              'Co2 Input': "black",
              'Metall Input': "slategray",
              'Metall Output': "slategray",
              'Wasser Input': "blue",
              'Wasser Output': "blue",
              'Energie Input': "orange",
              'Energie Output': "orange",
              'Kohle Input': "black",
              'Kohle Output': "black",
              'Methan Input': "chocolate",
              'Methan Output': "chocolate",
              'Holz Input': "lightsalmon",
              'Holz Output': "teal",
              'Spähne Input': "yellowgreen",
              'Spähne Output': "antiquewhite",
              'Strom1 Input': "cornflowerblue",
             'Strom1 Output': "dimgrey",
             'Öl Input': "deeppink",
             'Öl Output': "lavenderblush",
             'Strom3 Input': "mediumturquoise",
             'Strom3 Output': "midnightblue",
             'Strom4 Input': "chocolate",
             'Strom4 Output': "coral",
 
           };
 
       function getColor(name) {
             return colors[name] || "green";
           }
           var chart = new Chart(ctx, {
             type: "sankey",
             data: {
               datasets: [
                 {
                   data: chartData,
 
                   colorFrom: c => getColor(c.dataset.data[c.dataIndex].from),
                   colorTo: c => getColor(c.dataset.data[c.dataIndex].to)
                   // (function (c) {
                       //return getColor(c.dataset.data[c.dataIndex].from)
                   //});
                 }
               ]
             }
           });
 
           this.activeChart = chart;
 
           return chart;
 },
 
 
 methods: { 
 
   createChartAll(){
 
      this.activeChart.destroy(); 
      var ctx = document.getElementById("chart").getContext("2d");
           var ArLength = this.Self_Streams.length; // = 8
           var chartData= [];
           
           for (let i = 0 ;i <= ArLength - 1; i++) {
          if (this.Self_Streams[i].is_input) {
            let obj = {
             from: this.Self_Streams[i].name + ' Input',
             to: this.Self_Streams[i].production_line,
             flow: this.Self_Streams[i].amount
           }
           
           chartData.push(obj)
          } else if (!this.Self_Streams[i].is_input) {
            let obj = {
              from: this.Self_Streams[i].production_line,
              to: this.Self_Streams[i].name + ' Output',
             flow: this.Self_Streams[i].amount
           }
           
           chartData.push(obj)
          }
       }
 
           var colors = {
            'Strom Output': "yellow",
              'Strom Input': "yellow",
              'CO2 Output': "black",
              'CO2 Input': "black",
              'Metall Input': "slategray",
              'Metall Output': "slategray",
              'Wasser Input': "blue",
              'Wasser Output': "blue",
              'Energie Input': "orange",
              'Energie Output': "orange",
              'Kohle Input': "black",
              'Kohle Output': "black",
              'Methan Input': "chocolate",
              'Methan Output': "chocolate",
              'Holz Input': "lightsalmon",
              'Holz Output': "teal",
              'Spähne Input': "yellowgreen",
              'Spähne Output': "antiquewhite",
              'Strom1 Input': "cornflowerblue",
             'Strom1 Output': "dimgrey",
             'Öl Input': "deeppink",
             'Öl Output': "lavenderblush",
             'Strom3 Input': "mediumturquoise",
             'Strom3 Output': "midnightblue",
             'Strom4 Input': "chocolate",
             'Strom4 Output': "coral",
           };
 
       function getColor(name) {
             return colors[name] || "green";
           }
 
           var chart = new Chart(ctx, {
             type: "sankey",
             data: {
               datasets: [
                 {
                   data: chartData,
 
                   colorFrom: c => getColor(c.dataset.data[c.dataIndex].from),
                   colorTo: c => getColor(c.dataset.data[c.dataIndex].to)
                   // (function (c) {
                       //return getColor(c.dataset.data[c.dataIndex].from)
                   //});
                 }
               ]
             }
           });
 
           this.activeChart = chart;
 
           return chart;
 
   },

   // create new Chart for Line
   createChart(lineID) {  
 
             this.activeChart.destroy();
             var ctx = document.getElementById("chart").getContext("2d");
 
             var ArLength = this.Self_Streams.length;
             var chartData= [];
           
             for (let i = 0 ;i <= ArLength - 1; i++) {
              if (this.Self_Streams[i].is_input && this.Self_Streams[i].lineID === lineID) {
                let obj = {
                    from: this.Self_Streams[i].name + ' Input',
                    to: this.Self_Streams[i].production_process,
                    flow: this.Self_Streams[i].amount
                }  
              chartData.push(obj)
              } else if (!this.Self_Streams[i].is_input && this.Self_Streams[i].lineID === lineID) {
                let obj = {
                  from: this.Self_Streams[i].production_process,
                  to: this.Self_Streams[i].name + ' Output',
                  flow: this.Self_Streams[i].amount
                }
              chartData.push(obj)
              }
            }
             
             var colors = {
              'Strom Output': "yellow",
              'Strom Input': "yellow",
              'CO2 Output': "black",
              'CO2 Input': "black",
              'Metall Input': "slategray",
              'Metall Output': "slategray",
              'Wasser Input': "blue",
              'Wasser Output': "blue",
              'Energie Input': "orange",
              'Energie Output': "orange",
              'Kohle Input': "black",
              'Kohle Output': "black",
              'Methan Input': "chocolate",
              'Methan Output': "chocolate",
              'Holz Input': "lightsalmon",
              'Holz Output': "teal",
              'Spähne Input': "yellowgreen",
              'Spähne Output': "antiquewhite",
              'Strom1 Input': "cornflowerblue",
             'Strom1 Output': "dimgrey",
             'Öl Input': "deeppink",
             'Öl Output': "lavenderblush",
             'Strom3 Input': "mediumturquoise",
             'Strom3 Output': "midnightblue",
             'Strom4 Input': "chocolate",
             'Strom4 Output': "coral",
             };
 
 
               function getColor(name) {
                 return colors[name] || "slategray";
               }
 
             var chart = new Chart(ctx, {
                 type: "sankey",
                 data: {
                   datasets: [
                     {
                       data: chartData,
 
                       colorFrom: c => getColor(c.dataset.data[c.dataIndex].from),
                       colorTo: c => getColor(c.dataset.data[c.dataIndex].to)
                     
                     }
                   ]
                 }
             });
 
             this.activeChart = chart;
 
             return chart;
 
         },
 
   
   },

   
 
 
     data() {
         return {
           hover: false,
           isAbmelden: false,
           dataReady: false,
           activeChart: '',
           chartD: [],
           chartData: [],
           chartData2: [],
           firstname: this.$route.params.Username,
           enterpriseId: this.$route.params.id,
           enterprise: [],
 
 
 
           Facilities: [
                 {id: '0',name: 'Halle 9',street: 'Weg',street_nr: '1',postcode: '124345',city: 'Berlin',},
                 {id: '1',name: 'Halle 10',street: 'Weg',street_nr: '2',postcode: '124345',city: 'Berlin',},
                 {id: '2',name: 'Halle 11',street: 'Weg',street_nr: '3',postcode: '124345',city: 'Berlin',},
                 {id: '3',name: 'Halle 23',street: 'Weg',street_nr: '4',postcode: '124345',city: 'Berlin',},
           ],
 
           Lines: [
                 { id: "0", facilityID: "0", name: "Stuhlfertigung"},
                 { id: "1", facilityID: "0", name: "Tischfertigung"},
                 { id: "2", facilityID: "1", name: "Reifenfertigung"},
                 { id: "3", facilityID: "1", name: "Shampoofertigung"},
                 { id: "4", facilityID: "2", name: "Blumenfertigung"},
                 { id: "5", facilityID: "2", name: "Bierfertigung"},
                 { id: "6", facilityID: "2", name: "Fantafertigung"},
                 { id: "7", facilityID: "3", name: "Colafertigung"},
           ],
 
           Processes: [
             { id: "0", name: "Sägen", lineID: "0" },
             { id: "1", name: "Hämmern", lineID: "0" },
             { id: "2", name: "Machen", lineID: "0" },
             { id: "3", name: "Tun", lineID: "1" },
             { id: "4", name: "Gärtnern", lineID: "2" },
             { id: "5", name: "Schrauben", lineID: "2" },
             { id: "6", name: "Montieren", lineID: "2" },
             { id: "7", name: "Kaffee trinken", lineID: "3" },
             { id: "8", name: "Über Kaffee beschweren", lineID: "4" },
             { id: "8", name: "Kaffee trotzdem weiter trinken", lineID: "4" },
             { id: "9", name: "Waschen", lineID: "5" },
             { id: "10", name: "Spülen", lineID: "5" },
             { id: "11", name: "Ölen", lineID: "6" },
             { id: "12", name: "Messen", lineID: "7" },
 
           ],
 
 
           Self_Streams: [
 
             {
                     id: 10,
                     name: "Öl",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 10",
                     production_line: "Montage",
                     production_process: "Teile ölen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "1",
                     processID: "3",
             },
             {
                     id: 21,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 10",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 20,
                     unit: "l",
                     interval: 1,
                     is_input: true,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "0",
                     processID: "0",
             },
             {
                     id: 22,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 10",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 18,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "0",
                     processID: "1",
             },
             {
                     id: 4,
                     name: "Holz",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 10",
                     production_line: "Tischfertigung",
                     production_process: "Sägen",
                     amount: 13,
                     unit: "m3",
                     interval: 1,
                     is_input: true,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "0",
                     processID: "1",
             },
             {
                     id: 5,
                     name: "Holzspähne",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 10",
                     production_line: "Tischfertigung",
                     production_process: "Teile sägen",
                     amount: 2,
                     unit: "m3",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "0",
                     processID: "2",
             },
             {
                     id: 67,
                     name: "Co2",
                     is_emission: true,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Stuhlfertigung",
                     production_process: "Branding",
                     amount: 40,
                     unit: "m3",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "2",
                     lineID: "6",
                     processID: "11",
             },
             {
                     id: 51,
                     name: "Methan",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Lackiererei",
                     production_process: "Teile lakieren",
                     amount: 10,
                     unit: "m3",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "3",
                     lineID: "7",
                     processID: "12",
             },
             {
                     id: 34,
                     name: "Öl",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Lackiererei",
                     production_process: "Teile vorölen",
                     amount: 5,
                     unit: "l",
                     interval: 1,
                     is_input: true,
                     is_private: false,
 
                     facilityID: "3",
                     lineID: "7",
                     processID: "12",
             },
             {
                     id: 35,
                     name: "Öl",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Stuhlfertigung",
                     production_process: "Teile vorölen",
                     amount: 4,
                     unit: "l",
                     interval: 1,
                     is_input: true,
                     is_private: false,
 
                     facilityID: "3",
                     lineID: "7",
                     processID: "12",
             },
             {
                     id: 24,
                     name: "Energie",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Verschraubung",
                     amount: 3,
                     unit: "kwh",
                     interval: 1,
                     is_input: true,
                     is_private: false,
 
                     facilityID: "3",
                     lineID: "7",
                     processID: "12",
             },
             {
                     id: 14,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "0",
                     processID: "0",
             },
             {
                     id: 14,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "3",
                     processID: "0",
             },
             {
                     id: 14,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "4",
                     processID: "0",
             },
             {
                     id: 14,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "5",
                     processID: "0",
             },
             {
                     id: 14,
                     name: "Wasser",
                     is_emission: false,
                     renewable_share: 0,
                     is_internal_energy: false,
                     production_facility: "Halle 9",
                     production_line: "Montage",
                     production_process: "Teile waschen",
                     amount: 10,
                     unit: "l",
                     interval: 1,
                     is_input: false,
                     is_private: false,
 
                     facilityID: "0",
                     lineID: "2",
                     processID: "0",
             },
 
             ],
 
         }
     }
 
 
 };
 </script>
 
 <style>
 
 .Abmelden {
   color: rgb(2, 91, 27);
   font-weight: 700;
 }
 
 .AvatarButton {
   color: none;
   border: 0 none;
 }
  
 
 </style>
 