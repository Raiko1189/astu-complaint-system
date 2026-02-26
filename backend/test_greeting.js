import fetch from 'node-fetch';

const testGreeting = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: 'Hello' }),
        });

        const result = await response.json();
        console.log('Response for "Hello":', JSON.stringify(result, null, 2));

        const response2 = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: 'Tell me about Lalibela' }),
        });

        const result2 = await response2.json();
        console.log('Response for "Tell me about Lalibela":', JSON.stringify(result2, null, 2));

        const response3 = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: 'What is the capital of Ethiopia?' }),
        });

        const result3 = await response3.json();
        console.log('Response for "What is the capital of Ethiopia?":', JSON.stringify(result3, null, 2));

    } catch (error) {
        console.error('Test failed:', error);
    }
};

testGreeting();
