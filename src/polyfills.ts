import "core-js/features/promise";
import "core-js/features/promise/all-settled";
import "core-js/features/promise/any";

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";
import "core-js/features/array/at";

import "core-js/features/object/from-entries";
import "core-js/features/object/entries";
import "core-js/features/object/values";

import "core-js/features/string/replace-all";
import "core-js/features/string/match-all";

if (typeof globalThis.fetch === "undefined") {
  console.warn("Fetch API not available in UXP environment");
}

if (typeof console === "undefined") {
  (globalThis as any).console = {
    log: () => {},
    warn: () => {},
    error: () => {},
    info: () => {},
    debug: () => {},
  };
}
