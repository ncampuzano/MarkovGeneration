<?php
require_once 'TwitterAPIExchange.php';
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "618581353-yvkEyifknoUQN5QVWBU1DLaqNXmLK4apv03T6Q34",
    'oauth_access_token_secret' => "diooN9KIj37ZliZ01OscrfXrAr1NDgIUSvG9TXzdSdMfT",
    'consumer_key' => "DvHST8qILCkHTqtM6QBUaoQjB",
    'consumer_secret' => "xn7VGkKkgOp0h6UvozLnsnBi0PgJO2CuwlcA3U2XIHz6FzbtsX",
);
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=' . $_GET['username'] . '&count=200&trim_user=1&exclude_replies=1&include_rts=0&tweet_mode=extended';
//$getfield = '?screen_name=EnriquePenalosa&count=200&trim_user=1&exclude_replies=1&include_rts=0&tweet_mode=extended';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
$tweets = json_decode($twitter->setGetfield($getfield)
        ->buildOauth($url, $requestMethod)
        ->performRequest());
$result = json_encode($tweets);
for ($i = 0; $i < 1; $i++) {
    $twitter = new TwitterAPIExchange($settings);
    $id = $tweets[count($tweets) - 1]->id_str;
    $getfield = '?screen_name=' . $_GET['username'] . '&count=200&trim_user=1&exclude_replies=1&include_rts=0&tweet_mode=extended&max_id='.$id;
    $tweets = json_decode($twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest());
    $result = $result.''.json_encode($tweets);
}
echo $result;
?>