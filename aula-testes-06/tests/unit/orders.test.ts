import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

describe("Order Service Tests", () => {
	it("should create an order", async () => {
		jest.spyOn(orderRepository, "create").mockImplementationOnce((): any => {
			return {
				protocol: "123456789",
				status: "IN_PREPARATION",
			};
		});
		const client = faker.person.fullName();
		const description = faker.person.bio();

		const protocol = await createOrder({ client, description });

		expect(protocol.protocol).toBe("123456789");
		expect(protocol.status).toBe("IN_PREPARATION");
	});

	it("should return an order based on the protocol", async () => {
		jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
			return {
				protocol: "123456789",
				status: "IN_PREPARATION",
			};
		});

		const protocol = await getOrderByProtocol("123456789");

		expect(protocol.protocol).toBe("123456789");
		expect(protocol.status).toBe("IN_PREPARATION");
	});

	it("should return status INVALID when protocol doesn't exists", async () => {
		jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
			return null;
		});

		const protocol = await getOrderByProtocol("123456789");

		expect(protocol.protocol).toBe("123456789");
		expect(protocol.status).toBe("INVALID");
	});
});
