function checkFieldsNotEmpty(data) {
    for (const key in data) {
        if (!data[key]) {
            return false;
        }
    }
    return true;
}

module.exports = { checkFieldsNotEmpty };
