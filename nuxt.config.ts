// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
      head: {
        meta: [
          {property: "og:site_name", content: 'MCU Go Open'},
          // {property: "og:image", content: '/img/logo.png'}
        ],
        title: 'MCU Go Open (Alpha)',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        link: [
          {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'},
          { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&amp;display=swap'},
          { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'},
          { rel: '', href: ''},
        ],
        style: [
          { children: `body {
            font-family: 'Noto Sans TC', var(--bs-font-sans-serif);
          }
          
          .focus:hover, .focus:focus{
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          }
          
          .focus {
            transition: box-shadow 0.3s ease-in-out;
          }
          
          #searchBar {
            z-index: 1010;
            top: 60px;
            transition: top 0.3s;
          }
          `, type: 'text/css'}
        ], 
        script: [
          {
            src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            body: true
          },
          {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
            body: true
          }
        ]
      }
    },
    components: {
        dirs: [
          '~/components',
        ]
      }
})
