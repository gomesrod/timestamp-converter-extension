
window.timestamp_tools_extension_converter = {
    setInput: function (newval) {
        if (!newval || !newval.trim()) {
            document.getElementById("timestamp-tools-extension_converter-output-area").style.display = "none"
            document.getElementById("timestamp-tools-extension_converter-error-area").style.display = "none"
            return
        }

        document.getElementById("timestamp-tools-extension_converter-input-val").value = newval

        let precision
        if (document.getElementById("timestamp-tools-extension_converter-opts-precisionMillis").checked) {
            precision = "millis"
        } else if (document.getElementById("timestamp-tools-extension_converter-opts-precisionSeconds").checked) {
            precision = "seconds"
        } else {
            precision = "auto"
        }

        const result = this._doConversion(newval, precision)

        if (result.valid) {
            document.getElementById("timestamp-tools-extension_converter-output-local-time").innerText = result.formattedLocal
            document.getElementById("timestamp-tools-extension_converter-output-utc-time").innerText = result.formattedUtc
            document.getElementById("timestamp-tools-extension_converter-output-parsedIn").innerText = result.parsedIn

            document.getElementById("timestamp-tools-extension_converter-output-area").style.display = "block"
            document.getElementById("timestamp-tools-extension_converter-error-area").style.display = "none"

        } else {
            document.getElementById("timestamp-tools-extension_converter-output-area").style.display = "none"
            document.getElementById("timestamp-tools-extension_converter-error-area").style.display = "block"
        }
    },

    setInputToNow: function() {
        let now = new Date().getTime()
        if (document.getElementById("timestamp-tools-extension_converter-opts-precisionSeconds").checked) {
            now = Math.floor(now / 1000)
        }
        this.setInput(now.toString())
    },

    close: function() {
        document.getElementById("timestamp-tools-extension_converter-main-panel").style.display = "none"
    },

    toggleOptionsPanel: function() {
        const panel = document.getElementById("timestamp-tools-extension_converter-options");
        if (panel.style.display === "none")
            panel.style.display = "block"
        else
            panel.style.display = "none"
    },

    setWindowPosition: function(pos) {
        const container = document.getElementById("timestamp-tools-extension_converter_container")
        if (pos === "UpLeft") {
            container.style.bottom = null;
            container.style.right = null;
            container.style.top = "0";
            container.style.left = "0";
        } else if (pos === "UpRight") {
            container.style.top = "0";
            container.style.right = "0";
            container.style.bottom = null;
            container.style.left = null;
        } else if (pos === "DownLeft") {
            container.style.bottom = "0"
            container.style.left = "0"
            container.style.top = null;
            container.style.right = null;
        } else if (pos === "DownRight") {
            container.style.bottom = "0"
            container.style.right = "0"
            container.style.top = null;
            container.style.left = null;
        } else {
            console.error("Invalid position", pos)
            return;
        }

        const optionsPanel = document.getElementById("timestamp-tools-extension_converter-options");
        optionsPanel.style.display = "none"
    },

    _doConversion: function(rawTs, requestedPrecision) {
        if (rawTs && /[0-9]+/.test(rawTs)) {
            const ts = parseInt(rawTs)

            if (isNaN(ts)) {
                return {
                    valid: false
                }
            }

            let precision
            let dt

            if ((requestedPrecision === "seconds")
                || (requestedPrecision === "auto" && ts < 9999999999)) { // Heuristic to autodetect precision is simply to assume that if it is short then it is in seconds.
                precision = "seconds"
                dt = new Date(ts * 1000);

            } else {
                dt = new Date(ts)
                precision = "millis"
            }

            if (isNaN(dt.getFullYear())) {
                // detected this condition for large inputs. for example: new Date(1231231231231111113312)
                return {
                    valid: false
                }
            }

            const fmtLocal = this._formatDt(dt.getFullYear(), dt.getMonth(), dt.getDay(),
                dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds())
            const fmtUtc = this._formatDt(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDay(),
                dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds())

            return {
                valid: true,
                date: dt,
                formattedLocal: fmtLocal,
                formattedUtc: fmtUtc,
                parsedIn: ts + " " + precision + " from Epoch"
            }
        } else {
            return {
                valid: false
            }
        }
    },

    _formatDt: function (year, month, day, hour, minutes, seconds, millis) {
        return year.toString().padStart(4, "0") + "-"
            + month.toString().padStart(2, "0") + "-"
            + day.toString().padStart(2, "0") + " "
            + hour.toString().padStart(2, "0") + ":"
            + minutes.toString().padStart(2, "0") + ":"
            + seconds.toString().padStart(2, "0") + "."
            + millis.toString()
    }
}
