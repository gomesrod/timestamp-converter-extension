{
    const receiver = document.getElementById("timestamp-tools-extension_converter-input-receiver");
    if (receiver) {
        receiver.value = window.getSelection().toString();
        receiver.dispatchEvent(new Event('change'));
    } else {
        console.warn("Converter UI not loaded");
    }
}
