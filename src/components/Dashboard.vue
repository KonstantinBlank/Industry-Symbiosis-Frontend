<template>
<div id="rootElement">
   
   <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/Home">Industry Symbiosis 5.0</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page" :href="'/Dashboard/' + enterpriseId + '/' + firstname">Dashbord</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/UserData/' + enterpriseId + '/' + firstname">Standortdaten</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)"  :href="'/MatchView/' + enterpriseId + '/' + firstname">Matches</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)"  :href="'/SankeyView/' + enterpriseId + '/' + firstname">Sankey</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/MapView/' + enterpriseId + '/' + firstname">Map</a>
        </li>
      </ul>
      <a class="Abmelden" v-if="isAbmelden" href="/Login">{{firstname}} abmelden</a>
      <button class="AvatarButton bg-light" type="button" @click="isAbmelden=!isAbmelden">
        <avatar :fullname= this.firstname :size="36" color="rgb(0, 50, 14)"></avatar>
      </button>
        <!-- <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
      </div>
    </nav>

<!-- <BarChart/> -->
<canvas ref="ChartCanvas" width="200px" height="200px" style="border:1px solid #000000;">
</canvas>



 
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
   
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2"  style="background-color: #0B6231; color: white;">
              <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i class="bi bi-droplet-fill"></i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Öl von Bier AG</p>
                <h4 class="mb-0">30 l / Woche</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
              <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+55% </span>zur Vorwoche</p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2" style="background-color: #0B6231; color: white;">
              <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute"> 
                <i class="bi bi-gpu-card"></i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Holzspäne</p>
                <h4 class="mb-0">3 t / Jahr</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
              <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+3% </span>zum Vorjahr</p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2" style="background-color: #0B6231; color: white;">
              <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i class="bi bi-caret-left-square"></i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Inputströme insgesamt</p>
                <h4 class="mb-0">30</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
              <p class="mb-0"><span class="text-danger text-sm font-weight-bolder">-2%</span> zum Vorjahr</p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-header p-3 pt-2" style="background-color: #0B6231; color: white;">
              <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
              <i class="bi bi-caret-right-square"></i>              
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Outputströme insgesamt</p>
                <h4 class="mb-0">26</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
              <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+5% </span>zum Vorjahr</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-4 col-md-6 mt-4 mb-4">
          <div class="card z-index-2 ">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                <div class="chart">
                  <canvas id="chart-bars" class="chart-canvas" height="170"></canvas>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="mb-0 ">Emissionen</h6>
              <p class="text-sm ">Emissionen der letzten Woche</p>
              <hr class="dark horizontal">
              <div class="d-flex ">
                <p class="mb-0 text-sm"> Durchschnittlicher Ausstoß:  <span class="text-danger text-sm font-weight-bolder">25 t </span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mt-4 mb-4">
          <div class="card z-index-2  ">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <div class="chart">
                  <canvas id="chart-line" class="chart-canvas" height="170"></canvas>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="mb-0 "> Input </h6>
              <p class="text-sm "> <span class="font-weight-bolder">+ 15%</span> </p>
              <hr class="dark horizontal">
              <div class="d-flex ">
                <p class="mb-0 text-sm"> Durchschnitt: 334 t </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-4 mb-3">
          <div class="card z-index-2 ">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                <div class="chart">
                  <canvas id="chart-line-tasks" class="chart-canvas" height="170"></canvas>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="mb-0 ">Output</h6>
              <p class="text-sm ">- 10%</p>
              <hr class="dark horizontal">
              <div class="d-flex ">
                <p class="mb-0 text-sm">Durchschnitt: 234 t</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div class="card">
            <div class="card-header pb-0" style="background-color: #0B6231; color: white;">
              <div class="row">
                <div class="col-lg-6 col-7">
                  <h6>Ranking TOP 5</h6>
                  <p class="text-sm mb-0">
                    <i class="fa fa-check text-info" aria-hidden="true"></i>
                    <span class="font-weight-bold">15 teilnehmende Unternehmen im aktuellen Netzwerk</span>
                  </p>
                </div>
                
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Unternehmen</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rank</th>
                      <!-- <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Branche</th> -->
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Reduzierte  Emissionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <!-- <div>
                            <img src="" class="avatar avatar-sm me-3" alt="xd">
                          </div> -->
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Wolle und Polster GmbH</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>1</p>
                        </div>
                      </td>
                      <!-- <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> Holz </span>
                      </td> -->
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">85%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 85%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <!-- <div>
                            <img src="" class="avatar avatar-sm me-3" alt="xd">
                          </div> -->
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Lampenschirme Söhne u.Ko.</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>2</p>
                        </div>
                      </td>
                      <!-- <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> Metall </span>
                      </td> -->
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">70%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 70%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <!-- <div>
                            <img src="" class="avatar avatar-sm me-3" alt="xd">
                          </div> -->
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Reifen UG</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>3</p>
                        </div>
                      </td>
                      <!-- <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> Automobil </span>
                      </td> -->
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">60%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <!-- <div>
                            <img src="" class="avatar avatar-sm me-3" alt="xd">
                          </div> -->
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Kuh- und Schildkrötenbedarf AG</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>4</p>
                        </div>
                      </td>
                      <!-- <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> Schaumstoff </span>
                      </td> -->
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">55%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 55%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <!-- <div>
                            <img src="" class="avatar avatar-sm me-3" alt="xd">
                          </div> -->
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Werner Comic's Druck und Vertrieb</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>5</p>
                        </div>
                      </td>
                      <!-- <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> Holz </span>
                      </td> -->
                      <td class="align-middle">
                        <div class="progress-wrapper w-75 mx-auto">
                          <div class="progress-info">
                            <div class="progress-percentage">
                              <span class="text-xs font-weight-bold">9%</span>
                            </div>
                          </div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 9%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card h-100">
            <div class="card-header pb-0" style="background-color: #0B6231; color: white;">
              <h6>Aktivitäten Übersicht</h6>
              <p class="text-sm">
                <span class="font-weight-bold">letzten 4 Wochen</span>
              </p>
            </div>
            <div class="card-body p-3">
              <div class="timeline timeline-one-side">
                <div class="timeline-block mb-3">
                  <span class="timeline-step">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <div class="timeline-content">
                    <h6 class="text-dark text-sm font-weight-bold mb-0">Inputanfrage erhalten</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">26.06 7:20 Uhr</p>
                  </div>
                </div>
                <div class="timeline-block mb-3">
                  <span class="timeline-step">
                   <i class="bi bi-send-check"></i>
                  </span>
                  <div class="timeline-content">
                    <h6 class="text-dark text-sm font-weight-bold mb-0">Anfrage an Unternhemen 1 gesendet</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">26.06 7:20 Uhr</p>
                  </div>
                </div>
                <div class="timeline-block mb-3">
                  <span class="timeline-step">
                  <i class="bi bi-chat-text"></i>
                  </span>
                  <div class="timeline-content">
                    <h6 class="text-dark text-sm font-weight-bold mb-0">Allgemeine Anfrage erhalten</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">26.06 7:20 Uhr</p>
                  </div>
                </div>
                <div class="timeline-block mb-3">
                  <span class="timeline-step">
                   <i class="bi bi-send-check"></i>
                  </span>
                  <div class="timeline-content">
                    <h6 class="text-dark text-sm font-weight-bold mb-0">Anfrage an Unternehmen 4 gesendet</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">26.06 7:20 Uhr</p>
                  </div>
                </div>
                <div class="timeline-block mb-3">
                  <span class="timeline-step">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <div class="timeline-content">
                    <h6 class="text-dark text-sm font-weight-bold mb-0">Inputanfrage erhalten</h6>
                    <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">26.06 7:20 Uhr</p>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer py-4  ">
        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
            </div>
            <div class="col-lg-6">
              <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                <li class="nav-item">
                  <a href="" class="nav-link text-muted" target="_blank">Über uns</a>
                </li>
                <li class="nav-item">
                  <a href="" class="nav-link text-muted" target="_blank">Impressum</a>
                </li>
                <li class="nav-item">
                  <a href="" class="nav-link pe-0 text-muted" target="_blank">Kontakt</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
    
</div>
</template>

<script>


import { Chart, registerables } from "chart.js";
import Avatar from 'vue-avatar-component';
import axios from 'axios';


Chart.register(...registerables);

// Chart.register(Chart);


export default {
        name: 'DashboardView',
        components: {Avatar},
        props: {
        msg: String,
        size: {
          type: Number
        },
      
        },

        
  
    methods: {
          async GetUserAvatar() {
          let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + this.enterpriseId);

                  try {
                  const res = await axios.get(url);
                  // this.url = url;
                  this.Users = res.data;
                  }
                  catch(e) {
                    console.error(e);
                  }
                  var ArLength = this.Users.length;

                  for (let i = 0; i <= ArLength - 1; i++) {
          
                        if (this.$route.params.Username === this.Users[i].email) {
                          this.firstname = this.Users[i].first_name
                          this.surname = this.Users[i].surname
                          break;
                        } 

                   }
            },
    },

        // components: { BarChart },
  mounted: function () {

    this.GetUserAvatar();
          
          
    
    
    //1. Chart
    var ctx = document.getElementById("chart-bars").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Die", "Mit", "Do", "Fr", "Sa", "So"],
        datasets: [{
          label: "Emissionen in t",
          // tension: 0.4,
          // borderWidth: 0,
          // borderRadius: 4,
          // borderSkipped: false,
          backgroundColor: "rgba(213, 0, 0)",
          data: [50, 20, 28, 42, 50, 10, 5],
          maxBarThickness: 6
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          }
        },
       
        scales: {
          y: {
            grid: {
              drawBorder: true,
              display: true,
              drawOnChartArea: true,
              drawTicks: true,
              borderDash: [5, 5],
              color: ''
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 10,
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
              color: "black"
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: ''
            },
            ticks: {
              display: true,
              // color: '#f8f9fa',
              // padding: 10,
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
            }
          },
        },
      },
    });




        // 2. Chart
    var ctx2 = document.getElementById("chart-line").getContext("2d");

    new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        datasets: [{
          label: "Input Menge",
          tension: 0,
          pointRadius: 5,
          pointBackgroundColor: "rgba(255, 255, 255, .8)",
          // pointBorderColor: "transparent",
          // borderColor: "rgba(255, 255, 255, .8)",
          // borderWidth: 4,
          backgroundColor: "blue",
          fill: true,
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
          maxBarThickness: 6

        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          }
        },
        
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)'
            },
            ticks: {
              display: true,
              // color: '#f8f9fa',
              // padding: 10,
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              // color: '#f8f9fa',
              // padding: 10,
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
            }
          },
        },
      },
    });
    var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

    new Chart(ctx3, {
      type: "line",
      data: {
        labels: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        datasets: [{
          label: "Output Menge",
          tension: 0,
          pointRadius: 5,
          pointBackgroundColor: "rgba(255, 255, 255, .8)",
          pointBorderColor: "transparent",
          borderColor: "rgba(255, 255, 255, .8)",
          borderWidth: 4,
          backgroundColor: "green",
          fill: true,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          maxBarThickness: 6

        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          }
        },
  
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)'
            },
            ticks: {
              display: true,
              padding: 10,
              // color: '#f8f9fa',
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '',
              padding: 10,
              // font: {
              //   size: 14,
              //   weight: 300,
              //   family: "Roboto",
              //   style: 'normal',
              //   lineHeight: 2
              // },
            }
          },
        },
      },
    });
         
  },
   
    data() {
   
        return {
          hover: false,
          isAbmelden: false,
            Users: [],
            surname: 'Holland',
            firstname: this.$route.params.Username,
            enterpriseId: this.$route.params.id,
            visible : true,
            x: '',
            stream: '',

        }

    },
}
</script>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";

[aria-current="page"] {

  border-bottom: 2px solid rgb(0, 50, 14);

}

.Abmelden {
  color: rgb(2, 91, 27);
  font-weight: 700;
}

.AvatarButton {
  color: none;
  border: 0 none;
}



</style>