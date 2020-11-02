import { util_error } from "./log";

export namespace Bilibili {
    // https://greasyfork.org/zh-CN/scripts/398535-bv2av/code
    export function bv2aid(bv: string) {
        var table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
        var tr = {};
        for (var i = 0; i < 58; ++i) {
            tr[table[i]] = i;
        }

        var s = [11, 10, 3, 8, 4, 6];
        var xor = 177451812;
        var add = 8728348608;

        var r = 0;
        for (var i = 0; i < 6; ++i) {
            r += tr[bv[s[i]]] * (Math.pow(58, i));
        }
        return String((r - add) ^ xor);
    }

    export function xml2obj(xml: Element) {
        try {
            var obj = {}, text;
            var children = xml.children;
            if (children.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    var item = children.item(i);
                    var nodeName = item.nodeName;

                    if (typeof (obj[nodeName]) == "undefined") { // 若是新的属性, 则往obj中添加
                        obj[nodeName] = xml2obj(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") { // 若老的属性没有push方法, 则把属性改成Array
                            var old = obj[nodeName];

                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2obj(item));
                    }
                }
            } else {
                text = xml.textContent;
                if (/^\d+(\.\d+)?$/.test(text)) {
                    obj = Number(text);
                } else if (text === 'true' || text === 'false') {
                    obj = Boolean(text);
                } else {
                    obj = text;
                }
            }
            return obj;
        } catch (e) {
            util_error(e);
        }
    }
}