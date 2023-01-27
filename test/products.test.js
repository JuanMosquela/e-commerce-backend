import assert from "assert";
import { getAllProducts } from "../controllers/product.controller";
import { findProductById } from "../services/product.service";

describe("testing products", () => {
  it("fetch products return excepted value", async () => {
    const result = await findProductById("63c1b2e94af9d88e7fba589d");
    assert.equal(result, []);
  });
});
