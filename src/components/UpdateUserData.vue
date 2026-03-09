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
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/Dashboard/' + enterpriseId + '/' + firstname">Dashbord</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page"  :href="'/UserData/' + enterpriseId + '/' + firstname">Standortdaten</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)"  :href="'/MatchView/' + enterpriseId + '/' + firstname">Matches</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/SankeyView/' + enterpriseId + '/' + firstname">Sankey</a>
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

    <button @click= "$router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btnBack">&larr; Zurück</button>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">


          


<!-- Facility Data -->
     <div v-show="this.identifier === 'facility'">

       <div class="d-flex flex-row">
            <div class="" style="width: 70%">
              <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Update Facilities:</h5>
            </div>
          </div>
          <div class="border-bottom"></div>
           <!-- Button Update-->
        <div class="d-flex justify-content-end mt-3 mb-3">
            <button @click="handleUpdate('facility'), $router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btn btn-success" type="button" form="InputForm">Update</button>
        </div>
          <div v-for="(facility, index) in Facilities" :key="index">
           
            <h5 style="margin-top: 5vh; ">Standort {{index +1}}</h5>

            <div class="col-md-12 mb-3 mt-3">
              <label class="form-label" for="input">Standortbezeichnung:</label>
              <input class="form-control" type="text" v-model="Facilities[index].name">
            </div>
  
            <div class="mt-3 mb-3">
              <p>Adresse</p>
           </div>
  
          <div>
            <div class="row d-flex justify-content-between">
            <div class="col-md mb-3 mt-3">
              <label class="form-label"  for="input">Straße: </label>
              <input class="form-control" type="text" v-if="Facilities.length" v-model="Facilities[index].street">
            </div>
      
            <div class="col-md-4 col-sm-12 mb-3 mt-3">
              <label class="form-label"  for="input">Hausnummer: </label>
              <input class="form-control" type="number" v-if="Facilities.length" v-model="Facilities[index].housenumber">
            </div>
            </div>
          </div>
  
            <div class="row d-flex justify-content-between">
              <div class="col-md-4 mb-3 mt-3">
                <label class="form-label"  for="input">Postleitzahl: </label>
                <input class="form-control" type="number" v-if="Facilities.length" v-model="Facilities[index].postcode">
              </div>
    
              <div class="col-md mb-3 mt-3">
                <label class="form-label"  for="input">Stadt: </label>
                <input class="form-control" type="text" v-if="Facilities.length" v-model="Facilities[index].city">
              </div>
          </div>
          </div>
        </div>

<!-- User Data -->
<div v-show="identifier === 'user'">

          <div class="d-flex flex-row">
            <div class="" style="width: 70%">
              <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Update Benutzerdaten:</h5>
            </div>
          </div>
          <div class="border-bottom"></div>
     <!-- Button Update-->
     <div class="d-flex justify-content-end mt-3 mb-3">
            <button @click="handleUpdate('user'), $router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btn btn-success" type="button" form="InputForm">Update</button>
        </div>
          <div class="container">
            <div v-for="(user, index) in User" v-bind:key="index">
              <h5 style="margin-top: 5vh; ">Nutzer {{index +1}}</h5>
              <div class="row d-flex">
                <div class="col-md mb-1 mt-1">
                      <label class="form-label"  for="input">Vorname: </label>
                      <input  class="form-control" type="text" v-model="user.first_name">
                </div>
                <div class="col-md mb-1 mt-1">
                      <label class="form-label"  for="input">Nachname:</label>
                      <input class="form-control" type="text" v-model="user.surname">
                </div>
              </div>
                <div class="row d-flex">
                  <div class="col-md mb-1 mt-1">
                    <label  class="form-label"  for="input">Email:</label>
                    <input  style="width: 50%" class="form-control" type="text" v-model="user.email">
                  </div>
                </div>
             
              <div class="border-bottom mt-2 mb-2"></div>
              </div>
            </div>
      </div>
    </div>
      


<!-- Production Line Data -->

    <div v-show="identifier === 'line'">
      <div class="d-flex flex-row col-md-8 m-3">
          <div class="" style="width: 70%">
              <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Update Liniendaten:</h5>
            </div>
          </div>
          <div class="border-bottom col-md-8 m-3"></div>
        <div class="d-flex justify-content-end col-md-8 m-3">
            <button @click="handleUpdate('user'), $router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btn btn-success" type="button" form="InputForm">Update</button>
        </div>
      <div class="col-md-8 m-3">
            <div v-for="(line, index) in Lines" v-bind:key="index" class="mt-3 mb-3">
                <h6 style="margin-top: 5vh">Produktionsline</h6>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Linienbezeichnung: </label>
                  <input class="form-control" type="text" v-model="line.name">
                </div>

                <div v-for="(process, index) in Processes" v-bind:key="index" class="mt-3 mb-3">
                  <div style="padding-right: 2vw;" v-if="process.lineID === line.id">
                    <label class="form-label" style="margin-left: 2vw" for="input">Prozess {{process.id}}: </label>
                    <input class="form-control" style="margin-left: 2vw" type="text" v-model="process.name">
                  </div>
                </div>


              <!-- <div class="d-flex flex-row-reverse mt-3 mb-3">
                <button class="btn btn-danger" @click="deleteMitarbeiter(index)">Linie {{index +1}} entfernen</button>
              </div> -->
              <div class="border-bottom mt-2 mb-2"></div>
            </div>

          </div>

      </div>

 <!-- Streams      -->
    <div v-show="identifier === 'stream'">
      <div class="d-flex flex-row col-md-8 m-3">
          <div class="" style="width: 70%">
              <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Update Streamdaten:</h5>
            </div>
          </div>
          <div class="border-bottom col-md-8 m-3"></div>
        <div class="d-flex justify-content-end col-md-8 m-3">
            <button @click="handleUpdate('stream'), $router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btn btn-success" type="button" form="InputForm">Update</button>
        </div>
      <div class="col-md-8 m-3">
        <div v-for="(process) in Processes" :key="process">
          <h5 v-if="process.id === this.processID">Streamdaten des Prozesses {{process.name}}</h5>
        </div>
            <div v-for="(stream, index) in Self_Streams" v-bind:key="index" class="" style="margin-top: 3rem;">
                <div v-if="stream.processID === this.processID">
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Streambzeichnung: </label>
                  <input class="form-control" type="text" v-model="stream.name">
                </div>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Menge: </label>
                  <input class="form-control" type="text" v-model="stream.amount">
                </div>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Intervall (in Tagen): </label>
                  <input class="form-control" type="text" v-model="stream.interval">
                </div>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Einheit: </label>
                  <input class="form-control" type="text" v-model="stream.unit">
                </div>
                <div class="mt-3 mb-3">

                  <label for="rdo1">
                    <input type="radio" id='rdo1' name="radio" v-model="stream.is_input">
                    <span class="rdo"></span>
                    <span>Input</span>
                  </label>
  
                  <label for="rdo2">
                  <input type="radio" id="rdo2" name="radio" style="margin-left: 2rem;" class="" checked>
                    <span class="rdo"></span>
                    <span>Output</span>
                  </label>
                  <label for="chb1">
                  <input type="checkbox" id="chb1" name="checkbox" style="margin-left: 2rem;" class="" checked v-model="stream.is_public">
                    <span class="rdo"></span>
                    <span>Öffentlich</span>
                  
                  </label>
                </div>
                <div class="border-bottom mt-2 mb-2"></div>
              </div>


              <!-- <div class="d-flex flex-row-reverse mt-3 mb-3">
                <button class="btn btn-danger" @click="deleteMitarbeiter(index)">Linie {{index +1}} entfernen</button>
              </div> -->
              
            </div>

          </div>

      </div>
  </div>
</div>

</div>
</template>

<script>
import axios from 'axios';
import Avatar from 'vue-avatar-component';

export default {
    computed: {
      idToNumber() {
        return parseInt(this.$route.params.id)
      }
    },
    components: {Avatar},

    beforeMount() {
        var identifier = this.$route.params.identifier

        return identifier;
    } ,


    async created() {

      
      let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + this.enterpriseId);

      this.url = url;
      await axios.get(this.url)
          .then(response => this.User = response.data); 
          
          //uncomment wenn API GET production_facilities implementiert ist
      //UNCOMMENT------------------****************---------------------
      let url2 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/production_facilities/get/' + this.enterpriseId);
      this.url2 = url2;
      await axios.get(this.url)
      .then(response2 => this.Facilities = response2.data); 

      let url3 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/production_lines/get/' + this.enterpriseId);
      this.url3 = url3;
      await axios.get(this.url)
      .then(response3 => this.Lines = response3.data); 

      let url4 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/production_line/get/' + this.enterpriseId);
          this.url4 = url4;
          await axios.get(this.url4)
              .then(response4 => this.Processes = response4.data); 

      let url5 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/stream/get/' + this.enterpriseId);
          this.url5 = url5;
          await axios.get(this.url5)
              .then(response5 => this.Self_Streams = response5.data); 
      //UNCOMMENT------------------****************---------------------
    },

    methods: {
      handleUpdate(ident) {

        if (ident === 'user') {
          
          for (let i = 0; i < this.User.length; i++) {
  
            let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/update/');
            url.searchParams.set('userId', this.User[i].id);
            url.searchParams.set('email', this.User[i].email);
    
            this.url = url
            axios
              .post(url, {
              })
              .then((response) => {
                console.log(response);
              
              })
              .catch((e) => {
                console.log(e)
              });
          }
        } else if (ident === 'facility') {

          for (let i = 0; i < this.Facilities.length; i++) {
  
         
                let url2 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/production_facilities/update/');
                url2.searchParams.set('productionFacilityId', this.Facilities[i].id);
                url2.searchParams.set('housenumber', this.Facilities[i].housenumber);

                this.url2 = url2
                axios
                  .post(url2, {
                  })
                  .then((response) => {
                    console.log(response);
                  
                  })
                  .catch((e) => {
                    console.log(e)
                  });
              }
        } else if (ident === 'line') {

          for (let i = 0; i < this.Lines.length; i++) {
  
         
                let url3 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/productionlines/update/');
                url3.searchParams.set('productionLineId', this.Lines[i].id);
                url3.searchParams.set('name', this.Lines[i].name);

                this.url3 = url3
                axios
                  .post(url3, {
                  })
                  .then((response) => {
                    console.log(response);
                  
                  })
                  .catch((e) => {
                    console.log(e)
                  });
              }


          for (let i = 0; i < this.Processes.length; i++) {
  
         
                let url4 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/production_line_process/update/');
                url4.searchParams.set('productionLineId', this.Processes[i].id);
                url4.searchParams.set('name', this.Processes[i].name);

                this.url4 = url4
                axios
                  .post(url4, {
                  })
                  .then((response2) => {
                    console.log(response2);
                  
                  })
                  .catch((e) => {
                    console.log(e)
                  });
              }
        }



      },

    },


    data() {
        return {
          identifier: this.$route.params.identifier,
          enterpriseId: this.$route.params.id,
          firstname: this.$route.params.Username,
          processID: this.$route.params.processID,
          hover: false,
          isAbmelden: false,
          url: '',
          url2: '',
          url3: '',
          User: [],
          //UNCOMMENT---------**************----------------------------
          Facilities: [],
          Lines: [],
          Processes: [],
          Self_Streams: [],
          //UNCOMMENT---------**************-----------------------------

          //LÖSCHEN------------------***********************--------------

          // Facilities: [
          //       {id: '0',name: 'Halle 9',street: 'Weg',street_nr: '1',postcode: '124345',city: 'Berlin',},
          //       {id: '1',name: 'Halle 10',street: 'Weg',street_nr: '2',postcode: '124345',city: 'Berlin',},
          //       {id: '2',name: 'Halle 11',street: 'Weg',street_nr: '3',postcode: '124345',city: 'Berlin',},
          //       {id: '3',name: 'Halle 23',street: 'Weg',street_nr: '4',postcode: '124345',city: 'Berlin',},
          // ],

          // Lines: [
          //       { id: "0", facilityID: "0", name: "Stuhlfertigung"},
          //       { id: "1", facilityID: "0", name: "Tischfertigung"},
          //       { id: "2", facilityID: "1", name: "Reifenfertigung"},
          //       { id: "3", facilityID: "1", name: "Shampoofertigung"},
          //       { id: "4", facilityID: "2", name: "Blumenfertigung"},
          //       { id: "5", facilityID: "2", name: "Bierfertigung"},
          //       { id: "6", facilityID: "2", name: "Fantafertigung"},
          //       { id: "7", facilityID: "3", name: "Colafertigung"},
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
          //           id: 10,
          //           name: "Öl",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 10",
          //           production_line: "Montage",
          //           production_process: "Teile ölen",
          //           amount: 10,
          //           unit: "l",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "1",
          //           processID: "3",
          //   },
          //   {
          //           id: 21,
          //           name: "Wasser",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 10",
          //           production_line: "Montage",
          //           production_process: "Teile waschen",
          //           amount: 20,
          //           unit: "l",
          //           interval: 1,
          //           is_input: true,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "0",
          //           processID: "0",
          //   },
          //   {
          //           id: 22,
          //           name: "Wasser",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 10",
          //           production_line: "Montage",
          //           production_process: "Teile waschen",
          //           amount: 18,
          //           unit: "l",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "0",
          //           processID: "1",
          //   },
          //   {
          //           id: 4,
          //           name: "Holz",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 10",
          //           production_line: "Tischfertigung",
          //           production_process: "Sägen",
          //           amount: 13,
          //           unit: "m3",
          //           interval: 1,
          //           is_input: true,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "0",
          //           processID: "1",
          //   },
          //   {
          //           id: 5,
          //           name: "Holzspähne",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 10",
          //           production_line: "Tischfertigung",
          //           production_process: "Teile sägen",
          //           amount: 2,
          //           unit: "m3",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "0",
          //           processID: "2",
          //   },
          //   {
          //           id: 67,
          //           name: "Co2",
          //           is_emission: true,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Stuhlfertigung",
          //           production_process: "Branding",
          //           amount: 40,
          //           unit: "m3",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "2",
          //           lineID: "6",
          //           processID: "11",
          //   },
          //   {
          //           id: 51,
          //           name: "Methan",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Lackiererei",
          //           production_process: "Teile lakieren",
          //           amount: 10,
          //           unit: "m3",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "3",
          //           lineID: "7",
          //           processID: "12",
          //   },
          //   {
          //           id: 34,
          //           name: "Öl",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Lackiererei",
          //           production_process: "Teile vorölen",
          //           amount: 5,
          //           unit: "l",
          //           interval: 1,
          //           is_input: true,
          //           is_private: false,

          //           facilityID: "3",
          //           lineID: "7",
          //           processID: "12",
          //   },
          //   {
          //           id: 35,
          //           name: "Öl",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Lackiererei",
          //           production_process: "Teile vorölen",
          //           amount: 4,
          //           unit: "l",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "3",
          //           lineID: "7",
          //           processID: "12",
          //   },
          //   {
          //           id: 24,
          //           name: "Energie",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Montage",
          //           production_process: "Verschraubung",
          //           amount: 300,
          //           unit: "kwh",
          //           interval: 1,
          //           is_input: true,
          //           is_private: false,

          //           facilityID: "3",
          //           lineID: "7",
          //           processID: "12",
          //   },
          //   {
          //           id: 14,
          //           name: "Wasser",
          //           is_emission: false,
          //           renewable_share: 0,
          //           is_internal_energy: false,
          //           production_facility: "Halle 9",
          //           production_line: "Montage",
          //           production_process: "Teile ",
          //           amount: 10,
          //           unit: "l",
          //           interval: 1,
          //           is_input: false,
          //           is_private: false,

          //           facilityID: "0",
          //           lineID: "0",
          //           processID: "0",
          //   },

          //   ],

          //LÖSCHEN------------------***********************--------------
        }

    },
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

.btnBack:hover, .btnBack:focus, .btnBack:active, .btnBack.active {
    background: white;
    border: 1px solid green;
    color: rgb(2, 91, 27);
}


</style>