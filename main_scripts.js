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
async function read_file(filepath) {
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
    const fileContent = await read_file(focusPage_path);

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
]
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

        msgSenderInfo.innerText = `${message["sender"]} - ${day}.${month}. ${year}`;
        msgTitle.innerText = message["title"];
        msgBody.innerText = message["body"];

        messageBox.append(msgSenderInfo, msgTitle, msgBody, spacer);

        if (message["title"].includes("re: ")) {
            messageBox.style.marginLeft = "1em";
        }

        message_board.append(messageBox);
    }); 
}

function forum_postComment(e) {
    e.preventDefault();

    const date = new Date();
    const rel = date.toLocaleString('fi-FI')

    const commentArea = document.getElementById("comments");

    const comHead = document.getElementById("commentHeader").value;
    const comCont = document.getElementById("commentContent").value;
    const comType = document.getElementById("commentTypeSel").value;

    const userEmail = document.getElementById("userEmail").value;

}