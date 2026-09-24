import { describe, expect, expectTypeOf, it } from "vitest";

import { type Infer, id } from "@/index";

const UserId = id("user");
const OrderId = id("order");

type UserId = Infer<typeof UserId>;
type OrderId = Infer<typeof OrderId>;

describe("id", () => {
  it("preserves the provided value", () => {
    const value = UserId("usr_1");

    expect(value).toBe("usr_1");
  });

  it("creates distinct nominal types", () => {
    const userId = UserId("usr_1");
    const orderId = OrderId("ord_1");

    expectTypeOf(userId).toEqualTypeOf<UserId>();
    expectTypeOf(orderId).toEqualTypeOf<OrderId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<OrderId>();
  });
});
