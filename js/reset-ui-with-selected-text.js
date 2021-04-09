{
    const receiver = document.getElementById("timestamp-tools-extension_converter-input-val");
    if (receiver) {
        receiver.value = window.getSelection().toString();
        receiver.dispatchEvent(new Event('change'));
    } else {
        console.warn("Converter UI not loaded");
    }
}
