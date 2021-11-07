import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {

  map: any;


    greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  violetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  redIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-truck-ecommerce-icongeek26-linear-colour-icongeek26.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  
  

  
  
  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }


  csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {} as any;
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

      this.addmarkers(obj)
    }

    //return result; //JavaScript object
    console.log(result[0]["cluster"]); //JSON
  }
//parse pour les centres
  csvJSON2(csv) {

    var lines = csv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {} as any;
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

      this.addcenters(obj)
    }

    //return result; //JavaScript object
    console.log(result[0]["cluster"]); //JSON
  }


  readFile(event) {

    const file: File = event.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = (event) => {


      this.csvJSON(reader.result);
    }
    reader.readAsText(file);


  }
//reader pour les centres
  readFile2(event){
    const file: File = event.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = (event) => {


      this.csvJSON2(reader.result);
    }
    reader.readAsText(file);

  }



  addmarkers(balle) {

    if (balle['latitude']!== undefined && balle['longitude']!==undefined){
      var x :number = +balle['latitude']
      var y :number = +balle['longitude']
      var cluster :number= +balle['cluster']

    
    var coordonnees = {
      lat: x, lon: y
    }
    console.log(coordonnees)

    if(cluster===1){
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.greenIcon }); marker.addTo(this.map);
    }

    else if(cluster==2){
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.blueIcon }); marker.addTo(this.map);
    }
    else if(cluster==3){
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.yellowIcon }); marker.addTo(this.map);
    }
    else if(cluster==4){
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.violetIcon }); marker.addTo(this.map);
    }
    else if(cluster==5){
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.goldIcon }); marker.addTo(this.map);
    }

    else {
      const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.orangeIcon }); marker.addTo(this.map);
    }
    
    
    }
    
  }
  

  addcenters(balle) {

    if (balle['latitude']!== undefined && balle['longitude']!==undefined){
      var x :number = +balle['latitude']
      var y :number = +balle['longitude']
      

    
    var coordonnees = {
      lat: x, lon: y
    }
    console.log(coordonnees)
    const marker = L.marker([coordonnees.lat, coordonnees.lon], { icon: this.redIcon }); marker.addTo(this.map);
    
    this.map.panTo(new L.LatLng(coordonnees.lat, coordonnees.lon));
    
    }


    
  }
  
  createMap() {

    const coordonnees = {
      lat: 52.16290738925603,
      lon: 11.05
    }

    const zoomLevel = 16;

    this.map = L.map('map', {
      center: [coordonnees.lat, coordonnees.lon],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 8,
      maxZoom: 25,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);


    


  }




}