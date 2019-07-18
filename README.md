###Установка сервера npm

скачать npm `curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -`

установка `sudo yum install nodejs`

Взято с https://verdaccio.org/docs/en/installation


###Установка verdaccio

npm install -g verdaccio

описание https://linuxize.com/post/how-to-install-node-js-on-centos-7/ 

стандартный порт 4873

сделать в conf возможность публиковать всем 

###Создание библиотеки
Создание проекта lib-project без приложения (initial app)

`ng new lib-project --createApplication=false`

`cd lib-project`

Создание библиотеки some-api, где префиксом компонентов будет masha

`ng g library some-api --prefix=masha`

####Создание билда для загрузки в библиотеку

Просто генерируем компонент + добавляем флаг project и имя библиотеки

`ng g c button --project some-api`

####Загрурузка билда на сервер
`npm publish --registry http://localhost:4873`

###Для закачки локальных библиотек из сервера
Создать тунель gnx2.gramant.ru на сервер с verdaccio 

`ssh -v -L 4873:127.0.0.1:4873 root@gnx2.gramant.ru`

(возможно данные будут другие)
#####Установить репозиторий npm
В каталоге с npm проектом ввести: `npm set registry http://localhost:4873`

Добавить dependencies в package.json ` "gnx-auth": "^0.0.50" `
