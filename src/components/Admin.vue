<template>

  <div>
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
              <a class="nav-link activ" style="color: #004D40;" aria-current="page" href="/Admin">Unternehmen A - Z</a>
            </li>
            <li class="nav-item">
              <a class="nav-link activ" style="color: #004D40;" href="/Add">Unternehmen hinzufügen</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div class="container p-4">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item" v-for="(enterprise) in enterprises" :key="enterprise.name">
          <h2 class="accordion-header" :id="'heading'+enterprise">
            <!-- <button class="accordion-button" :class="{ 'collapsed': index !== 0 }" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+item.id" aria-expanded="true" :aria-controls="'collapse'+item"> -->
            <button @click="getUser(enterprise.enterpriseId)" class="accordion-button" :class="{ 'collapsed': true }"
              type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+enterprise.enterpriseId"
              aria-expanded="true" :aria-controls="'collapse'+enterprise.enterpriseId">
              <strong>
                {{enterprise.name}}
              </strong>
            </button>
          </h2>
          <!-- <div :id="'collapse'+item.id" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" :aria-labelledby="'heading'+item" data-bs-parent="#accordionExample"> -->
          <div :id="'collapse'+enterprise.enterpriseId" class="accordion-collapse collapse" :class="{ 'show': false }"
            :aria-labelledby="'heading'+enterprise.id" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <h4 class="m-2">Adresse:</h4>

              <div class="table-responsive">

                <table class="table">
                  <thead class="table">
                    <tr>
                      <th scope="col">Straße</th>
                      <th scope="col">Hausnummer</th>
                      <th scope="col">Stadt</th>
                      <th scope="col">PLZ</th>
                      <th scope="col">Zusatzadresse 1</th>
                      <th scope="col">Zusatzadresse 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">{{enterprise.street}}</td>
                      <td>{{enterprise.house_number}}</td>
                      <td>{{enterprise.city}}</td>
                      <td>{{enterprise.postcode}}</td>
                      <td>{{enterprise.address_record_1}}</td>
                      <td>{{enterprise.address_record_2}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br>

              <div class="table-responsive">

                <table class="table">
                  <thead class="table">
                    <tr>
                      <th scope="col">Nachname</th>
                      <th scope="col">Vorname</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user) in User" :key="user">
                      <td scope="row">{{user.surname}}</td>
                      <td>{{user.first_name}}</td>
                      <td>{{user.email}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <button class="rounded-pill btn btn-success mt-3" type="button"
                @click="editEnterprise(enterprise.enterpriseId), $router.push({path:`/UpdateEnterprise${'/'+enterprise.enterpriseId}`})">Bearbeiten</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'HomePage',
  props: {
    msg: String
  },

  data() {
    return {
      User: [],
      enterprises: [],
      firma: [],
      url: null,

    };
  },




  methods: {

    async getUser(Id) {
      try {
        const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/users/get/enterprise/' + Id);
        this.User = res.data;
      }
      catch (e) {
        console.error(e);
      }
    },

    deleteEnterprise(index, Fname) {
      alert(Fname + ' wird gelöscht')
      this.items.splice(index, 1)
    },

    async editEnterprise(id) {
      try {
        const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/get/' + id);
        this.firma = res.data[0].name;
      }
      catch (e) {
        console.error(e);
      }
    }
  },


  //API Read
  async created() {

    try {
      const res = await axios.get('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/get/all');
      this.enterprises = res.data;
    }
    catch (e) {
      console.error(e);
    }

  },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[aria-current="page"] {

  border-bottom: 2px solid rgb(0, 50, 14);

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
</style>
