var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("theme/breakpoints", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.defaultBreakpoints = void 0;
    exports.defaultBreakpoints = {
        "xs": 0,
        "sm": 600,
        "md": 900,
        "lg": 1200,
        "xl": 1536
    };
});
define("common/types", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("hooks/useMediaBreakpoint", ["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    exports.__esModule = true;
    var getBreakpoint = function (width, breakpoints) {
        // biggest breakpoint
        var greatestbkpt = breakpoints["2xl"] || breakpoints["xl"];
        if (width < breakpoints["sm"]) {
            return "xs";
        }
        else if (width > greatestbkpt) {
            return breakpoints["2xl"] ? "2xl" : "xl";
        }
        var keys = Object.keys(breakpoints).filter(function (key) { return breakpoints[key] !== undefined; });
        var bkpts = keys.slice(1, keys.length - 1).reverse();
        for (var i = 0; i < bkpts.length - 1; i++) {
            var point = bkpts[i];
            if (width >= breakpoints[point]) {
                return point;
            }
        }
        // base case
        return bkpts[bkpts.length - 1];
    };
    function useMediaBreakpoint(breakpoints) {
        var _a = (0, react_1.useState)(window.innerWidth), width = _a[0], setWidth = _a[1];
        var mediabreakpoint = (0, react_1.useMemo)(function () {
            return getBreakpoint(width, breakpoints);
        }, [breakpoints, width]);
        var onWindowLayerResize = function () {
            setWidth(window.innerWidth);
        };
        (0, react_1.useEffect)(function () {
            window.addEventListener("resize", onWindowLayerResize);
            return function () {
                window.removeEventListener("resize", onWindowLayerResize);
            };
            // eslint-disable-next-line
        }, []);
        return mediabreakpoint;
    }
    exports["default"] = useMediaBreakpoint;
});
define("theme/theme", ["require", "exports", "react/jsx-runtime", "react", "hooks/useMediaBreakpoint", "theme/breakpoints"], function (require, exports, jsx_runtime_1, react_2, useMediaBreakpoint_1, breakpoints_1) {
    "use strict";
    exports.__esModule = true;
    exports.MediaContext = void 0;
    exports.MediaContext = (0, react_2.createContext)("");
    function MediaProvider(props) {
        var getBreakpointList = (0, react_2.useMemo)(function () {
            if (props.mode) {
                // Support to settup pre-loaded endpoints
            }
            // Provide a valid breakpoint object
            // if(typeof props.breakpoints !== "object"){
            // }
            return props.breakpoints || breakpoints_1.defaultBreakpoints;
        }, [props.mode, props.breakpoints]);
        var breakpoint = (0, useMediaBreakpoint_1["default"])(getBreakpointList);
        return ((0, jsx_runtime_1.jsx)(exports.MediaContext.Provider, __assign({ value: breakpoint }, { children: props.children })));
    }
    exports["default"] = MediaProvider;
});
define("hooks/useBreakpoint", ["require", "exports", "react", "theme/theme"], function (require, exports, react_3, theme_1) {
    "use strict";
    exports.__esModule = true;
    var useBreakpoint = function () {
        var breakpoint = (0, react_3.useContext)(theme_1.MediaContext);
        if (!breakpoint.trim().length)
            console.warn("Components must have a MediaProvider as context at the top level.\n      Your components will not work as expected");
        return breakpoint;
    };
    exports["default"] = useBreakpoint;
});
define("lib/hidden", ["require", "exports", "hooks/useBreakpoint"], function (require, exports, useBreakpoint_1) {
    "use strict";
    exports.__esModule = true;
    var Hidden = function (props) {
        var breakpoint = (0, useBreakpoint_1["default"])();
        // Hidden
        if (Array.isArray(props.media) && props.media.some(function (media) { return media === breakpoint; }) || props.media === breakpoint) {
            return null;
        }
        return props.children;
    };
    exports["default"] = Hidden;
});
define("lib/show", ["require", "exports", "hooks/useBreakpoint"], function (require, exports, useBreakpoint_2) {
    "use strict";
    exports.__esModule = true;
    var Show = function (props) {
        var breakpoint = (0, useBreakpoint_2["default"])();
        // Show
        if ((Array.isArray(props.media) &&
            props.media.some(function (media) { return media == breakpoint; })) ||
            props.media == breakpoint) {
            return props.children;
        }
        return null;
    };
    exports["default"] = Show;
});
define("lib/index", ["require", "exports", "theme/breakpoints", "hooks/useBreakpoint", "theme/theme", "lib/hidden", "lib/show"], function (require, exports, breakpoints_2, useBreakpoint_3, theme_2, hidden_1, show_1) {
    "use strict";
    exports.__esModule = true;
    exports.useBreakpoint = exports.MediaProvider = exports.defaultBreakpoints = exports.Show = exports.Hidden = void 0;
    exports.defaultBreakpoints = breakpoints_2.defaultBreakpoints;
    exports.useBreakpoint = useBreakpoint_3["default"];
    exports.MediaProvider = theme_2["default"];
    exports.Hidden = hidden_1["default"];
    exports.Show = show_1["default"];
});
