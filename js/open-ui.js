if (document.getElementById("timestamp-tools-extension_converter-main-panel")) {
    document.getElementById("timestamp-tools-extension_converter-main-panel").style.display = "block"

} else {
    const pageUrl = chrome.runtime.getURL("content/converter_panel.html")
    const scriptUrl = chrome.runtime.getURL("content/converter_panel.js")

    fetch(pageUrl)
        .then(response => response.text())
        .then(pageContents => {
            const container = document.createElement("div")
            container.style.width = "300px"
            container.style.height = "300px"
            container.style.position = "fixed"
            container.style.bottom = 0
            container.innerHTML = pageContents
            document.body.append(container)

            if (typeof ("timestamp_tools_extension_converter") !== "object") {
                const scriptTag = document.createElement("script")
                scriptTag.src = scriptUrl
                document.body.append(scriptTag)
            }

        }).catch(err => {
            console.error("Error loading Timestamp Converter UI", err)
    });

}