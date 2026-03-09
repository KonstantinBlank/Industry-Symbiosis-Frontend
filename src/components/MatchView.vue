<template>
  <div id="rootElement">

    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/Home">Industry Symbiosis 5.0</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)"
                :href="'/Dashboard/' + enterpriseId + '/' + firstname">Dashbord</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)"
                :href="'/UserData/' + enterpriseId + '/' + firstname">Standortdaten</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page"
                :href="'/MatchView/' + enterpriseId + '/' + firstname">Matches</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)"
                :href="'/SankeyView/' + enterpriseId + '/' + firstname">Sankey</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)"
                :href="'/MapView/' + enterpriseId + '/' + firstname">Map</a>
            </li>
          </ul>
          <a class="Abmelden" v-if="isAbmelden" href="/Login">{{firstname}} abmelden</a>
          <button class="AvatarButton bg-light" type="button" @click="isAbmelden=!isAbmelden">
            <avatar :fullname=this.firstname :size="36" color="rgb(0, 50, 14)"></avatar>
          </button>
        </div>
      </div>
    </nav>

    <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Matches Überblick</h5>
    <div class="border-bottom"></div>

    <!-- Inputs -->
    <div class="wrapperInputs">
      <div id="list inputs" class="container">
        <div class="row p-2">
          <div v-if="isVisible">
            <h4 class="mt-3">Meine Input-Streams</h4>
            <div class="border-bottom"></div>
            <div v-for="(input, index) in Self_Streams" v-bind:key="input.id">
              <div v-if="input.is_input">
                <div class="d-flex justify-content-start">
                  <div class="p-2" style="width: 20%">
                    <!-- x = array[index] for correct stream reference in "Possible MatchView" etc. -->
                    <button type="button" class="btn"
                      @click="isVisible=!isVisible, x = index, stream = 'inputs', getOutputs(input.id)">&rarr;
                      {{input.material_name}}{{input.energy_source_name}}</button>
                  </div>

                  <div class="" style="width: 80%">
                    <div class="progress-wrapper w-100 mx-auto">
                      <div class="progress-success">
                        <div class="progress-percentage">
                          <span class="text-xs font-weight-bold">Bezug aus Netzwerk: 0%</span>
                        </div>
                      </div>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-success" role="progressbar"
                          style="width: 0%; background-color: green " aria-valuenow="60" aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-bottom"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- Outputs -->
    <div class="wrapperOutputs">
      <div id="list outputs" class="container">
        <div class="row p-2">
          <div v-if="isVisible">
            <h4 class="mt-3">Meine Output-Streams</h4>
            <div class="border-bottom"></div>
            <div v-for="(output, index) in Self_Streams" v-bind:key="output.id">
              <div v-if="!output.is_input">
                <div class="d-flex justify-content-start">
                  <div class="p-2" style="width: 20%">
                    <button type="button" class="btn"
                      @click="isVisible=!isVisible,  x = index, stream = 'outputs', getInputs(output.id)">&rarr;
                      {{output.material_name}}{{output.energy_source_name}}</button>
                  </div>

                  <div class="" style="width: 80%">
                    <div class="progress-wrapper w-100 mx-auto">
                      <div class="progress-success">
                        <div class="progress-percentage">
                          <span class="text-xs font-weight-bold">Wiederverwendung im Netzwerk: 0%</span>
                        </div>
                      </div>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-success" role="progressbar"
                          style="width: 0%; background-color: green " aria-valuenow="60" aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="border-bottom"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>



    <div class="StreamDetails">


      <div v-if="this.stream === 'inputs'" v-show="!isVisible">
        <div>
          <button @click="isVisible= !isVisible" class="btnBack">&larr; Zurück</button>
          <span style="margin-left: 2rem; font-size: 2rem;">{{Self_Streams[this.x].name}}</span>
        </div>
        <div class="border-bottom" style="margin-left: 7%; margin-right: 7%"></div>


        <div class="container" style="margin-top: 3rem;">


          <h5 class="mb-1">Details zum Stream:</h5>
          <div class="table-responsive">

            <table class="table">
              <thead class="table">
                <tr>
                  <th scope="col">Stream</th>
                  <!-- <th scope="col">Produktionsstandort</th> -->
                  <!-- <th scope="col">Produktionslinie</th> -->
                  <th scope="col">Produktionsprozess</th>
                  <th scope="col">Menge</th>
                  <th scope="col">Interval</th>
                  <th scope="col">Interne Energie</th>
                  <th scope="col">Erneuerbarer Anteil</th>
                  <th scope="col">Emission</th>
                  <th scope="col">Öffentlich</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{Self_Streams[this.x].material_name}}{{Self_Streams[this.x].energy_source_name}}</th>
                  <!-- <td>{{Self_Streams[this.x].production_facility}}</td> -->
                  <!-- <td>{{Self_Streams[this.x].production_line}}</td> -->
                  <td>{{Self_Streams[this.x].fk_production_line_process}}</td>
                  <td>{{Self_Streams[this.x].amount}} {{Self_Streams[this.x].unit}}</td>
                  <td>pro {{Self_Streams[this.x].interval}}</td>
                  <td>{{Self_Streams[this.x].is_internal_energy}}</td>
                  <td>{{calculatePercentage(Self_Streams[this.x].renewable_share)}} %</td>
                  <td>{{Self_Streams[this.x].is_emission}}</td>
                  <td>{{Self_Streams[this.x].is_private}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>

          <!-- <div v-show="inputs[this.x].is_match"> -->
          <div>
            <p> <span style='font-size:150%;'>&#9842;</span> Match-Status:

              <!-- <span v-if="inputs[this.x].is_match" :style=" inputs[this.x].is_match ? { 'color': 'green' } : { 'color': 'red' }">
                  Sie beziehen zurzeit 20% Ihres {{inputs[this.x].name}}bedarfs aus dem Netzwerk</span>  -->
              <span style="color: red;">
                Sie beziehen zurzeit kein {{Self_Streams[this.x].material_name}} von einem Unternehmen des
                Netzwerks</span>
            </p>
          </div>
          <br>

          <h5>Mögliche Kooperationsunternehmen für {{Self_Streams[this.x].material_name}}: </h5>
          <div class="table-responsive">

            <table class="table" style="width: 70%">
              <thead class="table" style="background-color: none; color: green; border-bottom: 1rem;">
                <tr>
                  <th scope="col">Unternehmen</th>
                  <th scope="col">Menge</th>
                  <th scope="col">Interval</th>
                  <th scope="col" style="width: 20%"></th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(match) in Possible_Matches" v-bind:key=match>
                  <td>{{match.enterprise_id}}</td>
                  <td>{{match.amount}} {{match.unit}}</td>
                  <td>pro {{match.interval}} Tag(en)</td>
                  <td>
                    <button type="button" class=" rounded-pill AnfrageBtn"
                    @click="propose(enterpriseId, true, Self_Streams[this.x].id, match.id, Self_Streams[this.x].amount)">Anfrage senden </button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>


      </div>

      <div v-if="this.stream === 'outputs'" v-show="!isVisible">
        <div>
          <button @click="isVisible= !isVisible" class="btnBack">&larr; Zurück</button>
          <span style="margin-left: 2rem; font-size: 2rem;">{{Self_Streams[this.x].name}}</span>
        </div>
        <div class="border-bottom" style="margin-left: 7%; margin-right: 7%"></div>


        <div class="container" style="margin-top: 3rem;">


          <h5 class="mb-1">Details zum Stream:</h5>
          <div class="table-responsive">

            <table class="table">
              <thead class="table">
                <tr>
                  <th scope="col">Stream</th>
                  <!-- <th scope="col">Produktionsstandort</th> -->
                  <!-- <th scope="col">Produktionslinie</th> -->
                  <th scope="col">Produktionsprozess</th>
                  <th scope="col">Menge</th>
                  <th scope="col">Interval</th>
                  <th scope="col">Interne Energie</th>
                  <th scope="col">Erneuerbarer Anteil</th>
                  <th scope="col">Emission</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">{{Self_Streams[this.x].material_name}}</td>
                  <!-- <td>{{Self_Streams[this.x].production_facility}}</td> -->
                  <!-- <td>{{Self_Streams[this.x].production_line}}</td> -->
                  <td>{{Self_Streams[this.x].fk_production_line_process}}</td>
                  <td>{{Self_Streams[this.x].amount}} {{Self_Streams[this.x].unit}}</td>
                  <td>pro {{Self_Streams[this.x].interval}} Tag(en)</td>
                  <td>{{Self_Streams[this.x].is_internal_energy}}</td>
                  <td>{{calculatePercentage(Self_Streams[this.x].renewable_share)}} %</td>
                  <td>{{Self_Streams[this.x].is_emission}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>

          <div>
            <p> <span style='font-size:150%;'>&#9842;</span> Match-Status:
              <span style="color: red;">
                Sie beziehen zurzeit kein {{Self_Streams[this.x].name}} von einem Unternehmen des Netzwerks</span>
            </p>
          </div>
          <br>

          <h5>Mögliche Kooperationsunternehmen für {{Self_Streams[this.x].name}}: </h5>
          <div class="table-responsive">

            <table class="table" style="width: 70%">
              <thead class="table" style="background-color: none; color: green; border-bottom: 1rem;">
                <tr>
                  <th scope="col">Unternehmen</th>
                  <th scope="col">Menge</th>
                  <th scope="col">Interval</th>
                  <th scope="col" style="width: 20%"></th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(match) in Possible_Matches" v-bind:key=match>
                  <td>{{match.enterprise_id}}</td>
                  <td>{{match.amount}} {{match.unit}}</td>
                  <td>pro {{match.interval}} Tag(en)</td>
                  <td>
                    <button type="button" class=" rounded-pill AnfrageBtn"
                    @click="propose(enterpriseId, true, Self_Streams[this.x].id, match.id, Self_Streams[this.x].amount)"> Anfrage senden </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    <!-- <button v-if= "this.stream=== 'outputs'" v-show= "!visible" @click= "visible= !visible">{{outputs[this.x].name}}</button> -->


    <!-- </div> -->

  </div>
</template>

<script>
import Avatar from 'vue-avatar-component';
import axios from 'axios';
// import { resourceUsage } from 'process';

export default {
  components: { Avatar },



  //API GET: Get all streams von "meinem" Unternehmen 
  //-------------------------********------------------------------------

  async created() {

    try {
      const res = await axios.get('https://matchingservice2.azurewebsites.net/api/matches/allstreams/get/enterprise/' + this.enterpriseId);
      this.Self_Streams = res.data;
    }
    catch (e) {
      console.error(e);
    }

  },
  //-------------------------------------***********------------------------


  methods: {
    async propose(enterpriseId, selectedIsInput, selectedStreamId, requestedStreamId, amount) {
      try {
        var result = await axios.get(`https://matchingservice2.azurewebsites.net/api/matches/propose/?enterpriseId=${enterpriseId}&selectedIsInput=${selectedIsInput}&selectedStreamId=${selectedStreamId}&requestedStreamId=${requestedStreamId}&amount=${amount}&priceProposal=0&comment=hi`)
        console.log(result);
        if(result > 0){
          return true;
        }
        else{
          return false;
        }
      }
      catch (e) {
        console.log(e);
        return false;
      }
    },

    calculatePercentage(wert) {
      return parseInt(wert * 100);
    },

    // uncomment wenn API Aktiv 

    async getOutputs(inputStreamId) {
      try {
        const res = await axios.get('https://matchingservice2.azurewebsites.net/api/matches/outputstreams/allmatching/' + inputStreamId);
        this.Possible_Matches = res.data;
      }
      catch (e) {
        console.error(e);
      }
    },

    async getInputs(outputStreamId) {
      try {
        const res = await axios.get('https://matchingservice2.azurewebsites.net/api/matches/inputstreams/allmatching/' + outputStreamId);
        this.Possible_Matches = res.data;
      }
      catch (e) {
        console.error(e);
      }
    },

  },
  computed: {
    idToNumber() {
      return parseInt(this.$route.params.id)
    },

  },

  data() {

    return {
      firstname: this.$route.params.Username,
      enterpriseId: this.$route.params.id,
      isVisible: true,
      hover: false,
      isAbmelden: false,
      x: '',
      stream: '',

      // Uncomment Self_Streams, Possible_Matches wenn REST Call aktiv
      //-----------------------------------*******-------------------------------  
      Self_Streams: [], //---> API GET destination: ALLE streams (input-Streams sowie output-Streams des eigenen Unternehmens), Unterscheidung durch is_input = true/false
      Possible_Matches: [],


      // Ab hier Self_Streams und Possible_Matches löschen, wenn REST Call aktiv
      //-----------------------------------*******-------------------------------  

      // Self_Streams: [

      //   {
      //     id: 10,
      //     name: "Öl",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 10",
      //     production_line: "Montage",
      //     production_process: "Teile ölen",
      //     amount: 10,
      //     unit: "l",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 21,
      //     name: "Wasser",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 10",
      //     production_line: "Montage",
      //     production_process: "Teile waschen",
      //     amount: 20,
      //     unit: "l",
      //     interval: 1,
      //     is_input: true,
      //     is_private: false,
      //   },
      //   {
      //     id: 22,
      //     name: "Wasser",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 10",
      //     production_line: "Montage",
      //     production_process: "Teile waschen",
      //     amount: 18,
      //     unit: "l",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 4,
      //     name: "Holz",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 10",
      //     production_line: "Tischfertigung",
      //     production_process: "Sägen",
      //     amount: 13,
      //     unit: "m3",
      //     interval: 1,
      //     is_input: true,
      //     is_private: false,
      //   },
      //   {
      //     id: 5,
      //     name: "Holzspähne",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 10",
      //     production_line: "Tischfertigung",
      //     production_process: "Teile sägen",
      //     amount: 2,
      //     unit: "m3",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 67,
      //     name: "Co2",
      //     is_emission: true,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Stuhlfertigung",
      //     production_process: "Branding",
      //     amount: 40,
      //     unit: "m3",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 51,
      //     name: "Methan",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Lackiererei",
      //     production_process: "Teile lakieren",
      //     amount: 10,
      //     unit: "m3",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 34,
      //     name: "Öl",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Lackiererei",
      //     production_process: "Teile vorölen",
      //     amount: 5,
      //     unit: "l",
      //     interval: 1,
      //     is_input: true,
      //     is_private: false,
      //   },
      //   {
      //     id: 35,
      //     name: "Öl",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Lackiererei",
      //     production_process: "Teile vorölen",
      //     amount: 4,
      //     unit: "l",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },
      //   {
      //     id: 24,
      //     name: "Energie",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Montage",
      //     production_process: "Verschraubung",
      //     amount: 300,
      //     unit: "kwh",
      //     interval: 1,
      //     is_input: true,
      //     is_private: false,
      //   },
      //   {
      //     id: 14,
      //     name: "Wasser",
      //     is_emission: false,
      //     renewable_share: 0,
      //     is_internal_energy: false,
      //     production_facility: "Halle 9",
      //     production_line: "Montage",
      //     production_process: "Teile ",
      //     amount: 10,
      //     unit: "l",
      //     interval: 1,
      //     is_input: false,
      //     is_private: false,
      //   },

      // ],


      // Possible_Matches: [

      //   {
      //     id: 1,
      //     enterprise_name: "Bier AG",
      //     amount: 410,
      //     unit: "l",
      //     interval: 1 //1 für pro Tag, 2 pro 2 Tage, etc
      //   },
      //   {
      //     id: 2,
      //     enterprise_name: "Bier AG",
      //     amount: 102,
      //     unit: "l",
      //     interval: 1
      //   },
      //   {
      //     id: 90,
      //     enterprise_name: "Bier AG",
      //     amount: 160,
      //     unit: "l",
      //     interval: 1
      //   },
      //   {
      //     id: 91,
      //     enterprise_name: "Beast AG",
      //     amount: 10,
      //     unit: "l",
      //     interval: 1
      //   },
      //   {
      //     id: 89,
      //     enterprise_name: "Cola AG",
      //     amount: 1,
      //     unit: "l",
      //     interval: 1
      //   },
      //   {
      //     id: 69,
      //     enterprise_name: "Fanta AG",
      //     amount: 20,
      //     unit: "m3",
      //     interval: 1
      //   },


      // ],


    }

  },


  // uniqueNames: function() {
  //   var filtered_array = [];
  //   for(var i =0; i < this.items.length; i++) {
  //     if(filtered_array.indexOf(this.items[i].name) === -1) {
  //       filtered_array.push(this.items[i].name)
  //     }
  //   }
  //   return filtered_array;
  //     }
}
</script>

<style scoped>
[aria-current="page"] {

  border-bottom: 2px solid rgb(0, 50, 14);

}

/* .wrapperOutputs {
  background-color: rgb(210, 216, 212);
}

.wrapperInputs {
  background-color: rgb(181, 213, 192);
} */
.Abmelden {
  color: rgb(2, 91, 27);
  font-weight: 700;
}

.AvatarButton {
  color: none;
  border: 0 none;
}

.AnfrageBtn {
  padding: 5px 5px;
  border: 0 none;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 90%;
  /* text-transform: uppercase; */
  color: white;
  background: rgb(2, 91, 27);
}

.AnfrageBtn:hover,
.AnfrageBtn:focus,
.AnfrageBtn:active,
.AnfrageBtn.active {
  background: white;
  border: 1px solid green;
  color: rgb(2, 91, 27);
}

.btnBack {
  padding: 10px 10px;
  margin-left: 10px;
  border: 0 none;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 90%;
  /* text-transform: uppercase; */
  color: white;
  background: rgb(2, 91, 27);
}

.btnBack:hover,
.btnBack:focus,
.btnBack:active,
.btnBack.active {
  background: white;
  border: 1px solid green;
  color: rgb(2, 91, 27);
}

.btn {
  padding: 14px 24px;
  border: 0 none;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(2, 91, 27);
  /* background:  grey;   */
}

.btn.round {
  border-radius: 24px;
}


.btn:hover,
.btn:focus,
.btn:active,
.btn.active {
  background: rgb(2, 91, 27);
  color: white;
}
</style>