import { checkForName } from '../src/client/js/nameChecker';

describe("Testing the checkForName functionality", () => {
    test("Should return false for empty input", () => {
        global.alert = jest.fn(); // Mock alert
        expect(checkForName("")).toBe(false);
        expect(global.alert).toHaveBeenCalledWith("Input cannot be empty. Please provide a valid name.");
    });

    test("Should return false for input with invalid characters", () => {
        global.alert = jest.fn();
        expect(checkForName("John@Doe")).toBe(false);
        expect(global.alert).toHaveBeenCalledWith("Input contains invalid characters. Only letters and spaces are allowed.");
    });

    test("Should return false for unrecognized names", () => {
        global.alert = jest.fn();
        expect(checkForName("Random Name")).toBe(false);
        expect(global.alert).toHaveBeenCalledWith("Name not recognized. Please enter a valid captain name.");
    });

    test("Should return true for valid predefined names", () => {
        expect(checkForName("Picard")).toBe(true);
        expect(checkForName("Kirk")).toBe(true);
    });
});
