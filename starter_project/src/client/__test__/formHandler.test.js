import { handleSubmit } from '../js/formHandler';
import { checkForName } from '../js/nameChecker';

// create a test for the submit behavior
describe('handleSubmit', () => {

    test('return a valid URL to the server', async () => {
        const mockEvent = {
            preventDefault: jest.fn(),//simulate form submission
        };

        document.getElementById = jest.fn(id => {
            if (id === 'name') return { value: 'https://en.wikipedia.org/wiki/Volkswagen' };// the url is https://en.wikipedia.org/wiki/Volkswagen
            if (id === 'results') return { innerText: '' };// no results
            return null;
        });

        global.fetch = jest.fn().mockResolvedValue({// simulate a successful network response
            json: () => Promise.resolve({ message: 'URL was sent successfully' }),
        });

        await handleSubmit(mockEvent);// call the function with a mock event

        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', {// check if the handle submit sends the correct data to the server(datatoserver dunction)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: 'https://en.wikipedia.org/wiki/Volkswagen' }),// convert the url to json
        });
    });

});
//****************************************NAMECHECKER FUNCTION*******************************************************************
// Mocking the alert function
global.alert = jest.fn();
describe('checkForName', () => {
    // before each test clear the mok alerts
    beforeEach(() => {
        global.alert.mockClear();
    });

    test('true for a valid URL should be returned', () => {
        expect(checkForName('https://en.wikipedia.org/wiki/Volkswagen')).toBe(true);
    });

});
