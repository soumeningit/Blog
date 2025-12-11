const fs = require("fs");
const path = require("path");

function loadTemplate(templateName, replacements = {}) {
    const filePath = path.join(__dirname, "..", "templates", templateName);
    let template = fs.readFileSync(filePath, "utf-8");

    Object.keys(replacements).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, "g");
        template = template.replace(regex, replacements[key]);
    });

    return template;
}

module.exports = loadTemplate;
