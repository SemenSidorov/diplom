const WebSocket = require('ws');
const config = require('config')
const wsServer = new WebSocket.Server({port: 9000, proxy: "http://localhost:9000"});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// установка схемы
const userScheme = new Schema({
    name: String,
    age: Number,
    messages: Array,
    id: String,
});

mongoose.connect(config.get('mongoUri'), {useUnifiedTopology: true, useNewUrlParser: true});

const User = mongoose.model("User", userScheme);

const registration = () => {
    const user = new User({
        name: "Bill",
        age: 41,
        id: '23',
        dialogs: [],
    });

    user.save()
};

function onConnect(wsClient) {
    console.log('Новый пользователь');
    // отправка приветственного сообщения клиенту
    wsClient.send(JSON.stringify(messages));


    User.findOne({id: '23'}).then(res => {
        console.log(res)
        if (!res) {
            registration()
        } else {
            console.log(res)
            // wsClient.send(JSON.stringify(res.messages))
        }

    }).catch(err => {
        console.log(err)
    });

    wsClient.on('message', function(message) {
        messages.push({id: 1, messages: [{
            id: 1,
            message
            }]});
        wsClient.send(JSON.stringify(messages));
    })

    wsClient.on('close', function() {
        // отправка уведомления в консоль
        console.log('Пользователь отключился');
    })
}
wsServer.on('connection', onConnect);

