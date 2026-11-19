import assert from "node:assert/strict";
import test from "node:test";
import { createHeroFrame, heroFrameReducer } from "../lib/hero-carousel.js";

const act = (frame, type, index) => heroFrameReducer(frame, { type, index });

test("commits a slide only after its image has loaded and the dissolve finishes", () => {
  let frame = act(createHeroFrame(3), "loaded", 0);
  frame = act(frame, "elapsed");
  assert.equal(act(frame, "finished", 1), frame);
  frame = act(frame, "loaded", 1);
  assert.equal(frame.current, 0);
  assert.equal(act(frame, "finished", 2), frame);
  frame = act(frame, "finished", 1);
  assert.deepEqual([frame.current, frame.next, frame.visible, frame.ready, frame.elapsed], [1, 2, true, false, false]);
});

test("skips failed images while preserving the current frame and loops to the first image", () => {
  let frame = act(createHeroFrame(3), "loaded", 0);
  frame = act(frame, "failed", 1);
  assert.deepEqual([frame.current, frame.next], [0, 2]);
  assert.equal(act(frame, "loaded", 1), frame);
  frame = act(act(act(frame, "loaded", 2), "elapsed"), "finished", 2);
  assert.deepEqual([frame.current, frame.next], [2, 0]);
  frame = act(act(act(frame, "loaded", 0), "elapsed"), "finished", 0);
  assert.deepEqual([frame.current, frame.next], [0, 2]);
});

test("a failed first image falls through to the next cover before autoplay starts", () => {
  const frame = act(createHeroFrame(3), "failed", 0);
  assert.deepEqual([frame.current, frame.next, frame.visible], [1, 2, false]);
  assert.equal(act(frame, "loaded", 1).visible, true);
});

test("one remaining cover stays visible when all alternatives fail", () => {
  let frame = act(createHeroFrame(3), "loaded", 0);
  frame = act(act(frame, "failed", 1), "failed", 2);
  assert.deepEqual([frame.current, frame.next, frame.visible], [0, null, true]);
});
