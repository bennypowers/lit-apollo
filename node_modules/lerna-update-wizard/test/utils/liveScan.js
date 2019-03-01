const match = (
  buf,
  tar,
  matcher = (bLine, tLine) => bLine.includes(tLine.trim())
) => {
  let base = 0;
  let scan = 0;

  while (base < buf.length) {
    if (!matcher(buf[base], tar[0])) {
      base++;
      continue;
    }

    while (base < buf.length && !matcher(buf[base + scan], tar[scan])) {
      scan = 0;
      base++;
      continue;
    }

    scan++;

    if (scan === tar.length) {
      const matchContext = [
        buf[base - 7] && buf[base - 7],
        buf[base - 6] && buf[base - 6],
        buf[base - 5] && buf[base - 5],
        buf[base - 4] && buf[base - 4],
        buf[base - 3] && buf[base - 3],
        buf[base - 2] && buf[base - 2],
        buf[base - 1] && buf[base - 1],
      ]
        .join("\n")
        .trim();

      const matchTarget = [...tar.map((_, idx) => buf[base + idx])]
        .filter(Boolean)
        .join("\n");

      return { matchTarget, matchContext };
    }
  }
  return null;
};

const scan = options => {
  let fulfilled;
  let buffer, target, onFind, onTimeout;
  let timeoutId;
  let targetLines;

  onFind = options.onFind || (() => {});
  onTimeout = options.onTimeout || (() => {});

  const reset = options => {
    fulfilled = false;
    buffer = "";
    target = options.target;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const bufferBlob = buffer
        .split("\n")
        .slice(-targetLines.length)
        .join("\n");

      const targetBlob = Array.isArray(target) ? target.join("\n") : target;

      onTimeout({ bufferBlob, targetBlob });
    }, options.timeout || 5000);
  };

  reset(options); // Initialize

  const feed = content => {
    buffer += content;

    if (fulfilled) return; // disable feed() after target was found

    const bufferLines = buffer.split("\n");
    targetLines = Array.isArray(target)
      ? target
      : target.split("\n").filter(Boolean);

    const matchInfo = match(bufferLines, targetLines);

    if (matchInfo) {
      fulfilled = true;
      buffer = ""; //Reset buffer (feed() can still fill the buffer)

      clearTimeout(timeoutId);
      onFind(matchInfo);
    }
  };

  const getBuffer = () => buffer;

  return { feed, reset, getBuffer };
};

module.exports = {
  scan,
  match,
};
