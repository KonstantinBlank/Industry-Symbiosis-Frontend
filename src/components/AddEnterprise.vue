<template>

<div>

<nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/Home">Industry Symbiosis 5.0</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link activ" href="/Admin">Unternehmen A - Z</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" aria-current="page" href="/Add" >Unternehmen hinzufügen</a>
        </li>
      </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      </div>
       </nav>
       <div>
  <button @click= "$router.push({path:`/Admin`})" class="btnBack">&larr; Zurück</button>

</div>
<div class="border-bottom" style="margin-left: 7%; margin-right: 7%"></div>

<div class="container-fluid">
  <div class="row">
      <div class="col-md-8">
        <form id="InputForm">
          <div class="mt-3 mb-3">
            <h5>Neues Unternehmen anlegen</h5>
          </div>
     
          <div class="mb-3 mt-3">
            <label class="form-label" for="input">Firmenname: </label>
            <input class="form-control" type="text" v-model="Fname">
          </div>

          <div class="mt-3 mb-3">
            <p>Adresse</p>
         </div>

          <div class="mb-3 mt-3">
            <label class="form-label"  for="input">Straße: </label>
            <input class="form-control" type="text" v-model="Fstraße">
          </div>
    
          <div class="mb-3 mt-3">
            <label class="form-label"  for="input">Nummer: </label>
            <input class="form-control" type="text" v-model="Fnummer">
          </div>

          <div class="mb-3 mt-3">
            <label class="form-label"  for="input">Postleitzahl: </label>
            <input class="form-control" type="text" v-model="postcode">
          </div>

          <div class="mb-3 mt-3">
            <label class="form-label"  for="input">Stadt: </label>
            <input class="form-control" type="text" v-model="city">
          </div>

        </form>
      </div>
      <div class="col-md-6">
        <form>

      </form>

          <!-- Button Save  / Zurück-->
          <div class="d-flex justify-content-between mt-3 mb-3">
            <button class="btn btn-success" type="button" @click="handleSubmit(), $router.push('/Admin')" form="InputForm">Speichern</button>
        </div>

      </div>
  </div>

</div>

</div>
      
</template>

<script>

import axios from "axios";

export default {
  name: 'AddEnterprise',
  props: {
    
  },

  data() {
    return {
      url: '',
      Fname: '',
      Fstraße: '',
      Fnummer: '',
      postcode: '',
      city: '',
      Vname: '',
      Nname: '',
      Mail: '',
      Tnummer: '',
      NewUser: []
    }
  },

  methods: {
    addMitarbeiter() {
      this.NewUser.push({
        Mvorname: '' ,
        Mnachname: '',
        Memail: '',
      })
    },
    // array.splice(index, howmany, item1, ....., itemX)
    // At position index(0,1,2,...), remove 1 element, add 0 elements: 
    deleteMitarbeiter(index) {
      this.inputs.splice(index,1)
    },
    
    handleSubmit() {

      let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/create/');
      url.searchParams.set('name', this.Fname);
      url.searchParams.set('PostAddressRecord1', this.Fstraße);
      url.searchParams.set('PostAddressRecord2', this.Fstraße);
      url.searchParams.set('Street', this.Fstraße);
      url.searchParams.set('Housenumber', this.Fnummer);
      url.searchParams.set('postcode', this.postcode);
      url.searchParams.set('city', this.city);
      

      axios
        .post(url, {
        })
        .then((response) => {
          console.log(response)

        })
        .catch((e) => {
          console.log(e)
        });

    },

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

[aria-current="page"] {

  border-bottom: 2px solid rgb(0, 50, 14);
}


</style>
