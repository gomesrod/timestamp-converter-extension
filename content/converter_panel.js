
window.timestamp_tools_extension_converter = {
    setInput: function (newval) {
        document.getElementById("timestamp-tools-extension_converter-input-val").innerText = newval
        const result = this.doConversion(newval)
        if (result.valid) {
            document.getElementById("timestamp-tools-extension_converter-output-val").innerText = result.date.toString()
        }
    },

    close: function() {
        document.getElementById("timestamp-tools-extension_converter-main-panel").style.display = "none"
    },

    doConversion: function(rawTs) {
        if (rawTs && /[0-9]{10,}/.test(rawTs)) {
            let ts = parseInt(rawTs)
            if (ts < 9999999999) {
                ts = ts * 1000 ;  // Just assuming that if it is short then it is in seconds. Transform to millis
            }
            return {
                valid: true,
                date: new Date(ts)
            }
        } else {
            return {
                valid: false
            }
        }

    }
}
