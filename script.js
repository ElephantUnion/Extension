document.querySelector('#check').addEventListener('click', setLoading)

function setLoading() {
    document.getElementById("check-loading").style.display = "block";
    document.getElementById("check-web").style.display = "none";

    getCurrentTabUrl();

}

function getCurrentTabUrl() {
    var queryInfo = {
        active: true,
        currentWindow: true,
    };

    try {
        chrome.tabs.query(queryInfo, function(tabs) {
            var tab = tabs[0];
    
            chrome.runtime.sendMessage({name: "fetchMe", url: tab.url},(response) => {
                if (response.data.isMatch) {
                    document.getElementById("yay").style.top = '0';
                }
                else {
                    document.getElementById("nay").style.top = '0';
    
                }  
            })
        });
    } catch (error) {
        console.log(error);
        document.getElementById("nay").style.top = '0';
    }
    
}

document.querySelector('#ask').addEventListener('click', slideIn)

function slideIn() {
    document.getElementById("ask-content").style.right = '0';
    document.getElementById("ask").style.display = "none";
}

document.querySelector('#back').addEventListener('click', slideOut)
document.querySelector('#close-check').addEventListener('click', closeWindow)

function slideOut() {
    document.getElementById("ask-content").style.right = '-1000px';
    document.getElementById("yay").style.top = '1000px';
    document.getElementById("ask").style.display = "block";
    document.getElementById("check-loading").style.display = "none";
    document.getElementById("check-web").style.display = "block";
}

document.querySelector('#close-web').addEventListener('click', closeWeb)

function closeWeb() {
    var queryInfo = {
        active: true,
        currentWindow: true,
    };
    
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.remove(tab.id);
    });
}

// document.querySelector('#report').addEventListener('click', closeWindow)

function closeWindow() {
    window.close()
}
