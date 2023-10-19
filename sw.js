importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE ='inmutable-v1';

const APP_SHELL = [
    //'/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400', 
	'https://fonts.googleapis.com/css?family=Lato:400,300',
	'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', hola =>{
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));

    hola.waitUntil(Promise.all([cachesStatic,cacheInmutable]));
});

self.addEventListener('activate', hola=>{
    const respuesta=caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key!= STATIC_CACHE && key.includes(static-v1)){
                return caches.delete(key);
            }
        });
    });
    hola.waitUntil(respuesta);
});

self.addEventListener('fetch',hola=>{
    const respuesta = caches.match(hola.request).then(resp=>{
        if(resp){
            return resp;
        }else{
            return fetch(hola.request).then(newResp=>{
                return actualizaCacheDinamico(DYNAMIC_CACHE,hola.request,newResp);
            });
        }
    });
    hola.respondWith(respuesta);
});
