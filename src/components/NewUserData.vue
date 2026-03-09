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
        <div class="col-md-6">

          <!-- ------Facility -->
        <form v-show="identifier === 'facility'" id="InputForm">
          <div class="d-flex flex-row">

              <div class="" style="width: 70%">
                <h5 style="margin-top: 2rem; color: rgb(2, 91, 27);">Neuen Standort anlegen:</h5>
              </div>

              </div>
              <div class="border-bottom"></div>
     
          <div class="col-md-12 mb-3 mt-3">
            <label class="form-label" for="input">Name des Standorts:</label>
            <input class="form-control" type="text" v-model="Facilities[0].name">
          </div>

          <!-- <div class="mt-3 mb-3">
            <p><b>Adresse</b></p>
         </div> -->

        <!-- <div class="col-md-12 mb-3 mt-3">
            <label class="form-label" for="input">Adresszusatz 1:</label>
            <input class="form-control" type="text" v-model="Facilities[0].postAddressRecord1">
        </div>

        <div class="col-md-12 mb-3 mt-3">
          <label class="form-label" for="input">Adressezusatz 2:</label>
          <input class="form-control" type="text" v-model="Facilities[0].postAddressRecord2">
        </div> -->

        <div>
          <div class="row d-flex justify-content-between">
          <div class="col-md mb-3 mt-3">
            <label class="form-label"  for="input">Straße: </label>
            <input class="form-control" type="text" v-model="Facilities[0].street">
        </div>
    
          <div class="col-md-4 col-sm-12 mb-3 mt-3">
            <label class="form-label"  for="input">Hausnummer: </label>
            <input class="form-control" type="number" v-model="Facilities[0].housenumber">
          </div>
          </div>
        </div>

          <div class="row d-flex justify-content-between">
            <div class="col-md-4 mb-3 mt-3">
              <label class="form-label"  for="input">Postleitzahl: </label>
              <input class="form-control" type="number" v-model="Facilities[0].postcode">
            </div>
  
            <div class="col-md mb-3 mt-3">
              <label class="form-label"  for="input">Stadt: </label>
              <input class="form-control" type="text" v-model="Facilities[0].city">
            </div>
          </div>
      

          <!-- ----------Line -->
        </form>
        <form v-show="identifier === 'line'" id="InputForm">
          <div class="d-flex flex-row">
            <div class="" style="width: 70%">
              <h5 style="margin-top: 2rem; color: rgb(2, 91, 27);">Neue Produktionslinie anlegen:</h5>
            </div>
          </div>

          <div class="border-bottom"></div>
    
          <div class="col-md-12 mb-3 mt-3">
            <label class="form-label" for="input">Name der Produktionslinie:</label>
            <input class="form-control" type="text" v-model="Facilities[0].name">
          </div>

          <div>
            <div class="row d-flex justify-content-between">
            <div class="col-md mb-3 mt-3">
              <label class="form-label"  for="input">Straße: </label>
            <input class="form-control" type="text" v-model="Facilities[0].street">
          </div>
    
          <div class="col-md-4 col-sm-12 mb-3 mt-3">
            <label class="form-label"  for="input">Hausnummer: </label>
            <input class="form-control" type="number" v-model=" [0].housenumber">
          </div>
          </div>
        </div>      
        </form>



        <div class="col-md-12">
      <!-- Button Save-->
      <div class="d-flex justify-content-end mt-3 mb-3">
        <button @click="handleSubmit(this.identifier), $router.push({path:`/UserData${'/'+this.enterpriseId+'/'+this.firstname}`})" class="btn btn-success" type="button" form="InputForm">Speichern</button>
    </div>
    
  </div>
  </div>
      
  </div>
</div>

</div>
</template>

<script>

import Avatar from 'vue-avatar-component';
import axios from 'axios';

export default {
  components: {Avatar},

  beforeMount() {
        var identifier = this.$route.params.identifier

        return identifier;
    } ,

  methods: {

    handleSubmit(ident) {

      if (ident === 'facility') {
        let url = new URL('https://datamanagementservice2.azurewebsites.net/api/production_facilities/create/');
        url.searchParams.set('enterpriseId', this.enterpriseId);
        url.searchParams.set('facilityName', this.Facilities[0].name);
        url.searchParams.set('postAddressRecord1', '-'/*this.postAddressRecord1*/);
        url.searchParams.set('postAddressRecord2', '-'/*this.postAddressRecord2*/);
        url.searchParams.set('street', this.Facilities[0].street);
        url.searchParams.set('houseNumber', this.Facilities[0].housenumber);
        url.searchParams.set('postcode', this.Facilities[0].postcode);
        url.searchParams.set('city', this.Facilities[0].city);
        console.log(url);
        axios
          .post(url, {
          })
          .then((response) => {
            console.log(response)
          
          })
          .catch((e) => {
            console.log(e)
          });
      }       
    },

    addProdLine() {
      this.Facilities[0].lines.push({
        name: '' ,
        processes: [],
      })
    },

    addProcess(index) {
      this.Facilities[0].lines[index].processes.push({
        p_name: '',
        inputs: [{
          stream_name: '', 
          stream_amount: '', 
          stream_unit: '', 
          stream_period: '', 
          stream_public: false,
        }],
        outputs: [{
          stream_name: '', 
          stream_amount: '', 
          stream_unit: '', 
          stream_period: '', 
          stream_public: false,
        }],
      })
    },

    addInput(i, index) {
      this.Facilities[0].lines[index].processes[i].inputs.push({
        stream_name: '', 
        stream_amount: '', 
        stream_unit: '', 
        stream_period: '', 
        stream_public: false,
      })
    },

    addOutput(i, index) {
      this.Facilities[0].lines[index].processes[i].outputs.push({
        stream_name: '', 
        stream_amount: '', 
        stream_unit: '', 
        stream_period: '', 
        stream_public: false,
      })
    },

    deleteProdLine(index) {
      this.Facilities[0].lines.splice(index,1)
    },

    deleteProcess(i, index) {
      this.Facilities[0].lines[index].processes.splice(i,1)
    },

    deleteInput(a, i, index) {
      this.Facilities[0].lines[index].processes[i].inputs.splice(a,1)
    },

    deleteOutput(a, i, index) {
      this.Facilities[0].lines[index].processes[i].outputs.splice(a,1)
    },

    
  },
  // computed: {
  //   idToNumber() {
  //     return parseInt(this.$route.params.id)
  //   }
  // },
  data () {
    return {
      identifier: this.$route.params.identifier,
      firstname: this.$route.params.Username,
      enterpriseId: this.$route.params.id,
      postAddressRecord1: '',
      postAddressRecord2: '',
      hover: false,
      isAbmelden: false,
      User: [],
      Facilities: [
        {
          name: '',
          postcode: '',
          street: '',
          city: '',
          nousenumber: '',
          postAddressRecord1: '',
          postAddressRecord2: '',
        }
      ],
    //   ProductionLines: [
    //     {
    //       name: '',
    //       facility_id: ''
    //     }
    //   ],
    //   ProductionProcesses:[
    //     {
    //       name: '',
    //       productionLineId: '' 
    //     }
    //   ],
    //   Stream:[
    //     {
    //       productionLineProcess: '',
    //       is_input: '',
    //       material: '',
    //       amount: '',
    //       interval: '',
    //       start_date: '',
    //       end_date: '',
    //       is_private: ''
    //     }
    //   ]
    }
  }
}






</script>

<style>

[aria-current="page"] {

  border-bottom: 2px solid rgb(0, 50, 14);

}

</style>