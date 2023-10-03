import { faker } from "@faker-js/faker";
import * as usersRepository from "users-repository";
import * as infractionRepository from "infractions-repository";
import * as infractionService from "infractions-service";

describe("Infractions Service Tests", () => {
	it("should get infractions from user", async () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		jest
			.spyOn(usersRepository, "getUserByDocument")
			.mockImplementationOnce((): any => {
				return {
					id: 1,
					firstName,
					lastName,
					licenseId: "123456",
				};
			});
		jest
			.spyOn(infractionRepository, "getInfractionsFrom")
			.mockImplementationOnce((): any => {
				return [
					{
						id: 1,
						date: new Date(),
						description: "excesso de velocidade",
						cost: 10,
						userId: 1,
						level: "MEDIUM",
					},
				];
			});

		const result = await infractionService.getInfractionsFrom("123456");
		const infraction = result.infractions[0];

		expect(result.id).toBe(1);
		expect(result.firstName).toBe(firstName);
		expect(result.lastName).toBe(lastName);
		expect(result.licenseId).toBe("123456");
		expect(infraction.cost).toBe(10);
		expect(infraction.date).toEqual(expect.any(Date));
		expect(infraction.level).toBe("MEDIUM");
		expect(infraction.userId).toBe(1);
		expect(infraction.id).toBe(1);
	});

	it("should throw an error when driver license does not exists", () => {
		jest
			.spyOn(usersRepository, "getUserByDocument")
			.mockImplementationOnce((): any => {
				return null;
			});

		const promise = infractionService.getInfractionsFrom("123456");

		expect(promise).rejects.toEqual({
			type: "NOT_FOUND",
			message: "Driver not found.",
		});
	});
});
