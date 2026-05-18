var charFocusElem = document.getElementById("charFocus");

const charArray = [
    {
        "name": "Homer",
        "About": "About Homer !!!",
        "path": "./chars/Homer",
        "id": 0
    },
    {
        "name": "Marge",
        "About": "About Marge !!!",
        "path": "./chars/Marge",
        "id": 1
    },
    {
        "name": "Bart",
        "About": "About Bart !!!",
        "path": "./chars/Bart",
        "id": 2
    },
    {
        "name": "Lisa",
        "About": "About Lisa !!!",
        "path": "./chars/Lisa",
        "id": 3
    },
    {
        "name": "Maggie",
        "About": "About Maggie !!!",
        "path": "./chars/Maggie",
        "id": 4
    },
    {
        "name": "Mr Burns",
        "About": "About Mr Burns !!!",
        "path": "./chars/MrBurns",
        "id": 5
    },
    {
        "name": "Apu",
        "About": "About Apu !!!",
        "path": "./chars/Apu",
        "id": 6
    },
    {
        "name": "Moe",
        "About": "About Moe !!!",
        "path": "./chars/Moe",
        "id": 7
    }
]

function create_main_charPage() {
    
}

function create_focus_CharPage() {

}

function set_focusChar() {
    const focusPage = create_focus_CharPage();
    charFocusElem.innerHTML = focusPage;
}