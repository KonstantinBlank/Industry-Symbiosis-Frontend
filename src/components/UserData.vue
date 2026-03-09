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
              <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page"
                :href="'/UserData/' + enterpriseId + '/' + firstname">Standortdaten</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color:rgb(0, 50, 14)"
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

    <div class="d-flex flex-row">

      <div class="" style="width: 70%">
        <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Standortübersicht:</h5>
      </div>

    </div>
    <div class="border-bottom"></div>



    <div class="d-flex flex-row">
      <div class="" style="width: 70%">
        <h5 style="margin-top: 2rem; margin-left: 1rem;">Zuständige Umweltmitarbeiter:</h5>
      </div>

    </div>
    <div class="border-bottom"></div>

    <div class="col-lg-8 p-4" style="margin-left: 2vw;">
      <div class="accordion">
        <div class="accordion-item" v-for="(user) in User" v-bind:key="user.id">
          <p class="accordion-header" :id="'heading'+user.first_name">
            <button class="accordion-button" :class="{ 'collapsed': true }" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#collapse'+user.first_name" aria-expanded="true"
              :aria-controls="'collapse'+user.first_name">
              <p>{{user.first_name}} {{user.surname}}</p>
            </button>
          </p>
          <div :id="'collapse'+ user.first_name" class="accordion-collapse collapse"
            style="background-color: rgb(2, 91, 27); color: white" :class="{ 'show': false }"
            :aria-labelledby="'heading'+user.first_name" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div>{{user.email}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div class="" style="width: 70%">
        <h5 style="margin-top: 2rem; margin-left: 1rem;">Produktionsstandorte:</h5>
      </div>

    </div>
    <div class="border-bottom"></div>

    <div class="mt-2">
      <button class="rounded-pill m-2 btn btn-success"
        @click="$router.push({path:`/NewUserData/` + this.enterpriseId + '/' + this.firstname + '/facility/'})">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-circle"
          viewBox="0 0 20 20">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg> Standort hinzufügen
      </button>
    </div>


    <div class="col-lg-8 p-4" style="margin-left: 2vw;">
      <div class="accordion">
        <div class="accordion-item" v-for="(facility) in Facilities" v-bind:key="facility.id">
          <p class="accordion-header" :id="'heading'+facility">
            <button class="accordion-button" :class="{ 'collapsed': true }" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#collapse'+facility.production_facility_id" aria-expanded="true" 
              :aria-controls="'collapse'+facility.production_facility_id"
              @click="getProductionLines(facility.production_facility_id)">
              <p>{{facility.name}}</p>
            </button>
          </p>


          <div :id="'collapse'+facility.production_facility_id" class="accordion-collapse collapse" :class="{ 'show': false }"
            :aria-labelledby="'heading'+facility.id" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <p><span class="fw-bold">Straße: </span>{{facility.street}} {{facility.street_nr}}<span class="fw-bold"> |
                  Postleitzahl: </span>{{facility.postcode}}<span class="fw-bold"> | Stadt: </span>{{facility.city}}</p>
              <div class="border-bottom">
              </div>
              <div class="mt-3">
                <p><span class="fw-bold">Produktionslinien: </span></p>
              </div>
            </div>

            <div class="d-flex flex-row">
              <button class="rounded-pill m-2 btn btn-success"
                @click="$router.push({path:`/NewUserData/` + this.enterpriseId + '/' + this.firstname + '/line/'})">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                  class="bi bi-plus-circle" viewBox="0 0 20 20">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg> Neue Linie anlegen
              </button>
            </div>

            <div class="justify-content-center" style="margin: 0rem 2rem 2rem 2rem;">
              <div class="accordion" v-for="(line) in Lines" v-bind:key="line.name">
                <div class="accordion-item" v-if="line.facilityID === facility.id">
                  <p class="accordion-header" :id="'heading'+line.name">
                    <button class="accordion-button" :class="{ 'collapsed': true }" type="button"
                      data-bs-toggle="collapse" :data-bs-target="'#collapse'+line.name" aria-expanded="true"
                      :aria-controls="'collapse'+line.id"
                      @click="getProductionLineProcesses(line.id)">
                      <strong>{{line.name}}</strong>
                    </button>
                  </p>


                  <div :id="'collapse'+line.name" class="accordion-collapse collapse" :class="{ 'show': false }"
                    :aria-labelledby="'heading'+facility.id" data-bs-parent="#accordionExample">
                    <div class="accordion-body">

                      <div class="justify-content-center p-4 ">
                        <div class="d-flex flex-row">
                          <button class="rounded-pill m-2 btn btn-success"
                            @click="$router.push({path:`/NewUserData/` + this.enterpriseId + '/' + this.firstname + '/process/I'})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                              class="bi bi-plus-circle" viewBox="0 0 20 20">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Neue Prozess anlegen
                          </button>
                        </div>
                        <div class="accordion" v-for="(process) in Processes" v-bind:key="process.p_name">
                          <div class="accordion-item" v-if="process.fk_production_line === line.id">
                            <p class="accordion-header" :id="'heading'+process.name">
                              <button class="accordion-button" :class="{ 'collapsed': true }" type="button"
                                data-bs-toggle="collapse" :data-bs-target="'#collapse'+process.name"
                                aria-expanded="true" :aria-controls="'collapse'+process.name"
                                @click="getStreams(process.id)">
                                <strong>{{process.name}}</strong>
                              </button>
                            </p>


                            <div :id="'collapse'+process.name" class="accordion-collapse collapse"
                              :class="{ 'show': false }" :aria-labelledby="'heading'+process.name"
                              data-bs-parent="#accordionExample">
                              <div class="accordion-body">

                                <button class="rounded-pill m-2 btn btn-success">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-plus-circle" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path
                                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                  </svg> Neuen Stream anlegen
                                </button>

                                <table class="table" style="width: 100%">
                                  <thead class="table"
                                    style="background-color: none; color: green; border-bottom: 1rem;">
                                    <tr>
                                      <th scope="col">Stream</th>
                                      <th scope="col">Menge</th>
                                      <th scope="col">Interval</th>
                                      <!-- <th scope="col">Prozess</th> -->
                                      <th scope="col">In / Out</th>
                                      <th scope="col">Öffentlich</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(stream, index) in Self_Streams" v-bind:key=index>
                                      <td>
                                        {{stream.material_name}}{{stream.energy_source_name}}</td>
                                      <td>
                                        {{stream.amount}} {{stream.unit}}</td>
                                      <td>
                                        pro {{stream.interval}} Tag(en)</td>
                                      <!-- <td v-if="stream.facilityID === facility.id && stream.lineID === line.id && stream.processID === process.id">{{stream.production_process}}</td> -->
                                      <td
                                        v-show="stream.is_input">In</td>
                                      <td
                                        v-show="!stream.is_input">Out</td>
                                      <td
                                        v-show="stream.is_private" style="color:green;">&#9737;</td>
                                      <td
                                        v-show="!stream.is_private" style="color:red;">&#9940;</td>


                                    </tr>
                                  </tbody>
                                </table>

                                <div class="d-flex justify-content-end m-1">
                                  <button class="EditBtn btn btn-success rounded-pill" style="margin-bottom: 2rem;"
                                    @click="$router.push({path:`/UpdateUserData/${enterpriseId}/${firstname}/stream/${process.id}`})">
                                    Streams Bearbeiten</button>
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </div>


            </div>

            <div class="d-flex justify-content-end m-1">
              <button class="EditBtn btn btn-success rounded-pill" style="margin-bottom: 2rem;"
                @click="$router.push({path:`/UpdateUserData/${enterpriseId}/${firstname}/line/I`})">
                Linien/Prozesse Bearbeiten</button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="EditBtn btn btn-success rounded-pill" style="margin-bottom: 2rem;"
          @click="$router.push({path:`/UpdateUserData/${enterpriseId}/${firstname}/facility/I`})">
          Standort bearbeiten</button>
      </div>

    </div>




  </div>
</template>

<script>

import Avatar from 'vue-avatar-component';
import axios from 'axios';

export default {
  components: { Avatar },

  methods: {

    async getProductionLines(Id) {
      try {
        const res = await axios.get('https://datamanagementservice2.azurewebsites.net/api/production_lines/get/' + Id);
        this.Lines = res.data;
      }
      catch (e) {
        console.error(e);
      }
    },

    async getProductionLineProcesses(Id) {
      try {
        const res = await axios.get('https://datamanagementservice2.azurewebsites.net/api/production_line_processes/get/' + Id);
        this.Processes = res.data;
      }
      catch (e) {
        console.error(e);
      }
    },


    async getStreams(Id) {
      try {
        const res = await axios.get('https://datamanagementservice2.azurewebsites.net/api/streams/get/' + Id);
        this.Self_Streams = res.data;
      }
      catch (e) {
        console.error(e);
      }
    }

  },

  // GET User from Enterprise
  async created() {

    let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + this.enterpriseId);

    this.url = url;
    await axios.get(this.url)
      .then(response => this.User = response.data);

    //uncomment wenn APIs implementiert sind
    //UNCOMMENT---------------***********-------------
    let url2 = new URL('https://datamanagementservice2.azurewebsites.net/api/production_facilities/get/' + this.enterpriseId);
    this.url2 = url2;
    await axios.get(this.url2)
      .then(response2 => this.Facilities = response2.data);


    let url3 = new URL('https://datamanagementservice2.azurewebsites.net/api/production_lines/get/' + this.enterpriseId);

    this.url3 = url3;
    await axios.get(this.url3)
      .then(response3 => this.Lines = response3.data);

    let url4 = new URL('https://datamanagementservice2.azurewebsites.net/api/production_line_processes/get/' + this.enterpriseId);

        this.url4 = url4;
        await axios.get(this.url4)
            .then(response4 => this.Processes = response4.data); 

    let url5 = new URL('https://datamanagementservice2.azurewebsites.net/api/streams/get/' + this.enterpriseId);

        this.url5 = url5;
        await axios.get(this.url5)
            .then(response5 => this.Self_Streams = response5.data); 

    //UNCOMMENT------------------*************-----------------


  },



  data() {
    return {
      firstname: this.$route.params.Username,
      enterpriseId: this.$route.params.id,
      hover: false,
      isAbmelden: false,
      url: '',
      url2: '',
      url3: '',
      url4: '',
      url5: '',
      User: [],
      //UNCOMMENT------------------*************-----------------
      Facilities: [],
      Lines: [],
      Processes: [],
      Self_Streams: [],
      //UNCOMMENT------------------*************-----------------



      // //Löschen------------------*************-----------------
      // Facilities: [
      //   { id: '0', name: 'Halle 9', street: 'Weg', street_nr: '1', postcode: '124345', city: 'Berlin', },
      //   { id: '1', name: 'Halle 10', street: 'Weg', street_nr: '2', postcode: '124345', city: 'Berlin', },
      //   { id: '2', name: 'Halle 11', street: 'Weg', street_nr: '3', postcode: '124345', city: 'Berlin', },
      //   { id: '3', name: 'Halle 23', street: 'Weg', street_nr: '4', postcode: '124345', city: 'Berlin', },
      // ],

      // Lines: [
      //   { id: "0", facilityID: "0", name: "Stuhlfertigung" },
      //   { id: "1", facilityID: "0", name: "Tischfertigung" },
      //   { id: "2", facilityID: "1", name: "Reifenfertigung" },
      //   { id: "3", facilityID: "1", name: "Shampoofertigung" },
      //   { id: "4", facilityID: "2", name: "Blumenfertigung" },
      //   { id: "5", facilityID: "2", name: "Bierfertigung" },
      //   { id: "6", facilityID: "2", name: "Fantafertigung" },
      //   { id: "7", facilityID: "3", name: "Colafertigung" },
      // ],

      // Processes: [
      //   { id: "0", name: "Sägen", lineID: "0" },
      //   { id: "1", name: "Hämmern", lineID: "0" },
      //   { id: "2", name: "Machen", lineID: "0" },
      //   { id: "3", name: "Tun", lineID: "1" },
      //   { id: "4", name: "Gärtnern", lineID: "2" },
      //   { id: "5", name: "Schrauben", lineID: "2" },
      //   { id: "6", name: "Montieren", lineID: "2" },
      //   { id: "7", name: "Kaffee trinken", lineID: "3" },
      //   { id: "8", name: "Über Kaffee beschweren", lineID: "4" },
      //   { id: "8", name: "Kaffee trotzdem weiter trinken", lineID: "4" },
      //   { id: "9", name: "Waschen", lineID: "5" },
      //   { id: "10", name: "Spülen", lineID: "5" },
      //   { id: "11", name: "Ölen", lineID: "6" },
      //   { id: "12", name: "Messen", lineID: "7" },

      // ],


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

      //     facilityID: "0",
      //     lineID: "1",
      //     processID: "3",
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

      //     facilityID: "0", //Halle 9
      //     lineID: "0", // Tischfertigung
      //     processID: "0", // 
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

      //     facilityID: "0",
      //     lineID: "0",
      //     processID: "1",
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

      //     facilityID: "0",
      //     lineID: "0",
      //     processID: "1",
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

      //     facilityID: "0",
      //     lineID: "0",
      //     processID: "2",
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

      //     facilityID: "2",
      //     lineID: "6",
      //     processID: "11",
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

      //     facilityID: "3",
      //     lineID: "7",
      //     processID: "12",
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

      //     facilityID: "3",
      //     lineID: "7",
      //     processID: "12",
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

      //     facilityID: "3",
      //     lineID: "7",
      //     processID: "12",
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

      //     facilityID: "3",
      //     lineID: "7",
      //     processID: "12",
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

      //     facilityID: "0",
      //     lineID: "0",
      //     processID: "0",
      //   },

      // ],

      //#region 
      //Löschen------------------*************-----------------

      // Facilities: [ {
      //   id: '0',
      //   name: 'Halle 9',
      //   street: 'Weg',
      //   street_nr: '1',
      //   postcode: '124345',
      //   city: 'Berlin',
      //   lines: [{
      //           name: 'Stuhlfertigung',
      //           processes: [
      //             {
      //             p_name: 'Sägen',
      //             inputs: [{
      //               stream_name: 'Strom', 
      //               stream_amount: '100', 
      //               stream_unit: 'kWh', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '9', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }]
      //             },
      //             {
      //             p_name: 'Leimen',
      //             inputs: [{
      //               stream_name: 'Leim', 
      //               stream_amount: '100', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '9', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }],
      //             },
      //             {
      //             p_name: 'Montieren',
      //             inputs: [{
      //               stream_name: 'Strom', 
      //               stream_amount: '100000', 
      //               stream_unit: 'kWh', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '88', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             },
      //           ]
      //         },

      //         {
      //           name: 'Tischfertigung',
      //           processes: [
      //             {
      //             p_name: 'Zuschnitt',
      //             inputs: [{
      //               stream_name: 'Strom', 
      //               stream_amount: '100', 
      //               stream_unit: 'kWh', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '9', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }]
      //             },
      //             {
      //             p_name: 'Löten',
      //             inputs: [{
      //               stream_name: 'Strom', 
      //               stream_amount: '100', 
      //               stream_unit: 'kWh', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '9', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }],
      //             },
      //             {
      //             p_name: 'Hämmern',
      //             inputs: [{
      //               stream_name: 'Strom', 
      //               stream_amount: '100', 
      //               stream_unit: 'kWh', 
      //               stream_period: 'Jahr', 
      //               stream_public: false,
      //             }],
      //             outputs: [{
      //               stream_name: 'Wasser', 
      //               stream_amount: '9', 
      //               stream_unit: 'l', 
      //               stream_period: 'Jahr', 
      //               stream_public: true,
      //             }],
      //             },
      //           ]
      //         },
      //       ],

      // },

      // {
      //   id: '3',
      //   name: 'Halle 10',
      //   street: 'Weg',
      //   street_nr: '1',
      //   postcode: '124345',
      //   city: 'London'
      // }


      //],
      //#endregion

    }
  }
}
</script>

<style>
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

.EditBtn {
  margin-top: 1rem;
  border: 0 none;
  letter-spacing: 1px;
  font-size: 90%;
}

.EditBtn:hover,
.AnfrageBtn:focus,
.AnfrageBtn:active,
.AnfrageBtn.active {
  background: white;
  border: 1px solid green;
  color: rgb(2, 91, 27);
  font-weight: 600;
}
</style>