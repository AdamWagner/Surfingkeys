{
    var Clipboard = {};

    Clipboard.createTextArea = function() {
        var t = document.createElement("textarea");
        t.style.position = "absolute";
        t.style.left = "-100%";
        return t;
    };

    Clipboard.copy = function(text) {
        var t = this.createTextArea();
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand("Copy");
        document.body.removeChild(t);
    };

    Clipboard.paste = function() {
        var t = this.createTextArea();
        document.body.appendChild(t);
        t.focus();
        document.execCommand("Paste");
        var text = t.value;
        document.body.removeChild(t);
        return text;
    };
}

{
    var Utils = {
        getHostname: function(href) {
            var res = window.location.host || "file";

            if (href) {
                var a = document.createElement("a");
                a.href = href;
                res = a.host;
            }

            return res;
        },
        defaultSearchEngine: "https://www.google.com/search?q=",
        format: function(string, value) {
            var index = string.lastIndexOf("%s");
            if (index < 0) return string + value;
            return string.slice(0, index) + value + string.slice(index + 2);
        },
        toSearchURL: function(query, engineUrl) {
            if (Utils.isValidURL(query)) {
                return (!/^[a-zA-Z\-]+:/.test(query) ? "http://" : "") + query;
            }
            engineUrl = engineUrl || Utils.defaultSearchEngine;
            return Utils.format(engineUrl, encodeURIComponent(query));
        },

        isValidURL: (function() {
            var TLDs = [
                "abogado",
                "ac",
                "academy",
                "accountants",
                "active",
                "actor",
                "ad",
                "adult",
                "ae",
                "aero",
                "af",
                "ag",
                "agency",
                "ai",
                "airforce",
                "al",
                "allfinanz",
                "alsace",
                "am",
                "amsterdam",
                "an",
                "android",
                "ao",
                "aq",
                "aquarelle",
                "ar",
                "archi",
                "army",
                "arpa",
                "as",
                "asia",
                "associates",
                "at",
                "attorney",
                "au",
                "auction",
                "audio",
                "autos",
                "aw",
                "ax",
                "axa",
                "az",
                "ba",
                "band",
                "bank",
                "bar",
                "barclaycard",
                "barclays",
                "bargains",
                "bayern",
                "bb",
                "bd",
                "be",
                "beer",
                "berlin",
                "best",
                "bf",
                "bg",
                "bh",
                "bi",
                "bid",
                "bike",
                "bio",
                "biz",
                "bj",
                "black",
                "blackfriday",
                "bloomberg",
                "blue",
                "bm",
                "bmw",
                "bn",
                "bnpparibas",
                "bo",
                "boo",
                "boutique",
                "br",
                "brussels",
                "bs",
                "bt",
                "budapest",
                "build",
                "builders",
                "business",
                "buzz",
                "bv",
                "bw",
                "by",
                "bz",
                "bzh",
                "ca",
                "cab",
                "cal",
                "camera",
                "camp",
                "cancerresearch",
                "capetown",
                "capital",
                "caravan",
                "cards",
                "care",
                "career",
                "careers",
                "cartier",
                "casa",
                "cash",
                "cat",
                "catering",
                "cc",
                "cd",
                "center",
                "ceo",
                "cern",
                "cf",
                "cg",
                "ch",
                "channel",
                "cheap",
                "christmas",
                "chrome",
                "church",
                "ci",
                "citic",
                "city",
                "ck",
                "cl",
                "claims",
                "cleaning",
                "click",
                "clinic",
                "clothing",
                "club",
                "cm",
                "cn",
                "co",
                "coach",
                "codes",
                "coffee",
                "college",
                "cologne",
                "com",
                "community",
                "company",
                "computer",
                "condos",
                "construction",
                "consulting",
                "contractors",
                "cooking",
                "cool",
                "coop",
                "country",
                "cr",
                "credit",
                "creditcard",
                "cricket",
                "crs",
                "cruises",
                "cu",
                "cuisinella",
                "cv",
                "cw",
                "cx",
                "cy",
                "cymru",
                "cz",
                "dabur",
                "dad",
                "dance",
                "dating",
                "day",
                "dclk",
                "de",
                "deals",
                "degree",
                "delivery",
                "democrat",
                "dental",
                "dentist",
                "desi",
                "design",
                "dev",
                "diamonds",
                "diet",
                "digital",
                "direct",
                "directory",
                "discount",
                "dj",
                "dk",
                "dm",
                "dnp",
                "do",
                "docs",
                "domains",
                "doosan",
                "durban",
                "dvag",
                "dz",
                "eat",
                "ec",
                "edu",
                "education",
                "ee",
                "eg",
                "email",
                "emerck",
                "energy",
                "engineer",
                "engineering",
                "enterprises",
                "equipment",
                "er",
                "es",
                "esq",
                "estate",
                "et",
                "eu",
                "eurovision",
                "eus",
                "events",
                "everbank",
                "exchange",
                "expert",
                "exposed",
                "fail",
                "farm",
                "fashion",
                "feedback",
                "fi",
                "finance",
                "financial",
                "firmdale",
                "fish",
                "fishing",
                "fit",
                "fitness",
                "fj",
                "fk",
                "flights",
                "florist",
                "flowers",
                "flsmidth",
                "fly",
                "fm",
                "fo",
                "foo",
                "forsale",
                "foundation",
                "fr",
                "frl",
                "frogans",
                "fund",
                "furniture",
                "futbol",
                "ga",
                "gal",
                "gallery",
                "garden",
                "gb",
                "gbiz",
                "gd",
                "ge",
                "gent",
                "gf",
                "gg",
                "ggee",
                "gh",
                "gi",
                "gift",
                "gifts",
                "gives",
                "gl",
                "glass",
                "gle",
                "global",
                "globo",
                "gm",
                "gmail",
                "gmo",
                "gmx",
                "gn",
                "goog",
                "google",
                "gop",
                "gov",
                "gp",
                "gq",
                "gr",
                "graphics",
                "gratis",
                "green",
                "gripe",
                "gs",
                "gt",
                "gu",
                "guide",
                "guitars",
                "guru",
                "gw",
                "gy",
                "hamburg",
                "hangout",
                "haus",
                "healthcare",
                "help",
                "here",
                "hermes",
                "hiphop",
                "hiv",
                "hk",
                "hm",
                "hn",
                "holdings",
                "holiday",
                "homes",
                "horse",
                "host",
                "hosting",
                "house",
                "how",
                "hr",
                "ht",
                "hu",
                "ibm",
                "id",
                "ie",
                "ifm",
                "il",
                "im",
                "immo",
                "immobilien",
                "in",
                "industries",
                "info",
                "ing",
                "ink",
                "institute",
                "insure",
                "int",
                "international",
                "investments",
                "io",
                "iq",
                "ir",
                "irish",
                "is",
                "it",
                "iwc",
                "jcb",
                "je",
                "jetzt",
                "jm",
                "jo",
                "jobs",
                "joburg",
                "jp",
                "juegos",
                "kaufen",
                "kddi",
                "ke",
                "kg",
                "kh",
                "ki",
                "kim",
                "kitchen",
                "kiwi",
                "km",
                "kn",
                "koeln",
                "kp",
                "kr",
                "krd",
                "kred",
                "kw",
                "ky",
                "kyoto",
                "kz",
                "la",
                "lacaixa",
                "land",
                "lat",
                "latrobe",
                "lawyer",
                "lb",
                "lc",
                "lds",
                "lease",
                "legal",
                "lgbt",
                "li",
                "lidl",
                "life",
                "lighting",
                "limited",
                "limo",
                "link",
                "lk",
                "loans",
                "london",
                "lotte",
                "lotto",
                "lr",
                "ls",
                "lt",
                "ltda",
                "lu",
                "luxe",
                "luxury",
                "lv",
                "ly",
                "ma",
                "madrid",
                "maison",
                "management",
                "mango",
                "market",
                "marketing",
                "marriott",
                "mc",
                "md",
                "me",
                "media",
                "meet",
                "melbourne",
                "meme",
                "memorial",
                "menu",
                "mg",
                "mh",
                "miami",
                "mil",
                "mini",
                "mk",
                "ml",
                "mm",
                "mn",
                "mo",
                "mobi",
                "moda",
                "moe",
                "monash",
                "money",
                "mormon",
                "mortgage",
                "moscow",
                "motorcycles",
                "mov",
                "mp",
                "mq",
                "mr",
                "ms",
                "mt",
                "mu",
                "museum",
                "mv",
                "mw",
                "mx",
                "my",
                "mz",
                "na",
                "nagoya",
                "name",
                "navy",
                "nc",
                "ne",
                "net",
                "network",
                "neustar",
                "new",
                "nexus",
                "nf",
                "ng",
                "ngo",
                "nhk",
                "ni",
                "ninja",
                "nl",
                "no",
                "np",
                "nr",
                "nra",
                "nrw",
                "nu",
                "nyc",
                "nz",
                "okinawa",
                "om",
                "one",
                "ong",
                "onl",
                "ooo",
                "org",
                "organic",
                "osaka",
                "otsuka",
                "ovh",
                "pa",
                "paris",
                "partners",
                "parts",
                "party",
                "pe",
                "pf",
                "pg",
                "ph",
                "pharmacy",
                "photo",
                "photography",
                "photos",
                "physio",
                "pics",
                "pictures",
                "pink",
                "pizza",
                "pk",
                "pl",
                "place",
                "plumbing",
                "pm",
                "pn",
                "pohl",
                "poker",
                "porn",
                "post",
                "pr",
                "praxi",
                "press",
                "pro",
                "prod",
                "productions",
                "prof",
                "properties",
                "property",
                "ps",
                "pt",
                "pub",
                "pw",
                "py",
                "qa",
                "qpon",
                "quebec",
                "re",
                "realtor",
                "recipes",
                "red",
                "rehab",
                "reise",
                "reisen",
                "reit",
                "ren",
                "rentals",
                "repair",
                "report",
                "republican",
                "rest",
                "restaurant",
                "reviews",
                "rich",
                "rio",
                "rip",
                "ro",
                "rocks",
                "rodeo",
                "rs",
                "rsvp",
                "ru",
                "ruhr",
                "rw",
                "ryukyu",
                "sa",
                "saarland",
                "sale",
                "samsung",
                "sarl",
                "sb",
                "sc",
                "sca",
                "scb",
                "schmidt",
                "schule",
                "schwarz",
                "science",
                "scot",
                "sd",
                "se",
                "services",
                "sew",
                "sexy",
                "sg",
                "sh",
                "shiksha",
                "shoes",
                "shriram",
                "si",
                "singles",
                "sj",
                "sk",
                "sky",
                "sl",
                "sm",
                "sn",
                "so",
                "social",
                "software",
                "sohu",
                "solar",
                "solutions",
                "soy",
                "space",
                "spiegel",
                "sr",
                "st",
                "su",
                "supplies",
                "supply",
                "support",
                "surf",
                "surgery",
                "suzuki",
                "sv",
                "sx",
                "sy",
                "sydney",
                "systems",
                "sz",
                "taipei",
                "tatar",
                "tattoo",
                "tax",
                "tc",
                "td",
                "technology",
                "tel",
                "temasek",
                "tf",
                "tg",
                "th",
                "tienda",
                "tips",
                "tires",
                "tirol",
                "tj",
                "tk",
                "tl",
                "tm",
                "tn",
                "to",
                "today",
                "tokyo",
                "tools",
                "top",
                "town",
                "toys",
                "tp",
                "tr",
                "trade",
                "training",
                "travel",
                "trust",
                "tt",
                "tui",
                "tv",
                "tw",
                "tz",
                "ua",
                "ug",
                "uk",
                "university",
                "uno",
                "uol",
                "us",
                "uy",
                "uz",
                "va",
                "vacations",
                "vc",
                "ve",
                "vegas",
                "ventures",
                "versicherung",
                "vet",
                "vg",
                "vi",
                "viajes",
                "video",
                "villas",
                "vision",
                "vlaanderen",
                "vn",
                "vodka",
                "vote",
                "voting",
                "voto",
                "voyage",
                "vu",
                "wales",
                "wang",
                "watch",
                "webcam",
                "website",
                "wed",
                "wedding",
                "wf",
                "whoswho",
                "wien",
                "wiki",
                "williamhill",
                "wme",
                "work",
                "works",
                "world",
                "ws",
                "wtc",
                "wtf",
                "xn--1qqw23a",
                "xn--3bst00m",
                "xn--3ds443g",
                "xn--3e0b707e",
                "xn--45brj9c",
                "xn--45q11c",
                "xn--4gbrim",
                "xn--55qw42g",
                "xn--55qx5d",
                "xn--6frz82g",
                "xn--6qq986b3xl",
                "xn--80adxhks",
                "xn--80ao21a",
                "xn--80asehdb",
                "xn--80aswg",
                "xn--90a3ac",
                "xn--b4w605ferd",
                "xn--c1avg",
                "xn--cg4bki",
                "xn--clchc0ea0b2g2a9gcd",
                "xn--czr694b",
                "xn--czrs0t",
                "xn--czru2d",
                "xn--d1acj3b",
                "xn--d1alf",
                "xn--fiq228c5hs",
                "xn--fiq64b",
                "xn--fiqs8s",
                "xn--fiqz9s",
                "xn--flw351e",
                "xn--fpcrj9c3d",
                "xn--fzc2c9e2c",
                "xn--gecrj9c",
                "xn--h2brj9c",
                "xn--hxt814e",
                "xn--i1b6b1a6a2e",
                "xn--io0a7i",
                "xn--j1amh",
                "xn--j6w193g",
                "xn--kprw13d",
                "xn--kpry57d",
                "xn--kput3i",
                "xn--l1acc",
                "xn--lgbbat1ad8j",
                "xn--mgb9awbf",
                "xn--mgba3a4f16a",
                "xn--mgbaam7a8h",
                "xn--mgbab2bd",
                "xn--mgbayh7gpa",
                "xn--mgbbh1a71e",
                "xn--mgbc0a9azcg",
                "xn--mgberp4a5d4ar",
                "xn--mgbx4cd0ab",
                "xn--ngbc5azd",
                "xn--node",
                "xn--nqv7f",
                "xn--nqv7fs00ema",
                "xn--o3cw4h",
                "xn--ogbpf8fl",
                "xn--p1acf",
                "xn--p1ai",
                "xn--pgbs0dh",
                "xn--q9jyb4c",
                "xn--qcka1pmc",
                "xn--rhqv96g",
                "xn--s9brj9c",
                "xn--ses554g",
                "xn--unup4y",
                "xn--vermgensberater-ctb",
                "xn--vermgensberatung-pwb",
                "xn--vhquv",
                "xn--wgbh1c",
                "xn--wgbl6a",
                "xn--xhq521b",
                "xn--xkc2al3hye2a",
                "xn--xkc2dl3a5ee0h",
                "xn--yfro4i67o",
                "xn--ygbi2ammx",
                "xn--zfr164b",
                "xxx",
                "xyz",
                "yachts",
                "yandex",
                "ye",
                "yoga",
                "yokohama",
                "youtube",
                "yt",
                "za",
                "zip",
                "zm",
                "zone",
                "zuerich",
                "zw"
            ];
            var PROTOCOLS = ["http:", "https:", "file:", "ftp:", "chrome:", "chrome-extension:"];
            return function(url) {
                url = url.trim();
                if (~url.indexOf(" ")) return false;
                if (~url.search(/^(about|file):[^:]/)) return true;
                var protocol = (url.match(/^([a-zA-Z\-]+:)[^:]/) || [""])[0].slice(0, -1);
                var protocolMatch = PROTOCOLS.indexOf(protocol) !== -1;
                if (protocolMatch) url = url.replace(/^[a-zA-Z\-]+:\/*/, "");
                var hasPath = /.*[a-zA-Z].*\//.test(url);
                url = url.replace(/(:[0-9]+)?([#\/].*|$)/g, "").split(".");
                if (protocolMatch && /^[a-zA-Z0-9@!]+$/.test(url)) return true;
                if (protocol && !protocolMatch && protocol !== "localhost:") return false;
                var isIP = url.every(function(e) {
                    // IP addresses
                    return /^[0-9]+$/.test(e) && +e >= 0 && +e < 256;
                });
                if ((isIP && !protocol && url.length === 4) || (isIP && protocolMatch)) return true;
                return (
                    (url.every(function(e) {
                        return /^[a-z0-9\-]+$/i.test(e);
                    }) &&
                        (url.length > 1 && TLDs.indexOf(url[url.length - 1]) !== -1)) ||
                    (url.length === 1 && url[0] === "localhost") ||
                    hasPath
                );
            };
        })()
    };
}

var State = {
    tabsMarked: new Map(),
    tabsSettings: new Map()
    // globalSettings: {
    //     focusAfterClosed: "right",
    //     repeatThreshold: 99,
    //     tabsMRUOrder: true,
    //     newTabPosition: 'default',
    //     showTabIndices: false,
    //     interceptedErrors: []
    // }
};

class CustomBackground {
    init() {
        this.registerListeners();
    }

    registerListeners() {
        chrome.runtime.onMessage.addListener((_message, _sender, _sendResponse, _port) => {
            this.handlePortMessage(_message, _sender, _sendResponse, _port);
        });

        chrome.runtime.onConnect.addListener(port => {
            var sender = port.sender;
            port.onMessage.addListener((message, port) => {
                return this.handlePortMessage(
                    message,
                    port.sender,
                    function(resp) {
                        try {
                            if (!port.isDisconnected) {
                                port.postMessage(resp);
                            }
                        } catch (e) {
                            console.error(message.action + ": " + e);
                            console.error(port, e);
                        }
                    },
                    port
                );
            });
        });

        chrome.commands.onCommand.addListener(function(command) {
            switch (command) {
                case "handlebothcwevents":
                    CustomBackground.handleCtrlWFeature();
                    break;
            }
        });

        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            CustomBackground.pageStylesheetLoadByDomain(changeInfo, tab);
            CustomBackground.tabSendMessageOnWhenDoneLoading(changeInfo, tab);
        });

        chrome.tabs.onCreated.addListener(function(tab) {
            CustomBackground.tabsOnCreatedHandler(tab);
            CustomBackground.tabsMuteByDomain(tab);
        });
    }

    async tabUnmute(message, sender, sendResponse) {
        const ctab = await chrome.tabs.get(sender.tab.id);
        chrome.tabs.update(ctab.id, {
            muted: false
        });
    }

    static async tabsMuteByDomain(tab) {
        // Note(hbt) for now mute all tabs and unmute in config file
        chrome.tabs.update(tab.id, {
            muted: true
        });
    }

    /**
     * open on the right even when clicking with the mouse instead of using hints
     *
     * @param tab
     * @returns {Promise<void>}
     */
    static async tabsOnCreatedHandler(tab) {
        if (tab.openerTabId) {
            const otab = await chrome.tabs.get(tab.openerTabId);
            if (State.tabsSettings.has(otab.id)) {
                if (State.tabsSettings.get(otab.id).newTabPosition === "right") {
                    chrome.tabs.get(tab.openerTabId, ot => {
                        chrome.tabs.move(tab.id, {
                            index: ot.index + 1
                        });
                    });
                }
            }
        }
    }

    sendResponse(message, sendResponse, result) {
        result.action = message.action;
        result.id = message.id;
        sendResponse(result);
    }

    handlePortMessage(_message, _sender, _sendResponse, _port) {
        if (_message && _message.target !== "content_runtime") {
            if (this[_message.action] instanceof Function) {
                try {
                    this[_message.action](_message, _sender, _sendResponse);
                } catch (e) {
                    console.log(_message.action + ": " + e);
                    console.error(e);
                }
            }
        }
    }

    async updateSettings(message, sender, sendResponse) {
        this.updateMySettings(message, sender, sendResponse);
    }

    async updateMySettings(message, sender, sendResponse) {
        State.tabsSettings.set(sender.tab.id, message.settings);
    }

    async insertOpenExternalEditor(message, sender, sendResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8001");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.sendResponse(message, sendResponse, {
                    type: "editWithVIMCallback",
                    text: xhr.responseText,
                    elementId: message.elementId
                });
            }
        };
        xhr.send(
            JSON.stringify({
                data: "" + (message.text || ""),
                line: message.line || 0,
                column: message.column || 0
            })
        );
    }

    /**
     * WIP
     *
     * @param message
     * @param sender
     * @param sendResponse
     * @returns {Promise<void>}
     */
    async tabToggleSwitchTabNewPosition(message, sender, sendResponse) {
        // Note(hbt) skipping idea for now. low ROI

        // Note(hbt) only works when using mouse.
        // TODO(hbt) ENHANCE handle openLink when using hint mode

        let settings = State.tabsSettings.get(sender.tab.id);
        if (settings.newTabPosition === "right") {
            settings.newTabPosition = "default";
        } else {
            settings.newTabPosition = "right";
        }
        State.tabsSettings.set(sender.tab.id, settings);
    }

    testMyPort(_message, _sender, _sendResponse) {
        this.sendResponse(_message, _sendResponse, { test: "works" });
    }

    async copyTopURL(_message, _sender, _sendResponse) {
        const ctab = await chrome.tabs.get(_sender.tab.id);
        let url = ctab.url;
        Clipboard.copy(url);
        this.sendResponse(_message, _sendResponse, { url: url });
    }

    openLinkIncognito(_message, _sender, _sendResponse) {
        chrome.windows.create({
            url: _message.url,
            focused: true,
            incognito: true,
            state: "maximized"
        });
    }

    pasteFromClipboard(_message, _sender, _sendResponse) {
        var paste = Clipboard.paste();
        if (!paste) {
            return;
        }
        paste = paste.split("\n")[0];
        let url = Utils.toSearchURL(paste, Utils.defaultSearchEngine);
        chrome.tabs.update({
            url: url
        });
    }

    async pasteFromClipboardNewTab(_message, _sender, _sendResponse) {
        const ctab = await chrome.tabs.get(_sender.tab.id);
        var paste = Clipboard.paste();
        if (!paste) {
            return;
        }
        paste = paste.split("\n").filter(function(e) {
            return e.trim();
        });
        for (var j = 0, l = paste.length; j < l; ++j) {
            await chrome.tabs.create({
                url: Utils.toSearchURL(paste[j].trim(), Utils.defaultSearchEngine),
                index: ctab.index + 1
            });
        }
    }

    static async handleCtrlWFeature() {
        const w = await chrome.windows.getCurrent();
        const tab = await chrome.tabs.getSelected(w.id);

        chrome.tabs.sendMessage(tab.id, {
            action: "handleCtrlWFeature"
        });
    }

    async tabDetach(_message, _sender, _sendResponse) {
        const w = await chrome.windows.getCurrent();
        chrome.windows.create({ tabId: _sender.tab.id, state: "maximized", incognito: w.incognito });
    }

    convertMessageArgsToMouselessArg(_message, _sender, _sendResponse) {
        _message.msg = _message.msg || {};
        let ret = {
            sender: _sender,
            request: {
                msg: _message.msg,
                repeats: 1
            }
        };
        ret.request = _message.request || ret.request;
        return ret;
    }

    /**
     * Migrate from vrome and mouseless
     * // TODO(hbt) Refactor (low): refactor to remove underscore dependency
     *
     * refactor myCloseTabXXX implementation -- ref https://github.com/hbt/mouseless/commit/97533a4787a7b50e233fe6879d0c8c5707fd71d6
     * @param _message
     * @param _sender
     * @param _sendResponse
     */
    tabClose(_message, _sender, _sendResponse) {
        let o = this.convertMessageArgsToMouselessArg(_message, _sender, _sendResponse);

        var _ = window._;
        var tab = o.sender.tab;
        var cond = o.request.msg.type;
        var msg = o.request.msg;
        msg.count = o.request.repeats;
        if (msg.count == 1) {
            delete msg.count;
        }
        if (cond === "otherWindows") {
            msg.otherWindows = true;
        }

        if (cond || msg.count > 1) {
            chrome.windows.getAll(
                {
                    populate: true
                },
                function(windows) {
                    if (msg.otherWindows) {
                        // filter windows  without pinned tabs
                        windows = _.filter(windows, function(w) {
                            if (w.id === tab.windowId) return false;
                            else {
                                var noPinned = true;
                                _.each(w.tabs, function(v) {
                                    if (v.pinned) {
                                        noPinned = false;
                                    }
                                });
                                return noPinned;
                            }
                        });
                    } else {
                        // limit to current window
                        windows = _.filter(windows, function(w) {
                            return w.id === tab.windowId;
                        });
                    }

                    _.each(windows, function(w) {
                        var tabs = w.tabs;
                        tabs = _.filter(tabs, function(v) {
                            var closeMap = {
                                closeOther: v.id == tab.id || v.pinned,
                                closeLeft: v.id == tab.id || v.pinned || tab.index < v.index,
                                closeRight: v.id == tab.id || v.pinned || tab.index > v.index,
                                closePinned: !v.pinned,
                                closeUnPinned: v.pinned,
                                otherWindows: v.windowId == tab.windowId || v.pinned,
                                count: v.index >= tab.index
                            };
                            return !closeMap[cond];
                        });
                        _.each(tabs, function(v, k) {
                            if (msg.count && k > msg.count) return;
                            chrome.tabs.remove(v.id);
                        });
                    });
                }
            );
        } else {
            if (!tab.pinned) {
                chrome.tabs.remove(tab.id);
            }
        }
    }

    tabUnpinAll(_message, _sender, _sendResponse) {
        let o = this.convertMessageArgsToMouselessArg(_message, _sender, _sendResponse);
        var _ = window._;
        var msg = o.request.msg;
        msg.allWindows = msg.allWindows || false;

        var tab = o.sender.tab;

        chrome.windows.getAll(
            {
                populate: true
            },
            function(windows) {
                if (!msg.allWindows) {
                    windows = _.filter(windows, function(w) {
                        return w.id === tab.windowId;
                    });
                }
                _.each(windows, function(w) {
                    var tabs = _.filter(w.tabs, function(v) {
                        return v.pinned;
                    });

                    // no unpinned, then pin all of them
                    var pinned = false;
                    if (tabs.length === 0) {
                        tabs = w.tabs;
                        pinned = true;
                    }

                    _.each(tabs, function(t) {
                        chrome.tabs.update(t.id, { pinned: pinned }, function(new_tab) {});
                    });
                });
            }
        );
    }

    copyAllTabsURLsInCurrentWindow(_message, _sender, _sendResponse) {
        chrome.tabs.query({ currentWindow: true }, tabs => {
            let text = tabs
                .map(function(tab) {
                    return tab.url;
                })
                .join("\n");
            Clipboard.copy(text);
            this.sendResponse(_message, _sendResponse, { data: text, count: tabs.length });
        });
    }

    async tabGoto(_message, _sender, _sendResponse) {
        let o = this.convertMessageArgsToMouselessArg(_message, _sender, _sendResponse);
        var id = o.request.id,
            index = o.request.index;
        chrome.tabs.query({ currentWindow: true }, function(tabs) {
            if (id) {
                return chrome.tabs.get(id, function(tabInfo) {
                    chrome.windows.update(tabInfo.windowId, { focused: true }, function() {
                        chrome.tabs.update(id, { active: true, highlighted: true });
                    });
                });
            } else if (index !== void 0) {
                chrome.tabs.update(index < tabs.length ? tabs[index].id : tabs.slice(-1)[0].id, { active: true });
            }
        });
    }

    // Note(hbt) remove highlight is a pain in the ass. Use an internal state; if needed save it in local storage
    async tabToggleHighlight(_message, _sender, _sendResponse) {
        const ctab = await chrome.tabs.get(_sender.tab.id);

        if (State.tabsMarked.has(ctab.id)) {
            State.tabsMarked.delete(ctab.id);
        } else {
            State.tabsMarked.set(ctab.id, ctab.windowId);
        }

        this.sendResponse(_message, _sendResponse, {
            state: State.tabsMarked.has(ctab.id),
            count: State.tabsMarked.size
        });
    }

    async tabMoveHighlighted(_message, _sender, _sendResponse) {
        const ctab = await chrome.tabs.get(_sender.tab.id);
        let tabIds = Array.from(State.tabsMarked.keys());
        if (tabIds.length > 0) chrome.tabs.move(tabIds, { windowId: ctab.windowId, index: ctab.index + 1 });
    }

    async tabHighlightClearAll(_message, _sender, _sendResponse) {
        State.tabsMarked = new Map();
        this.sendResponse(_message, _sendResponse, {
            count: State.tabsMarked.size
        });
    }

    async pageStylesheetToggleByDomain(_message, _sender, _sendResponse) {
        const ctab = await chrome.tabs.get(_sender.tab.id);
        var styleurl = _message.url;
        var hostname = Utils.getHostname(ctab.url);
        var tab = _sender.tab;

        chrome.storage.local.get("domainStylesheets", data => {
            let domainStylesheets = data.domainStylesheets || {};
            let settings = { domainStylesheets };
            settings.domainStylesheets[hostname] = settings.domainStylesheets[hostname] || {};

            // toggle
            if (settings.domainStylesheets[hostname] === styleurl) {
                settings.domainStylesheets[hostname] = "";
                delete settings.domainStylesheets[hostname];
            } else {
                settings.domainStylesheets[hostname] = styleurl;
            }

            chrome.storage.local.set({ domainStylesheets: settings.domainStylesheets }, function(data) {
                chrome.tabs.reload(tab.id);
            });
        });
    }

    static async pageStylesheetLoadByDomain(changeInfo, tab) {
        if (changeInfo.status === "loading") {
            var hostname = Utils.getHostname(tab.url);

            chrome.storage.local.get("domainStylesheets", data => {
                let domainStylesheets = data.domainStylesheets || {};
                if (domainStylesheets.hasOwnProperty(hostname)) {
                    $.ajax({
                        url: domainStylesheets[hostname]
                    }).done(function(data) {
                        chrome.tabs.insertCSS(
                            tab.id,
                            {
                                code: data,
                                runAt: "document_start",
                                allFrames: true
                            },
                            function(res) {}
                        );
                    });
                }
            });
        }
    }

    static async tabSendMessageOnWhenDoneLoading(changeInfo, tab) {
        if (changeInfo.status === "complete") {
            chrome.tabs.sendMessage(tab.id, {
                action: "tabDoneLoading"
            });
        }
    }

    async downloadShowLastFile(_message, _sender, _sendResponse) {
        // TODO(hbt) Refactor (low): merge with downloadOpenLastFile -- use a msg
        chrome.downloads.search(
            {
                exists: true,
                state: "complete"
            },
            function(dlds) {
                if (!dlds) {
                    return;
                }
                // sort dlds by end time
                let sortedDlds = window._.sortBy(dlds, v => {
                    return v.endTime;
                });
                let last = sortedDlds.pop();
                chrome.downloads.show(last.id);
            }
        );
    }

    async downloadOpenLastFile(_message, _sender, _sendResponse) {
        // Note(hbt) partial implementation - view http://stackoverflow.com/questions/26775564/how-to-open-a-downloaded-file
        chrome.downloads.search(
            {
                exists: true,
                state: "complete"
            },
            function(dlds) {
                if (!dlds) {
                    return;
                }
                // sort dlds by end time
                let sortedDlds = window._.sortBy(dlds, v => {
                    return v.endTime;
                });
                let last = sortedDlds.pop();
                chrome.downloads.open(last.id);
            }
        );
    }

    async bookmarkToggle(_message, _sender, _sendResponse) {
        function removeTrailingSlash(url) {
            if (url && url.endsWith("/")) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }

        const ctab = await chrome.tabs.get(_sender.tab.id);

        let collection = await chrome.bookmarks.search({ title: _message.folder });
        let folder = collection[0];
        const bchildren = await chrome.bookmarks.getChildren(folder.id);

        let tabUrl = ctab.url;
        tabUrl = removeTrailingSlash(tabUrl);

        let children = _.map(bchildren, child => {
            child.url = removeTrailingSlash(child.url);
            return child;
        });

        children = _.indexBy(children, "url");

        if (_.keys(children).includes(tabUrl)) {
            var b = children[tabUrl];
            chrome.bookmarks.remove(b.id);
            this.sendResponse(_message, _sendResponse, {
                msg: `Removed ${tabUrl} from bookmark folder ${_message.folder}`
            });
        } else {
            var title = ctab.title;
            title = title.trim();
            // Note(hbt) remove first word -- assume tab index is on
            title = title.substr(title.indexOf(" ") + 1);

            const b = chrome.bookmarks.create({
                parentId: folder.id,
                url: tabUrl,
                title: title
            });

            this.sendResponse(_message, _sendResponse, {
                msg: `Added ${tabUrl} to bookmark folder ${_message.folder}`
            });
        }
    }

    async bookmarkDumpFolder(_message, _sender, _sendResponse) {
        let url = "http://localhost:7077/rest-begin-folder-edit.php?folder_name=" + _message.folder;
        $.ajax({
            url: url,
            async: false
        }).done(data => {
            console.log(data);
            this.sendResponse(_message, _sendResponse, {
                msg: `Dumped bookmark folder ${_message.folder}`
            });
        });
    }

    async bookmarkLoadFolder(_message, _sender, _sendResponse) {
        var _ = window._;

        function deepPluck(obj, k) {
            let ret = [];

            if (_.isArray(obj)) {
                _.each(obj, function(i) {
                    ret.push(deepPluck(i, k));
                });
            } else if (_.isObject(obj) && _.has(obj, k)) {
                ret.push(obj[k]);
            }

            if (_.isObject(obj)) {
                _.each(_.keys(obj), function(key) {
                    ret.push(deepPluck(obj[key], k));
                });
            }

            return _.flatten(ret);
        }

        function emptyExistingFolder(folder, callback) {
            chrome.bookmarks.search(
                {
                    title: folder
                },
                function(marks) {
                    console.assert(marks.length === 1, "folder is the only one with that name");

                    var omark = marks[0];

                    chrome.bookmarks.removeTree(marks[0].id, function() {
                        chrome.bookmarks.create(
                            {
                                parentId: omark.parentId,
                                title: omark.title,
                                index: omark.index
                            },
                            function() {
                                callback();
                            }
                        );
                    });
                }
            );
        }

        function loadEditedBookmarks(folder) {
            function getBookmarksJSON() {
                let ret = "";
                let url = "http://localhost:7077/rest-finish-folder-edit.php";
                $.ajax({
                    url: url,
                    async: false
                }).done(function(data) {
                    ret = JSON.parse(data);
                    console.assert(_.isObject(ret.roots), "bookmarks loaded properly");
                });
                return ret;
            }

            function loadBookmarksIntoFolder(marks, folder) {
                function createMark(mark, folderId, index) {
                    if (mark.type === "folder") {
                        chrome.bookmarks.create(
                            {
                                parentId: folderId,
                                title: mark.name,
                                index: index
                            },
                            function(nmark) {
                                if (mark.children) {
                                    _.each(mark.children, (child, index) => {
                                        createMark(child, nmark.id, index);
                                    });
                                }
                            }
                        );
                    }

                    if (mark.type === "url") {
                        chrome.bookmarks.create(
                            {
                                parentId: folderId,
                                title: mark.name,
                                url: mark.url,
                                index: index
                            },
                            function(nmark) {}
                        );
                    }
                }

                {
                    chrome.bookmarks.search(
                        {
                            title: folder
                        },
                        function(smarks) {
                            console.assert(smarks.length === 1, "folder is the only one with that name");
                            let folderId = smarks[0].id;

                            _.each(marks, (mark, index) => {
                                createMark(mark, folderId, index);
                            });
                        }
                    );
                }
            }

            function getBookmarksByFolderName(allmarks, folder) {
                var children = deepPluck(allmarks.roots, "children");
                var child = _.select(children, child => {
                    return child.type == "folder" && child.name == folder;
                });
                console.assert(_.isArray(child) && child[0].children.length > 0, "found folder and it has data");
                return child[0].children;
            }

            {
                let allmarks = getBookmarksJSON();
                let bmarks = getBookmarksByFolderName(allmarks, folder);
                loadBookmarksIntoFolder(bmarks, folder);
            }
        }

        emptyExistingFolder(_message.folder, function() {
            loadEditedBookmarks(_message.folder);
        });
    }
}

{
    let cc = new CustomBackground();
    cc.init();
    // setTimeout(CustomBackground.handleCtrlWFeature, 3000)
}

(async () => {})();
