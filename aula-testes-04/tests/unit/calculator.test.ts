import calculator from "calculator";

describe("calculator tests", () => {
	it("should sum correctly", () => {
		const result = calculator.sum(4, 9);
		expect(result).toBe(13);
	});
	it("should subtract correctly", () => {
		const result = calculator.sub(9, 4);
		expect(result).toBe(5);
	});
	it("should divide correctly", () => {
		const result = calculator.div(10, 5);
		expect(result).toBe(2);
	});
	it("should return 0 when divided by 0", () => {
		const result = calculator.div(100, 0);
		expect(result).toBe(0);
	});
	it("should multiply correctly", () => {
		const result = calculator.mul(10, 10);
		expect(result).toBe(100);
	});
});
