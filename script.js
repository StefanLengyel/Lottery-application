$(document).ready(function () {
  const t = new JSConfetti();
  function a() {
    var t = $("#name").text(),
      a = $.inArray(t, s);
    -1 !== a && (s.splice(a, 1), $(".names").val(s.join("\n")), o());
  }
  function n(t) {
    var a;
    "koleso" == t
      ? (a = new Audio("fx/koleso.mp3"))
      : "vyherca" == t
      ? (a = new Audio("fx/vyherca.mp3"))
      : "zhoda" == t && (a = new Audio("fx/zhoda.mp3")),
      a.play();
  }
  function e() {
    clearInterval(r);
    var a = $("#name").text();
    -1 !== $.inArray(a, m)
      ? (n("zhoda"),
        $("#name").html(
          'The winner <span class="duplVyherca">' +
            a +
            "</span> is already in the list :) probability 1:" +
            zoznamZam
        ))
      : ($(".picked-names").append("<li>" + a + "</li>"),
        t.addConfetti({ confettiRadius: 6, confettiNumber: 1200 }),
        n("vyherca"));
  }
  function o() {
    var t = $(".names").val().trim();
    "" !== t
      ? ((t = t.split("\n").length), (zoznamZam = t), $("#pocetZam").text(t))
      : $("#pocetZam").text("0");
  }
  function i() {
    var t = new Date(),
      a = (a = t.toLocaleDateString()),
      n =
        String(t.getHours()).padStart(2, "0") +
        ":" +
        String(t.getMinutes()).padStart(2, "0") +
        ":" +
        String(t.getSeconds()).padStart(2, "0");
    $("#datum").text(a), $("#cas").text(n);
  }
  i(),
    setInterval(i, 1e3),
    $(".names").on("input", function () {
      o();
    });
  var r,
    s = [],
    l = !1,
    c = "",
    m = [];
  (zoznamZam = []),
    $("#start").click(function () {
      var t;
      (t = $(".names")
        .val()
        .split("\n")
        .filter(function (t) {
          return "" !== t.trim();
        })
        .join("\n")),
        $(".names").val(t),
        "" !== (c = $(".names").val().trim()) &&
          ((s = c.split("\n")),
          $(this).attr("disabled", !0),
          $("#stop").attr("disabled", !1),
          (r = setInterval(function () {
            var t = Math.floor(Math.random() * s.length);
            $("#name").text(s[t]), n("koleso");
            var a = (function () {
              for (var t = "#", a = 0; a < 6; a++)
                t += "89ABCDEF89ABCDEF"[Math.floor(16 * Math.random())];
              return t;
            })();
            $("#name").css("color", a + " !important");
          }, 50)));
    }),
    $("#stop").click(function () {
      !(function () {
        const t = $("ol li, ul li")
          .map(function () {
            return $(this).text().trim();
          })
          .get();
        m = t;
      })(),
        l ||
          "" === c ||
          ((l = !0),
          $(this).attr("disabled", !0),
          $("#start").attr("disabled", !1),
          e(),
          a(),
          $(this).click(function () {
            $(this).attr("disabled", !0),
              $("#start").attr("disabled", !1),
              e(),
              a(),
              0 == $(".names").val().length &&
                $("#name").text("Lottery application");
          }));
    });
});
