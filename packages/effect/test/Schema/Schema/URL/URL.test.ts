import * as Pretty from "effect/Pretty"
import * as S from "effect/Schema"
import * as Util from "effect/test/Schema/TestUtils"
import { describe, expect, it } from "vitest"

describe("URL", () => {
  const schema = S.URL

  it("test roundtrip consistency", () => {
    Util.assertions.testRoundtripConsistency(schema)
  })

  it("arbitrary", () => {
    Util.assertions.arbitrary.validateGeneratedValues(S.URL)
  })

  it("decoding", async () => {
    await Util.assertions.decoding.succeed(
      schema,
      "http://effect.website",
      new URL("http://effect.website")
    )
    await Util.assertions.decoding.fail(
      schema,
      "123",
      `URL
└─ Transformation process failure
   └─ Unable to decode "123" into a URL. Invalid URL`
    )
  })

  it("encoding", async () => {
    await Util.assertions.encoding.succeed(
      schema,
      new URL("https://effecty.website"),
      "https://effecty.website/"
    )
  })

  it("Pretty", () => {
    const pretty = Pretty.make(schema)
    const input = "https://effecty.website:443"
    const prettified = "https://effecty.website/"
    expect(pretty(new URL(input))).toEqual(prettified)
  })
})
