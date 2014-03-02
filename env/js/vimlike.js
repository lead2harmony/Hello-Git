/*
    vim風JavaScript
*/
var vlkLinkMap = [
    {   name    : "ITpro"
    ,   url     : /^https?:\/\/(www\.)?itpro\.nikkeibp\.co\.jp\//
    ,   marker  : [["prevPart"], ["^&lt;&lt;.?"], ["mokuji"], ["nextPageBtn"], ["nextPart"]]
    }
];

function vimLikeKeyClickEmulation(n)
{
    if (!n) return false;

    // 引数がオブジェクトの場合(再帰呼び出し※ID,NAME,CLASSで特定されたオブジェクトが渡される)
    if (typeof(n) == "object")
    {
        if ((n.tagName) && (n.tagName.toLowerCase() == "a"))    // anchorタグの場合
        {
            n.click();
            return true;
        }
        else if (n.hasChildNodes()) // 子要素がある場合
        {
            var p = n.childNodes;
            if (vlkDebugMode) alert("child nodes count : " + p.length);
            for (var i = 0; i < p.length; i++)
            {
                var c = p[i];
                if ((c) && (c.tagName) && (c.tagName.toLowerCase() == "a"))
                {
                    if (vlkDebugMode) alert("index : " + i + "\nvalue : " + c);
                    c.click();
                    return true;
                }
                else
                {
                    if (vlkDebugMode) alert("skip index : " + i);
                }
            }
        }
        else
        {
            if (vlkDebugMode) alert("child nodes nothing");
        }
        return false;
    }

    // 先ずはLINKタグを試行
    var l = document.getElementsByTagName("link");
    if (vlkDebugMode) alert("link count : " + l.length);
    for (var i = 0; i < l.length; i++)
    {
        var e = l[i];
        if ((e.rel) && (e.rel == n))
        {
            if (vlkDebugMode) alert("match link\nindex : " + i + "\nvalue : " + e.innerText + "\ncode : \n" + e.outerHTML);
            if (e.href)
            {
                document.location.href = e.href;
                return true;
            }
        }
        else
        {
            if (vlkDebugMode) alert("unmatch link\nindex : " + i + "\nvalue : " + e.innerText + "\ncode : \n" + e.outerHTML);
        }
    }

    // IDで探す
    var a = document.getElementById(n);
    if (vimLikeKeyClickEmulation(a))
    {
        return true;
    }
    else
    {
        if (vlkDebugMode) alert("id not found : " + n);
        // NAMEで探す
        a = document.getElementsByName(n);
        if (vimLikeKeyClickEmulation(a[0]))
        {
            return true;
        }
        else
        {
            if (vlkDebugMode) alert("name not found : " + n);
            // CLASSで探す
            a = document.getElementsByClassName(n);
            if (vimLikeKeyClickEmulation(a[0]))
            {
                return true;
            }
            else
            {
                if (vlkDebugMode) alert("class not found : " + n);
            }
        }
    }

    // 最後に文言で探す
    var a = document.getElementsByTagName("a");
    var r = new RegExp(n);
    if (vlkDebugMode) alert("anchor count : " + a.length);
    for (var i = 0; i < a.length; i++)
    {
        var e = a[i];
    //  if ((e.innerHTML) && ((e.innerHTML == n) || e.innerHTML.match(r)))
    //  if ((e.innerText) && ((e.innerText == n) || e.innerText.match(r)))
        if (((e.innerText) && ((e.innerText == n) || e.innerText.match(r))) || ((e.innerHTML) && ((e.innerHTML == n) || e.innerHTML.match(r))))
        {
            if (vlkDebugMode) alert("match anchor\nindex : " + i + "\nvalue : " + e.innerText + "\ncode : \n" + e.outerHTML);
            if (e.href)
            {
                document.location.href = e.href;
                return true;
            }
        }
        else
        {
            if (vlkDebugMode && !confirm("unmatch anchor\nindex : " + i + "\nvalue : " + e.innerText + "\ncode : \n" + e.outerHTML)) break;
        }
    }

    return false;
}
//
function vimLikeKeyPageMove(moveNext)
{
    if (location.href.match(/^https?:\/\/(www\.)?japan\.cnet\.com\//))
    {
        if (vlkDebugMode) alert("CNET Japan");
        return vimLikeKeyClickEmulation((moveNext) ? "next" : "<<");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?japan\.zdnet\.com\//))
    {
        if (vlkDebugMode) alert("ZDNet Japan");
        if (vimLikeKeyClickEmulation((moveNext) ? "next" : "prev")) return true;
        return vimLikeKeyClickEmulation((moveNext) ? "次" : "前");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?atmarkit\.co\.jp\//))
    {
        if (vlkDebugMode) alert("@IT");
        return vimLikeKeyClickEmulation((moveNext) ? "next" : "prev");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?codezine\.jp\//))
    {
        if (vlkDebugMode) alert("CodeZine");
        return vimLikeKeyClickEmulation((moveNext) ? "pg_bar_next" : "pg_bar_prev");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?thinkit\.co\.jp\//))
    {
        if (vlkDebugMode) alert("thinkit");
        return vimLikeKeyClickEmulation((moveNext) ? "next" : "prev");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?gihyo\.jp\//))
    {
        if (vlkDebugMode) alert("gihyo");
        return vimLikeKeyClickEmulation((moveNext) ? "next" : "back");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?ascii\.jp\//))
    {
        if (vlkDebugMode) alert("ASCII");
        if (vimLikeKeyClickEmulation((moveNext) ? "next" : "previous")) return true;
        return vimLikeKeyClickEmulation((moveNext) ? "(続きはこちら)" : null);
    }
    else if (location.href.match(/^https?:\/\/(www\.)?itpro\.nikkeibp\.co\.jp\//))
    {
        if (vlkDebugMode) alert("ITpro");
        return vimLikeKeyClickEmulation((moveNext) ? "nextPageBtn" : "^&lt;&lt;.?");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?news\.mynavi\.jp\//))
    {
        if (vlkDebugMode) alert("mynavi");
        return vimLikeKeyClickEmulation((moveNext) ? "nxt" : "pre");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?au-karada\.auone\.jp\//))
    {
        if (vlkDebugMode) alert("au Karada Manager");
        return vimLikeKeyClickEmulation((moveNext) ? "btn_next" : "btn_prev");
    }
    else if (location.href.match(/^https?:\/\/(www\.)?twinavi\.jp\//))
    {
        if (vlkDebugMode) alert("twinavi");
        return vimLikeKeyClickEmulation((moveNext) ? "article-link" : "article-link");
    }
    else
    {
        if (vlkDebugMode) alert(location.href);
    }
    return false;
}
//
function vimLikeKeyPress4AnchorsIndex(e)
{
    switch (e.keyCode)
    {
        case 74:    // J | j
    //  case 106:   // j
            var element = (document.activeElement || window.getSelection().focusNode);
            if (element)
                if (element.parentNode)
                    if (element.parentNode.nextSibling)
                        element.parentNode.nextSibling.firstChild.focus();
                    else if (element.parentNode.parentNode)
                        element.parentNode.parentNode.firstChild.firstChild.focus();
            e.returnValue = false;
            break;
        case 75:    // K | k
    //  case 107:   // k
            var element = (document.activeElement || window.getSelection().focusNode);
            if (element)
                if (element.parentNode)
                    if (element.parentNode.previousSibling)
                        element.parentNode.previousSibling.firstChild.focus();
                    else if (element.parentNode.parentNode)
                        element.parentNode.parentNode.lastChild.firstChild.focus();
            e.returnValue = false;
            break;
        case 71:    // G | g
    //  case 103:   // g
            var element = (document.activeElement || window.getSelection().focusNode);
            if (element)
                if (element.parentNode)
                    if (element.parentNode.parentNode)
                        if (e.shiftKey)
                            element.parentNode.parentNode.lastChild.firstChild.focus();
                        else
                            element.parentNode.parentNode.firstChild.firstChild.focus();
            e.returnValue = false;
            break;
        default:
            if (vlkDebugMode)
            {
                alert(
                        "keyCode : " + e.keyCode
                    +   "\nshiftKey : " + e.shiftKey
                    +   "\nctrlKey : " + e.ctrlKey
                    +   "\naltKey : " + e.altKey
                    );
            }
            break;
    }
}
//
function vimLikeKeyPress(e)
{
    switch (e.keyCode)
    {
        case 58:    // :
            alert(document.cookie);
            break;
        case 63:    // ?
            vlkDebugMode = !vlkDebugMode;
            alert("KeyCode Reporting : " + (vlkDebugMode ? "ON" : "OFF"));
            if (vlkDebugMode)
            {
                alert(
                    "(top,left)=(" + document.body.scrollTop + "," + document.body.scrollLeft + ")\n"
                +   "(width,height)=(" + window.innerWidth + "," + window.innerHeight + ")"
                );
            }
            break;
        case 110:   // n
        //  if (!vimLikeKeyPageMove(true)) alert("次ページへのリンクを特定出来ませんでした。");
            if (!vimLikeKeyPageMove(true)) alert("Next page link not found.");
            break;
        case 112:   // p
        //  if (!vimLikeKeyPageMove(false)) alert("前ページへのリンクを特定出来ませんでした。");
            if (!vimLikeKeyPageMove(false)) alert("Previous page link not found.");
            break;
        case 105:   // i
            var div = document.getElementById("vlkPopupAnchorsIndex");
            if (!div)
            {
                div = document.createElement("div");
                div.id = "vlkPopupAnchorsIndex";
            //  div.style = "position:absolute; visibility:hidden; top:10px; left:10px; width:300px; height:200px; background-color: sliver;";
                div.style.fontFamily = "monospace";
                div.style.fontSize = "11pt";
                div.style.position = "absolute";
                div.style.visibility = "hidden";
                div.style.padding = "20px";
                div.style.margin = "0";
                div.style.overflow = "scroll";
                div.style.color = "black";
                div.style.backgroundColor = "honeydew";
                div.style.zIndex = "99999";
                document.body.appendChild(div);
                if (div.addEventListener) {
                //  div.addEventListener("keypress", vimLikeKeyPress4AnchorsIndex, false);
                    div.addEventListener("keydown", vimLikeKeyPress4AnchorsIndex, false);
                }
                if (div.attachEvent) {
                //  div.attachEvent("onkeypress", vimLikeKeyPress4AnchorsIndex);
                    div.attachEvent("onkeydown", vimLikeKeyPress4AnchorsIndex);
                }
            }
            if (div.style.visibility == "hidden")
            {
                //
                div.innerHTML = "<b>anchors index</b><br>" + vlkMakeAnchorsIndexBody();
                div.style.top = (document.body.scrollTop + 50) + "px";
                div.style.left = (document.body.scrollLeft + 50) + "px";
                div.style.width = (window.innerWidth - 150) + "px";
                div.style.height = (window.innerHeight - 150) + "px";
                div.style.visibility = "visible";
                var elements = div.getElementsByTagName("a");
                if (elements) elements[0].focus();
            }
            else
            {
                div.innerHTML = "";
                div.style.visibility = "hidden";
            }
            if (vlkDebugMode) alert(div.outerHTML);
            break;
        case 73:    // I
    //  //  var w = window.open("http://jslib.lead2harmony.net/blank.html",null,"width=500, height=400, menubar=no, toolbar=no, scrollbars=yes");
    //  //  var w = window.open("about:blank","anchorIndexes","width=500, height=400, menubar=no, toolbar=no, scrollbars=yes");
    //      var w = window.open("http://jslib.lead2harmony.net/anchorsIndex.html",null,"width=500, height=400, menubar=no, toolbar=no, scrollbars=yes");
    //      w.open();
    //      vlkMakeAnchorsIndexBody(w);
            var param = vlkMakeAnchorsIndexBody();
            var rtn = window.showModalDialog("http://jslib.lead2harmony.net/anchorsIndex.html",{ html : param },"width=500, height=400, menubar=no, toolbar=no, scrollbars=yes");
            var elements = document.getElementsByClassName(rtn);
            if (elements && (elements.length > 0)) { elements[0].click(); } else { alert("not found"); }
            break;
        case 72:    // H
        case 104:   // h
        //  e.keyCode = 37;
            window.scrollBy(-30, 0);
            break;
        case 74:    // J
        case 106:   // j
        //  e.keyCode = 40;
            window.scrollBy(0, 30);
            break;
        case 75:    // K
        case 107:   // k
        //  e.keyCode = 38;
            window.scrollBy(0, -30);
            break;
        case 76:    // L
        case 108:   // l
        //  e.keyCode = 39;
            window.scrollBy(30, 0);
            break;
        case 71:    // G
            window.scroll(0, document.height);
            break;
        case 103:   // g
            window.scroll(0, 0);
            break;
        case 70:    // F
        case 102:   // f
            window.scrollBy(0, window.innerHeight / 2);
            break;
        case 66:    // B
        case 98:    // b
            window.scrollBy(0, -(window.innerHeight / 2));
            break;
    //  case 82:    // R
    //  case 114:   // r
    //  //  window.resizeBy(800, 600);  // 相対(オフセット)指定
    //      window.resizeTo(800, 600);  // 絶対指定
    //      break;
        default:
            if (vlkDebugMode)
            {
                alert(
                        "keyCode : " + e.keyCode
                    +   "\nshiftKey : " + e.shiftKey
                    +   "\nctrlKey : " + e.ctrlKey
                    +   "\naltKey : " + e.altKey
                    );
            }
            break;
    }
}

function vlkMakeAnchorsIndexBody()
{
//  var temp = "<li><a href='${url}' onclick='javascript: window.returnValue=\"${id}\"; window.close();'>${txt}</a></li>"
    var temp = "<li><a href='${url}' onclick='javascript: vimLikeKeyClickEmulation(\"${id}\"); return false;'>${txt}</a></li>"

    var html = "";
    html += "<ul>";

    var i = 0;
    var elements = document.getElementsByTagName("a");
    for (var key in elements)
    {
        i++;
        var e = elements[key];
        var id = "AnchorIndex_" + i;
        var rg = new RegExp(id);
        if (!e.className || !e.className.match(rg)) e.className += id;
        html += temp.replace("${id}",id).replace("${url}",e.href).replace("${txt}",e.innerText);
    //  if (i >= 50) break;
    }

    html += "</ul>";

    if (vlkDebugMode) alert(html);
    return html;
}

var vlkDebugMode = false;

if (window.addEventListener) {
    window.addEventListener("keypress", vimLikeKeyPress, false);
//  window.addEventListener("keydown", vimLikeKeyPress, false);
}
if (window.attachEvent) {
    window.attachEvent("onkeypress", vimLikeKeyPress);
//  window.attachEvent("onkeydown", vimLikeKeyPress);
}

