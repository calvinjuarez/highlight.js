/*
Language: SCSS
Author: Kurt Emch <kurt@kurtemch.com>
*/
function(hljs) {
  var css = {}
  css.COLOR_HEX = {
    className: 'hexcolor', begin: /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, relevance: 0
  }
  css.COLOR_KEYWORD = { // it'd be nice to include it in CSS and SCSS, too, imo
    beginWithKeyword: true,
    relevance: 0,
    keywords: {
      color:
        'AliceBlue AntiqueWhite Aqua Aquamarine Azure Beige Bisque Black BlanchedAlmond Blue ' +
        'BlueViolet Brown BurlyWood CadetBlue Chartreuse Chocolate Coral CornflowerBlue Cornsilk ' +
        'Crimson Cyan DarkBlue DarkCyan DarkGoldenrod DarkGray DarkGreen DarkKhaki DarkMagenta ' +
        'DarkOliveGreen DarkOrange DarkOrchid DarkRed DarkSalmon DarkSeaGreen DarkSlateBlue ' +
        'DarkSlateGray DarkTurquoise DarkViolet DeepPink DeepSkyBlue DimGray DodgerBlue FireBrick ' +
        'FloralWhite ForestGreen Fuchsia Gainsboro GhostWhite Gold Goldenrod Gray Green GreenYellow ' +
        'Honeydew HotPink IndianRed Indigo Ivory Khaki Lavender LavenderBlush LawnGreen LemonChiffon ' +
        'LightBlue LightCoral LightCyan LightGoldenrodYellow LightGreen LightGrey LightPink ' +
        'LightSalmon LightSeaGreen LightSkyBlue LightSlateGray LightSteelBlue LightYellow Lime ' +
        'LimeGreen Linen Magenta Maroon MediumAquamarine MediumBlue MediumOrchid MediumPurple ' +
        'MediumSeaGreen MediumSlateBlue MediumSpringGreen MediumTurquoise MediumVioletRed ' +
        'MidnightBlue MintCream MistyRose Moccasin NavajoWhite Navy OldLace Olive OliveDrab Orange ' +
        'OrangeRed Orchid PaleGoldenrod PaleGreen PaleTurquoise PaleVioletRed PapayaWhip PeachPuff ' +
        'Peru Pink Plum PowderBlue Purple Red RosyBrown RoyalBlue SaddleBrown Salmon SandyBrown ' +
        'SeaGreen Seashell Sienna Silver SkyBlue SlateBlue SlateGray Snow SpringGreen SteelBlue Tan ' +
        'Teal Thistle Tomato Turquoise Violet Wheat White WhiteSmoke Yellow YellowGreen' +
        'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue ' +
        'blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk ' +
        'crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkkhaki darkmagenta ' +
        'darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue ' +
        'darkslategray darkturquoise darkviolet deeppink deepskyblue dimgray dodgerblue firebrick ' +
        'floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow ' +
        'honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon ' +
        'lightblue lightcoral lightcyan lightgoldenrodyellow lightgreen lightgrey lightpink ' +
        'lightsalmon lightseagreen lightskyblue lightslategray lightsteelblue lightyellow lime ' +
        'limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple ' +
        'mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred ' +
        'midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange ' +
        'orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff ' +
        'peru pink plum powderblue purple red rosybrown royalblue saddlebrown salmon sandybrown ' +
        'seagreen seashell sienna silver skyblue slateblue slategray snow springgreen steelblue tan ' +
        'teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen'
    }
  }
  css.FUNCTION = {
    className: 'function',
    begin: /[a-zA-Z-][a-zA-Z0-9_-]*\(/, end: /\)/,
    relevance: 0,
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      css.COLOR_KEYWORD,
      css.COLOR_HEX
    ]
  }
  css.AT_RULE = {
    className: 'at_rule',
    begin: /@(charset|font-face|import|keyframes|media|namespace|page|region|supports|viewport)/, end: /[{;]/,
    lexemes: '[a-z-]+(\s[a-z-+])?',
    keywords: 'charset font-face import keyframes media namespace page region supports viewport',
    relevance: 0,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        keywords: {
          operator: 'and not',
          option: 'inline reference less' // I'm not sure what to call these. At lesscss.org they're
                                          // called options, so that's what I'm calling them, but if
                                          // there is a css class already in Highlight.js that works
                                          // better, we should use that.
        },
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          css.FUNCTION
        ]
      }
    ]
  }
  css.VALUE = {
    className: 'value',
    endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      // less.VARIABLE will be defined and added here later
      // less.FUNCTION will be defined and added here later
      // less.ESCAPED_VALUE will be defined and added here later
      css.FUNCTION,
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      css.COLOR_HEX,
      { className: 'important', begin: '!important' }
    ]
  }
  css.PROPERTY = {
    begin: /[a-z-+]+:/, end: /[;{}]/,
    returnBegin: true, endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      { // I really think CSS, LESS, and SCSS should use 'property' instead of 'attribute'
        className: 'attribute',
        begin: /\S[a-z-]/, end: /(\+?:)\s*/,
        excludeEnd: true,
        relevance: 0,
        starts: css.VALUE
      },
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  }
  css.SELECTOR = {
    begin: /([.#&@[]{1}||:{1,2})?[a-zA-Z-]/, end: /\{/,
    returnBegin: true, endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      {
        className: 'class',
        begin: /\.[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      },
      {
        className: 'id',
        begin: /\#[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      },
      {
        className: 'attr_selector',
        begin: /\[/, end: /\]/,
        endsWithParent: true,
        relevance: 0,
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
        ]
      },
      {
        className: 'pseudo',
        begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)\"\']+/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0,
        contains: [
          hljs.NUMBER_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
        ]
      },
      {
        className: 'tag',
        begin: /[a-zA-Z][a-zA-Z0-9]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      }
    ]
  }
  var scss = {}
  scss.VARIABLE = {
    className: 'variable',
    begin: /\$[a-zA-Z0-9_-]*/,
    relevance: 10
  }
  scss.FUNCTION = {
    begin: '(escape|e|%|unit|color|data-uri|' +
      'ceil|floor|percentage|round|sqrt|abs|sin|asin|cos|acos|tan|atan|pi|pow|mod|convert|unit|' + // math
      'rgb|rgba|argb|hsl|hsla|hsv|hsva|hue|saturation|lightness|hsvhue|hsvsaturation|hsvvalue|' + // color
      'red|green|blue|alpha|luma|saturate|desaturate|lighten|darken|fadein|fadeout|fade|spin|' +
      'mix|tint|shade|greyscale|contrast|multiply|' +
      'iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|isunit)\\(', end: '\\)', // type
    lexemes: '[a-z-\\%]+',
    keywords: {
      built_in: 'escape e % unit color data-uri ' + // math
      'ceil floor percentage round sqrt abs sin asin cos acos tan atan pi pow mod convert unit ' + // color
      'rgb rgba argb hsl hsla hsv hsva hue saturation lightness hsvhue hsvsaturation hsvvalue ' +
      'red green blue alpha luma saturate desaturate lighten darken fadein fadeout fade spin ' +
      'mix tint shade greyscale contrast multiply ' +
      'iscolor isnumber isstring iskeyword isurl ispixel ispercentage isem isunit', // type
    },
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      scss.VARIABLE,
      css.COLOR_KEYWORD,
      css.COLOR_HEX
    ]
  }
  scss.MIX_IN = {
    className: 'at_rule',
    begin: /@(mixin|include)/, end: /[{;]/,
    excludeEnd: true,
    lexemes: '[a-z-]+\s',
    keywords: 'mixin include',
    relevance: 10,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'preprocessor',
        begin: /[a-zA-Z0-9-_]+/, endsWithParent: true, returnEnd: true,
        starts: {
          begin: /\(/, end: /\)/, // parameters (maybe use `.hljs-params`?)
          contains: [
            scss.VARIABLE,
            scss.FUNCTION,
            {
              className: 'value', // represents the default value
              begin: /:/, end: /[,)]/,
              excludeBegin: true, endsWithParent: true, excludeEnd: true,
              contains: [
                hljs.NUMBER_MODE,
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                css.COLOR_HEX,
                css.COLOR_KEYWORD,
              ]
            }
          ]
        },
        contains: [
          scss.VARIABLE
        ]
      }
    ]
  }
  scss.EXTEND = {
    className: 'at_rule',
    begin: /@(extend)/, end: /;/,
    excludeEnd: true,
    lexemes: '[a-z-]+',
    keywords: 'extend',
    relevance: 10,
    contains: [
      css.SELECTOR
    ]
  }
  scss.DIRECTIVE = {
    className: 'at_rule',
    begin: /@(for|if|else|each|while|function)(\sif)?/, end: /[{;]/,
    excludeEnd: true,
    lexemes: '[a-z-]+',
    keywords: 'for if else each while function',
    relevance: 10,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'preprocessor',
        begin: /\s[a-zA-Z0-9-_]+/, end: /\(/, endsWithParent: true, returnEnd: true,
        starts: {
          begin: /\(/, end: /\)/,
          contains: [
            scss.VARIABLE,
            {
              className: 'value', // represents the default value
              begin: /:/, end: /[,)]/,
              excludeBegin: true, endsWithParent: true, excludeEnd: true,
              contains: [
                hljs.NUMBER_MODE,
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                css.COLOR_HEX,
                css.COLOR_KEYWORD,
              ]
            }
          ]
        },
        contains: [
          hljs.NUMBER_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          css.FUNCTION
        ]
      }
    ]
  }
  
  
  // Allow the CSS to contain the previously undeclared but necessary LESS stuff.
  css.FUNCTION.contains.push(scss.VARIABLE)
  css.VALUE.contains.unshift(/* less.ESCAPED_VALUE, less.FUNCTION, */ scss.VARIABLE)
  css.SELECTOR.contains.unshift(scss.VARIABLE)
  
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(', end: '\\)',
    contains: ['self', hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  var HEXCOLOR = {
    className: 'hexcolor', begin: '#[0-9A-Fa-f]+'
  };
  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+', end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      className: 'value',
      endsWithParent: true, excludeEnd: true,
      contains: [
        FUNCTION,
        HEXCOLOR,
        hljs.NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'important', begin: '!important'
        }
      ]
    }
  };
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      
      { className: 'important', begin: '!important' },
      
      css.COLOR_HEX,
      css.COLOR_KEYWORD,
      
      scss.VARIABLE,
      scss.FUNCTION,
      
      css.AT_RULE,
      scss.MIX_IN,
      scss.EXTEND,
      scss.DIRECTIVE,
      
/*
      {
        className: 'function',
        begin: IDENT_RE + '\\(', end: '\\)',
        contains: ['self', hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
      },
*/
      
      //css.SELECTOR,
      css.PROPERTY,
/*
      {
        className: 'id', begin: '\\#[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'class', begin: '\\.[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'attr_selector',
        begin: '\\[', end: '\\]',
        illegal: '$'
      },
      {
        className: 'tag', // begin: IDENT_RE, end: '[,|\\s]'
        begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
        relevance: 0
      },
      {
        className: 'pseudo',
        begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
      },
      {
        className: 'pseudo',
        begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
      },
      {
        className: 'attribute',
        begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
        illegal: '[^\\s]'
      },
      {
        className: 'value',
        begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
      },
*/
/*
      {
        className: 'value',
        begin: ':', end: ';',
        contains: [
          HEXCOLOR,
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            className: 'important', begin: '!important'
          }
        ]
      },
*/
/*
      {
        className: 'at_rule',
        begin: '@', end: '[{;]',
        keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
        contains: [
          FUNCTION,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HEXCOLOR,
          hljs.NUMBER_MODE,
          {
            className: 'preprocessor',
            begin: '\\s[A-Za-z0-9_.-]+',
            relevance: 0
          }
        ]
      }
*/
    ]
  };
}
