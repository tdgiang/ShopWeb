import * as antd from "antd";
import moment from 'momentConfig'

export function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this,
            args = arguments;

        let executeFunction = function () {
            func.apply(context, args);
        }; 

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
}

export function formatMoney(number) {
    if(!number) {
        return
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function confirmModal(title, content, onOk, okText = "Xóa") {
    antd.Modal.confirm({
        title: title,
        content: content,
        cancelText: "Hủy",
        cancelButtonProps: {
            style: { color: "#0eb58e", borderColor: "#0eb58e" },
        },
        okButtonProps: {
            style: { backgroundColor: "#0eb58e", borderColor: "#0eb58e" },
        },
        okText: okText,
        onOk: onOk,
    });
}

export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
export const nameRegex =
    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
export const phoneNumberRegex = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
export const numberRegex = /^[0-9]*$/g;
export const discountRegex = /^[1-9][0-9]?$|^100$/g;
export const commentRegex = /^.{10,}$/g;

export const removeVnMark = (str) => {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, " ")
        .replace(/-+/g, " ");

    return str;
};

export const generateKeywords = (displayName) => {
    const name = removeVnMark(displayName)
        .split(" ")
        .filter((word) => word);
    console.log(name);
    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = "";
        name.split("").forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(" "));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function addDot(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

export function removeDot(str) {
    return parseFloat(str.split(".").join(""));
}

export function formatDate(str) {
    return moment(str).format("dddd, l, H:mm")
}