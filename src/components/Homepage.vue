 <template>
    
  <div class="hello">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Industry Symbiosis 5.0</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/Login'">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/LoginAdmin'">AdminLogin</a>
        </li>
      </ul>
        <!-- <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
      </div>
    </nav>

      <div class="background">
          <div class="container-fluid px-1 py-5 mx-auto">
            <div class="row d-flex justify-content-center">
              <div class="col-xl-7 col-lg-8 col-md-9 col-11">
                <div class="Welcome-Text text-center">
                  <h1 class="topic">Willkommen bei Industrie Symbiose 5.0</h1>
                  <br>
                  <h3 class="welcome-text">Zusammen sind wir stärker!<br> Konaktieren Sie uns, sollten Sie mehr Informationen benötigen.</h3>

                </div>

                <div class="d-flex flex-row justify-content-between">
                  <div class="card" style="padding: 4vw; text-align: center; border-radius: 30px;">
                    <h5 class="mb-4 UserLogin-Text">Leon Weis</h5>
                    <h6>Backend Entwicklung</h6>
                  </div>
                  <div class="card" style="padding: 4vw; text-align: center; border-radius: 30px;">
                    <h5 class="mb-4 UserLogin-Text">Konstantin Blank</h5>
                    <h6>Backend Entwicklung</h6>
                  </div>
                  <div class="card" style="padding: 4vw; text-align: center; border-radius: 30px;">
                    <h5 class="mb-4 UserLogin-Text">Christoph Nitsch</h5>
                    <h6>Frontend Entwicklung</h6>
                  </div>
                </div>

                <div class="d-flex flex-row justify-content-center">
                  <div class="card" style="padding: 3vw; text-align: center; border-radius: 30px;">
                    <p>Seit der Einführung der Symbiose-Software konnte im Industrienetzwerk Motzner Straße der Emmissionsausstoß signifikant gesenkt werden.</p>
                    <div class="chart">
                      <canvas style="width: 100vw; height: 30vh;" id="chart-line-tasks" class="chart-canvas" height="170"></canvas>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>
      <div style="width: 100vw; height: 400px; background-color: slategrey;"></div>
</div>

</template>

<script>

import axios from 'axios';
import router from '../router';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'LoginPage',
  props: {
    msg: String
  },

  data() {
    return {
      Users: [],
      Username: '',

    }
  },

  mounted () {

    var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    datasets: [{
      label: "Entwicklung des Emissionsausstoßes der teilnehmenden Unternehmen",
      tension: 0,
      pointRadius: 5,
      pointBackgroundColor: "rgba(255, 255, 255, .8)",
      pointBorderColor: "transparent",
      borderColor: "rgba(255, 255, 255, .8)",
      borderWidth: 4,
      backgroundColor: "green",
      fill: true,
      data: [500, 497, 450, 423, 469, 460, 400, 330, 300, 300, 299],
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
          borderDash: [5, 5],
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

methods: {
  async checkUser(id) {
    let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + id);

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
          
          if (this.Users[i].email === this.Username) {
            router.push({path: `/Dashboard${'/' + id}/${this.Username}`} );
            break;
          } else if (i === ArLength - 1 && this.Users[ArLength - 1].email !== this.Username) {
            alert('Benutzername oder Passwort inkorrekt')
          }

        }



  }

      
}


}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.UserLogin-Text {
  color: rgb(0, 50, 14);
}

.background {
  background-image: url('~@/assets/Background1.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding-bottom: 50%;
  height: 100vh;
  width: 100vw;
}
.btn{
  background-color: rgb(0, 50, 14);
  color: white;
  margin: 4% 4%;
}
.AnmeldeButton {
  background-color: rgb(0, 50, 14);
  color: white;
}
.btn {
  background-color: white;
}
.card{
  padding: 30px 40px;
  margin-top: 60px;
  margin-bottom: 60px;
  border: none !important;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2)
  
  }
.topic {
  color: white;
}
.welcome-text{
  color: white;
  }
  

input, textarea, button{
    padding: 8px 15px;
    border-radius: 5px !important;
    margin: 5px 0px;box-sizing: border-box;
    border: 1px solid #ccc;
    font-size: 18px !important;
    font-weight: 300
    }
  
input:focus, textarea:focus{
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #00BCD4;
    outline-width: 0;
    font-weight: 400
    }
    
.btn-block{
  text-transform: uppercase;
  font-size: 15px !important;
  font-weight: 400;
  height: 43px;
  cursor: pointer
  }
  
  .btn-block:hover{
    color: #fff !important
    }
    
button:focus{
-moz-box-shadow: none !important;
-webkit-box-shadow: none !important;
box-shadow: none !important;
outline-width: 0
}
.nav-link {
  color: grey;
}
</style>

