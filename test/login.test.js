import assert from "assert";
import chai from "chai";

describe("testing API calls", () => {
  it("login API should return a valid login token ", async () => {
    const user = await loginUser("jmosquella11@gmail.com");
    assert.equal(user, Object);
  });

  it("login API should return an Array of items ", async () => {
    const { product } = await findProductById("63c1b2e94af9d88e7fba589d");
    assert.equal(product, Object);

    done();
  });
});
