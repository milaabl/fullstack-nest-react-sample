// this file has been coppied from build/sw.js
if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
    'https://js.pusher.com/beams/service-worker.js'
  );  
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    //workbox.precaching.precacheAndRoute([]);
    //workbox.precaching.precacheAndRoute([{"revision":"988be98f12b400c41a22b59b82cfeab6","url":"assets/icon/favicon.png"},{"revision":"69e6f162abf8c9f65d6d8c73d7813f3e","url":"assets/icon/icon.png"},{"revision":"a6dbb9a1631b9aa9f67e6719d062e35f","url":"index.html"},{"revision":"c338d93e9bf0db93eee037fbafb0cdb7","url":"static/css/4.8921c4c4.chunk.css"},{"revision":"227acdb9147e1fd84d3a3b01a2b6996d","url":"static/css/main.286a5f19.chunk.css"},{"revision":"437011eb210cfff473bfc4eb4a36b4c6","url":"static/js/0.4c44576c.chunk.js"},{"revision":"2c4e23d74def28c4aa93dabb30302014","url":"static/js/10.db22f335.chunk.js"},{"revision":"bfe1fd02c63515bbd48ef61a86d0a645","url":"static/js/11.226dbf51.chunk.js"},{"revision":"000387d886e765996eba38330bac8e8e","url":"static/js/12.5c806872.chunk.js"},{"revision":"893fe4703f55398c5c3ad6e8895823d2","url":"static/js/13.6b7c6103.chunk.js"},{"revision":"cfe06a9a20af914c0e6b5553794df37b","url":"static/js/14.cdab40bf.chunk.js"},{"revision":"d791664ef843a4fb3abe3ebe1bd23b30","url":"static/js/15.16bd635d.chunk.js"},{"revision":"4ff28532c5d69501bb6110062f616628","url":"static/js/16.32b0b138.chunk.js"},{"revision":"d602fb0b1b7277bbed6779921cdfcdab","url":"static/js/17.4a6e01a7.chunk.js"},{"revision":"6e65cbcaab6a0ecaaf1b726d411bac92","url":"static/js/18.099ccd81.chunk.js"},{"revision":"3431a27743ddc503eaa0ed5a098acc70","url":"static/js/19.971c25b8.chunk.js"},{"revision":"6138b53c79e00343a332060613d6884f","url":"static/js/20.ca88477f.chunk.js"},{"revision":"1eef59d0ccea0f79ad65615462f3bc56","url":"static/js/21.783870ec.chunk.js"},{"revision":"24d5045f5611c39574653b292e46f42a","url":"static/js/22.cb7640c5.chunk.js"},{"revision":"81a4ea3a75ca875a988bd7c2e28f54ea","url":"static/js/23.6aaef8a5.chunk.js"},{"revision":"169350ca86009cbdcf6d65239e9ed1b1","url":"static/js/24.c00e58a3.chunk.js"},{"revision":"61f619e50e0d78c96f4180f30efc66b7","url":"static/js/25.6859a810.chunk.js"},{"revision":"5a08a56c5411f5d8923c3a72f0fb5235","url":"static/js/26.c4ea957d.chunk.js"},{"revision":"1b176ef7c9886894fcef1e9625e5cfdd","url":"static/js/27.b6790f6f.chunk.js"},{"revision":"2f0870f512bf01cf0a8b8e4c8f5dc107","url":"static/js/28.bc5e4b76.chunk.js"},{"revision":"6e15e1c196185571f3b51eb1088acbd5","url":"static/js/29.c7f9be34.chunk.js"},{"revision":"2e38aad16aa24f725bde3680bb64674b","url":"static/js/30.b1d3cbf7.chunk.js"},{"revision":"7184018e1e9185633fb3e8db02ae4cf8","url":"static/js/31.ce000c47.chunk.js"},{"revision":"0ff801501b061c17f80d61bd4d5e9972","url":"static/js/32.3acdab9f.chunk.js"},{"revision":"4b823077bf2f373bcca9b2d6227b786d","url":"static/js/33.93214006.chunk.js"},{"revision":"1def12ca2fe73e8a9725b8f0859ef692","url":"static/js/34.945d2cfa.chunk.js"},{"revision":"565ddf85a4d0d651af10e97acb3405ad","url":"static/js/35.6f80c548.chunk.js"},{"revision":"5c8a0c6eb4be62a86d1319c32424d8c4","url":"static/js/36.de954014.chunk.js"},{"revision":"88c5e0e24e3e0a9ca050ec37d8ba7b65","url":"static/js/37.74a0031e.chunk.js"},{"revision":"802f36f5bfe5e1c18cd1f5296fd18b19","url":"static/js/38.f5635e4a.chunk.js"},{"revision":"be98aabe62a1d54b175f91e5b5cca551","url":"static/js/39.4e0cfe29.chunk.js"},{"revision":"10d0b516e9afbb07b38878f729874c59","url":"static/js/4.cf47d618.chunk.js"},{"revision":"b6c4a20c240dbbcbdc8e80b7d25e7804","url":"static/js/40.49ae0a91.chunk.js"},{"revision":"43c9f6583405a9a6475ef5794fcbd128","url":"static/js/41.d64b256f.chunk.js"},{"revision":"0f4d74d755b493b750dc7c3c6934b632","url":"static/js/42.ef6bc8f3.chunk.js"},{"revision":"d44a6f99338737ecce4be45e0b130c1d","url":"static/js/43.9c7e8a58.chunk.js"},{"revision":"185e6f258f83b8eb90cd30af555e84e0","url":"static/js/44.b0be3fca.chunk.js"},{"revision":"20aa3ac1c4f1abeb249507685e1cc8c3","url":"static/js/45.385a18b5.chunk.js"},{"revision":"df1e7297f7a7d87c7fe44688535ad80c","url":"static/js/46.0ff9d595.chunk.js"},{"revision":"ec5dd2bdecfdc6443055da7d9b7b72fe","url":"static/js/47.1baacc7c.chunk.js"},{"revision":"45573e150d9dae8c6969a7d04960bb3c","url":"static/js/48.dc113f2c.chunk.js"},{"revision":"4a4953efa41aebc1168190411ff3f44c","url":"static/js/49.46d4688c.chunk.js"},{"revision":"af5d8a7059f21b12fc1ed040128196ff","url":"static/js/5.2658b9c7.chunk.js"},{"revision":"bdac95b1351e85c63af243cf3d52cde6","url":"static/js/50.b9fdfac6.chunk.js"},{"revision":"f41b8df843571dc966e488c451b96c2e","url":"static/js/51.b3a2a91e.chunk.js"},{"revision":"56561d03ba31f555fc01126e1d03dacc","url":"static/js/52.ae3687a1.chunk.js"},{"revision":"e22b939ed8b95dfaa54f63e8018179c9","url":"static/js/53.e665f012.chunk.js"},{"revision":"87eccddee36a60d2d09cd06932ee529d","url":"static/js/54.5832183f.chunk.js"},{"revision":"3f6c7f504e4e864962b63e7cd05d9f10","url":"static/js/55.8ba47e7b.chunk.js"},{"revision":"d1f7660afee22387d3f10b78bad13adf","url":"static/js/56.bc2ddce1.chunk.js"},{"revision":"68f281f3187df5ba88e658320459d127","url":"static/js/57.289221e6.chunk.js"},{"revision":"ec273e8b9d64a4f049eb90fadd7f30fc","url":"static/js/58.39a214cc.chunk.js"},{"revision":"ec2ea0ba7678a1bdccaf9300f684400e","url":"static/js/6.885378ad.chunk.js"},{"revision":"db7fd33805650f8961ebc0016ae60d26","url":"static/js/7.d56a4919.chunk.js"},{"revision":"1f6c83fdb87e958e979002c22e10c27e","url":"static/js/8.52c34fe0.chunk.js"},{"revision":"6fe0126806a3f998f2e1d167fa9a19ed","url":"static/js/9.b47c2d95.chunk.js"},{"revision":"6e7ce4f3b5ce4690af7d5f4bd17d5f8a","url":"static/js/main.d1b24cb9.chunk.js"},{"revision":"62aa284d5e702462285223079d3f6902","url":"static/js/polyfills-css-shim.aeddcf46.chunk.js"},{"revision":"317422d2aafad4351307c89fe099f3a5","url":"static/js/runtime-main.9a9273b4.js"}]);

    /* custom cache rules*/
    // workbox.routing.registerNavigationRoute('/index.html', {
    //   blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    // });

    // workbox.routing.registerRoute(
    //   /\.(?:png|gif|jpg|jpeg)$/,
    //   workbox.strategies.cacheFirst({
    //     cacheName: 'images',
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 60,
    //         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //       }),
    //     ],
    //   })
    // );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
