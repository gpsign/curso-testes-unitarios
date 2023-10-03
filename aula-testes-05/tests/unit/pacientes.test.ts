import { v4 as uuidv4 } from "uuid";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
	return {
		v4: () => {
			return "string gerada aleatoriamente";
		},
	};
});

describe("pacients tests", () => {
	it("should generate protocol", async () => {
		const protocol = generateProtocolForPacient("José", "Silva", true);
		expect(protocol).toEqual({
			priority: true,
			date: expect.any(Date),
			pacient: "José Silva",
			protocol: "string gerada aleatoriamente",
		});
	});
});
