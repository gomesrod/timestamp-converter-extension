Timestamp Tools Chrome extension
================================

### How to use

In any page select a timestamp text in one of the supported formats* , 
right-click to open the context menu and **Open timestamp converter from selection**

Or optionally right-click anywhere in the page and click **Open timestamp converter** to open the converter window

## Supported timestamp formats

For now only Unix Epoch is supported (in seconds or millis)

--------------

## Developer information


### To deploy development version in google chrome

Open the Extensions manager (chrome://extensions/ or through Settings menu).

Enable **Developer mode** (switch in the upper corner of the window)

Click the **Load unpacked** button and click to the directory project


### To test or debug the extension UI separately

The file `dev/test_area.html` is a dummy web page that loads the Converter UI to simplify development, test and debug

This uses unsafe methods to mix the contents of the pages 
(More specifically, the page uses iframe as workaround to have one page get the html contents of the other),
so it is necessary to run the browser with additional options

    google-chrome --disable-web-security --user-data-dir=/tmp/unsafe-chrome-instance
    # (Change the chrome executable according to the distribution, or the data dir as you wish)

In this Chrome instance open the full path to the file `dev/test_area.html`

Be sure to not use this window for regular browsing due to the lowered security.


### To create a package

> Newer versions of Chrome do not allow the packages to be installed directly, only through the Store.

In the Chrome Extensions manager (Developer mode enabled), click the button `Pack extension`

* Provide the project root and the primary key if you have one for this app. In the first version a new key is created, 
keep it to sign the future versions


### TO-DO

* Support more date formats
* Support 2-way conversion
* Allow free positioning (drag and drop) of the converter window
* Options pane is quite crude. Interaction is very simple, no state saving, no automatic applying on current input
* CSS from each containing page could modify appearance and behavior. We should override everything possible in the elements context.
