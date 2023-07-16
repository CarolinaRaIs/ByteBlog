module.exports = { 
    format_date: date => {
        // "en-US" is used for the US-style date formatting
        // but could replace it with other locales to format the date in different styles
        //return date.toLocaleDateString("en-US");
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }
}