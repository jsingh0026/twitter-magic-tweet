const cron = require("node-cron");
const express = require("express");
const fetch = require("node-fetch");
const update = require('./updateBio')
const http = require('http');

app = express();

cron.schedule('*/3 * * * * *', function () {
  console.log('running a task every second');
  // getTweetData();
});

const getTweetData = () => {
  fetch(
  "https://api.twitter.com/2/tweets?ids=1295799129310769152&tweet.fields=public_metrics",
  {
    method: "GET",
    headers: { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAAWEIAEAAAAApcVo%2BMmoVPNc59sjMBYSISJekYQ%3Dfy8BIhDS2Qh4Lqw1mhRqnZx88KS9bHN2wzbXDi0WvJhydUTmWg` },
  }
).then((response) => response.json())
.then((json) => {
const { retweet_count, reply_count, like_count, quote_count } = json.data[0].public_metrics;
  var bio = `Details for the Magic Tweet
MT Likes: ${like_count}
MT Replies: ${reply_count}
MT Retweets: ${retweet_count}
MT Quoted: ${quote_count}

Developer @GeekyAnts
`;
update(bio);
  console.log(json.data[0].public_metrics);
})
.catch((error) => {
  console.log({ error });
});
}
// app.use('/', express.static('uploads'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const server = http.createServer(app);
server.listen("3128");
