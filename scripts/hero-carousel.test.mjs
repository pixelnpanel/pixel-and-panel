import assert from "node:assert/strict";
import test from "node:test";
import { adjacentHeroSlide, heroFrameReducer, initialHeroFrame } from "../lib/hero-carousel.js";

test("the slideshow loops in both directions", () => {
  assert.equal(adjacentHeroSlide(5, 1, 6), 0);
  assert.equal(adjacentHeroSlide(0, -1, 6), 5);
});

test("the current slide stays visible until the latest selection loads", () => {
  let frame = heroFrameReducer(initialHeroFrame, { type: "select", index: 1 });
  frame = heroFrameReducer(frame, { type: "select", index: 2 });
  assert.equal(frame.active, 0);
  assert.equal(heroFrameReducer(frame, { type: "loaded", index: 1 }), frame);
  assert.deepEqual(heroFrameReducer(frame, { type: "loaded", index: 2 }), { active: 2, requested: 2, previous: 0 });
});

test("reselecting the previous frame can show the already-loaded image immediately", () => {
  const frame = { active: 3, requested: 3, previous: 2 };
  assert.deepEqual(heroFrameReducer(frame, { type: "select", index: 2 }), { active: 2, requested: 2, previous: 3 });
});

test("a failed image leaves the existing image and caption in place", () => {
  const frame = { active: 2, requested: 3, previous: 1 };
  assert.deepEqual(heroFrameReducer(frame, { type: "failed", index: 3 }), { active: 2, requested: 2, previous: 1 });
});
