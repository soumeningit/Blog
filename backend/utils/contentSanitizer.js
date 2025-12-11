const sanitizeHtml = require("sanitize-html");

function sanitizeTiptapHtml(html) {
    return sanitizeHtml(html, {
        allowedTags: [
            "p", "br",
            "h1", "h2", "h3", "h4",
            "strong", "b",
            "em", "i",
            "u",
            "blockquote",
            "ul", "ol", "li",
            "pre", "code",
            "span",
            "a",
            "img",
            "hr",
            "table", "thead", "tbody", "tr", "th", "td"
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            img: ["src", "alt"],
            code: ["class"],
            pre: ["class"],
            "*": ["style"]
        },
        allowedSchemes: ["http", "https", "mailto"],
        transformTags: {
            "a": sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" })
        }
    });
};

module.exports = {
    sanitizeTiptapHtml
};
