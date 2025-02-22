import * as P from "effect/ParseResult"
import * as Pretty from "effect/Pretty"
import * as S from "effect/Schema"
import * as Util from "effect/test/Schema/TestUtils"
import { describe, expect, it } from "vitest"

describe("includes", () => {
  const schema = S.includes("a")(S.String)

  it("test roundtrip consistency", () => {
    Util.assertions.testRoundtripConsistency(schema)
  })

  it("is", () => {
    const is = P.is(schema)
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
    expect(is("bac")).toEqual(true)
    expect(is("ba")).toEqual(true)
  })

  it("decoding", async () => {
    await Util.assertions.decoding.succeed(schema, "a")
    await Util.assertions.decoding.succeed(schema, "aa")
    await Util.assertions.decoding.succeed(schema, "bac")
    await Util.assertions.decoding.succeed(schema, "ba")
    await Util.assertions.decoding.fail(
      schema,
      "",
      `includes("a")
└─ Predicate refinement failure
   └─ Expected a string including "a", actual ""`
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.make(schema)
    expect(pretty("a")).toEqual(`"a"`)
  })
})
