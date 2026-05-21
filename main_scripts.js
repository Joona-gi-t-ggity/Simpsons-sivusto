// get main focusarea element
const focusArea = document.getElementById("focus_area");
// get main navigation element
const mainNav = document.getElementById("main_nav");

/* 
Function: resetSel_btns
resets the main nav selection buttons
*/
function resetSel_btns() {
    // get all selected buttons in main nav
    var selBtns = mainNav.getElementsByClassName("selBtn");
    // for each selected button set its class to not selected button
    for (let i = 0; i < selBtns.length; i++) {
        selBtns[i].className = "not_selBtn";
    }
}
/* 
Function: changeSel_btn
sets the given button as selected

@new_selected_id (string): the id of the new selected button
*/
function changeSel_btn(new_selected_id) {
    // reset main nav buttons
    resetSel_btns();
    // get the new selected button
    const selected_btn = document.getElementById(new_selected_id);
    // set its class to be selected button
    selected_btn.className = "selBtn";
}

/* 
Function: read_file_txt
reads a file and returns it as text

@filepath (string): the location of the file that need to be read

returns 
 - the file contents of the file ( if the read was succesfull)
 - false (if the read failed in some way)
*/
async function read_file_txt(filepath) {
    try { // try getting the file and verify that it works
        const fileContent = await fetch(filepath);
        if (fileContent.ok == false) {
            console.error("File read failed !");
            return (false);
        } else {
            const results = await fileContent.text();
            // return the file content as text if every thing went well
            return (results);
        }
    } catch (eCode) {
        console.error(`An error ocurred: ${eCode}`);
        return (false);
    }
}
/* 
Function: read_file_json
reads a file and returns it as json

@filepath (string): the location of the file that need to be read

returns 
 - the file contents of the file ( if the read was succesfull)
 - false (if the read failed in some way)
*/
async function read_file_json(filepath) {
    try { // try getting the file and verify that it works
        const fileContent = await fetch(filepath);
        if (fileContent.ok == false) {
            console.error("File read failed !");
            return (false);
        } else {
            const results = fileContent.json();
            // return the file content as json if every thing went well
            return (results);
        }
    } catch (eCode) {
        console.error(`An error ocurred: ${eCode}`);
        return (false);
    }
}

/* 
Function: load_newFocus
loads a new focuspage into the mainfocus area

@focusPage_path (string): path of the page that needs to be shown
@button_id (string): the button, that ran this function, id

returns
 - true (on success)
 - false (on failure)
*/
// get the forum button element
const forum_btn = document.getElementById("to_forum_btn");

async function load_newFocus(focusPage_path, button_id = "none") {
    // if the button id isnt none 
    if (button_id != "none") {
        // set the selected button to this button
        changeSel_btn(button_id);
    } else { // else reset selected buttons
        resetSel_btns();
    }
    // read the file contents of focusPage_path as text
    const fileContent = await read_file_txt(focusPage_path);
    // if failed
    if (fileContent == false) {
        return (false); 
    } else { 
        // put the file contents as focus area inner html 
        focusArea.innerHTML = fileContent;
        // if the forum_button is the selected button
        if (forum_btn.className == "selBtn") {
            // load forum messages 
            forum_load_messages();
        }
        return (true);
    }
}

// Display the homepage in the focus area when the page loads.
window.onload = function () {
    load_newFocus("./homepage/mainHp.html");
};
/*
forum javascript cos this shit doesnt like my way of doing things 
*/
// define messages (could have used a json file or sum here :D)
var messages = [
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "looking for someone",
        "body": "Hi, I'm looking for someone I used to know in high school. I'm wondering if I could find him here?"
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Let's ask around. What's his name?"
    },
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Yeah, his name is Seymore Butz."
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Is there a Butz here? Everybody! I wanna Seymore Butz!"
    },
    {
        "sender": "Barney",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "LOL"
    },
    {
        "sender": "Moe",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "Oh, wait a minute. Listen you little scum-sucking pus bucket. When I get my hands on you, I'm gonna pull out your eyeballs with a corkscrew!"
    },
    {
        "sender": "mr customer",
        "date": "2010-05-10",
        "title": "re: looking for someone",
        "body": "😂😂😂😂😂😂😂😂😂😂😂"
    }
];
/* 
Function: forum_load_messages
loads the messages to the forum message board
*/
function forum_load_messages() {
    // get the message board
    const message_board = document.getElementById("forum_messages");
    // clear current messages from the msg board 
    message_board.innerHTML = "";
    // for each message in messages
    messages.forEach(message => {
        // create the elements that make up the message
        const messageBox = document.createElement("div");
        const spacer = document.createElement("hr");

        const msgSenderInfo = document.createElement("p");
        const msgTitle = document.createElement("h3");
        const msgBody = document.createElement("p");
        // get the message date and split it from the "-"symbols
        const dateSplit = message["date"].split("-");
        // split the date even more
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        // make the date in the assignments format
        const correctFormDate = `${day}.${month}. ${year}`;

        // if a sender is known
        if (message["sender"] != ""){
            // set the msg sender info to "message sender - correctly formatted date"
            msgSenderInfo.innerText = `${message["sender"]} - ${correctFormDate}`;
        } else { // if the sender wasnt known
            // set the msg sender info to "defauld name - correctly formatted date"
            msgSenderInfo.innerText = `somebody that i used to know - ${correctFormDate}`;
        }
        // set the msg title to the title
        msgTitle.innerText = message["title"];
        // if the title has the tag funny then unshorten the LOLs
        if (message["title"].includes("{funny}")) {
            msgBody.innerText = message["body"].replaceAll("LOL", "Laugh Out Loud");
        } else {
            msgBody.innerText = message["body"];
        }
        // add the info elements to the message box element
        messageBox.append(msgSenderInfo, msgTitle, msgBody, spacer);
        // if the message is a reply then make it offset :D
        if (message["title"].includes("re: ")) {
            messageBox.style.marginLeft = "1em";
        }
        // if title has tag promo then add a border to the message
        if (message["title"].includes("{promo}")) {
            messageBox.style.border = "0.2em solid #E44423";
        }
        // add this message box element to the message board
        message_board.append(messageBox);
    }); 
}
/* 
Function: forum_postMsg
adds a new message to the forum

@e (event): the form event

*/
function forum_postMsg(e) {
    // prevent the normal form stuff
    e.preventDefault();
    // get the current date
    const date = new Date();
    /* 
    first we format the date to fi formatting 
    , convert it to a string 
    , split from the spaces
    , take the first part  
    , split it from the full stops
    so we will get an array -> [day, month, year]
    */
    const dateList = date.toLocaleString('fi-FI').toString().split(" ")[0].split(".");
    // date formatted the same as in the assignments dictionarys
    const dateAssFormat = `${dateList[2]}-${dateList[1]}-${dateList[0]}`;

    // get the form values probably
    const msgSender = document.getElementById("name").value;
    const msgTitle = document.getElementById("title").value;
    const msgBody = document.getElementById("body").value;
    // add the form values in a dictionary to the start of the messages array
    messages.unshift({
        "sender": msgSender,
        "date": dateAssFormat,
        "title": msgTitle,
        "body": msgBody
    });
    // reload forum messages 
    forum_load_messages();
    // reset the form and close the popup
    document.getElementById("commentForm").reset();
    document.getElementById("commentPopup").close();
}
/*
springfield gallery...
*/
/* 
Function: load_newImageWindow
loads a new photoView window to the focus page

@image_path (string): the path to the image in this photoView window
@parent_path (string): the path to get back to the correct gallery
*/
async function load_newImageWindow(image_path, parent_path) {
    // laod the template photoView focus page
    await load_newFocus("./springfield/photoView.html", "to_sf_btn");
    // get the back button
    const backBtn = document.getElementById("photoView_backBtn");
    // set the back buttons on click function to load the parent page to focus
    backBtn.onclick = function() {
        load_newFocus(parent_path, "to_sf_btn");
    }
    // get the image elem
    const imageElem = document.getElementById("photoView_img");
    // set the image source to the image path
    imageElem.src = image_path;
}
/*
Function: load_newToMis
loads focuspage or other html into missalanious
(also somewhere used to not reset the main nav while swapping focus)

@page_path (string): the page, that gets loaded, path
@toElem_id (string): the element id to what the page loads

returns 
 - true ( on success )
 - false ( on failure )
*/
async function load_newToMis(page_path, toElem_id) {
    // get the file content
    const fileContent = await read_file_txt(page_path);
    // get the toElem
    const toElem = document.getElementById(toElem_id);

    if (fileContent == false) {
        return (false);
    } else {
        // set the toElem innerHTML to the new page
        toElem.innerHTML = fileContent;
        return (true);
    }
}
/*
Function: load_newImaWin_toMis
loads a photoView page into missalanious

@image_path (string): the image, that gets loaded, path
@parent_path (string): the path to get back to the correct gallery/page
@toElem_id (string): the element id to what the page loads
@character (string): character that is selected
*/
async function load_newImaWin_toMis(image_path, parent_path, toElem_id, character = "none") {
    // load the photoView template page to the target element(toElem)
    await load_newToMis("./springfield/photoView.html", toElem_id);
    // get the back button element
    const backBtn = document.getElementById("photoView_backBtn");
    // set the back button onClick function based on if ... or ...
    // a character was given
    if (character != "none") {
        backBtn.onclick = async function() {
            // load focus character memes gallery
            await load_focusChar_memes(character);
        }
    } else { // a character was not given
        backBtn.onclick = async function() {
            // load given parent path to this target elem
            await load_newToMis(parent_path, toElem_id);
        }
    }
    // get the image elem
    const imageElem = document.getElementById("photoView_img");
    // set its source to the image path
    imageElem.src = image_path;
}
/* characters */
/*
Function: load_newCharFocus
loads a new character to focus

@character (string): the character name we want to focus on
*/
async function load_newCharFocus(character) {
    // loads a charFocus template page to focus area
    await load_newToMis(`./characters/charFocus.html`, "focus_area");
    // get the focusChar page elements
    const focusCharImg = document.getElementById("focusChar_image");
    const infoBtn = document.getElementById("focusChar_infoBtn");
    const memeBtn = document.getElementById("focusChar_memeBtn");
    // set the focus char image source as the focus char cover image
    focusCharImg.src = `./characters/chars/${character}/cover.jpg`;
    // set the info button onclick function to load focuschar info page
    infoBtn.onclick = async function() {
        await load_focusChar_info(character);
    }
    // set the meme button onclick function to load focuschar meme gallery
    memeBtn.onclick = async function() {
        await load_focusChar_memes(character);
    }
    // loads the focus char info to start with
    await load_focusChar_info(character);
}
/*
Function: load_focusChar_info
loads the character info to char data area

@character (string): the character whose info will be shown
*/
async function load_focusChar_info(character) {
    // load the infoPage template to the focusCharData_display element
    await load_newToMis("./characters/infoPage.html", "focusCharData_display");
    // get the char info elements
    const fullnameElem = document.getElementById("fullname_focuschar");
    const aboutCharElem = document.getElementById("about_focuschar_para");
    // set the char info texts to the characters fullname and about_char texts
    fullnameElem.innerText = await read_file_txt(`./characters/chars/${character}/fullname.txt`);
    aboutCharElem.innerText = await read_file_txt(`./characters/chars/${character}/about_char.txt`);
    // get the audioplayer element and create a source elemetn for it
    const audioPlayElem = document.getElementById("sampleAudio_player");
    const soundSource = document.createElement("source");
    // set the source elements source to the characters soundSample.wav file
    soundSource.src = `./characters/chars/${character}/audio/soundSample.wav`;
    // add the sound source element to the audioplayer element
    audioPlayElem.append(soundSource);
    // get the voiceactor info as a dictionary
    const actorInfo = await read_file_json(`./characters/chars/${character}/voiceactor.json`);
    // get the voiceactor info elements
    const actorNameElem = document.getElementById("voiceActorName");
    const actorLinkElem = document.getElementById("voiceActorLink");    
    const actorPhotoElem = document.getElementById("voiceActorPhoto");
    // set the voiceactor photo element to the characters voiceactors photo 
    actorPhotoElem.src = `./characters/chars/${character}/actorImg.jpg`;
    actorPhotoElem.alt = `Photo of ${actorInfo["name"]}`;
    // set the voiceactor name elements text to the voiceactors name
    actorNameElem.innerText = String(actorInfo["name"]);
    // set the link elements href to the correct link
    actorLinkElem.href = actorInfo["link"];
}
// define all the character meme filenames
meme_names = {
    "Apu":    ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"],
    "Bart":   ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.gif", "meme_5.gif"],
    "Homer":  ["meme_1.gif", "meme_2.gif", "meme_3.gif", "meme_4.gif", "meme_5.gif"],
    "Lisa":   ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"],
    "Maggie": ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"],
    "Marge":  ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"],
    "Moe":    ["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"],
    "MrBurns":["meme_1.jpg", "meme_2.jpg", "meme_3.jpg", "meme_4.jpg", "meme_5.jpg"]
}
/*
Function: load_focusChar_memes
loads the character memes to char data area

@character (string): the character whose memes will be shown
*/
async function load_focusChar_memes(character) {
    // load the gallery page to data display
    await load_newToMis(`./characters/gallery.html`, "focusCharData_display");
    // get the meme file names  
    const charMemes = meme_names[String(character)];
    // for all the memes ...
    for (let i = 1; i < 6; i++) {
        // get the meme button by its id
        const memeBtn = document.getElementById(`meme_${i}`);
        // get this meme filename
        const thisMeme = charMemes[Number(i-1)];
        // get this meme filepath
        const thisMemeImgPath = String(`./characters/chars/${character}/memes/${thisMeme}`);
        // set this meme button onclick to load photoView of this meme to the data display
        memeBtn.onclick = async function() {
            await load_newImaWin_toMis(
                thisMemeImgPath, 
                `./characters/gallery.html`, 
                "focusCharData_display",
                character
            );
        }
        //console.log(`${i}, onclick: ${memeBtn.onclick}`)
        // create a new img element
        const imageElem = document.createElement("img");
        // set its src to this meme img path
        imageElem.src = thisMemeImgPath;
        // set the alt to generic numberign of the memes
        imageElem.alt = `meme number ${i} of ${character}`;
        // add the image to the button
        memeBtn.append(imageElem);
    }
}