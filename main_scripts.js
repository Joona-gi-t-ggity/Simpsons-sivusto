// get focus area element
const focusArea = document.getElementById("focus_area");

const mainNav = document.getElementById("main_nav");

function resetSel_btns() {
    var selBtns = mainNav.getElementsByClassName("selBtn");
    for (let i = 0; i < selBtns.length; i++) {
        selBtns[i].className = "not_selBtn"
    }
}

function changeSel_btn(new_selected_id) {
    resetSel_btns()
    const selected_btn = document.getElementById(new_selected_id);
    selected_btn.className = "selBtn";
}

/* 
@filepath (string): the location of the file that need to be read

returns 
 - the file contents of the file ( if the read was succesfull)
 - false (if the read failed in some way (also failure will be logged in the console))
*/
async function read_file_txt(filepath) {
    try {
        const fileContent = await fetch(filepath);
        if (fileContent.ok == false) {
            console.error("File read failed !");
            return (false);
        } else {
            const results = await fileContent.text();
            return (results);
        }
    } catch (eCode) {
        console.error(`An error ocurred: ${eCode}`);
        return (false);
    }
}

async function read_file_json(filepath) {
    try {
        const fileContent = await fetch(filepath);
        if (fileContent.ok == false) {
            console.error("File read failed !");
            return (false);
        } else {
            const results = fileContent.json();
            return (results);
        }
    } catch (eCode) {
        console.error(`An error ocurred: ${eCode}`);
        return (false);
    }
}

/* 
@focusPage_path (string): path of the page that needs to be shown

returns
 - true (on success)
 - false (of failure)
*/
const forum_btn = document.getElementById("to_forum_btn");

async function load_newFocus(focusPage_path, button_id = "none") {
    if (button_id != "none") {
        changeSel_btn(button_id);
    } else {
        resetSel_btns()
    }
    const fileContent = await read_file_txt(focusPage_path);

    if (fileContent == false) {
        return (false);
    } else {
        focusArea.innerHTML = fileContent;
        if (forum_btn.className == "selBtn") {
            forum_load_messages()
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
function forum_load_messages() {
    const message_board = document.getElementById("forum_messages");
    // clear current messages from the msg board 
    message_board.innerHTML = "";
    // load the messages into the message board
    messages.forEach(message => {
        const messageBox = document.createElement("div");
        const spacer = document.createElement("hr");

        const msgSenderInfo = document.createElement("p");
        const msgTitle = document.createElement("h3");
        const msgBody = document.createElement("p");

        const dateSplit = message["date"].split("-");

        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        
        const correctFormDate = `${day}.${month}. ${year}`;

        // if a sender isnt stated set it to the default
        if (message["sender"] != ""){
            msgSenderInfo.innerText = `${message["sender"]} - ${correctFormDate}`;
        } else {
            msgSenderInfo.innerText = `somebody that i used to know - ${correctFormDate}`;
        }
        msgTitle.innerText = message["title"];
        // if the title has the tag funny then unshorten the LOLs
        if (message["title"].includes("{funny}")) {
            msgBody.innerText = message["body"].replaceAll("LOL", "Laugh Out Loud");
        } else {
            msgBody.innerText = message["body"];
        }

        messageBox.append(msgSenderInfo, msgTitle, msgBody, spacer);
        // change message box styling depending on the tags like promo or reply
        if (message["title"].includes("re: ")) {
            messageBox.style.marginLeft = "1em";
        }
        if (message["title"].includes("{promo}")) {
            messageBox.style.border = "0.2em solid #E44423";
        }

        message_board.append(messageBox);
    }); 
}

function forum_postMsg(e) {
    e.preventDefault();

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
    // date formatted the same as in the assignment thingy 
    const dateAssFormat = `${dateList[2]}-${dateList[1]}-${dateList[0]}`;

    const msgSender = document.getElementById("name").value;
    const msgTitle = document.getElementById("title").value;
    const msgBody = document.getElementById("body").value;

    messages.unshift({
        "sender": msgSender,
        "date": dateAssFormat,
        "title": msgTitle,
        "body": msgBody
    });

    forum_load_messages();

    document.getElementById("commentForm").reset();
    document.getElementById("commentPopup").close();
}
/*
springfield gallery...
*/
async function load_newImageWindow(image_path, parent_path) {
    await load_newFocus("./springfield/photoView.html", "to_sf_btn");

    const backBtn = document.getElementById("photoView_backBtn");
    backBtn.onclick = function() {
        load_newFocus(parent_path, "to_sf_btn");
    }
    const imageElem = document.getElementById("photoView_img");
    imageElem.src = image_path;
}
/*
load into missalanious
*/
async function load_newToMis(page_path, toElem_id) {
    const fileContent = await read_file_txt(page_path);

    const toElem = document.getElementById(toElem_id);

    if (fileContent == false) {
        return (false);
    } else {
        toElem.innerHTML = fileContent;
        return (true);
    }
}

async function load_newImaWin_toMis(image_path, parent_path, toElem_id, character = "none") {
    await load_newToMis("./springfield/photoView.html", toElem_id);

    const backBtn = document.getElementById("photoView_backBtn");
    if (character != "none") {
        backBtn.onclick = async function() {
            await load_focusChar_memes(character);
        }
    } else {
        backBtn.onclick = function() {
            load_newToMis(parent_path, toElem_id);
        }
    }
    const imageElem = document.getElementById("photoView_img");
    imageElem.src = image_path;
}
/* characters */
async function load_newCharFocus(character) {
    await load_newToMis(`./characters/charFocus.html`, "focus_area");

    const focusCharImg = document.getElementById("focusChar_image");
    const infoBtn = document.getElementById("focusChar_infoBtn");
    const memeBtn = document.getElementById("focusChar_memeBtn");

    focusCharImg.src = `./characters/chars/${character}/cover.jpg`

    infoBtn.onclick = async function() {
        await load_focusChar_info(character);
    }
    memeBtn.onclick = async function() {
        await load_focusChar_memes(character);
    }

    await load_focusChar_info(character)
}

async function load_focusChar_info(character) {
    await load_newToMis("./characters/infoPage.html", "focusCharData_display");
    const fullnameElem = document.getElementById("fullname_focuschar");
    const aboutCharElem = document.getElementById("about_focuschar_para");
    
    fullnameElem.innerText = await read_file_txt(`./characters/chars/${character}/fullname.txt`);
    aboutCharElem.innerText = await read_file_txt(`./characters/chars/${character}/about_char.txt`);

    const audioPlayElem = document.getElementById("sampleAudio_player")
    const soundSource = document.createElement("source")
    
    soundSource.src = `./characters/chars/${character}/audio/soundSample.wav`;
    audioPlayElem.append(soundSource)

    const actorInfo = await read_file_json(`./characters/chars/${character}/voiceactor.json`);

    const actorNameElem = document.getElementById("voiceActorName");
    const actorLinkElem = document.getElementById("voiceActorLink");    
    const actorPhotoElem = document.getElementById("voiceActorPhoto");

    actorPhotoElem.src = `./characters/chars/${character}/actorImg.jpg`;
    actorPhotoElem.alt = `Photo of ${actorInfo["name"]}`

    actorNameElem.innerText = String(actorInfo["name"]);

    actorLinkElem.href = actorInfo["link"]
}

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

async function load_focusChar_memes(character) {
    await load_newToMis(`./characters/gallery.html`, "focusCharData_display");
    
    const charMemes = meme_names[String(character)];

    for (let i = 1; i < 6; i++) {
        const memeBtn = document.getElementById(`meme_${i}`);
    
        const thisMeme = charMemes[Number(i-1)]
        const thisMemeImgPath = String(`./characters/chars/${character}/memes/${thisMeme}`);

        memeBtn.onclick = async function() {
            await load_newImaWin_toMis(
                thisMemeImgPath, 
                `./characters/gallery.html`, 
                "focusCharData_display",
                character
            );
        }

        console.log(`${i}, onclick: ${memeBtn.onclick}`)

        const imageElem = document.createElement("img");
        imageElem.src = `./characters/chars/${character}/memes/${thisMeme}`;
        imageElem.alt = `meme number ${i} of ${character}`
        memeBtn.append(imageElem)
    }
}