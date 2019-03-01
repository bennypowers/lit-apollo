"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const evaluate = require("babel-helper-evaluate-path"); // Assuming all the static methods from below array are side effect free evaluation
// except Math.random


const VALID_CALLEES = ["String", "Number", "Math"];
const INVALID_METHODS = ["random"];

module.exports = function ({
  types: t
}) {
  class BuiltInReplacer {
    constructor(program, {
      tdz
    }) {
      this.program = program;
      this.tdz = tdz; // map<expr_name, path[]>;

      this.pathsToUpdate = new Map();
    }

    run() {
      this.collect();
      this.replace();
    }

    collect() {
      const context = this;
      const collectVisitor = {
        AssignmentExpression(path) {
          const left = path.get("left"); // Should bail and not run the plugin
          // when builtin is polyfilled

          if (t.isMemberExpression(left) && isBuiltInComputed(left)) {
            let parent = path;

            do {
              parent.stop();
            } while (parent = parent.parentPath);
          }
        },

        MemberExpression(path) {
          if (path.parentPath.isCallExpression()) {
            return;
          }

          if (!isComputed(path) && isBuiltin(path) && !getFunctionParent(path).isProgram()) {
            const expName = memberToString(path.node);
            addToMap(context.pathsToUpdate, expName, path);
          }
        },

        CallExpression: {
          exit(path) {
            const callee = path.get("callee");

            if (!callee.isMemberExpression()) {
              return;
            } // computed property should not be optimized
            // Math[max]() -> Math.max()


            if (!isComputed(callee) && isBuiltin(callee)) {
              const result = evaluate(path, {
                tdz: context.tdz
              }); // deopt when we have side effecty evaluate-able arguments
              // Math.max(foo(), 1) --> untouched
              // Math.floor(1) --> 1

              if (result.confident && hasPureArgs(path)) {
                path.replaceWith(t.valueToNode(result.value));
              } else if (!getFunctionParent(callee).isProgram()) {
                const expName = memberToString(callee.node);
                addToMap(context.pathsToUpdate, expName, callee);
              }
            }
          }

        }
      };
      this.program.traverse(collectVisitor);
    }

    replace() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.pathsToUpdate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const _step$value = _slicedToArray(_step.value, 2),
                expName = _step$value[0],
                paths = _step$value[1];

          // transform only if there is more than 1 occurence
          if (paths.length <= 1) {
            continue;
          }

          const segmentsMap = getSegmentedSubPaths(paths);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = segmentsMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              const _step2$value = _slicedToArray(_step2.value, 2),
                    parent = _step2$value[0],
                    subpaths = _step2$value[1];

              if (subpaths.length <= 1) {
                continue;
              }

              const uniqueIdentifier = parent.scope.generateUidIdentifier(expName);
              const newNode = t.variableDeclaration("var", [t.variableDeclarator(uniqueIdentifier, subpaths[0].node)]);
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = subpaths[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  const path = _step3.value;
                  path.replaceWith(t.clone(uniqueIdentifier));
                } // hoist the created var to the top of the function scope

              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              parent.get("body").unshiftContainer("body", newNode);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

  }

  return {
    name: "minify-builtins",
    visitor: {
      Program(path, {
        opts: {
          tdz = false
        } = {}
      }) {
        const builtInReplacer = new BuiltInReplacer(path, {
          tdz
        });
        builtInReplacer.run();
      }

    }
  };

  function memberToString(memberExpr) {
    const object = memberExpr.object,
          property = memberExpr.property;
    let result = "";
    if (t.isIdentifier(object)) result += object.name;
    if (t.isMemberExpression(object)) result += memberToString(object);
    if (t.isIdentifier(property)) result += property.name;
    return result;
  }

  function isBuiltInComputed(memberExpr) {
    const node = memberExpr.node;
    const object = node.object,
          computed = node.computed;
    return computed && t.isIdentifier(object) && VALID_CALLEES.indexOf(object.name) >= 0;
  }

  function isBuiltin(memberExpr) {
    const _memberExpr$node = memberExpr.node,
          object = _memberExpr$node.object,
          property = _memberExpr$node.property;

    if (t.isIdentifier(object) && t.isIdentifier(property) && VALID_CALLEES.indexOf(object.name) >= 0 && INVALID_METHODS.indexOf(property.name) < 0) {
      return true;
    }

    return false;
  }
};

function addToMap(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }

  map.get(key).push(value);
} // Creates a segmented map that contains the earliest common Ancestor
// as the key and array of subpaths that are descendats of the LCA as value


function getSegmentedSubPaths(paths) {
  let segments = new Map(); // Get earliest Path in tree where paths intersect

  paths[0].getDeepestCommonAncestorFrom(paths, (lastCommon, index, ancestries) => {
    // found the LCA
    if (!lastCommon.isProgram()) {
      let fnParent;

      if (lastCommon.isFunction() && lastCommon.get("body").isBlockStatement()) {
        segments.set(lastCommon, paths);
        return;
      } else if (!(fnParent = getFunctionParent(lastCommon)).isProgram() && fnParent.get("body").isBlockStatement()) {
        segments.set(fnParent, paths);
        return;
      }
    } // Deopt and construct segments otherwise


    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = ancestries[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        const ancestor = _step4.value;
        const fnPath = getChildFuncion(ancestor);

        if (fnPath === void 0) {
          continue;
        }

        const validDescendants = paths.filter(p => {
          return p.isDescendant(fnPath);
        });
        segments.set(fnPath, validDescendants);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });
  return segments;
}

function getChildFuncion(ancestors = []) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = ancestors[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      const path = _step5.value;

      if (path.isFunction() && path.get("body").isBlockStatement()) {
        return path;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function hasPureArgs(path) {
  const args = path.get("arguments");
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = args[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      const arg = _step6.value;

      if (!arg.isPure()) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return true;
}

function isComputed(path) {
  const node = path.node;
  return node.computed;
}
/**
 * Babel-7 returns null if there is no function parent
 * and uses getProgramParent to get Program
 */


function getFunctionParent(path) {
  return (path.scope.getFunctionParent() || path.scope.getProgramParent()).path;
}