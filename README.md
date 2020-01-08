## Diarist
This apps helps students of BMSTU generate fake self-training diaries.
#### Includes
- VKBot
- Backend server
- Front
#### VKBot
That bot for aggregates information from user from vk page to server and presents generated server's pages
#### Backend server
Saves information from user in DB, generates fake information and provides it for web app
###### API
/sheet (POST) - take info from VKbot and generate sheet for user in DB
/sheet?id=< some id > (GET) - give info for web page

#### Front
Gives information from server, generates custom web page for each user and shows it

### Technologies
- MERN

### Project setup
`npm install`

### Start each component
`npm start`