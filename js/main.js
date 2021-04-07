chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "menuActivateTimestampConverter",
        title: "Open timestamp converter",
        contexts: ["page"]
    })
    chrome.contextMenus.create({
        id: "menuActivateTimestampConverterSelection",
        title: "Open timestamp converter from selection",
        contexts: ["selection"]
    })
    chrome.contextMenus.onClicked.addListener(contextMenusOnClick)
});

const contextMenusOnClick = (info, tab) => {
    if (info.menuItemId === "menuActivateTimestampConverter") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['js/open-ui.js']
        });

    } else if (info.menuItemId === "menuActivateTimestampConverterSelection") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['js/open-ui.js']
        });
        setTimeout(() => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['js/reset-ui-with-selected-text.js']
            });
        }, 200)
    }
}
