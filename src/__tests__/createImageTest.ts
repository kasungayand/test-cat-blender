import "reflect-metadata";
import {ImageModule} from "../controllers/controllers.module";
import {describe, test, expect} from "@jest/globals";

describe("Blend Test", () => {
  test("Create success image return true", async () => {
    const res =  await ImageModule.writeImage();
    expect(res.success).toEqual(true);
  });
});