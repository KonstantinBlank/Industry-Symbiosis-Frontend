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
          <a class="nav-link activ" href="/Add" >Unternehmen hinzufügen</a>
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
            <h5>Daten ändern</h5>
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
<!-- Ansprechpartner -->
        </form>
      </div>
      <div class="col-md-6">
        <form>
  
            <div v-for="(user, index) in User" v-bind:key="user" class="mt-3 mb-3">
                <p>{{index +1}}. Mitarbeiter</p>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Vorname: </label>
                  <input class="form-control" type="text" v-model="user.first_name">
                </div>

                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Nachname: </label>
                  <input class="form-control" type="text" v-model="user.surname">
                </div>

                 <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Email: </label>
                  <input class="form-control" type="email" v-model="user.email">
                </div>


              <div class="mt-3 mb-3">
                <button class="btn btn-danger" type="button" @click="deleteMitarbeiter(index)">Mitarbeiter {{index +1}} entfernen</button>
              </div>

            </div>
            <div v-for="(user, index) in NewUser" v-bind:key="user" class="mt-3 mb-3">
                <p>Neuer Mitarbeiter</p>
                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Vorname: </label>
                  <input class="form-control" type="text" v-model="user.first_name">
                </div>

                <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Nachname: </label>
                  <input class="form-control" type="text" v-model="user.surname">
                </div>

                 <div class="mt-3 mb-3">
                  <label class="form-label" for="input">Email: </label>
                  <input class="form-control" type="email" v-model="user.email">
                </div>


              <div class="mt-3 mb-3">
                <button class="btn btn-danger" type="button" @click="deleteMitarbeiter(index)">Mitarbeiter {{index +1}} entfernen</button>
              </div>

            </div>

            <div class="mt-3 mb-3">
              <button class="btn btn-info" type="button" @click="addMitarbeiter()">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 20 20">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> Mitarbeiter
            </button>
          </div>

      </form>

        <!-- Button add MA -->
        

          <!-- Button Save  / Zurück-->
          <div class="d-flex justify-content-between mt-3 mb-3">
            <button class="btn btn-success" type="button" @click="handleUpdate(), $router.push('/Admin')" form="InputForm">Update</button>
        </div>

      </div>
  </div>

  {{this.url}}
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
      url2: '',
      url3: '',
      enterpriseId: this.$route.params.id,
      Fname: '',
      Fstraße: '',
      Fnummer: '',
      postcode: '',
      city: '',
      addressId: '',
      Vname: '',
      Nname: '',
      Mail: '',
      Tnummer: '',
      inputs: [],
      enterprises: [],
      User: [],
      NewUser: [],
    }
  },

  async created() {
  
  try {
    const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/get/' + this.$route.params.id);
    this.enterprises = res.data
    this.enterpriseId = res.data[0].enterpriseId
    this.Fname = res.data[0].name;
    this.Fstraße = res.data[0].street;
    this.Fnummer = res.data[0].house_number;
    this.postcode = res.data[0].postcode;
    this.city = res.data[0].city;
    this.addressId = res.data[0].addressId;
  }
    catch(e) {
      console.error(e);
    }

    try {
        const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + this.$route.params.id);
        this.User = res.data;
    }
    catch(e) {
        console.error(e);
    }
  
},

  methods: {
    addMitarbeiter() {
      this.NewUser.push({
        first_name: '' ,
        surname: '',
        email: '',
      })
    },
    // array.splice(index, howmany, item1, ....., itemX)
    // At position index(0,1,2,...), remove 1 element, add 0 elements: 
    deleteMitarbeiter(index) {
      this.User.splice(index,1)
    },
    
    handleUpdate() {

      let url = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/update/');
      url.searchParams.set('enterpriseId', this.enterpriseId);
      url.searchParams.set('addressId', this.addressId);
      url.searchParams.set('name', this.Fname);
      url.searchParams.set('street', this.Fstraße);
      url.searchParams.set('city', this.city);
      url.searchParams.set('houseNumber', this.Fnummer);
     
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


       
        
      for(let i = 0; i < this.User.length; i++) {
        let url2 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/update/');
        url2.searchParams.set('userId',this.User[i].id );
        url2.searchParams.set('email', this.User[i].email );
       
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
      for(let a = 0; a < this.NewUser.length; a++) {
        let url3 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/users/create/');
        url3.searchParams.set('enterpriseId',this.enterpriseId );
        url3.searchParams.set('firstName', this.NewUser[a].first_name );
        url3.searchParams.set('surname', this.NewUser[a].surname );
        url3.searchParams.set('email', this.NewUser[a].email );
       
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
