const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();


const Mux = require('@mux/mux-node');
const { Video } = new Mux("577af3aa-3e59-4a98-8462-07b369ee48cd", "fB0dD77dio5/isG2FAJ8uvVBAeqKHY106t4KrRvr5rJVOdK4iCnijgtLmkkPEUUA5MhvmgkmM3/");



app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(serveStatic(__dirname + '/dist'));
//app.use(history());

app.get('/list', async (req, res) => {
    const stream = await Video.LiveStreams.list();
    res.send(stream);
});

app.get('/create', async (req, res) => {
    var x;
    x = await Video.LiveStreams.create({
        playback_policy: 'public',
        reconnect_window: 10,
        new_asset_settings: { playback_policy: 'public'}
    });
    res.send(x);
});

app.listen(process.env.PORT || 5000);