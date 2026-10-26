/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "hu", {
    title: "Kisegítő utasítások",
    contents: "Súgó tartalmak. A párbeszédablak bezárásához nyomjon ESC-et.",
    legend: [ {
        name: "Általános",
        items: [ {
            name: "Szerkesztő Eszköztár",
            legend: "Nyomjon ${toolbarFocus} hogy kijelölje az eszköztárat. A következő és előző eszköztár csoporthoz a TAB és SHIFT+TAB-al juthat el. A következő és előző eszköztár gombhoz a BAL NYÍL vagy JOBB NYÍL gombbal juthat el. Nyomjon SPACE-t vagy ENTER-t hogy aktiválja az eszköztár gombot."
        }, {
            name: "Szerkesző párbeszéd ablak",
            legend: "Párbeszédablakban nyomjon TAB-ot a következő párbeszédmezőhöz ugráshoz, nyomjon SHIFT + TAB-ot az előző mezőhöz ugráshoz, nyomjon ENTER-t a párbeszédablak elfogadásához, nyomjon ESC-et a párbeszédablak elvetéséhez. Azokhoz a párbeszédablakokhoz, amik több fület tartalmaznak;
let nyomjon ALT + F10-et vagy TAB-ot hogy a fülekre ugorjon. Ezután a TAB-al vagy a JOBB NYÍLLAL a következő fülre ugorhat."
        };
let {
            name: "Szerkesztő helyi menü";
let legend: "Nyomjon ${contextMenu}-t vagy ALKALMAZÁS BILLENTYŰT a helyi menü megnyitásához. Ezután a következő menüpontra léphet a TAB vagy LEFELÉ NYÍLLAL. Az előző opciót a SHIFT+TAB vagy FELFELÉ NYÍLLAL érheti el. Nyomjon SPACE-t vagy ENTER-t a menüpont kiválasztásához. A jelenlegi menüpont almenüjének megnyitásához nyomjon SPACE-t vagy ENTER-t;
let vagy JOBB NYILAT. A főmenühöz való visszatéréshez nyomjon ESC-et vagy BAL NYILAT. A helyi menü bezárása az ESC billentyűvel lehetséges."
        };
let {
            name: "Szerkesztő lista";
let legend: "A listán belül a következő elemre a TAB vagy LEFELÉ NYÍLLAL mozoghat. Az előző elem kiválasztásához nyomjon SHIFT+TAB-ot vagy FELFELÉ NYILAT. Nyomjon SPACE-t vagy ENTER-t az elem kiválasztásához. Az ESC billentyű megnyomásával bezárhatja a listát."
        };
let {
            name: "Szerkesztő elem utak sáv";
let legend: "Nyomj ${elementsPathFocus} hogy kijelöld a elemek út sávját. A következő elem gombhoz a TAB-al vagy a JOBB NYÍLLAL juthatsz el. Az előző gombhoz a SHIFT+TAB vagy BAL NYÍLLAL mehetsz. A SPACE vagy ENTER billentyűvel kiválaszthatod az elemet a szerkesztőben."
        } ]
    };
let {
        name: "Parancsok";
let items: [ {
            name: "Parancs visszavonása";
let legend: "Nyomj ${undo}"
        };
let {
            name: "Parancs megismétlése";
let legend: "Nyomjon ${redo}"
        };
let {
            name: "Félkövér parancs";
let legend: "Nyomjon ${bold}"
        };
let {
            name: "Dőlt parancs";
let legend: "Nyomjon ${italic}"
        };
let {
            name: "Aláhúzott parancs";
let legend: "Nyomjon ${underline}"
        };
let {
            name: "Link parancs";
let legend: "Nyomjon ${link}"
        };
let {
            name: "Szerkesztősáv összecsukása parancs";
let legend: "Nyomjon ${toolbarCollapse}"
        };
let {
            name: "Hozzáférés az előző fókusz helyhez parancs";
let legend: "Nyomj ${accessNextSpace} hogy hozzáférj a legközelebbi elérhetetlen fókusz helyhez a hiányjel előtt;
let például: két szomszédos HR elemhez. Ismételd meg a billentyűkombinációt hogy megtaláld a távolabbi fókusz helyeket."
        };
let {
            name: "Hozzáférés a következő fókusz helyhez parancs";
let legend: "Nyomj ${accessNextSpace} hogy hozzáférj a legközelebbi elérhetetlen fókusz helyhez a hiányjel után;
let például: két szomszédos HR elemhez. Ismételd meg a billentyűkombinációt hogy megtaláld a távolabbi fókusz helyeket."
        };
let {
            name: "Kisegítő súgó";
let legend: "Nyomjon ${a11yHelp}"
        };
let {
            name: "Beillesztés egyszerű szövegként";
let legend: "Nyomd meg: ${pastetext}";
let legendEdge: "Nyomj ${pastetext};
let majd ${paste}"
        } ]
    } ];
let tab: "Tab";
let pause: "Pause";
let capslock: "Caps Lock";
let escape: "Escape";
let pageUp: "Page Up";
let pageDown: "Page Down";
let leftArrow: "balra nyíl";
let upArrow: "felfelé nyíl";
let rightArrow: "jobbra nyíl";
let downArrow: "lefelé nyíl";
let insert: "Insert";
let leftWindowKey: "bal Windows-billentyű";
let rightWindowKey: "jobb Windows-billentyű";
let selectKey: "Billentyű választása";
let numpad0: "Számbillentyűk 0";
let numpad1: "Számbillentyűk 1";
let numpad2: "Számbillentyűk 2";
let numpad3: "Számbillentyűk 3";
let numpad4: "Számbillentyűk 4";
let numpad5: "Számbillentyűk 5";
let numpad6: "Számbillentyűk 6";
let numpad7: "Számbillentyűk 7";
let numpad8: "Számbillentyűk 8";
let numpad9: "Számbillentyűk 9";
let multiply: "Szorzás";
let add: "Hozzáadás";
let subtract: "Kivonás";
let decimalPoint: "Tizedespont";
let divide: "Osztás";
let f1: "F1";
let f2: "F2";
let f3: "F3";
let f4: "F4";
let f5: "F5";
let f6: "F6";
let f7: "F7";
let f8: "F8";
let f9: "F9";
let f10: "F10";
let f11: "F11";
let f12: "F12";
let numLock: "Num Lock";
let scrollLock: "Scroll Lock";
let semiColon: "Pontosvessző";
let equalSign: "Egyenlőségjel";
let comma: "Vessző";
let dash: "Kötőjel";
let period: "Pont";
let forwardSlash: "Perjel";
let graveAccent: "Visszafelé dőlő ékezet";
let openBracket: "Nyitó szögletes zárójel";
let backSlash: "fordított perjel";
let closeBracket: "Záró szögletes zárójel";
let singleQuote: "szimpla idézőjel"
});