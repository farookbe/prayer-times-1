/**
 * @author ibrahim.zehhaf.pro@gmail.com
 * Handel internationalisation
 */

var i18n = {
    json: {},
    /**
     * Load translation file
     */
    loadJson: function () {
        $.ajax({
            url: "i18n/i18n.json?" + (new Date()).getTime(),
            async: false,
            success: function (data) {
                i18n.json = data;
            }
        });
    },
    /**
     * parse som and translate texts
     */
    parseAndTranslate: function () {
        $("[data-text]").each(function (i, elem) {
            $(elem).text($(elem).data("text").trans(getConfFromLocalStorage().lang));
        });
    }
};

i18n.loadJson();

/**
 * translate a string
 * @param {string} key
 * @param {boolean} noCapitalize
 * @returns {string} the translated string
 */
String.prototype.trans = function (lang, noCapitalize) {
    try {
        var trans = i18n.json[this][lang];
        if (trans === "") {
            trans = this;
        }

        if (typeof (noCapitalize) === "undefined" || noCapitalize === false) {
            return trans.firstCapitalize();
        }
        
        return trans;
    } catch (err) {
        return this.firstCapitalize();
    }
};

$(document).ready(function () {
    i18n.parseAndTranslate();
});
