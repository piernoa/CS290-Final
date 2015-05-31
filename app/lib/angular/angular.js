/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n, h, p) {
    'use strict';

    function E(a) {
        var e = [];
        r(e, h.noop).chars(a);
        return e.join("")
    }

    function g(a) {
        var e = {};
        a = a.split(",");
        var d;
        for (d = 0; d < a.length; d++) e[a[d]] = !0;
        return e
    }

    function F(a, e) {
        function d(a, b, d, l) {
            b = h.lowercase(b);
            if (s[b])
                for (; f.last() && t[f.last()];) c("", f.last());
            u[b] && f.last() == b && c("", b);
            (l = v[b] || !! l) || f.push(b);
            var m = {};
            d.replace(G, function(a, b, e, c, d) {
                m[b] = q(e || c || d || "")
            });
            e.start && e.start(b, m, l)
        }

        function c(a, b) {
            var c = 0,
                d;
            if (b = h.lowercase(b))
                for (c = f.length - 1; 0 <= c && f[c] != b; c--);
            if (0 <= c) {
                for (d = f.length - 1; d >= c; d--) e.end && e.end(f[d]);
                f.length = c
            }
        }
        "string" !== typeof a && (a = null === a || "undefined" === typeof a ? "" : "" + a);
        var b, k, f = [],
            m = a,
            l;
        for (f.last = function() {
            return f[f.length - 1]
        }; a;) {
            l = "";
            k = !0;
            if (f.last() && w[f.last()]) a = a.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(a, b) {
                b = b.replace(H, "$1").replace(I, "$1");
                e.chars && e.chars(q(b));
                return ""
            }), c("", f.last());
            else {
                if (0 === a.indexOf("\x3c!--")) b = a.indexOf("--", 4), 0 <= b && a.lastIndexOf("--\x3e", b) === b && (e.comment &&
                    e.comment(a.substring(4, b)), a = a.substring(b + 3), k = !1);
                else if (x.test(a)) {
                    if (b = a.match(x)) a = a.replace(b[0], ""), k = !1
                } else if (J.test(a)) {
                    if (b = a.match(y)) a = a.substring(b[0].length), b[0].replace(y, c), k = !1
                } else K.test(a) && ((b = a.match(z)) ? (b[4] && (a = a.substring(b[0].length), b[0].replace(z, d)), k = !1) : (l += "<", a = a.substring(1)));
                k && (b = a.indexOf("<"), l += 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), e.chars && e.chars(q(l)))
            } if (a == m) throw L("badparse", a);
            m = a
        }
        c()
    }

    function q(a) {
        if (!a) return "";
        A.innerHTML = a.replace(/</g,
            "&lt;");
        return A.textContent
    }

    function B(a) {
        return a.replace(/&/g, "&amp;").replace(M, function(a) {
            var d = a.charCodeAt(0);
            a = a.charCodeAt(1);
            return "&#" + (1024 * (d - 55296) + (a - 56320) + 65536) + ";"
        }).replace(N, function(a) {
            return "&#" + a.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function r(a, e) {
        var d = !1,
            c = h.bind(a, a.push);
        return {
            start: function(a, k, f) {
                a = h.lowercase(a);
                !d && w[a] && (d = a);
                d || !0 !== C[a] || (c("<"), c(a), h.forEach(k, function(d, f) {
                    var k = h.lowercase(f),
                        g = "img" === a && "src" === k || "background" ===
                            k;
                    !0 !== O[k] || !0 === D[k] && !e(d, g) || (c(" "), c(f), c('="'), c(B(d)), c('"'))
                }), c(f ? "/>" : ">"))
            },
            end: function(a) {
                a = h.lowercase(a);
                d || !0 !== C[a] || (c("</"), c(a), c(">"));
                a == d && (d = !1)
            },
            chars: function(a) {
                d || c(B(a))
            }
        }
    }
    var L = h.$$minErr("$sanitize"),
        z = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
        y = /^<\/\s*([\w:-]+)[^>]*>/,
        G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
        K = /^</,
        J = /^<\//,
        H = /\x3c!--(.*?)--\x3e/g,
        x = /<!DOCTYPE([^>]*?)>/i,
        I = /<!\[CDATA\[(.*?)]]\x3e/g,
        M = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        N = /([^\#-~| |!])/g,
        v = g("area,br,col,hr,img,wbr");
    n = g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
    p = g("rp,rt");
    var u = h.extend({}, p, n),
        s = h.extend({}, n, g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
        t = h.extend({}, p, g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    n = g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");
    var w = g("script,style"),
        C = h.extend({}, v, s, t, u, n),
        D = g("background,cite,href,longdesc,src,usemap,xlink:href");
    n = g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
    p = g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
    var O = h.extend({}, D, p, n),
        A = document.createElement("pre");
    h.module("ngSanitize", []).provider("$sanitize", function() {
        this.$get = ["$$sanitizeUri",
            function(a) {
                return function(e) {
                    var d = [];
                    F(e, r(d, function(c, b) {
                        return !/^unsafe/.test(a(c, b))
                    }));
                    return d.join("")
                }
            }
        ]
    });
    h.module("ngSanitize").filter("linky", ["$sanitize",
        function(a) {
            var e = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/,
                d = /^mailto:/;
            return function(c, b) {
                function k(a) {
                    a && g.push(E(a))
                }

                function f(a, c) {
                    g.push("<a ");
                    h.isDefined(b) && g.push('target="', b, '" ');
                    g.push('href="', a.replace(/"/g, "&quot;"), '">');
                    k(c);
                    g.push("</a>")
                }
                if (!c) return c;
                for (var m, l = c, g = [], n, p; m = l.match(e);) n = m[0], m[2] || m[4] || (n = (m[3] ? "http://" : "mailto:") + n), p = m.index, k(l.substr(0, p)), f(n, m[0].replace(d, "")), l = l.substring(p + m[0].length);
                k(l);
                return a(g.join(""))
            }
        }
    ])
})(window, window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
