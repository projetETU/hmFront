import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'


const publicRoutes = ['/signin', '/signup', '/error-404']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: { title: 'eCommerce Dashboard' },
    },
    {
      path: '/commande',
      name: 'Commandes',
      component: () => import('../views/Commande/Commande.vue'),
      meta: { title: 'Commande' },
    },
    {
      path: '/commadeDetails/:id',
      name: 'CommandeDetails',
      component: () => import('../views/Commande/CommandeDetails.vue'),
      meta: { title: 'Commande Details' },
      props: true,
    },

    {
      path: '/achatDetails/:fournisseur',
      name: 'AchatDetails',
      component: () => import('../views/Achat/AchatDetails.vue'),
      meta: { title: 'Achats Details' },
      props: true,
    },

       {
      path: '/stockProduction/:articleId',
      name: 'StockProduction',
      component: () => import('../views/Stock/StockProduction.vue'),
      meta: { title: 'Stock Production' },
      props: true,
    },



    {
      path: '/mes-commande',
      name: 'Mes Commandes',
      component: () => import('../views/Commande/MesCommande.vue'),
      meta: { title: 'Commande' },
    },
    {
      path: '/historique-commande',
      name: 'Historique de commande',
      component: () => import('../views/Commande/Historique.vue'),
      meta: { title: 'Historique de commande' },
    },
    {
      path: '/data',
      name: 'Mes données',
      component: () => import('../views/Donnees/Data.vue'),
      meta: { title: 'Mes données' },
    },
    {
      path: '/article',
      name: 'Articles',
      component: () => import('../views/Article/Article.vue'),
      meta: { title: 'Article' },
    },
    {
      path: '/client',
      name: 'Clients',
      component: () => import('../views/Client/Client.vue'),
      meta: { title: 'Client' },
    },

    {
      path: '/point-de-vente',
      name: 'Points de vente',
      component: () => import('../views/PointDeVente/PointDeVente.vue'),
      meta: { title: 'Points de vente' },
    },

    {
      path: '/fournisseur',
      name: 'Fournisseur',
      component: () => import('../views/Fournisseur/Fournisseur.vue'),
      meta: { title: 'Fournisseurs' },
    },
 {
      path: '/stock',
      name: 'Stock',
      component: () => import('../views/Stock/Stock.vue'),
      meta: { title: 'Stock' },
    },

    {
      path: '/achat',
      name: 'Mes achats',
      component: () => import('../views/Achat/Achat.vue'),
      meta: { title: 'Achats' },
    },

    {
      path: '/produit',
      name:'Produit',
      component: () => import('../views/Achat/Produit/Produit.vue'),
      meta: { title: 'Produits' },
    },

        {
      path: '/categorie',
      name:'Categorie',
      component: () => import('../views/Achat/Categorie/Categorie.vue'),
      meta: { title: 'Categories' },
    },

           {
      path: '/departement',
      name:'Departement',
      component: () => import('../views/Departement/Departement.vue'),
      meta: { title: 'Departements' },
    },

               {
      path: '/modePaiement',
      name:'Mode Paiement',
      component: () => import('../views/ModePaiement/ModePaiement.vue'),
      meta: { title: 'Mode paiement' },
    },

                {
      path: '/mesAchats',
      name:'Mes achats',
      component: () => import('../views/Achat/MesAchats.vue'),
      meta: { title: 'Mes achats' },
    },
  
                    {
      path: '/achat',
      name:'Achat',
      component: () => import('../views/Achat/Achat.vue'),
      meta: { title: 'Achat' },
    },
  





    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: { title: 'Calendar' },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: { title: 'Profile' },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: { title: 'Form Elements' },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: { title: 'Basic Tables' },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: { title: 'Alerts' },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: { title: 'Avatars' },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: { title: 'Badge' },
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: { title: 'Buttons' },
    },
    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: { title: 'Images' },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: { title: 'Videos' },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: { title: 'Blank' },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: { title: '404 Error' },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: { title: 'Signin' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: { title: 'Signup' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404',
    },
  ],
})

router.beforeEach(async (to, from, next) => {

  const isPublic = publicRoutes.includes(to.path)

  if (isPublic) return next()
  const { checkAuth } = useAuth()
  const valid = await checkAuth()

  if (!valid) return next('/signin')

  next()
})

export default router
