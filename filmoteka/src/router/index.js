import { createRouter, createWebHistory } from 'vue-router'
import NovaPocetna from '../views/NovaPocetna.vue'
import DodajFilm from '../views/DodajFilm.vue'
import Filmovi from '../views/Filmovi.vue'
import DodajGlumca from '../views/DodajGlumca.vue'
import Glumci from '../views/Glumci.vue'
import GlavniGlumci from '../views/GlavniGlumci.vue'
import AddMainActor from '../components/AddMainActor.vue'
import DodajTrgovinu from '../views/DodajTrgovinu.vue'
import Trgovine from '../views/Trgovine.vue'
import Osoblje from '../views/Osoblje.vue'
import AddStaff from '../components/AddStaff.vue'
import DodajKupca from '../views/DodajKupca.vue'
import Kupci from '../views/Kupci.vue'

const routes=[
    {
        path:'/',
        name:'NovaPocetna',
        component:NovaPocetna
    },
    {
        path:'/dodajfilm',
        name:'DodajFilm',
        component:DodajFilm
    },
    {
        path:'/filmovi',
        name:'Filmovi',
        component:Filmovi
    },
    {
        path:'/dodajglumca',
        name:'DodajGlumca',
        component:DodajGlumca
    },
    {
        path:'/glumci',
        name:'Glumci',
        component:Glumci
    },
    {
        path:'/glavniglumci',
        name:'GlavniGlumci',
        component:GlavniGlumci
    },
    {
        path:'/dodajglavnogglumca',
        name:'AddMainActor',
        component:AddMainActor
    },
    {
        path:'/dodajtrgovinu',
        name:'DodajTrgovinu',
        component:DodajTrgovinu
    },
    {
        path:'/trgovine',
        name:'Trgovine',
        component:Trgovine
    },
    {
        path:'/osoblje',
        name:'Osoblje',
        component:Osoblje
    },
    {
        path:'/dodajosoblje',
        name:'AddStaff',
        component:AddStaff
    },
    {
        path:'/dodajkupca',
        name:'DodajKupca',
        component:DodajKupca
    },
    {
        path:'/kupci',
        name:'Kupci',
        component:Kupci
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router