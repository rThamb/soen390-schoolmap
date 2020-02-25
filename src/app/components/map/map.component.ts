import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


//May have to remove
import { Location } from '../../models/Location';




declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  map;

  @ViewChild('googleMap', {static: false}) googleMap: ElementRef; 

  private userLocation: Location;

  constructor(private geolocation: Geolocation) { 
      this.userLocation = new Location(0, 0 ,0);
  }

  ngAfterViewInit(): void{
    this.getCurrentLocation();
  }

  getCurrentLocation(): void{
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation = new Location(resp.coords.longitude, resp.coords.latitude, resp.coords.altitude);
      this.showMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  showMap(){

    var mylocation = new google.maps.LatLng(this.userLocation.latitude,this.userLocation.longitude);
    
    var mapOptions = {
      zoom: 15,
      center: mylocation,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: mylocation,
      map: this.map,
      title: 'Here'
    });

    //Layers on buildings
    //SGW Campus
    var hall = 
    [
      {lat: 45.497372, lng: -73.578338},
      {lat: 45.496826, lng: -73.578859},
      {lat: 45.497164, lng: -73.579543},
      {lat: 45.497710, lng: -73.579034}
    ];

    var faubourg =
    [
      {lat: 45.494662, lng: -73.577218},
      {lat: 45.494703, lng: -73.577300},
      {lat: 45.494692, lng: -73.577308},
      {lat: 45.494775, lng: -73.577450},
      {lat: 45.494764, lng: -73.577466},
      {lat: 45.494809, lng: -73.577541},
      {lat: 45.494801, lng: -73.577549},
      {lat: 45.494843, lng: -73.577627},
      {lat: 45.494836, lng: -73.577633},
      {lat: 45.494877, lng: -73.577706},
      {lat: 45.494870, lng: -73.577712},
      {lat: 45.494912, lng: -73.577785},
      {lat: 45.494365, lng: -73.578432},
      {lat: 45.494372, lng: -73.578448},
      {lat: 45.494299, lng: -73.578537},
      {lat: 45.494291, lng: -73.578523},
      {lat: 45.493816, lng: -73.579075},
      {lat: 45.493618, lng: -73.578727},
      {lat: 45.493843, lng: -73.578461},
      {lat: 45.493830, lng: -73.578433},
      {lat: 45.493881, lng: -73.578373},
      {lat: 45.493892, lng: -73.578391},
      {lat: 45.493920, lng: -73.578352},
      {lat: 45.493907, lng: -73.578336},
      {lat: 45.494101, lng: -73.578113},
      {lat: 45.494108, lng: -73.578125},
      {lat: 45.494201, lng: -73.578012},
      {lat: 45.494185, lng: -73.577980},
      {lat: 45.494367, lng: -73.577771},
      {lat: 45.494387, lng: -73.577811},
      {lat: 45.494425, lng: -73.577767},
      {lat: 45.494384, lng: -73.577693},
      {lat: 45.494450, lng: -73.577614},
      {lat: 45.494397, lng: -73.577522}
      
      
    ];

    var molson =
    [
      {lat: 45.495180, lng: -73.578505},
      {lat: 45.495001, lng: -73.578726},
      {lat: 45.495033, lng: -73.578785},
      {lat: 45.495002, lng: -73.578819},
      {lat: 45.495172, lng: -73.579182},
      {lat: 45.495224, lng: -73.579123},
      {lat: 45.495361, lng: -73.579383},
      {lat: 45.495529, lng: -73.579205},
      {lat: 45.495444, lng: -73.578957}
    ];

    var EV =
    [
      {lat: 45.495168, lng: -73.577892},
      {lat: 45.495817, lng: -73.577209},
      {lat: 45.496062, lng: -73.577715},
      {lat: 45.495678, lng: -73.578086},
      {lat: 45.495870, lng: -73.578500},
      {lat: 45.495588, lng: -73.578774}
      
    ];

    var LB =
    [
      {lat: 45.496237, lng: -73.577711},
      {lat: 45.496489, lng: -73.577449},
      {lat: 45.496584, lng: -73.577650},
      {lat: 45.496633, lng: -73.577604},
      {lat: 45.496613, lng: -73.577558},
      {lat: 45.496890, lng: -73.577268},
      {lat: 45.497009, lng: -73.577540},
      {lat: 45.496982, lng: -73.577574},
      {lat: 45.497003, lng: -73.577623},
      {lat: 45.497041, lng: -73.577587},
      {lat: 45.497120, lng: -73.577747},
      {lat: 45.497079, lng: -73.577792},
      {lat: 45.497079, lng: -73.577792},
      {lat: 45.497141, lng: -73.577816},
      {lat: 45.497262, lng: -73.578063},
      {lat: 45.497020, lng: -73.578295},
      {lat: 45.497003, lng: -73.578258},
      {lat: 45.496959, lng: -73.578297},
      {lat: 45.496935, lng: -73.578252},
      {lat: 45.496896, lng: -73.578291},
      {lat: 45.496914, lng: -73.578331},
      {lat: 45.496871, lng: -73.578373},
      {lat: 45.496892, lng: -73.578425},
      {lat: 45.496726, lng: -73.578581},
      {lat: 45.496704, lng: -73.578535},
      {lat: 45.496669, lng: -73.578573}

    ];

    var visualArts =
    [
      {lat: 45.495393, lng: -73.573766},
      {lat: 45.495671, lng: -73.573496},
      {lat: 45.495816, lng: -73.573810},
      {lat: 45.496071, lng: -73.573557},
      {lat: 45.496188, lng: -73.573796},
      {lat: 45.495667, lng: -73.574318}
    ]

    var greyNuns =
    [

      {lat: 45.492592, lng: -73.576533},
      {lat: 45.492735, lng: -73.576394},
      {lat: 45.492900, lng: -73.576740},
      {lat: 45.492928, lng: -73.576746},
      {lat: 45.492949, lng: -73.576792},
      {lat: 45.492942, lng: -73.576831},
      {lat: 45.493026, lng: -73.577004},
      {lat: 45.493364, lng: -73.576673},
      {lat: 45.493341, lng: -73.576624},
      {lat: 45.493472, lng: -73.576496},
      {lat: 45.493494, lng: -73.576538},
      {lat: 45.493793, lng: -73.576244},
      {lat: 45.493570, lng: -73.575782},
      {lat: 45.493715, lng: -73.575641},
      {lat: 45.493934, lng: -73.576095},
      {lat: 45.494037, lng: -73.575993},
      {lat: 45.494127, lng: -73.576188},
      {lat: 45.494022, lng: -73.576284},
      {lat: 45.494393, lng: -73.577057},
      {lat: 45.494096, lng: -73.577348},
      {lat: 45.494126, lng: -73.577413},
      {lat: 45.493975, lng: -73.577562},
      {lat: 45.493869, lng: -73.577341},
      {lat: 45.494194, lng: -73.577020},
      {lat: 45.493899, lng: -73.576409},
      {lat: 45.493903, lng: -73.576664},
      {lat: 45.494068, lng: -73.577011},
      {lat: 45.493904, lng: -73.577172},
      {lat: 45.493718, lng: -73.576780},
      {lat: 45.493718, lng: -73.576780},
      {lat: 45.493839, lng: -73.576671},
      {lat: 45.493833, lng: -73.576470},
      {lat: 45.493553, lng: -73.576749},
      {lat: 45.493614, lng: -73.576875},
      {lat: 45.493670, lng: -73.576821},
      {lat: 45.493730, lng: -73.576946},
      {lat: 45.493673, lng: -73.576998},
      {lat: 45.493748, lng: -73.577157},
      {lat: 45.493635, lng: -73.577270},
      {lat: 45.493580, lng: -73.577153},
      {lat: 45.493601, lng: -73.577131},
      {lat: 45.493577, lng: -73.577081},
      {lat: 45.493529, lng: -73.577129},
      {lat: 45.493450, lng: -73.576964},
      {lat: 45.493478, lng: -73.576936},
      {lat: 45.493439, lng: -73.576854},
      {lat: 45.493353, lng: -73.576936},
      {lat: 45.493366, lng: -73.576960},
      {lat: 45.493108, lng: -73.577212},
      {lat: 45.493201, lng: -73.577401},
      {lat: 45.493089, lng: -73.577512},
      {lat: 45.492995, lng: -73.577314},
      {lat: 45.492924, lng: -73.577379},
      {lat: 45.492838, lng: -73.577198},
      {lat: 45.492896, lng: -73.577141},
      {lat: 45.492811, lng: -73.576962},
      {lat: 45.492811, lng: -73.576962},
      {lat: 45.492775, lng: -73.576972},
      {lat: 45.492710, lng: -73.577035},
      {lat: 45.492678, lng: -73.576966},
      {lat: 45.492677, lng: -73.576924},
      {lat: 45.492727, lng: -73.576876},
      {lat: 45.492746, lng: -73.576870},
      {lat: 45.492609, lng: -73.576584},
      {lat: 45.492615, lng: -73.576578}
    ]
    
    //Loyola Campus
    var scienceComplex =
    [
      {lat: 45.456982, lng: -73.640831},
      {lat: 45.457025, lng: -73.640938},
      {lat: 45.456996, lng: -73.640960},
      {lat: 45.457016, lng: -73.641016},
      {lat: 45.457040, lng: -73.640995},
      {lat: 45.457159, lng: -73.641298},
      {lat: 45.457148, lng: -73.641306},
      {lat: 45.457177, lng: -73.641384},
      {lat: 45.457169, lng: -73.641394},
      {lat: 45.457184, lng: -73.641432},
      {lat: 45.457210, lng: -73.641412},
      {lat: 45.457440, lng: -73.642004},
      {lat: 45.457642, lng: -73.641848},
      {lat: 45.457673, lng: -73.641925},
      {lat: 45.458327, lng: -73.641413},
      {lat: 45.458276, lng: -73.641284},
      {lat: 45.458210, lng: -73.641339},
      {lat: 45.458180, lng: -73.641262},
      {lat: 45.458255, lng: -73.641202},
      {lat: 45.458193, lng: -73.641041},
      {lat: 45.458338, lng: -73.640920},
      {lat: 45.458318, lng: -73.640860},
      {lat: 45.457999, lng: -73.641115},
      {lat: 45.457981, lng: -73.641065},
      {lat: 45.457893, lng: -73.641133},
      {lat: 45.457907, lng: -73.641169},
      {lat: 45.457524, lng: -73.641472},
      {lat: 45.457251, lng: -73.640764},
      {lat: 45.457245, lng: -73.640770},
      {lat: 45.457203, lng: -73.640655}
    ];

    var journalismBuilding = 
    [
      {lat: 45.457176, lng: -73.640391},
      {lat: 45.457281, lng: -73.640659},
      {lat: 45.457303, lng: -73.640639},
      {lat: 45.457333, lng: -73.640720},
      {lat: 45.457596, lng: -73.640501},
      {lat: 45.457649, lng: -73.640632},
      {lat: 45.457831, lng: -73.640485},
      {lat: 45.457755, lng: -73.640292},
      {lat: 45.457726, lng: -73.640314},
      {lat: 45.457623, lng: -73.640045},
      {lat: 45.457484, lng: -73.640151},
      {lat: 45.457436, lng: -73.640027},
      {lat: 45.457448, lng: -73.639944},
      {lat: 45.457463, lng: -73.639952},
      {lat: 45.457480, lng: -73.639821},
      {lat: 45.457429, lng: -73.639771},
      {lat: 45.457359, lng: -73.639763},
      {lat: 45.457281, lng: -73.639801},
      {lat: 45.457230, lng: -73.639882},
      {lat: 45.457211, lng: -73.639990},
      {lat: 45.457215, lng: -73.640021},
      {lat: 45.457305, lng: -73.640073},
      {lat: 45.457311, lng: -73.640049},
      {lat: 45.457362, lng: -73.640075},
      {lat: 45.457411, lng: -73.640208}      

    ]

    var chapel =
    [
      {lat: 45.458380, lng: -73.639038},
      {lat: 45.458391, lng: -73.639072},
      {lat: 45.458415, lng: -73.639054},
      {lat: 45.458427, lng: -73.639086},
      {lat: 45.458409, lng: -73.639100},
      {lat: 45.458427, lng: -73.639156},
      {lat: 45.458419, lng: -73.639162},
      {lat: 45.458429, lng: -73.639187},
      {lat: 45.458415, lng: -73.639193},
      {lat: 45.458440, lng: -73.639259},
      {lat: 45.458453, lng: -73.639251},
      {lat: 45.458513, lng: -73.639424},
      {lat: 45.458484, lng: -73.639444},
      {lat: 45.458509, lng: -73.639518},
      {lat: 45.458523, lng: -73.639512},
      {lat: 45.458533, lng: -73.639541},
      {lat: 45.458529, lng: -73.639559},
      {lat: 45.458540, lng: -73.639587},
      {lat: 45.458553, lng: -73.639593},
      {lat: 45.458583, lng: -73.639575},
      {lat: 45.458591, lng: -73.639597},
      {lat: 45.458601, lng: -73.639591},
      {lat: 45.458629, lng: -73.639666},
      {lat: 45.458754, lng: -73.639568},
      {lat: 45.458728, lng: -73.639490},
      {lat: 45.458734, lng: -73.639484},
      {lat: 45.458735, lng: -73.639471},
      {lat: 45.458716, lng: -73.639415},
      {lat: 45.458721, lng: -73.639403},
      {lat: 45.458711, lng: -73.639369},
      {lat: 45.458747, lng: -73.639345},
      {lat: 45.458724, lng: -73.639278},
      {lat: 45.458686, lng: -73.639302},
      {lat: 45.458672, lng: -73.639268},
      {lat: 45.458663, lng: -73.639288},
      {lat: 45.458607, lng: -73.639133},
      {lat: 45.458617, lng: -73.639074},
      {lat: 45.458601, lng: -73.639040},
      {lat: 45.458582, lng: -73.639032},
      {lat: 45.458572, lng: -73.639056},
      {lat: 45.458567, lng: -73.639040},
      {lat: 45.458555, lng: -73.639046},
      {lat: 45.458536, lng: -73.638994},
      {lat: 45.458518, lng: -73.639010},
      {lat: 45.458508, lng: -73.638984},
      {lat: 45.458531, lng: -73.638966},
      {lat: 45.458518, lng: -73.638934}
    ]

    var stingerDome =
    [
      {lat: 45.457375, lng: -73.637092},
      {lat: 45.456960, lng: -73.636352},
      {lat: 45.457930, lng: -73.635243},
      {lat: 45.458337, lng: -73.635960}
    ]

    var stingerStadium =
    [
      {lat: 45.457829, lng: -73.638338},
      {lat: 45.458803, lng: -73.637177},
      {lat: 45.458380, lng: -73.636432},
      {lat: 45.458152, lng: -73.636682},
      {lat: 45.458048, lng: -73.636523},
      {lat: 45.457869, lng: -73.636728},
      {lat: 45.457885, lng: -73.636762},
      {lat: 45.457733, lng: -73.636944},
      {lat: 45.457717, lng: -73.636921},
      {lat: 45.457518, lng: -73.637149},
      {lat: 45.457613, lng: -73.637314},
      {lat: 45.457394, lng: -73.637576}
    ]

    var vanierLibrary =
    [

      {lat: 45.458628, lng: -73.638459},
      {lat: 45.458712, lng: -73.638397},
      {lat: 45.458702, lng: -73.638354},
      {lat: 45.458866, lng: -73.638234},
      {lat: 45.458853, lng: -73.638191},
      {lat: 45.458886, lng: -73.638167},
      {lat: 45.458866, lng: -73.638119},
      {lat: 45.458900, lng: -73.638091},
      {lat: 45.458883, lng: -73.638038},
      {lat: 45.458910, lng: -73.638014},
      {lat: 45.458900, lng: -73.637990},
      {lat: 45.459044, lng: -73.637880},
      {lat: 45.459048, lng: -73.637899},
      {lat: 45.459081, lng: -73.637875},
      {lat: 45.459078, lng: -73.637856},
      {lat: 45.459106, lng:-73.637841},
      {lat: 45.459214, lng:-73.638136},
      {lat: 45.459138, lng:-73.638199},
      {lat: 45.459489, lng:-73.639138},
      {lat: 45.459370, lng:-73.639235},
      {lat: 45.459354, lng:-73.639212},
      {lat: 45.459337, lng:-73.639224},
      {lat: 45.459320, lng:-73.639178},
      {lat: 45.459265, lng:-73.639222},
      {lat: 45.459310, lng:-73.639324},
      {lat: 45.459237, lng:-73.639384},
      {lat: 45.459219, lng:-73.639334},
      {lat: 45.459104, lng:-73.639424},
      {lat: 45.458984, lng:-73.639129},
      {lat: 45.459096, lng:-73.639040},
      {lat: 45.459076, lng:-73.638996},
      {lat: 45.459138, lng:-73.638946},
      {lat: 45.459151, lng:-73.638982},
      {lat: 45.459217, lng:-73.638927},
      {lat: 45.459200, lng:-73.638883},
      {lat: 45.459089, lng:-73.638970},
      {lat: 45.459051, lng:-73.638863},
      {lat: 45.458852, lng:-73.639018},
      {lat: 45.458835, lng:-73.638976},
      {lat: 45.458826, lng:-73.638980}
      
    ]

    var psyBuilding =
    [

      {lat: 45.458722, lng: -73.640448},
      {lat: 45.458758, lng: -73.640420},
      {lat: 45.458754, lng: -73.640400},
      {lat: 45.458988, lng: -73.640219},
      {lat: 45.458998, lng: -73.640247},
      {lat: 45.459024, lng: -73.640225},
      {lat: 45.459019, lng: -73.640209},
      {lat: 45.459095, lng: -73.640144},
      {lat: 45.459273, lng: -73.640601},
      {lat: 45.459207, lng: -73.640653},
      {lat: 45.459190, lng: -73.640617},
      {lat: 45.459170, lng: -73.640605},
      {lat: 45.458846, lng: -73.640833},
      {lat: 45.458798, lng: -73.640714},
      {lat: 45.458817, lng: -73.640696}

    ]

    var adminBuilding =
    [
      {lat: 45.457789, lng: -73.639825},
      {lat: 45.457806, lng: -73.639820},
      {lat: 45.457810, lng: -73.639801},
      {lat: 45.457838, lng: -73.639780},
      {lat: 45.457848, lng: -73.639787},
      {lat: 45.457873, lng: -73.639768},
      {lat: 45.457892, lng: -73.639815},
      {lat: 45.457903, lng: -73.639811},
      {lat: 45.457915, lng: -73.639839},
      {lat: 45.458028, lng: -73.639751},
      {lat: 45.457982, lng: -73.639626},
      {lat: 45.458042, lng: -73.639581},
      {lat: 45.458096, lng: -73.639698},
      {lat: 45.458203, lng: -73.639617},
      {lat: 45.458190, lng: -73.639581},
      {lat: 45.458200, lng: -73.639571},
      {lat: 45.458183, lng: -73.639511},
      {lat: 45.458264, lng: -73.639454},
      {lat: 45.458375, lng: -73.639772},
      {lat: 45.458299, lng: -73.639818},
      {lat: 45.458278, lng: -73.639770},
      {lat: 45.457963, lng: -73.640007},
      {lat: 45.457989, lng: -73.640068},
      {lat: 45.457910, lng: -73.640124}
      
    
    ]

    var centralBuilding =
    [
      {lat: 45.458069, lng: -73.639998},
      {lat: 45.458377, lng: -73.640813},
      {lat: 45.458525, lng: -73.640692},
      {lat: 45.458220, lng: -73.639892}
    ]

    var jesuitHall = 
    [
      {lat: 45.458411, lng: -73.640858},
      {lat: 45.458469, lng: -73.641010},
      {lat: 45.458376, lng: -73.641085},
      {lat: 45.458424, lng: -73.641218},
      {lat: 45.458507, lng: -73.641137},
      {lat: 45.458545, lng: -73.641234},
      {lat: 45.458526, lng: -73.641250},
      {lat: 45.458537, lng: -73.641278},
      {lat: 45.458485, lng: -73.641320},
      {lat: 45.458504, lng: -73.641381},
      {lat: 45.458641, lng: -73.641272},
      {lat: 45.458647, lng: -73.641286},
      {lat: 45.458809, lng: -73.641159},
      {lat: 45.458804, lng: -73.641143},
      {lat: 45.458822, lng: -73.641127},
      {lat: 45.458784, lng: -73.641031},
      {lat: 45.458764, lng: -73.641049},
      {lat: 45.458696, lng: -73.640856},
      {lat: 45.458701, lng: -73.640848},
      {lat: 45.458684, lng: -73.640801},
      {lat: 45.458585, lng: -73.640878},
      {lat: 45.458540, lng: -73.640757}

    ]

    var athleticCamp =
    [
      {lat: 45.456385, lng: -73.637378},
      {lat: 45.456722, lng: -73.637094},
      {lat: 45.456678, lng: -73.636984},
      {lat: 45.456954, lng: -73.636764},
      {lat: 45.457289, lng: -73.637630},
      {lat: 45.457021, lng: -73.637850},
      {lat: 45.457027, lng: -73.637879},
      {lat: 45.456959, lng: -73.637929},
      {lat: 45.457009, lng: -73.638057},
      {lat: 45.456842, lng: -73.638190},
      {lat: 45.456795, lng: -73.638065},
      {lat: 45.456693, lng: -73.638149}
      
    ]

    var loyolaGym =
    [
      {lat: 45.456773, lng: -73.638254},
      {lat: 45.457041, lng: -73.638034},
      {lat: 45.457165, lng: -73.638349},
      {lat: 45.457049, lng: -73.638444},
      {lat: 45.457060, lng: -73.638478},
      {lat: 45.457030, lng: -73.638491},
      {lat: 45.457017, lng: -73.638459},
      {lat: 45.456886, lng: -73.638559},
      {lat: 45.456828, lng: -73.638419},
      {lat: 45.456800, lng: -73.638441},
      {lat: 45.456801, lng: -73.638443},
      {lat: 45.456763, lng: -73.638342},
      {lat: 45.456800, lng: -73.638312}
      
    ]

    var phyServiceBuilding =
    [
      {lat: 45.459281, lng:-73.639455},
      {lat: 45.459583, lng:-73.639218},
      {lat: 45.459624, lng:-73.639347},
      {lat: 45.459665, lng:-73.639315},
      {lat: 45.459981, lng:-73.640135},
      {lat: 45.459862, lng:-73.640229},
      {lat: 45.459852, lng:-73.640199},
      {lat: 45.459704, lng:-73.640312},
      {lat: 45.459639, lng:-73.640133},
      {lat: 45.459607, lng:-73.640155},
      {lat: 45.459412, lng:-73.639648},
      {lat: 45.459442, lng:-73.639622},
      {lat: 45.459404, lng:-73.639527},
      {lat: 45.459333, lng:-73.639578}
      
    ]

    var centerArts =
    [
      {lat: 45.459940, lng:-73.640871},
      {lat: 45.460042, lng:-73.640791},
      {lat: 45.460080, lng:-73.640894},
      {lat: 45.459976, lng:-73.640975}
            
    ]

    var saintIgnatius =
    [
      {lat: 45.457566, lng:-73.642399},
      {lat: 45.457627, lng:-73.642351},
      {lat: 45.457621, lng:-73.642335},
      {lat: 45.457641, lng:-73.642319},
      {lat: 45.457634, lng:-73.642300},
      {lat: 45.457645, lng:-73.642292},
      {lat: 45.457649, lng:-73.642302},
      {lat: 45.457689, lng:-73.642270},
      {lat: 45.457678, lng:-73.642240},
      {lat: 45.457730, lng:-73.642202},
      {lat: 45.457720, lng:-73.642180},
      {lat: 45.457776, lng:-73.642135},
      {lat: 45.457765, lng:-73.642105},
      {lat: 45.457833, lng:-73.642051},
      {lat: 45.457823, lng: -73.642021},
      {lat: 45.457860, lng: -73.641991},
      {lat: 45.457877, lng: -73.642049},
      {lat: 45.457942, lng: -73.642001},
      {lat: 45.457942, lng: -73.642001},
      {lat: 45.457997, lng: -73.642079},
      {lat: 45.458053, lng: -73.642234},
      {lat: 45.458039, lng: -73.642268},
      {lat: 45.458099, lng: -73.642417},
      {lat: 45.458113, lng: -73.642395},
      {lat: 45.458169, lng: -73.642518},
      {lat: 45.457960, lng: -73.642682},
      {lat: 45.457912, lng: -73.642554},
      {lat: 45.457937, lng: -73.642532},
      {lat: 45.457917, lng: -73.642475},
      {lat: 45.457857, lng: -73.642524},
      {lat: 45.457844, lng: -73.642495},
      {lat: 45.457795, lng: -73.642536},
      {lat: 45.457782, lng: -73.642501},
      {lat: 45.457740, lng: -73.642534},
      {lat: 45.457730, lng: -73.642507},
      {lat: 45.457638, lng: -73.642578}
      
    ]

    var structuralCenter =
    [
      {lat: 45.456801, lng: -73.640345},
      {lat: 45.457045, lng: -73.640162},
      {lat: 45.457145, lng: -73.640441},
      {lat: 45.457129, lng: -73.640453},
      {lat: 45.457175, lng: -73.640572},
      {lat: 45.456947, lng: -73.640740},
      {lat: 45.456920, lng: -73.640673},
      {lat: 45.456895, lng: -73.640689},
      {lat: 45.456871, lng: -73.640627},
      {lat: 45.456896, lng: -73.640611}
           
    ]

    var jesuitResidence =
    [
      {lat: 45.458397, lng: -73.643153},
      {lat: 45.458469, lng: -73.643097},
      {lat: 45.458480, lng: -73.643123},
      {lat: 45.458491, lng: -73.643113},
      {lat: 45.458486, lng: -73.643099},
      {lat: 45.458539, lng: -73.643055},
      {lat: 45.458570, lng: -73.643131},
      {lat: 45.458583, lng: -73.643119},
      {lat: 45.458625, lng: -73.643220},
      {lat: 45.458607, lng: -73.643236},
      {lat: 45.458634, lng: -73.643308},
      {lat: 45.458566, lng: -73.643367},
      {lat: 45.458560, lng: -73.643348},
      {lat: 45.458494, lng: -73.643401},
      {lat: 45.458465, lng: -73.643328},
      {lat: 45.458449, lng: -73.643342},
      {lat: 45.458410, lng: -73.643242},
      {lat: 45.458428, lng: -73.643228}
          
    ]

    var studentResidences =
    [
      {lat: 45.458929, lng: -73.641832},
      {lat: 45.459386, lng: -73.641478},
      {lat: 45.459239, lng: -73.641076},
      {lat: 45.459516, lng: -73.640867},
      {lat: 45.459691, lng: -73.641350},
      {lat: 45.459401, lng: -73.641572},
      {lat: 45.459562, lng: -73.641988},
      {lat: 45.459701, lng: -73.641883},
      {lat: 45.459715, lng: -73.641919},
      {lat: 45.459825, lng: -73.641829},
      {lat: 45.459899, lng: -73.642014},
      {lat: 45.459784, lng: -73.642104},
      {lat: 45.459796, lng: -73.642136},
      {lat: 45.459622, lng: -73.642273},
      {lat: 45.459498, lng: -73.641949},
      {lat: 45.459360, lng: -73.642058},
      {lat: 45.459365, lng: -73.642072},
      {lat: 45.459341, lng: -73.642088},
      {lat: 45.459363, lng: -73.642144},
      {lat: 45.459162, lng: -73.642303},
      {lat: 45.459141, lng: -73.642245},
      {lat: 45.459105, lng: -73.642271}
    ]
    this.map.data.add({geometry: new google.maps.Data.Polygon([hall, molson, EV, LB, visualArts, greyNuns, scienceComplex, journalismBuilding, chapel, stingerDome, stingerStadium, 
    vanierLibrary, psyBuilding, adminBuilding, centralBuilding, jesuitHall, athleticCamp, loyolaGym, phyServiceBuilding, centerArts, saintIgnatius, structuralCenter, jesuitResidence, studentResidences, faubourg])})
    
    this.map.data.setStyle({
      fillColor: 'deepskyblue'
    });

    //Text properties for all buildings
    var markerColor = 'purple';
    var fontWeight = 'bold';
    var fontSize = '16px';
    var iconEmpty = '../res/img/empty.png';

    //Hall Building Marker and info window
    var hallMarker = new google.maps.Marker
    ({
      position: {lat: 45.497092, lng: -73.578974},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'HALL',
          fontSize: fontSize,
      },
    });

    hallMarker.setMap(this.map);

    var hallInfo = new google.maps.InfoWindow({content:""});

    var hallContent =
    "<ion-list> <ion-header align='center'><ion-title>Henry F. Hall Building </ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address:</b> 1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8</ion-label> </ion-item>"+
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Geography, Planning and Environment</option>"+
    "<option value=''>Political Science, Sociology and Anthropology, Economics</option>"+
    "<option value=''>School of Irish Studies</option>" +
    "</select></ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Welcome Crew Office</option>"+
    "<option value=''>DB Clarke Theatre</option>"+
    "<option value=''>Dean of Students</option>" +
    "<option value=''>Aboriginal Student Resource Centre</option>"+
    "<option value=''>Concordia Student Union</option>"+
    "<option value=''>IT Service Desk</option>"+
    "<option value=''>Security Office</option>" +
    "<option value=''>Student Success Centre</option>"+
    "<option value=''>Mail Services</option>"+
    "<option value=''>Archives</option>"+
    "<option value=''>Career and Planning Services</option>"+
    "<option value=''>Sexual Assault Ressource Centre (SARC)</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%' src=assets/BuildingImages/HallBuilding.jpg></div>" +
    "<div align ='center'><ion-button id='hall'>Enter Building</ion-button></div>"

    google.maps.event.addListener(hallMarker, 'click', function() 
    {
      hallInfo.setContent(hallContent);

      hallInfo.open(this.map, hallMarker);
    });

    hallInfo.addListener('domready', () => {
      document.getElementById("hall").addEventListener("click", () => {
        this.enterBuilding("hall");
      });
    });


    //EV Building Marker and info window
    var EVMarker = new google.maps.Marker
    ({
      position: {lat: 45.495470, lng: -73.577780},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'EV',
          fontSize: fontSize,
      },
    });

    EVMarker.setMap(this.map);
    
    var EVInfo = new google.maps.InfoWindow({content:""});

    var EVContent =
    "<ion-list> <ion-header align='center'><ion-title>Engineering, CompSc and Visual Arts Integrated Complex</ion-title></ion-header>" +
      "<ion-item><ion-label><b>Address:</b> 1515 Saint-Catherine St W, Montreal, Quebec H3G 2W1</ion-label> </ion-item>"+
      "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
      "<option value=''>----------------------------------------View All----------------------------------------</option>"+
      "<option value=''>Gina Cody School of Engineering and Computer Science</option>"+
      "<option value=''>Electrical and Computer Engineering</option>"+
      "<option value=''>Building, Civil and Environmental Engineering</option>" +
      "<option value=''>Computer Science and Software Engineering</option>"+
      "<option value=''>Mechanical, Industrial and Aerospace Engineering</option>"+
      "<option value=''>Design and Computation Arts</option>"+
      "<option value=''>Faculty of Fine Arts</option>"+
      "<option value=''>Recreation and Athletics</option>"+
      "<option value=''>Zero Energy Building Studies</option>"+
      "<option value=''>Centre for Pattern Recognition and Machine Intelligence</option>"+
      "<option value=''>Center for Composites</option>"+
      "</select></ion-item>"+
      
      "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
      "<option value=''>----------------------------------------View All----------------------------------------</option>"+
      "<option value=''>LeGym</option>"+
      "<option value=''>FOFA Gallery</option>"+

      "</select></ion-item>"+
      "</ion-list>"+
      "<div align ='center'><img width='45%' src=assets/BuildingImages/ev.jpg></div>" +
      "<div align ='center'><ion-button id='ev''>Enter Building</ion-button></div>"

    google.maps.event.addListener(EVMarker, 'click', function() 
    {
      //Probably put this in html file
      EVInfo.setContent(EVContent);


      EVInfo.open(this.map, EVMarker);
    });

    EVInfo.addListener('domready', () => {
      document.getElementById("ev").addEventListener("click", () => {
        this.enterBuilding("ev");
      });
    });

          
    //LB Building Marker and info window
    var LBMarker = new google.maps.Marker
    ({
      position: {lat: 45.496708, lng: -73.577912},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'LB',
          fontSize: fontSize,
      },
    });

    LBMarker.setMap(this.map);

    var LBInfo = new google.maps.InfoWindow({content:""});

    var LBContent =
    "<ion-list> <ion-header align='center'><ion-title>J.W. McConnel Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address:</b> 1400 Maisonneuve Blvd W Montreal, QC H3G 1M8</ion-label> </ion-item>"+
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>English</option>"+
    "<option value=''>History</option>"+
    "<option value=''>Études françaises</option>" +
    "<option value=''>Mathematics and Statistics</option>"+
    "<option value=''>Education</option>"+
    "<option value=''>Centre for Interdisciplinary Studies in Society and Culture</option>" +
    "<option value=''>Centre for the Study of Learning and Performance</option>" +
    "</select></ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>R. Howard Webster Library</option>"+
    "<option value=''>Welcome Centre</option>"+
    "<option value=''>Leonard and Bina Ellen Art Gallery</option>" +
    "<option value=''>J.A. De Sève Cinema</option>"+
    "<option value=''>Birks Student Service Centre</option>"+
    "<option value=''>Campus Stores</option>"+
    "<option value=''>Instructional & Information Technology Services (IITS)</option>" +
    "<option value=''>4TH SPACE</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='70%' src=assets/BuildingImages/LB.jpg><div>" +
    "<div align ='center'><ion-button id='lb' >Enter Building</ion-button></div>";

    google.maps.event.addListener(LBMarker, 'click', function() 
    {
      LBInfo.setContent(LBContent);

      LBInfo.open(this.map, LBMarker);
    });

    LBInfo.addListener('domready', () => {
      document.getElementById("lb").addEventListener("click", () => {
        this.enterBuilding("lb");
      });
    });

   
    var FGMarker = new google.maps.Marker
    ({
      position: {lat: 45.494115, lng: -73.578223},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'FG',
          fontSize: fontSize,
      },
    });

    FGMarker.setMap(this.map);

    var FGInfo = new google.maps.InfoWindow({content:""});

    var FGContent =
    "<ion-list> <ion-header align='center'><ion-title>Faubourg Building </ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address:</b> 1250 Guy St, Montreal, Quebec H3H 2L3</ion-label> </ion-item>"+
    
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Education</option>"+
    "<option value=''>Classics, Modern Language & Linguistics</option>"+
    "<option value=''>Concordia Continuing Education</option>" +
    "<option value=''>Mel Hoppenheim School of Cinema</option>" +
    "<option value=''>Montreal Institute for Genocide and Human Rights Studies</option>" +
    "<option value=''>District 3 Innovation Center</option>" +
    "</select></ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Human Resources</option>"+
    "<option value=''>Office of the Registrar</option>"+
    "<option value=''>Examinations Office</option>"+
    "<option value=''>Senior non-credit program</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='60%' src=assets/BuildingImages/fb.jpg></div>" +
    "<div align ='center'><ion-button id='fg'>Enter Building</ion-button></div>";

    google.maps.event.addListener(FGMarker, 'click', function() 
    {
      FGInfo.setContent(FGContent);

      FGInfo.open(this.map, FGMarker);
    });

    FGInfo.addListener('domready', () => {
      document.getElementById("fg").addEventListener("click", () => {
        this.enterBuilding("fg");
      });
    });
    


    var MBMarker = new google.maps.Marker
    ({
      position: {lat: 45.495095, lng: -73.578854},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'MB',
          fontSize: fontSize,
      },
    });

    MBMarker.setMap(this.map);

    var MBInfo = new google.maps.InfoWindow({content:""});

    var MBContent =
    "<ion-list> <ion-header align='center'><ion-title>John Molson Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>1600 Boulevard de Maisonneuve O, Montréal, QC H3H 1J5</ion-label> </ion-item>"+

    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Accoutancy</option>"+
    "<option value=''>Supply Chain & Business Technology Management</option>"+
    "<option value=''>Finance</option>" +
    "<option value=''>Management</option>" +
    "<option value=''>Executive MBA Program</option>" +
    "<option value=''>Music</option>" +
    "<option value=''>Theatre</option>" +
    "<option value=''>Contemporary Dance</option>" +
    "</select></ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Career Management Services</option>"+
    "<option value=''>John Molson Executive Centre</option>"+
    "<option value=''>Office of the Registrar</option>"+
    "<option value=''>Performing Arts Facilities</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%' src=assets/BuildingImages/JMSB.jpg></div>" +
    "<div align ='center'><ion-button id='fg'>Enter Building</ion-button></div>";

    google.maps.event.addListener(MBMarker, 'click', function() 
    {
      MBInfo.setContent(MBContent);

      MBInfo.open(this.map, MBMarker);
    });

    MBInfo.addListener('domready', () => {
      document.getElementById("mb").addEventListener("click", () => {
        this.enterBuilding("mb");
      });
    });  



    var VAMarker = new google.maps.Marker
    ({
      position: {lat: 45.495530, lng: -73.573845},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'VA',
          fontSize: fontSize,
      },
    });

    VAMarker.setMap(this.map);

    var VAInfo = new google.maps.InfoWindow({content:""});

    var VAContent =
    "<ion-list> <ion-header align='center'><ion-title>Visual Arts Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>1395 René-Lévesque Blvd W, Montreal, Quebec H3G 2M5</ion-label> </ion-item>"+

    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Studio Arts</option>"+
    "<option value=''>Art History</option>"+
    "<option value=''>Art Education</option>" +
    "<option value=''>Creative Arts Therapies</option>" +
    "</select></ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>VAV Art Gallery</option>"+
    "<option value=''>Art Supply Store</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='75%' src=assets/BuildingImages/va.jpg><div>" +
    "<div align ='center'><ion-button id='va'>Enter Building</ion-button></div>";

    google.maps.event.addListener(VAMarker, 'click', function() 
    {
      VAInfo.setContent(VAContent);

      VAInfo.open(this.map, VAMarker);
    });

    VAInfo.addListener('domready', () => {
      document.getElementById("va").addEventListener("click", () => {
        this.enterBuilding("va");
      });
    });  

  

    var GNMarker = new google.maps.Marker
    ({
      position: {lat: 45.493729, lng: -73.576222},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'GN',
          fontSize: fontSize,
      },
    });

    GNMarker.setMap(this.map);

    var GNInfo = new google.maps.InfoWindow({content:""});

    var GNContent =
    "<ion-list> <ion-header align='center'><ion-title>Grey Nuns Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>1395 René-Lévesque Blvd W, Montreal, Quebec H3G 2M5</ion-label> </ion-item>"+
    
    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Residences</option>"+
    "<option value=''>Grey Nuns Library</option>"+
    "<option value=''>Daycare Centre</option>"+
    "<option value=''>Summer Accommodation</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='55%' src=assets/BuildingImages/gn.jpg></div>" +
    "<div align ='center'><ion-button id='gn'>Enter Building</ion-button></p><div>";

    google.maps.event.addListener(GNMarker, 'click', function() 
    {
      GNInfo.setContent(GNContent);

      GNInfo.open(this.map, GNMarker);
    });

    GNInfo.addListener('domready', () => {
      document.getElementById("gn").addEventListener("click", () => {
        this.enterBuilding("gn");
      });
    });  

  
    //Loyola Campus
    var CJMarker = new google.maps.Marker
    ({
      position: {lat: 45.457395, lng: -73.640399},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CJ',
          fontSize: fontSize,
      },
    });

    CJMarker.setMap(this.map);

    var CJInfo = new google.maps.InfoWindow({content:""});

    var CJContent =
    "<ion-list> <ion-header align='center'><ion-title>Communication Studies and Journalism Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+
    
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Communication Studies</option>"+
    "<option value=''>Journalism</option>"+
    "</select></ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Campus Retail Stores</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='55%' src=assets/BuildingImages/cj.jpg><div>" +
    "<div align ='center'><ion-button id='cj'>Enter Building</ion-button></div>";

    google.maps.event.addListener(CJMarker, 'click', function() 
    {
      CJInfo.setContent(CJContent);

      CJInfo.open(this.map, CJMarker);
    });

    CJInfo.addListener('domready', () => {
      document.getElementById("cj").addEventListener("click", () => {
        this.enterBuilding("cj");
      });
    });  



    var SCMarker = new google.maps.Marker
    ({
      position: {lat: 45.457605, lng: -73.641512},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SC',
          fontSize: fontSize,
      },
    });

    SCMarker.setMap(this.map);

    var SCInfo = new google.maps.InfoWindow({content:""});

    var SCContent =
    "<ion-list> <ion-header align='center'><ion-title>Richard J. Renaud Science Complex</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>3475 Rue West Broadway Montreal, QC H4B 2A7</ion-label> </ion-item>"+
    
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Biology</option>"+
    "<option value=''>Chemistry and Biochemistry</option>"+
    "<option value=''>Health, Kinesiology & Applied Physiology</option>"+
    "<option value=''>Physics</option>"+
    "<option value=''>Psychology</option>"+
    "<option value=''>Centre for Biological Applications of Mass Spectrometry</option>"+
    "<option value=''>Centre for NanoScience Research</option>"+
    "<option value=''>Centre for Studies in Behavioral Neurobiology</option>"+
    "<option value=''>Centre for Research in Molecular Modeling</option>"+
    "</select></ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Science College</option>"+
    "<option value=''>Science Technical Centre</option>"+
    "<option value=''>Animal Care Facilities</option>"+
    "<option value=''>Security Office</option>"+
    "<option value=''>Café</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='60%'  src=assets/BuildingImages/sc.jpg></div>" +
    "<div align = 'center'><ion-button id='sc'>Enter Building</ion-button></div>";

    google.maps.event.addListener(SCMarker, 'click', function() 
    {
      SCInfo.setContent(SCContent);

      SCInfo.open(this.map, SCMarker);
    });

    SCInfo.addListener('domready', () => {
      document.getElementById("sc").addEventListener("click", () => {
        this.enterBuilding("sc");
      });
    });  

    var LJMarker = new google.maps.Marker
    ({
      position: {lat: 45.458514, lng: -73.641082},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'LJ',
          fontSize: fontSize,
      },
    });

    LJMarker.setMap(this.map);

    var LJInfo = new google.maps.InfoWindow({content:""});

    var LJContent =
    "<ion-list> <ion-header align='center'><ion-title>Loyola Jesuit Hall and Conference Centre</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Loyola Jesuit Hall and Conference Centre</option>"+
    "<option value=''>Conference services</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%'  src=assets/BuildingImages/lj.jpg></div>" +
    "<div align = 'center'><ion-button id='lj'>Enter Building</ion-button></div>";

    google.maps.event.addListener(LJMarker, 'click', function() 
    {
      LJInfo.setContent(LJContent);

      LJInfo.open(this.map, LJMarker);
    });

    LJInfo.addListener('domready', () => {
      document.getElementById("lj").addEventListener("click", () => {
        this.enterBuilding("lj");
      });
    });  


    var CBMarker = new google.maps.Marker
    ({
      position: {lat: 45.458236, lng: -73.640345},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CB',
          fontSize: fontSize,
      },
    });

    CBMarker.setMap(this.map);

    var CBInfo = new google.maps.InfoWindow({content:""});

    var CBContent =
    "<ion-list> <ion-header align='center'><ion-title>Central Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 2B5</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Concordia Student Union</option>"+
    "<option value=''>Loyola College for Diversity and Sustainability and Loyola</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%'  src=assets/BuildingImages/cb.jpg></div>" +
    "<div align = 'center'><ion-button id='cb'>Enter Building</ion-button></div>";

    google.maps.event.addListener(CBMarker, 'click', function() 
    {
      CBInfo.setContent(CBContent);

      CBInfo.open(this.map, CBMarker);
    });

    CBInfo.addListener('domready', () => {
      document.getElementById("cb").addEventListener("click", () => {
        this.enterBuilding("cb");
      });
    });  


    var ADMarker = new google.maps.Marker
    ({
      position: {lat: 45.458070, lng: -73.639732},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'AD',
          fontSize: fontSize,
      },
    });

    ADMarker.setMap(this.map);

    var ADInfo = new google.maps.InfoWindow({content:""});

    var ADContent =
    "<ion-list> <ion-header align='center'><ion-title>Administration Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+
    
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Faculty of Arts & Science</option>"+
    "</select></ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Welcome Crew Office</option>"+
    "<option value=''>Centre for Teaching & Learning</option>"+
    "<option value=''>Loyola International College</option>"+
    "<option value=''>Provost and VP, Academic</option>"+
    "<option value=''>Concordia Multi-Faith and Spirituality Centre</option>"+
    "<option value=''>Advocacy & Support Services</option>"+
    "<option value=''>Access Centre for Students with Disabilities</option>"+
    "<option value=''>Councelling and Development</option>"+
    "<option value=''>Health Services</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/ad.jpg><div>" +
    "<div align ='center'><ion-button id='ad'>Enter Building</ion-button></div>";

    google.maps.event.addListener(ADMarker, 'click', function() 
    {
      ADInfo.setContent(ADContent);

      ADInfo.open(this.map, ADMarker);
    });

    ADInfo.addListener('domready', () => {
      document.getElementById("ad").addEventListener("click", () => {
        this.enterBuilding("ad");
      });
    });  


    
    var PYMarker = new google.maps.Marker
    ({
      position: {lat: 45.458894, lng: -73.640568},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PY',
          fontSize: fontSize,
      },
    });

    PYMarker.setMap(this.map);

    var PYInfo = new google.maps.InfoWindow({content:""});

    var PYContent =
    "<ion-list> <ion-header align='center'><ion-title>Psychology Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 2Z3</ion-label> </ion-item>"+
    
    "<ion-item><ion-label style='margin-right:1em'><b>Departments: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Psychology</option>"+
    "<option value=''>Centre for clinical research in health (CCRH)</option>"+
    "</select></ion-item>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/py.jpg><div>" +
    "<div align ='center'><ion-button id='py'>Enter Building</ion-button></div>";

    google.maps.event.addListener(PYMarker, 'click', function() 
    {
      PYInfo.setContent(PYContent);

      PYInfo.open(this.map, PYMarker);
    });

    PYInfo.addListener('domready', () => {
      document.getElementById("py").addEventListener("click", () => {
        this.enterBuilding("py");
      });
    });  


       
    var VLMarker = new google.maps.Marker
    ({
      position: {lat: 45.458932, lng: -73.638512},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'VL',
          fontSize: fontSize,
      },
    });

    VLMarker.setMap(this.map);

    var VLInfo = new google.maps.InfoWindow({content:""});

    var VLContent =
    "<ion-list> <ion-header align='center'><ion-title>Vanier Library</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Library</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/vl.jpg><div>" +
    "<div align ='center'><ion-button id='vl'>Enter Building</ion-button></div>";

    google.maps.event.addListener(VLMarker, 'click', function() 
    {
      VLInfo.setContent(VLContent);

      VLInfo.open(this.map, VLMarker);
    });

    VLInfo.addListener('domready', () => {
      document.getElementById("vl").addEventListener("click", () => {
        this.enterBuilding("vl");
      });
    });  


           
    var CSMarker = new google.maps.Marker
    ({
      position: {lat: 45.458008, lng: -73.637248 },
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CS',
          fontSize: fontSize,
      },
    });

    CSMarker.setMap(this.map);

    var CSInfo = new google.maps.InfoWindow({content:""});

    var CSContent =
    "<ion-list> <ion-header align='center'><ion-title>Concordia Stadium</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W Montreal, Quebec H4B 1R2</ion-label> </ion-item><ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/cs.jpg><div>"

    google.maps.event.addListener(CSMarker, 'click', function() 
    {
      CSInfo.setContent(CSContent);

      CSInfo.open(this.map, CSMarker);
    });

             
    var SDMarker = new google.maps.Marker
    ({
      position: {lat:45.457525, lng: -73.636085 },
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SD',
          fontSize: fontSize,
      },
    });

    SDMarker.setMap(this.map);

    var SDInfo = new google.maps.InfoWindow({content:""});

    var SDContent =
    "<ion-list> <ion-header align='center'><ion-title>Stinger Dome</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7200 Sherbrooke St W Montreal, Quebec H4B 1R2</ion-label> </ion-item><ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/sd.jpg><div>"

    google.maps.event.addListener(SDMarker, 'click', function() 
    {
      SDInfo.setContent(SDContent);

      SDInfo.open(this.map, SDMarker);
    });

    
    var PCMarker = new google.maps.Marker
    ({
      position: {lat: 45.456701, lng: -73.637558},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PC',
          fontSize: fontSize,
      },
    });

    PCMarker.setMap(this.map);

    var PCInfo = new google.maps.InfoWindow({content:""});

    var PCContent =
    "<ion-list> <ion-header align='center'><ion-title>PERFORM Centre</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>PERFORM Centre</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/pc.jpg><div>"

    google.maps.event.addListener(PCMarker, 'click', function() 
    {
      PCInfo.setContent(PCContent);

      PCInfo.open(this.map, PCMarker);
    });



    var CGMarker = new google.maps.Marker
    ({
      position: {lat:45.456910, lng: -73.638250},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CG',
          fontSize: fontSize,
      },
    });

    CGMarker.setMap(this.map);

    var CGInfo = new google.maps.InfoWindow({content:""});

    var CGContent =
    "<ion-list> <ion-header align='center'><ion-title>Concordia Gymnasium</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7200 Sherbrooke St W Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Gymnasium</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/cg.jpg><div>"

    google.maps.event.addListener(CGMarker, 'click', function() 
    {
      CGInfo.setContent(CGContent);

      CGInfo.open(this.map, CGMarker);
    });


    var PSMarker = new google.maps.Marker
    ({
      position: {lat: 45.459523, lng: -73.639727},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PS',
          fontSize: fontSize,
      },
    });

    PSMarker.setMap(this.map);

    var PSInfo = new google.maps.InfoWindow({content:""});

    var PSContent =
    "<ion-list> <ion-header align='center'><ion-title>Physical Services Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Environmental Health and Safety</option>"+
    "<option value=''>Facilities Management</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><ion-button id='vl'>Enter Building</ion-button></div>";

    google.maps.event.addListener(PSMarker, 'click', function() 
    {
      PSInfo.setContent(PSContent);

      PSInfo.open(this.map, PSMarker);
    });

    PSInfo.addListener('domready', () => {
      document.getElementById("ps").addEventListener("click", () => {
        this.enterBuilding("ps");
      });
    });  
    
    
    var TBMarker = new google.maps.Marker
    ({
      position: {lat:45.459969, lng: -73.640887},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'TB',
          fontSize: fontSize,
      },
    });

    TBMarker.setMap(this.map);

    var TBInfo = new google.maps.InfoWindow({content:""});

    var TBContent =
    "<ion-list> <ion-header align='center'><ion-title>Terrebonne Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7079 Rue de Terrebonne, Montréal, QC H4B 2B4</ion-label> </ion-item> </ion-list>"

    google.maps.event.addListener(TBMarker, 'click', function() 
    {
      TBInfo.setContent(TBContent);

      TBInfo.open(this.map, TBMarker);
    });


    var SIMarker = new google.maps.Marker
    ({
      position: {lat:45.457724, lng: -73.642326},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SI',
          fontSize: fontSize,
      },
    });

    SIMarker.setMap(this.map);

    var SIInfo = new google.maps.InfoWindow({content:""});

    var SIContent =
    "<ion-list> <ion-header align='center'><ion-title>Saint Ignatius of Loyola</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>4455 Rue West Broadway, Montréal, QC H4B 2A7</ion-label> </ion-item></ion-list>" +
    "<div align ='center'><img width='55%' src=assets/BuildingImages/si.png><div>"

    google.maps.event.addListener(SIMarker, 'click', function() 
    {
      SIInfo.setContent(SIContent);

      SIInfo.open(this.map, SIMarker);
    });


    var GEMarker = new google.maps.Marker
    ({
      position: {lat: 45.456857, lng: -73.640421},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'GE',
          fontSize: fontSize,
      },
    });

    GEMarker.setMap(this.map);

    var GEInfo = new google.maps.InfoWindow({content:""});

    var GEContent =
    "<ion-list> <ion-header align='center'><ion-title>Centre for Structural and Functional Genomics</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Centre for Structural and Functional Genomics</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/ge.jpg><div>" +
    "<div align ='center'><ion-button id='ge'>Enter Building</ion-button></div>";

    google.maps.event.addListener(GEMarker, 'click', function() 
    {
      GEInfo.setContent(GEContent);

      GEInfo.open(this.map, GEMarker);
    });

    GEInfo.addListener('domready', () => {
      document.getElementById("ge").addEventListener("click", () => {
        this.enterBuilding("ge");
      });
    });  

    
    var JRMarker = new google.maps.Marker
    ({
      position: {lat: 45.458454, lng: -73.643229},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'JR',
          fontSize: fontSize,
      },
    });

    JRMarker.setMap(this.map);

    var JRInfo = new google.maps.InfoWindow({content:""});

    var JRContent =
    "<ion-list> <ion-header align='center'><ion-title>Jesuit Residence</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Student Residence</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/jr.jpg><div>" 

    google.maps.event.addListener(JRMarker, 'click', function() 
    {
      JRInfo.setContent(JRContent);

      JRInfo.open(this.map, JRMarker);
    });



    var SRMarker = new google.maps.Marker
    ({
      position: {lat: 45.459204, lng: -73.641761},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SR',
          fontSize: fontSize,
      },
    });

    SRMarker.setMap(this.map);

    var SRInfo = new google.maps.InfoWindow({content:""});

    var SRContent =
    "<ion-list> <ion-header align='center'><ion-title>Student Residence</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7079 Rue de Terrebonne, Montréal, QC H4B 2B4</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>Student Residence</option>"+
    "</select></ion-item>"+
    "</ion-list>"

    google.maps.event.addListener(SRMarker, 'click', function() 
    {
      SRInfo.setContent(SRContent);

      SRInfo.open(this.map, SRMarker);
    });

    
    var FCMarker = new google.maps.Marker
    ({
      position: {lat: 45.458460, lng: -73.639219},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'FC',
          fontSize: fontSize,
      },
    });

    FCMarker.setMap(this.map);

    var FCInfo = new google.maps.InfoWindow({content:""});

    var FCContent =
    "<ion-list> <ion-header align='center'><ion-title>F.C. Smith Building</ion-title></ion-header>" +
    "<ion-item><ion-label><b>Address: </b>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-label> </ion-item>"+

    "<ion-item><ion-label><b>Services: </b></ion-label> <select>" +
    "<option value=''>----------------------------------------View All----------------------------------------</option>"+
    "<option value=''>F.C. Smith Auditorium</option>"+
    "<option value=''>Cazalet Theater</option>"+
    "<option value=''>Concordia Multi-Faith and Spirituality Centre</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/fc.jpeg><div>" 
    "<div align ='center'><ion-button id='fc'>Enter Building</ion-button></div>";

    google.maps.event.addListener(FCMarker, 'click', function() 
    {
      FCInfo.setContent(FCContent);

      FCInfo.open(this.map, FCMarker);
    });

    FCInfo.addListener('domready', () => {
      document.getElementById("fc").addEventListener("click", () => {
        this.enterBuilding("fc");
      });
    });  
    
  }


  
  //FUNCTION USED AFTER USER CLICKS THE "Enter Building" button
  enterBuilding(id: string)
  {
    switch (id) 
    {
      //Hall Building
      case 'hall':
          console.log("In " + id + " building.");
          break;
      //EV building
      case 'ev':
          console.log("In " + id + " building.");
          break;
      //Library Building
      case 'lb':
          console.log("In " + id + " building.");
          break;
      //Faubourg Building
      case 'fg':
          console.log("In " + id + " building.");
          break;
      //John Molson Building
      case 'mb':
          console.log("In " + id + " building.");
          break;
      //Visual Arts Building
      case 'va':
          console.log("In " + id + " building.");
          break;
      //Grey Nuns Building
      case 'gn':
          console.log("In " + id + " building.");
          break;
      //Communications & Journalism Building
      case 'cj':
          console.log("In " + id + " building.");
          break;
      //Renaud Science Complex
      case 'sc':
          console.log("In " + id + " building.");
          break;
      //Loyola Jesuit Hall and Conference Centre
      case 'lj':
          console.log("In " + id + " building.");
          break;
      //Central Building
      case 'cb':
          console.log("In " + id + " building.");
          break;
      //Administration Building
      case 'ad':
          console.log("In " + id + " building.");
          break;
      //Psychology Building
      case 'py':
          console.log("In " + id + " building.");
          break;
      //F.C. Smith Building/Loyola Chapel
      case 'fc':
        console.log("In " + id + " building.");
          break;
      //Vanier Library Building
      case 'vl':
          console.log("In " + id + " building.");
          break;
      //Physical Services Building
      case 'ps':
          console.log("In " + id + " building.");
          break;
      //Centre for Structural and Functional Genomics
      case 'ge':
        console.log("In " + id + " building.");
        break;
    }
  }

}
