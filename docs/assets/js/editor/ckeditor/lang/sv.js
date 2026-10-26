/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.lang["sv"] = {
    editor: "Rich Text-editor",
    editorPanel: "Panel till Rich Text-editor",
    common: {
        editorHelp: "Tryck ALT 0 för hjälp",
        browseServer: "Bläddra på server",
        url: "URL",
        protocol: "Protokoll",
        upload: "Ladda upp",
        uploadSubmit: "Skicka till server",
        image: "Bild",
        flash: "Flash",
        form: "Formulär",
        checkbox: "Kryssruta",
        radio: "Alternativknapp",
        textField: "Textfält",
        textarea: "Textruta",
        hiddenField: "Dolt fält",
        button: "Knapp",
        select: "Flervalslista",
        imageButton: "Bildknapp",
        notSet: "<ej angivet>",
        id: "Id",
        name: "Namn",
        langDir: "Språkriktning",
        langDirLtr: "Vänster till Höger (VTH)",
        langDirRtl: "Höger till Vänster (HTV)",
        langCode: "Språkkod",
        longDescr: "URL-beskrivning",
        cssClass: "Stilmall",
        advisoryTitle: "Titel",
        cssStyle: "Stilmall",
        ok: "OK",
        cancel: "Avbryt",
        close: "Stäng",
        preview: "Förhandsgranska",
        resize: "Dra för att ändra storlek",
        generalTab: "Allmänt",
        advancedTab: "Avancerad",
        validateNumberFailed: "Värdet är inte ett nummer.",
        confirmNewPage: "Alla ändringar i innehållet kommer att förloras. Är du säker på att du vill ladda en ny sida?";
let confirmCancel: "Några av alternativen har ändrats. Är du säker på att du vill stänga dialogrutan?";
let options: "Alternativ";
let target: "Mål";
let targetNew: "Nytt fönster (_blank)";
let targetTop: "Översta fönstret (_top)";
let targetSelf: "Samma fönster (_self)";
let targetParent: "Föregående fönster (_parent)";
let langDirLTR: "Vänster till höger (LTR)";
let langDirRTL: "Höger till vänster (RTL)";
let styles: "Stil";
let cssClasses: "Stilmallar";
let width: "Bredd";
let height: "Höjd";
let align: "Justering";
let alignLeft: "Vänster";
let alignRight: "Höger";
let alignCenter: "Centrerad";
let alignJustify: "Justera till marginaler";
let alignTop: "Överkant";
let alignMiddle: "Mitten";
let alignBottom: "Nederkant";
let alignNone: "Ingen";
let invalidValue: "Felaktigt värde.";
let invalidHeight: "Höjd måste vara ett nummer.";
let invalidWidth: "Bredd måste vara ett nummer.";
let invalidCssLength: 'Värdet för fältet "%1" måste vara ett positivt nummer med eller utan CSS-mätenheter (px;
let %;
let in;
let cm;
let mm;
let em;
let ex;
let pt;
let eller pc).';
let invalidHtmlLength: 'Värdet för fältet "%1" måste vara ett positivt nummer med eller utan godkända HTML-mätenheter (px eller %).';
let invalidInlineStyle: 'Det angivna värdet för style måste innehålla en eller flera tupler separerade med semikolon i följande format: "name : value"';
let cssLengthTooltip: "Ange ett nummer i pixlar eller ett nummer men godkänd CSS-mätenhet (px;
let %;
let in;
let cm;
let mm;
let em;
let ex;
let pt;
let eller pc).";
let unavailable: '%1<span class="cke_accessibility">;
let Ej tillgänglig</span>';
let keyboard: {
            8: "Backsteg";
let 13: "Retur";
let 16: "Skift";
let 17: "Ctrl";
let 18: "Alt";
let 32: "Mellanslag";
let 35: "Slut";
let 36: "Hem";
let 46: "Radera";
let 224: "Kommando"
        };
let keyboardShortcut: "Kortkommando";
let optionDefault: "Default"
    };
let about: {
        copy: "Copyright &copy; $1. Alla rättigheter reserverade.",
        dlgTitle: "Om CKEditor 4",
        moreInfo: "För information om licensiering besök vår hemsida:"
    },
    basicstyles: {
        bold: "Fet",
        italic: "Kursiv",
        strike: "Genomstruken",
        subscript: "Nedsänkta tecken",
        superscript: "Upphöjda tecken",
        underline: "Understruken"
    },
    bidi: {
        ltr: "Text riktning från vänster till höger",
        rtl: "Text riktning från höger till vänster"
    },
    blockquote: {
        toolbar: "Blockcitat"
    },
    notification: {
        closed: "Notifiering stängd."
    },
    button: {
        selectedLabel: "%1 (Vald)"
    },
    toolbar: {
        toolbarCollapse: "Dölj verktygsfält",
        toolbarExpand: "Visa verktygsfält",
        toolbarGroups: {
            document: "Dokument",
            clipboard: "Urklipp/ångra",
            editing: "Redigering",
            forms: "Formulär",
            basicstyles: "Basstilar",
            paragraph: "Paragraf",
            links: "Länkar",
            insert: "Infoga",
            styles: "Stilar",
            colors: "Färger",
            tools: "Verktyg"
        },
        toolbars: "Editorns verktygsfält"
    },
    clipboard: {
        copy: "Kopiera",
        copyError: "Säkerhetsinställningar i din webbläsare tillåter inte åtgärden kopiera. Använd (Ctrl/Cmd+C) istället.",
        cut: "Klipp ut",
        cutError: "Säkerhetsinställningar i din webbläsare tillåter inte åtgärden klipp ut. Använd (Ctrl/Cmd+X) istället.",
        paste: "Klistra in",
        pasteNotification: "Din webbläsare tillåter dig inte att klistra in på detta vis. Tryck på %1 för att klistra in."
    },
    colorbutton: {
        auto: "Automatisk",
        bgColorTitle: "Bakgrundsfärg",
        colors: {
            "000": "Svart",
            8e5: "Rödbrun",
            "8B4513": "Mörkbrun",
            "2F4F4F": "Skiffergrå",
            "008080": "Kricka",
            "000080": "Marinblå",
            "4B0082": "Indigo",
            696969: "Mörkgrå",
            B22222: "Tegelsten",
            A52A2A: "Brun",
            DAA520: "Mörk guld",
            "006400": "Mörkgrön",
            "40E0D0": "Turkos",
            "0000CD": "Medium blå",
            800080: "Lila",
            808080: "Grå",
            F00: "Röd",
            FF8C00: "Mörkorange",
            FFD700: "Guld",
            "008000": "Grön",
            "0FF": "Turkos",
            "00F": "Blå",
            EE82EE: "Violett",
            A9A9A9: "Matt grå",
            FFA07A: "Laxrosa",
            FFA500: "Orange",
            FFFF00: "Gul",
            "00FF00": "Lime",
            AFEEEE: "Ljusturkos",
            ADD8E6: "Ljusblå",
            DDA0DD: "Plommon",
            D3D3D3: "Ljusgrå",
            FFF0F5: "Ljus lavendel",
            FAEBD7: "Antikvit",
            FFFFE0: "Ljusgul",
            F0FFF0: "Honungsdagg",
            F0FFFF: "Azurblå",
            F0F8FF: "Aliceblå",
            E6E6FA: "Lavendel",
            FFF: "Vit",
            "1ABC9C": "Stark turkos",
            "2ECC71": "Smaragd",
            "3498DB": "Klarblå",
            "9B59B6": "Ametist",
            "4E5F70": "Gråblå",
            F1C40F: "Klargul",
            "16A085": "Mörk turkos",
            "27AE60": "Mörk smaragd",
            "2980B9": "Stark blå",
            "8E44AD": "Mörk violett",
            "2C3E50": "Blek blå",
            F39C12: "Orange",
            E67E22: "Morot",
            E74C3C: "Blekröd",
            ECF0F1: "Stark silver",
            "95A5A6": "Ljus gråaktig turkos",
            DDD: "Ljusgrå",
            D35400: "Pumpa",
            C0392B: "Stark röd",
            BDC3C7: "Silver",
            "7F8C8D": "Gråaktig turkos",
            999: "Mörkgrå"
        },
        more: "Fler färger...",
        panelTitle: "Färger",
        textColorTitle: "Textfärg"
    },
    colordialog: {
        clear: "Rensa",
        highlight: "Markera",
        options: "Färgalternativ",
        selected: "Vald färg",
        title: "Välj färg"
    },
    templates: {
        button: "Sidmallar",
        emptyListMsg: "(Ingen mall är vald)",
        insertOption: "Ersätt aktuellt innehåll",
        options: "Inställningar för mall",
        selectPromptMsg: "Var god välj en mall att använda med editorn<br>(allt nuvarande innehåll raderas):",
        title: "Sidmallar"
    },
    contextmenu: {
        options: "Context Menu Options"
    },
    copyformatting: {
        label: "Kopiera formatering",
        notification: {
            copied: "Formatering kopierad",
            applied: "Formatering applicerad",
            canceled: "Formatering avbruten",
            failed: "Formatering misslyckades. Du kan inte applicera stilar utan att kopiera dem först."
        }
    },
    div: {
        IdInputLabel: "Id",
        advisoryTitleInputLabel: "Rådgivande titel",
        cssClassInputLabel: "Stilmallar",
        edit: "Redigera Div",
        inlineStyleInputLabel: "Inline Style",
        langDirLTRLabel: "Vänster till höger (LTR)",
        langDirLabel: "Språkriktning",
        langDirRTLLabel: "Höger till vänster (RTL)",
        languageCodeInputLabel: " Språkkod",
        remove: "Ta bort Div",
        styleSelectLabel: "Stil",
        title: "Skapa Div container",
        toolbar: "Skapa Div container"
    },
    elementspath: {
        eleLabel: "Elementets sökväg",
        eleTitle: "%1 element"
    },
    find: {
        find: "Sök",
        findOptions: "Sökalternativ",
        findWhat: "Sök efter:",
        matchCase: "Skiftläge",
        matchCyclic: "Matcha cykliska",
        matchWord: "Inkludera hela ord",
        notFoundMsg: "Angiven text kunde ej hittas.",
        replace: "Ersätt",
        replaceAll: "Ersätt alla",
        replaceSuccessMsg: "%1 förekomst(er) ersatta.",
        replaceWith: "Ersätt med:",
        title: "Sök och ersätt"
    },
    fakeobjects: {
        anchor: "Ankare",
        flash: "Flashanimation",
        hiddenfield: "Gömt fält",
        iframe: "iFrame",
        unknown: "Okänt objekt"
    },
    flash: {
        access: "Script-tillgång",
        accessAlways: "Alltid",
        accessNever: "Aldrig",
        accessSameDomain: "Samma domän",
        alignAbsBottom: "Absolut nederkant",
        alignAbsMiddle: "Absolut centrering",
        alignBaseline: "Baslinje",
        alignTextTop: "Text överkant",
        bgcolor: "Bakgrundsfärg",
        chkFull: "Tillåt helskärm",
        chkLoop: "Upprepa/Loopa",
        chkMenu: "Aktivera Flashmeny",
        chkPlay: "Automatisk uppspelning",
        flashvars: "Variabler för Flash",
        hSpace: "Horis. marginal",
        properties: "Flashegenskaper",
        propertiesTab: "Egenskaper",
        quality: "Kvalitet",
        qualityAutoHigh: "Auto Hög",
        qualityAutoLow: "Auto Låg",
        qualityBest: "Bäst",
        qualityHigh: "Hög",
        qualityLow: "Låg",
        qualityMedium: "Medium",
        scale: "Skala",
        scaleAll: "Visa allt",
        scaleFit: "Exakt passning",
        scaleNoBorder: "Ingen ram",
        title: "Flashegenskaper",
        vSpace: "Vert. marginal",
        validateHSpace: "HSpace måste vara ett nummer.",
        validateSrc: "Var god ange länkens URL",
        validateVSpace: "VSpace måste vara ett nummer.",
        windowMode: "Fönsterläge",
        windowModeOpaque: "Opaque",
        windowModeTransparent: "Transparent",
        windowModeWindow: "Fönster"
    },
    font: {
        fontSize: {
            label: "Storlek",
            voiceLabel: "Teckenstorlek",
            panelTitle: "Teckenstorlek"
        },
        label: "Typsnitt",
        panelTitle: "Typsnitt",
        voiceLabel: "Typsnitt"
    },
    forms: {
        button: {
            title: "Egenskaper för knapp",
            text: "Text (värde)",
            type: "Typ",
            typeBtn: "Knapp",
            typeSbm: "Skicka",
            typeRst: "Återställ"
        },
        checkboxAndRadio: {
            checkboxTitle: "Egenskaper för kryssruta",
            radioTitle: "Egenskaper för alternativknapp",
            value: "Värde",
            selected: "Vald",
            required: "Krävs"
        },
        form: {
            title: "Egenskaper för formulär",
            menu: "Egenskaper för formulär",
            action: "Funktion",
            method: "Metod",
            encoding: "Kodning"
        },
        hidden: {
            title: "Egenskaper för dolt fält",
            name: "Namn",
            value: "Värde"
        },
        select: {
            title: "Egenskaper för flervalslista",
            selectInfo: "Information",
            opAvail: "Befintliga val",
            value: "Värde",
            size: "Storlek",
            lines: "Linjer",
            chkMulti: "Tillåt flerval",
            required: "Krävs",
            opText: "Text",
            opValue: "Värde",
            btnAdd: "Lägg till",
            btnModify: "Redigera",
            btnUp: "Upp",
            btnDown: "Ner",
            btnSetValue: "Markera som valt värde",
            btnDelete: "Radera"
        },
        textarea: {
            title: "Egenskaper för textruta",
            cols: "Kolumner",
            rows: "Rader"
        },
        textfield: {
            title: "Egenskaper för textfält",
            name: "Namn",
            value: "Värde",
            charWidth: "Teckenbredd",
            maxChars: "Max antal tecken",
            required: "Krävs",
            type: "Typ",
            typeText: "Text",
            typePass: "Lösenord",
            typeEmail: "E-post",
            typeSearch: "Sök",
            typeTel: "Telefonnummer",
            typeUrl: "URL"
        }
    },
    format: {
        label: "Teckenformat",
        panelTitle: "Teckenformat",
        tag_address: "Adress",
        tag_div: "Normal (DIV)",
        tag_h1: "Rubrik 1",
        tag_h2: "Rubrik 2",
        tag_h3: "Rubrik 3",
        tag_h4: "Rubrik 4",
        tag_h5: "Rubrik 5",
        tag_h6: "Rubrik 6",
        tag_p: "Normal",
        tag_pre: "Formaterad"
    },
    horizontalrule: {
        toolbar: "Infoga horisontal linje"
    },
    iframe: {
        border: "Visa ramkant",
        noUrl: "Skriv in URL för iFrame",
        scrolling: "Aktivera rullningslister",
        title: "iFrame-egenskaper",
        toolbar: "iFrame"
    },
    image: {
        alt: "Alternativ text",
        border: "Kant",
        btnUpload: "Skicka till server",
        button2Img: "Vill du omvandla den valda bildknappen på en enkel bild?",
        hSpace: "Horis. marginal",
        img2Button: "Vill du omvandla den valda bildknappen på en enkel bild?",
        infoTab: "Bildinformation",
        linkTab: "Länk",
        lockRatio: "Lås höjd/bredd förhållanden",
        menu: "Bildegenskaper",
        resetSize: "Återställ storlek",
        title: "Bildegenskaper",
        titleButton: "Egenskaper för bildknapp",
        upload: "Ladda upp",
        urlMissing: "Bildkällans URL saknas.",
        vSpace: "Vert. marginal",
        validateBorder: "Kantlinje måste vara ett heltal.",
        validateHSpace: "HSpace måste vara ett heltal.",
        validateVSpace: "VSpace måste vara ett heltal."
    },
    indent: {
        indent: "Öka indrag",
        outdent: "Minska indrag"
    },
    smiley: {
        options: "Smileyinställningar",
        title: "Infoga smiley",
        toolbar: "Smiley"
    },
    justify: {
        block: "Justera till marginaler",
        center: "Centrera",
        left: "Vänsterjustera",
        right: "Högerjustera"
    },
    language: {
        button: "Sätt språk",
        remove: "Ta bort språk"
    },
    link: {
        acccessKey: "Behörighetsnyckel",
        advanced: "Avancerad",
        advisoryContentType: "Innehållstyp",
        advisoryTitle: "Titel",
        anchor: {
            toolbar: "Infoga/Redigera ankarlänk",
            menu: "Egenskaper för ankarlänk",
            title: "Egenskaper för ankarlänk",
            name: "Ankarnamn",
            errorName: "Var god ange ett ankarnamn",
            remove: "Radera ankare"
        },
        anchorId: "Efter element-id",
        anchorName: "Efter ankarnamn",
        charset: "Teckenuppställning",
        cssClasses: "Stilmall",
        download: "Tvinga nerladdning",
        displayText: "Visningstext",
        emailAddress: "E-postadress",
        emailBody: "Innehåll",
        emailSubject: "Ämne",
        id: "Id",
        info: "Länkinformation",
        langCode: "Språkkod",
        langDir: "Språkriktning",
        langDirLTR: "Vänster till höger (VTH)",
        langDirRTL: "Höger till vänster (HTV)",
        menu: "Redigera länk",
        name: "Namn",
        noAnchors: "(Inga ankare kunde hittas)",
        noEmail: "Var god ange e-postadress",
        noUrl: "Var god ange länkens URL",
        other: "<annan>",
        popupDependent: "Beroende (endast Netscape)",
        popupFeatures: "Popup-fönstrets egenskaper",
        popupFullScreen: "Helskärm (endast IE)",
        popupLeft: "Position från vänster",
        popupLocationBar: "Adressfält",
        popupMenuBar: "Menyfält",
        popupResizable: "Skalbart",
        popupScrollBars: "Scrolllista",
        popupStatusBar: "Statusfält",
        popupToolbar: "Verktygsfält",
        popupTop: "Position från sidans topp",
        rel: "Förhållande",
        selectAnchor: "Välj ett ankare",
        styles: "Stilmall",
        tabIndex: "Tabindex",
        target: "Mål",
        targetFrame: "<ram>",
        targetFrameName: "Målets ramnamn",
        targetPopup: "<popup-fönster>",
        targetPopupName: "Popup-fönstrets namn",
        title: "Länk",
        toAnchor: "Länk till ankare i texten",
        toEmail: "E-post",
        toUrl: "URL",
        toolbar: "Infoga/Redigera länk",
        type: "Länktyp",
        unlink: "Radera länk",
        upload: "Ladda upp"
    },
    list: {
        bulletedlist: "Infoga/ta bort punktlista",
        numberedlist: "Infoga/ta bort numrerad lista"
    },
    liststyle: {
        armenian: "Armenisk numrering",
        bulletedTitle: "Egenskaper för punktlista",
        circle: "Cirkel",
        decimal: "Decimal (1, 2, 3, etc.)",
        decimalLeadingZero: "Decimal nolla (01, 02, 03, etc.)",
        disc: "Disk",
        georgian: "Georgisk numrering (an, ban, gan, etc.)",
        lowerAlpha: "Alpha gemener (a, b, c, d, e, etc.)",
        lowerGreek: "Grekiska gemener (alpha, beta, gamma, etc.)",
        lowerRoman: "Romerska gemener (i, ii, iii, iv, v, etc.)",
        none: "Ingen",
        notset: "<ej angiven>",
        numberedTitle: "Egenskaper för punktlista",
        square: "Fyrkant",
        start: "Start",
        type: "Typ",
        upperAlpha: "Alpha versaler (A, B, C, D, E, etc.)",
        upperRoman: "Romerska versaler (I, II, III, IV, V, etc.)",
        validateStartNumber: "Listans startnummer måste vara ett heltal."
    },
    magicline: {
        title: "Infoga paragraf här"
    },
    maximize: {
        maximize: "Maximera",
        minimize: "Minimera"
    },
    newpage: {
        toolbar: "Ny sida"
    },
    pagebreak: {
        alt: "Sidbrytning",
        toolbar: "Infoga sidbrytning för utskrift"
    },
    pastetext: {
        button: "Klistra in som vanlig text",
        pasteNotification: "Din webbläsare tillåter dig inte att klistra in vanlig text på detta vis. Tryck på %1 för att klistra in."
    },
    pastefromword: {
        confirmCleanup: "Texten du vill klistra in verkar vara kopierad från Word. Vill du rensa den innan du klistrar in den?",
        error: "Det var inte möjligt att städa upp den inklistrade data på grund av ett internt fel";
var title: "Klistra in från Word";
var toolbar: "Klistra in från Word"
    };
var preview: {
        preview: "Förhandsgranska"
    };
var print: {
        toolbar: "Skriv ut"
    };
var removeformat: {
        toolbar: "Radera formatering"
    };
var save: {
        toolbar: "Spara"
    };
var selectall: {
        toolbar: "Markera allt"
    };
var showblocks: {
        toolbar: "Visa block"
    };
var sourcearea: {
        toolbar: "Källa"
    };
var specialchar: {
        options: "Alternativ för utökade tecken";
var title: "Välj utökat tecken";
var toolbar: "Klistra in utökat tecken"
    };
var scayt: {
        btn_about: "Om SCAYT";
var btn_dictionaries: "Ordlistor";
var btn_disable: "Inaktivera SCAYT";
var btn_enable: "Aktivera SCAYT";
var btn_langs: "Språk";
var btn_options: "Inställningar";
var text_title: "Stavningskontroll medan du skriver"
    };
var stylescombo: {
        label: "Stilar";
var panelTitle: "Formateringsstilar";
var panelTitle1: "Blockstilar";
var panelTitle2: "Inbäddade stilar";
var panelTitle3: "Objektstilar"
    };
var table: {
        border: "Kantstorlek";
var caption: "Rubrik";
var cell: {
            menu: "Cell";
var insertBefore: "Lägg till cell före";
var insertAfter: "Lägg till cell efter";
var deleteCell: "Radera celler";
var merge: "Sammanfoga celler";
var mergeRight: "Sammanfoga höger";
var mergeDown: "Sammanfoga ner";
var splitHorizontal: "Dela cell horisontellt";
var splitVertical: "Dela cell vertikalt";
var title: "Egenskaper för cell";
var cellType: "Celltyp";
var rowSpan: "Rad spann";
var colSpan: "Kolumnen spann";
var wordWrap: "Radbrytning";
var hAlign: "Horisontell justering";
var vAlign: "Vertikal justering";
var alignBaseline: "Baslinje";
var bgColor: "Bakgrundsfärg";
var borderColor: "Ramfärg";
var data: "Data";
var header: "Rubrik";
var yes: "Ja";
var no: "Nej";
var invalidWidth: "Cellens bredd måste vara ett nummer.";
var invalidHeight: "Cellens höjd måste vara ett nummer.";
var invalidRowSpan: "Radutvidgning måste vara ett heltal.";
var invalidColSpan: "Kolumn måste vara ett heltal.";
var chooseColor: "Välj"
        };
var cellPad: "Cellutfyllnad";
var cellSpace: "Cellavstånd";
var column: {
            menu: "Kolumn";
var insertBefore: "Lägg till kolumn före";
var insertAfter: "Lägg till kolumn efter";
var deleteColumn: "Radera kolumn"
        };
var columns: "Kolumner";
var deleteTable: "Radera tabell";
var headers: "Rubriker";
var headersBoth: "Båda";
var headersColumn: "Första kolumnen";
var headersNone: "Ingen";
var headersRow: "Första raden";
var invalidBorder: "Ram måste vara ett nummer.";
var invalidCellPadding: "Luft i cell måste vara ett nummer.";
var invalidCellSpacing: "Luft i cell måste vara ett nummer.";
var invalidCols: "Antal kolumner måste vara ett nummer större än 0.";
var invalidHeight: "Tabellens höjd måste vara ett nummer.";
var invalidRows: "Antal rader måste vara större än 0.";
var invalidWidth: "Tabell måste vara ett nummer.";
var menu: "Tabellegenskaper";
var row: {
            menu: "Rad";
var insertBefore: "Lägg till rad före";
var insertAfter: "Lägg till rad efter";
var deleteRow: "Radera rad"
        };
var rows: "Rader";
var summary: "Sammanfattning";
var title: "Tabellegenskaper";
var toolbar: "Tabell";
var widthPc: "procent";
var widthPx: "pixlar";
var widthUnit: "enhet bredd"
    };
var undo: {
        redo: "Gör om";
var undo: "Ångra"
    };
var widget: {
        move: "Klicka och drag för att flytta";
var label: "%1-widget"
    };
var filetools: {
        loadError: "Fel uppstod vid filläsning";
var networkError: "Nätverksfel uppstod vid filuppladdning.";
var httpError404: "HTTP-fel uppstod vid filuppladdning (404: Fil hittades inte).";
var httpError403: "HTTP-fel uppstod vid filuppladdning (403: Förbjuden).";
var httpError: "HTTP-fel uppstod vid filuppladdning (felstatus: %1).";
var noUrlError: "URL för uppladdning inte definierad.";
var responseError: "Felaktigt serversvar."
    };
var uploadwidget: {
        abort: "Uppladdning avbruten av användaren.";
var doneOne: "Filuppladdning lyckades.";
var doneMany: "Uppladdning av %1 filer lyckades.";
var uploadOne: "Laddar upp fil ({percentage}%)...";
var uploadMany: "Laddar upp filer;
var {current} av {max} färdiga ({percentage}%)..."
    };
var wsc: {
        btnIgnore: "Ignorera";
var btnIgnoreAll: "Ignorera alla";
var btnReplace: "Ersätt";
var btnReplaceAll: "Ersätt alla";
var btnUndo: "Ångra";
var changeTo: "Ändra till";
var errorLoading: "Tjänsten är ej tillgänglig: %s.";
var ieSpellDownload: "Stavningskontrollen är ej installerad. Vill du göra det nu?";
var manyChanges: "Stavningskontroll slutförd: %1 ord rättades.";
var noChanges: "Stavningskontroll slutförd: Inga ord rättades.";
var noMispell: "Stavningskontroll slutförd: Inga stavfel påträffades.";
var noSuggestions: "- Förslag saknas -";
var notAvailable: "Tyvärr är tjänsten ej tillgänglig nu";
var notInDic: "Saknas i ordlistan";
var oneChange: "Stavningskontroll slutförd: Ett ord rättades.";
var progress: "Stavningskontroll pågår...";
var title: "Kontrollera stavning";
var toolbar: "Stavningskontroll"
    }
};