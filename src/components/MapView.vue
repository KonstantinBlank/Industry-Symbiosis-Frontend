<template>
  <div class="wrapper">
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
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" :href="'/SankeyView/' + enterpriseId + '/' + firstname">Sankey</a>
        </li>
        <li class="nav-item">
          <a class="nav-link activ" style="color:rgb(0, 50, 14)" aria-current="page" :href="'/MapView/' + enterpriseId + '/' + firstname">Map</a>
        </li>
      </ul>
      <a class="Abmelden" v-if="isAbmelden" href="/Login">{{firstname}} abmelden</a>
      <button class="AvatarButton bg-light" type="button" @click="isAbmelden=!isAbmelden">
        <avatar :fullname= this.firstname :size="36" color="rgb(0, 50, 14)"></avatar>
      </button>
      </div>
      </div>
    </nav>

  <h5 style="margin-top: 2rem; margin-left: 1rem; color: rgb(2, 91, 27);">Map</h5>
  <div class="border-bottom"></div>
    <div style="margin-bottom: 1rem;"></div>
    <div id="map" class="" style="height: 40rem; width: 100%;"></div>

  </div>

  
</template>



<script>
import leaflet, {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Avatar from 'vue-avatar-component';

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

export default {
  components: {Avatar},
data() {
    return {
        hover: false,
        isAbmelden: false,
        firstname: this.$route.params.Username,
        enterpriseId: this.$route.params.id,
        enterprises: [],
        map: null,
        // polygon: null
        marker: null,
        geoData: 'hello',
        url: '',
        url2: '',
        street: 'Schlüterstraße',
        number: '29',
        city: 'Berlin',
        lat: null,
        lng: null,
        addresses: [],
        geoDataAr: [],

    };
},

async created() {
      
      let url2 = new URL('https://enterprisemanagementservice2.azurewebsites.net/api/enterprises/get/all');

      this.url2 = url2;
      await axios.get(this.url2)
          .then(response2 => this.enterprises = response2.data);

      for (var i = 0; i < this.enterprises.length; i++) {
        this.addresses.push({
          name: this.enterprises[i].name,
          number: this.enterprises[i].house_number ,
          street: this.enterprises[i].street ,
          city: this.enterprises[i].city,
        })
      }

      for (var a = 0; a < this.addresses.length; a++) {
        let url = new URL('https://nominatim.openstreetmap.org/search');
      let search = String([this.addresses[a].number +' '+ this.addresses[a].street +' '+ this.addresses[a].city]);
      url.searchParams.set('q', search);
      url.searchParams.set('format', 'geojson');
    
      this.url = url;
      
      await axios.get(this.url)
          .then(response => this.geoData = response.data.features[0].geometry.coordinates);
          this.geoDataAr.push({
            coordinates: this.geoData,
            name: this.addresses[a].name,
            index: a
          });
        this.showLocation(a)
      }

      

    },

// watch: {
//     // whenever geoData changes, this function will run
//     geoData() {
      
//         this.showLocation();

//     }
// },


mounted: function () {
        
        this.map = leaflet.map('map').setView([52.513, 13.344], 11); 
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            // attribution: '© OpenStreetMap'
        }).addTo(this.map);
       
        // this.polygon = leaflet.polygon([
        //     [52.5, 13.344],
        //     [52.5, 13.244],
        //     [52.52, 13.244]
        // ]).addTo(this.map);



    },

  methods: {

      showLocation (a) {
      this.marker = leaflet.marker([this.geoData[1],this.geoData[0] ]).addTo(this.map);
      this.marker.bindPopup(this.geoDataAr[a].name).openPopup();
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

</style>