const express = require('express');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();


const Mux = require('@mux/mux-node');
const { Video } = new Mux("a21aaac3-8706-4803-91e9-78988ec82efb", "eBFFXuF854JU7hG3iGSDXBB71RnI6UlP4DcDrMkSkcWOUQxpAvBaBZl/Wu6eAflxw/srU+Uwu1Z");



app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(__dirname + '/dist'));
app.use(history());

app.get('/list', async (req, res) => {
    const stream = await Video.LiveStreams.list();
    res.send(stream);
});

app.get('/listasset', async (req, res) => {
    const stream = await Video.Assets.list();
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

app.get('/del/:StreamID', async (req, res) => {
    var x;
    x = await Video.LiveStreams.del(req.params["StreamID"]);
    res.send(x);
});

app.get('/delasset/:AssetID', async (req, res) => {
    var x;
    x = await Video.Assets.del(req.params["AssetID"]);
    res.send(x);
});

app.get('/login/:pass', (req, res) => {
    if(pass == "MookieEatsCookies!") {
        res.send(true);
    }else{
        res.send(false);
    }
});


app.use(history());
app.use(express.static(__dirname + '/dist'));


app.listen(process.env.PORT || 5000);