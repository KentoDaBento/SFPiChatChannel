# SFPiChatChannel
Pi HTML Chat channel
## What is this?
A multi-streaming capable webpage, with a couple neat features.
## Features
1. Mute/Unmute button
2. Current time/locations for each timezone.
3. Click a video you want to enlarge, and the rest of the videos will be laid out on the side.
4. You can flip through the videos while in the enlarged state with your left/right keys, or click a video laid out on the side to swap the enlarged video.

## Javascript involved
**JQuery** for all the goodies included with it!

**Janus** will be used to stream live video feed from the AWS server to this website.

**Moment.js** is used to have up to date time on each video chat, and should be projecting their timezones time.

**Event listeners for left/right keys** to flip through video feeds while in the enlarged view

**clickFocus()** is a function that is activated once one of the videos are selected, to either enlarge one of the video, or to revert the videos back to its original view.

**muteUnmute()** is a function that is activated once the volume icon is clicked, to either mute the video, or unmute the video.

**EDIT: ** Added a fullscreen and rounded edge for videos functionality. Press F for fullscreen and E for rounded edges. 

# Who wrote all this?
An intern.
