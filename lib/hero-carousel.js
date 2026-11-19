export const initialHeroFrame = { active: 0, requested: 0, previous: null };

export function adjacentHeroSlide(index, direction, count) {
  return (index + direction + count) % count;
}

export function heroFrameReducer(frame, { type, index }) {
  if (type === "select") {
    if (index === frame.previous) return { active: index, requested: index, previous: frame.active };
    return index === frame.requested ? frame : { ...frame, requested: index };
  }
  if (index !== frame.requested || index === frame.active) return frame;
  if (type === "loaded") return { active: index, requested: index, previous: frame.active };
  if (type === "failed") return { ...frame, requested: frame.active };
  return frame;
}
