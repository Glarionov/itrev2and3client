window.onload = function () {
    class UserDataSender {
        sendUserData() {
            $.getJSON("https://api.ipify.org/?format=json", function (e) {
                let urlForRequest = 'http://blooming-harbor-75649.herokuapp.com/api/create';
                let ip = e.ip;
                let city = ymaps.geolocation.city;

                let matched = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|Windows|iemobile|opera mini/i);

                let device = '';
                if (matched) {
                    device = matched[0];
                }

                let postData = {ip, city, device};
                $.post(urlForRequest, postData, function (data) {
                    // Сюда можно встроить код для конторля процесса
                }, "json");
            });
        }

        loadYmaps() {
            if (typeof ymaps == 'undefined') {
                let headTag = document.getElementsByTagName("head")[0];
                let jqTag = document.createElement('script');
                jqTag.type = 'text/javascript';
                jqTag.src = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU';
                jqTag.onload = this.sendUserData;
                headTag.appendChild(jqTag);
            } else {
                this.sendUserData();
            }
        }

        loadJquery() {
            if (typeof jQuery == 'undefined') {
                let headTag = document.getElementsByTagName("head")[0];
                let jqTag = document.createElement('script');
                jqTag.type = 'text/javascript';
                jqTag.src = 'http://yastatic.net/jquery/2.1.1/jquery.min.js';
                jqTag.onload = loadYmaps;
                headTag.appendChild(jqTag);
            } else {
                this.loadYmaps();
            }
        }
    }

    let senderObject = new UserDataSender();
    senderObject.loadJquery();
}
