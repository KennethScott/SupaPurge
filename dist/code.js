function process(e) {}
(() => {
  var e = {
      484: function (e, r, i) {
        e.exports = (function () {
          "use strict";
          var e = 1e3,
            r = 6e4,
            i = 36e5,
            n = "millisecond",
            s = "second",
            a = "minute",
            o = "hour",
            u = "day",
            g = "week",
            f = "month",
            d = "quarter",
            _ = "year",
            b = "date",
            S = "Invalid Date",
            v =
              /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            L =
              /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            D = {
              name: "en",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
              ordinal: function (e) {
                var r = ["th", "st", "nd", "rd"],
                  i = e % 100;
                return "[" + e + (r[(i - 20) % 10] || r[i] || r[0]) + "]";
              },
            },
            m = function (e, r, i) {
              var n = String(e);
              return !n || n.length >= r
                ? e
                : "" + Array(r + 1 - n.length).join(i) + e;
            },
            T = {
              s: m,
              z: function (e) {
                var r = -e.utcOffset(),
                  i = Math.abs(r),
                  n = Math.floor(i / 60),
                  s = i % 60;
                return (r <= 0 ? "+" : "-") + m(n, 2, "0") + ":" + m(s, 2, "0");
              },
              m: function t(e, r) {
                if (e.date() < r.date()) return -t(r, e);
                var i = 12 * (r.year() - e.year()) + (r.month() - e.month()),
                  n = e.clone().add(i, f),
                  s = r - n < 0,
                  a = e.clone().add(i + (s ? -1 : 1), f);
                return +(-(i + (r - n) / (s ? n - a : a - n)) || 0);
              },
              a: function (e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
              },
              p: function (e) {
                return (
                  { M: f, y: _, w: g, d: u, D: b, h: o, m: a, s, ms: n, Q: d }[
                    e
                  ] ||
                  String(e || "")
                    .toLowerCase()
                    .replace(/s$/, "")
                );
              },
              u: function (e) {
                return void 0 === e;
              },
            },
            P = "en",
            x = {};
          x[P] = D;
          var p = function (e) {
              return e instanceof U;
            },
            E = function t(e, r, i) {
              var n;
              if (!e) return P;
              if ("string" == typeof e) {
                var s = e.toLowerCase();
                x[s] && (n = s), r && ((x[s] = r), (n = s));
                var a = e.split("-");
                if (!n && a.length > 1) return t(a[0]);
              } else {
                var o = e.name;
                (x[o] = e), (n = o);
              }
              return !i && n && (P = n), n || (!i && P);
            },
            w = function (e, r) {
              if (p(e)) return e.clone();
              var i = "object" == typeof r ? r : {};
              return (i.date = e), (i.args = arguments), new U(i);
            },
            O = T;
          (O.l = E),
            (O.i = p),
            (O.w = function (e, r) {
              return w(e, {
                locale: r.$L,
                utc: r.$u,
                x: r.$x,
                $offset: r.$offset,
              });
            });
          var U = (function () {
              function M(e) {
                (this.$L = E(e.locale, null, !0)), this.parse(e);
              }
              var D = M.prototype;
              return (
                (D.parse = function (e) {
                  (this.$d = (function (e) {
                    var r = e.date,
                      i = e.utc;
                    if (null === r) return new Date(NaN);
                    if (O.u(r)) return new Date();
                    if (r instanceof Date) return new Date(r);
                    if ("string" == typeof r && !/Z$/i.test(r)) {
                      var n = r.match(v);
                      if (n) {
                        var s = n[2] - 1 || 0,
                          a = (n[7] || "0").substring(0, 3);
                        return i
                          ? new Date(
                              Date.UTC(
                                n[1],
                                s,
                                n[3] || 1,
                                n[4] || 0,
                                n[5] || 0,
                                n[6] || 0,
                                a
                              )
                            )
                          : new Date(
                              n[1],
                              s,
                              n[3] || 1,
                              n[4] || 0,
                              n[5] || 0,
                              n[6] || 0,
                              a
                            );
                      }
                    }
                    return new Date(r);
                  })(e)),
                    (this.$x = e.x || {}),
                    this.init();
                }),
                (D.init = function () {
                  var e = this.$d;
                  (this.$y = e.getFullYear()),
                    (this.$M = e.getMonth()),
                    (this.$D = e.getDate()),
                    (this.$W = e.getDay()),
                    (this.$H = e.getHours()),
                    (this.$m = e.getMinutes()),
                    (this.$s = e.getSeconds()),
                    (this.$ms = e.getMilliseconds());
                }),
                (D.$utils = function () {
                  return O;
                }),
                (D.isValid = function () {
                  return !(this.$d.toString() === S);
                }),
                (D.isSame = function (e, r) {
                  var i = w(e);
                  return this.startOf(r) <= i && i <= this.endOf(r);
                }),
                (D.isAfter = function (e, r) {
                  return w(e) < this.startOf(r);
                }),
                (D.isBefore = function (e, r) {
                  return this.endOf(r) < w(e);
                }),
                (D.$g = function (e, r, i) {
                  return O.u(e) ? this[r] : this.set(i, e);
                }),
                (D.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (D.valueOf = function () {
                  return this.$d.getTime();
                }),
                (D.startOf = function (e, r) {
                  var i = this,
                    n = !!O.u(r) || r,
                    d = O.p(e),
                    l = function (e, r) {
                      var s = O.w(
                        i.$u ? Date.UTC(i.$y, r, e) : new Date(i.$y, r, e),
                        i
                      );
                      return n ? s : s.endOf(u);
                    },
                    $ = function (e, r) {
                      return O.w(
                        i
                          .toDate()
                          [e].apply(
                            i.toDate("s"),
                            (n ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(r)
                          ),
                        i
                      );
                    },
                    S = this.$W,
                    v = this.$M,
                    L = this.$D,
                    D = "set" + (this.$u ? "UTC" : "");
                  switch (d) {
                    case _:
                      return n ? l(1, 0) : l(31, 11);
                    case f:
                      return n ? l(1, v) : l(0, v + 1);
                    case g:
                      var T = this.$locale().weekStart || 0,
                        P = (S < T ? S + 7 : S) - T;
                      return l(n ? L - P : L + (6 - P), v);
                    case u:
                    case b:
                      return $(D + "Hours", 0);
                    case o:
                      return $(D + "Minutes", 1);
                    case a:
                      return $(D + "Seconds", 2);
                    case s:
                      return $(D + "Milliseconds", 3);
                    default:
                      return this.clone();
                  }
                }),
                (D.endOf = function (e) {
                  return this.startOf(e, !1);
                }),
                (D.$set = function (e, r) {
                  var i,
                    g = O.p(e),
                    d = "set" + (this.$u ? "UTC" : ""),
                    S = ((i = {}),
                    (i[u] = d + "Date"),
                    (i[b] = d + "Date"),
                    (i[f] = d + "Month"),
                    (i[_] = d + "FullYear"),
                    (i[o] = d + "Hours"),
                    (i[a] = d + "Minutes"),
                    (i[s] = d + "Seconds"),
                    (i[n] = d + "Milliseconds"),
                    i)[g],
                    v = g === u ? this.$D + (r - this.$W) : r;
                  if (g === f || g === _) {
                    var L = this.clone().set(b, 1);
                    L.$d[S](v),
                      L.init(),
                      (this.$d = L.set(
                        b,
                        Math.min(this.$D, L.daysInMonth())
                      ).$d);
                  } else S && this.$d[S](v);
                  return this.init(), this;
                }),
                (D.set = function (e, r) {
                  return this.clone().$set(e, r);
                }),
                (D.get = function (e) {
                  return this[O.p(e)]();
                }),
                (D.add = function (n, d) {
                  var b,
                    S = this;
                  n = Number(n);
                  var v = O.p(d),
                    y = function (e) {
                      var r = w(S);
                      return O.w(r.date(r.date() + Math.round(e * n)), S);
                    };
                  if (v === f) return this.set(f, this.$M + n);
                  if (v === _) return this.set(_, this.$y + n);
                  if (v === u) return y(1);
                  if (v === g) return y(7);
                  var L =
                      ((b = {}), (b[a] = r), (b[o] = i), (b[s] = e), b)[v] || 1,
                    D = this.$d.getTime() + n * L;
                  return O.w(D, this);
                }),
                (D.subtract = function (e, r) {
                  return this.add(-1 * e, r);
                }),
                (D.format = function (e) {
                  var r = this,
                    i = this.$locale();
                  if (!this.isValid()) return i.invalidDate || S;
                  var n = e || "YYYY-MM-DDTHH:mm:ssZ",
                    s = O.z(this),
                    a = this.$H,
                    o = this.$m,
                    u = this.$M,
                    g = i.weekdays,
                    f = i.months,
                    h = function (e, i, s, a) {
                      return (e && (e[i] || e(r, n))) || s[i].slice(0, a);
                    },
                    c = function (e) {
                      return O.s(a % 12 || 12, e, "0");
                    },
                    d =
                      i.meridiem ||
                      function (e, r, i) {
                        var n = e < 12 ? "AM" : "PM";
                        return i ? n.toLowerCase() : n;
                      },
                    _ = {
                      YY: String(this.$y).slice(-2),
                      YYYY: O.s(this.$y, 4, "0"),
                      M: u + 1,
                      MM: O.s(u + 1, 2, "0"),
                      MMM: h(i.monthsShort, u, f, 3),
                      MMMM: h(f, u),
                      D: this.$D,
                      DD: O.s(this.$D, 2, "0"),
                      d: String(this.$W),
                      dd: h(i.weekdaysMin, this.$W, g, 2),
                      ddd: h(i.weekdaysShort, this.$W, g, 3),
                      dddd: g[this.$W],
                      H: String(a),
                      HH: O.s(a, 2, "0"),
                      h: c(1),
                      hh: c(2),
                      a: d(a, o, !0),
                      A: d(a, o, !1),
                      m: String(o),
                      mm: O.s(o, 2, "0"),
                      s: String(this.$s),
                      ss: O.s(this.$s, 2, "0"),
                      SSS: O.s(this.$ms, 3, "0"),
                      Z: s,
                    };
                  return n.replace(L, function (e, r) {
                    return r || _[e] || s.replace(":", "");
                  });
                }),
                (D.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }),
                (D.diff = function (n, b, S) {
                  var v,
                    L = O.p(b),
                    D = w(n),
                    T = (D.utcOffset() - this.utcOffset()) * r,
                    P = this - D,
                    x = O.m(this, D);
                  return (
                    (x =
                      ((v = {}),
                      (v[_] = x / 12),
                      (v[f] = x),
                      (v[d] = x / 3),
                      (v[g] = (P - T) / 6048e5),
                      (v[u] = (P - T) / 864e5),
                      (v[o] = P / i),
                      (v[a] = P / r),
                      (v[s] = P / e),
                      v)[L] || P),
                    S ? x : O.a(x)
                  );
                }),
                (D.daysInMonth = function () {
                  return this.endOf(f).$D;
                }),
                (D.$locale = function () {
                  return x[this.$L];
                }),
                (D.locale = function (e, r) {
                  if (!e) return this.$L;
                  var i = this.clone(),
                    n = E(e, r, !0);
                  return n && (i.$L = n), i;
                }),
                (D.clone = function () {
                  return O.w(this.$d, this);
                }),
                (D.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (D.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (D.toISOString = function () {
                  return this.$d.toISOString();
                }),
                (D.toString = function () {
                  return this.$d.toUTCString();
                }),
                M
              );
            })(),
            A = U.prototype;
          return (
            (w.prototype = A),
            [
              ["$ms", n],
              ["$s", s],
              ["$m", a],
              ["$H", o],
              ["$W", u],
              ["$M", f],
              ["$y", _],
              ["$D", b],
            ].forEach(function (e) {
              A[e[1]] = function (r) {
                return this.$g(r, e[0], e[1]);
              };
            }),
            (w.extend = function (e, r) {
              return e.$i || (e(r, U, w), (e.$i = !0)), w;
            }),
            (w.locale = E),
            (w.isDayjs = p),
            (w.unix = function (e) {
              return w(1e3 * e);
            }),
            (w.en = x[P]),
            (w.Ls = x),
            (w.p = {}),
            w
          );
        })();
      },
    },
    r = {};
  function __webpack_require__(i) {
    var n = r[i];
    if (void 0 !== n) return n.exports;
    var s = (r[i] = { exports: {} });
    return e[i].call(s.exports, s, s.exports, __webpack_require__), s.exports;
  }
  (__webpack_require__.n = (e) => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return __webpack_require__.d(r, { a: r }), r;
  }),
    (__webpack_require__.d = (e, r) => {
      for (var i in r)
        __webpack_require__.o(r, i) &&
          !__webpack_require__.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: r[i] });
    }),
    (__webpack_require__.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (__webpack_require__.o = (e, r) =>
      Object.prototype.hasOwnProperty.call(e, r)),
    (() => {
      "use strict";
      var e = __webpack_require__(484),
        r = __webpack_require__.n(e);
      class i extends Error {
        constructor(e) {
          super(e), (this.name = "LabelException");
        }
      }
      class n {
        constructor() {
          this._userLabels = null;
        }
        get userLabels() {
          return (
            this._userLabels ||
              (this._userLabels = Gmail.Users.Labels.list("me").labels.filter(
                (e) => "user" === e.type
              )),
            this._userLabels
          );
        }
        getLabel(e) {
          let r = this.userLabels.find((r) => r.name === e);
          return (
            r ||
              (Logger.log("Label does not exist. Creating it."),
              (r = this.createLabel(e))),
            r
          );
        }
        getLabelsToPurge(e) {
          return this.userLabels.filter((r) => e.test(r.name));
        }
        renameLabel(e, r) {
          const i = this.getLabel(e);
          if (i) {
            const e = this.userLabels.indexOf(i);
            (i.name = r),
              Gmail.Users.Labels.update(i, "me", i.id),
              (this.userLabels[e] = i);
          } else Logger.log(`Rename failed.  Label not found: ${e}`);
        }
        createLabel(e) {
          const r = Gmail.Users.Labels.create({ name: e }, "me");
          return this.userLabels.push(r), r;
        }
      }
      class s {
        constructor(e) {
          this.entryPoint = e;
        }
        createTriggerFromNow(e, r) {
          const i = new Date(new Date().getTime() + 6e4 * e);
          this.createTrigger(i, r);
        }
        createTrigger(e, r) {
          const i = ScriptApp.newTrigger(this.entryPoint)
            .timeBased()
            .at(e)
            .create();
          s.setupTriggerArguments(i, r, !1);
        }
        static setupTriggerArguments(e, r, i) {
          const n = e.getUniqueId(),
            s = { RECURRING_KEY: i, ARGUMENTS_KEY: r };
          PropertiesService.getScriptProperties().setProperty(
            n,
            JSON.stringify(s)
          );
        }
        handleTriggered(e) {
          const r = PropertiesService.getScriptProperties(),
            i = JSON.parse(r.getProperty(e));
          return i.RECURRING_KEY || this.deleteTriggerByUid(e), i.ARGUMENTS_KEY;
        }
        static deleteTriggerArguments(e) {
          PropertiesService.getScriptProperties().deleteProperty(e);
        }
        deleteTriggerByUid(e) {
          ScriptApp.getProjectTriggers().some(
            (r) => r.getUniqueId() === e && (ScriptApp.deleteTrigger(r), !0)
          ) && s.deleteTriggerArguments(e);
        }
        deleteTriggers() {
          ScriptApp.getProjectTriggers().forEach((e) => {
            e.getHandlerFunction() === this.entryPoint &&
              ScriptApp.deleteTrigger(e);
          });
        }
      }
      class a {
        constructor() {
          (this.appName = "SupaPurge"),
            (this.triggerManager = new s("process")),
            (this.labelManager = new n()),
            (this.pageSize = 100),
            (this.followUpIncrementInMinutes = 10),
            (this.retentionPeriodErrorPrefix = "ERR-"),
            (this.labelRegex = new RegExp(
              `\\[(?!${this.retentionPeriodErrorPrefix})(.*?)\\]`
            ));
        }
        static activeUserEmail() {
          return Session.getActiveUser().getEmail();
        }
        static subtractFromToday(e) {
          const i = r()(),
            [n, s] = e.split(" "),
            a = i.subtract(parseInt(n), s);
          if (a.isValid() && !i.isSame(a, "second")) return a;
        }
        static scriptPropertyExists(e) {
          return !!PropertiesService.getScriptProperties().getProperty(e);
        }
        processPurge(e) {
          let r, i;
          Logger.log(`processPurge started. event: ${JSON.stringify(e)}`),
            e && a.scriptPropertyExists(e.triggerUid)
              ? ((i = this.triggerManager.handleTriggered(e.triggerUid)),
                (r = [this.labelManager.getLabel(i.labelName)]),
                Logger.log(`Continuation run of label: ${i.labelName}`))
              : (r = this.labelManager.getLabelsToPurge(this.labelRegex)),
            r.forEach((e) => {
              this.purgeLabel(e);
            });
        }
        purgeLabel(e) {
          let r;
          try {
            const n = this.labelRegex.exec(e.name);
            if (!n)
              throw new i(
                `Unable to extract retention period from label: ${e.name}`
              );
            if (
              ((r = n[1]),
              Logger.log(`Retention Period: ${r}`),
              !r.startsWith(this.retentionPeriodErrorPrefix))
            ) {
              const n = a.subtractFromToday(r);
              if (!n)
                throw new i(
                  `Error determining retention period in label: ${e.name}. Messages for this label are not being processed.`
                );
              Logger.log(`Purge before: ${n.toString()}`);
              const s = [
                `label:${e.name.replace(/ /g, "-")}`,
                "-in:chats",
                `before:${n.format("YYYY-MM-DD")}`,
                "-is:starred",
              ];
              Logger.log(`Filters: ${s.join(" ")}`);
              const o = GmailApp.search(s.join(" "), 0, this.pageSize);
              Logger.log(`Processing ${o.length} threads...`),
                o.forEach((e) => {
                  e.getLastMessageDate() < n && e.moveToTrash();
                }),
                Logger.log("Finished processing batch"),
                o.length === this.pageSize &&
                  (Logger.log("Scheduling follow up job..."),
                  this.triggerManager.createTriggerFromNow(
                    this.followUpIncrementInMinutes,
                    { labelName: e.name }
                  ));
            }
          } catch (n) {
            if (n instanceof i) {
              Logger.log(n),
                Logger.log(
                  `Notifying user and renaming label with error: ${e.name}`
                ),
                GmailApp.sendEmail(
                  a.activeUserEmail(),
                  this.appName,
                  n.toString()
                );
              const i = e.name.replace(r, this.retentionPeriodErrorPrefix + r);
              this.labelManager.renameLabel(e.name, i);
            } else
              Logger.log(n),
                GmailApp.sendEmail(
                  a.activeUserEmail(),
                  this.appName,
                  n.toString()
                );
          }
        }
      }
      __webpack_require__.g.process = function (e) {
        new a().processPurge(e);
      };
    })();
})();
