const axios = require('axios');
const { faqData, productData } = require('../database/data');

async function getAnswer(query) {
    // Example NLP service integration, replace with your chosen NLP provider
    try {
        const response = await axios.post('https://api.dialogflow.com/v1/query', {
            query,
            lang: 'en',
            sessionId: '12345'
        }, {
            headers: { 'Authorization': 'Bearer YOUR_DIALOGFLOW_CLIENT_ACCESS_TOKEN' }
        });

        const result = response.data.result.fulfillment.speech;
        return result;
    } catch (error) {
        // Fallback to local database search if NLP service fails
        for (let faq of faqData) {
            if (query.toLowerCase().includes(faq.question.toLowerCase())) {
                return faq.answer;
            }
        }
        return 'Sorry, I could not understand your question.';
    }
}

module.exports = { getAnswer };
