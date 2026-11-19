function nextAvailable(current, count, failed) {
  for (let offset = 1; offset < count; offset += 1) {
    const index = (current + offset) % count;
    if (!failed.includes(index)) return index;
  }
  return null;
}

export function createHeroFrame(count) {
  return { count, current: count ? 0 : null, next: count > 1 ? 1 : null, visible: false, ready: false, elapsed: false, failed: [] };
}

export function heroFrameReducer(frame, { type, index }) {
  if (type === "elapsed") return { ...frame, elapsed: true };

  if (type === "loaded") {
    if (index === frame.current && !frame.visible) return { ...frame, visible: true };
    if (index === frame.next && !frame.ready) return { ...frame, ready: true };
  }

  if (type === "finished" && index === frame.next && frame.ready && frame.elapsed) {
    return { ...frame, current: index, next: nextAvailable(index, frame.count, frame.failed), ready: false, elapsed: false };
  }

  if (type === "failed" && (index === frame.current || index === frame.next)) {
    const failed = [...frame.failed, index];
    if (index === frame.next) {
      return { ...frame, failed, next: nextAvailable(frame.current, frame.count, failed), ready: false };
    }
    const current = frame.next;
    return {
      ...frame, failed, current, next: current === null ? null : nextAvailable(current, frame.count, failed),
      visible: current !== null && frame.ready, ready: false, elapsed: false,
    };
  }

  return frame;
}
