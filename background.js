chrome.runtime.onInstalled.addListener(() => {
    console.log("Hi, this is Gadjah Society - Link Checker extension.");
});

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    thisUrl = url;
    console.log(thisUrl)
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.name == "fetchMe") {
        const apiCall = 'https://api.gadjahsocietynft.com/getUrl?url=' + msg.url;

        fetch(apiCall).then(function(res) {
            res.json().then(function(data) {
                response({data: data});
            });
        }).catch(function(err) {
            response({data: err});
        })
    }

    return true;
});