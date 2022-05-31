let atributes_tab = [];
let FDependency_left = [];
let FDependency_right = [];
let cluser_atribute = [];
let MakedAtributes = [];
let combinisions = [];
let allKeys = [];
document.getElementById("btnH").onclick = function () {
    document.getElementById("resultblqH").style.visibility = "visible";


}


document.getElementById("btn1").onclick = function () {
    console.clear();
    popLeftAndRight_cluser_atribute();
    document.getElementById("resultblqH").style.visibility = "hidden";
    document.getElementById("FDependency2").style.border = "1px solid black";

    let atributes_text = document.getElementById("atributes").value;
    let atributes_tab1 = atributes_text.split(" ");

    atributes_tab = atributes_tab1.filter(function (el) {
        return (el != "") ? true : false;
    });

    if (atributes_tab.length == 0) {
        alert("Please you did not enter any atributes")
        return;
    }
    // get function dependencies from user
    let text = document.getElementById("FDependency2").value;
    let FDependency1 = text.split("\n");
    console.log("FDependency1--1111111111111111");
    console.log(FDependency1);
    let FDependency2 = FDependency1.filter(function (el) {
        for (let i = 0; i < el.length; i++) {
            if (el[i] != '' && el[i] != ' ') return true;
        }
        return false;

    });
    console.log("FDependency2--1111111111111111");
    console.log(FDependency2);


    for (let i = 0; i < FDependency2.length; i++) {
        let temp = FDependency2[i].split("->");
        if (temp.length != 2) {
            alert("what the hack is this?  '" + FDependency2[i] + "'");
            return;
        }
        // fall left and right
        FDependency_left.push(temp[0]);
        FDependency_right.push(temp[1]);
    }
    //remove space between commase(,) //
    for (var i = 0; i < FDependency_left.length; i++) {
        let tmp1 = FDependency_left[i].split(",");
        let tmp2 = FDependency_right[i].split(",");

        for (var j = 0; j < tmp1.length; j++) {
            tmp1[j] = tmp1[j].trim();
            FDependency_left[i] = tmp1.join(",");
        }
        for (var j = 0; j < tmp2.length; j++) {
            tmp2[j] = tmp2[j].trim();
            FDependency_right[i] = tmp2.join(",");
        }

    }
    console.log("FDependency_left=");
    console.log(FDependency_left);
    console.log("FDependency_right=");
    console.log(FDependency_right);

    if (!isFDependency_correct()) {
        return;
    }
    findTheKey();

}

function findTheKey() {

    let tabMiddle = [];
    let tableftandNon = [];
    let FDependency_left2 = [];
    let FDependency_right2 = [];
    for (let i = 0; i < FDependency_left.length; i++) {
        FDependency_left2 = FDependency_left2.concat(FDependency_left[i].split(","));
        FDependency_right2 = FDependency_right2.concat(FDependency_right[i].split(","));
    }

    // make tables:
    for (let i = 0; i < atributes_tab.length; i++) {
        if (FDependency_left2.indexOf(atributes_tab[i]) != -1 && FDependency_right2.indexOf(atributes_tab[i]) != -1) {
            tabMiddle.push(atributes_tab[i]);
        } else if (FDependency_right2.indexOf(atributes_tab[i]) != -1) {
            // do no action
        } else {
            tableftandNon.push(atributes_tab[i]);
        }
    }
    MakedAtributes = tableftandNon.slice(0);

    if (testAndPrintResults()) {
        console.log("MakedAtributes after testAndPrintResult: may be this is right");
        console.log(MakedAtributes);
        // allKeys.concat(MakedAtributes);//////////
        // console.log("  allKeys.concat(MakedAtributes);  ")//////////
        // console.log(allKeys);/////////
        allKeys.push(MakedAtributes.slice(0));
        //  allKeys.push(MakedAtributes.slice(0));
        console.log("   allKeys.push(MakedAtributes);");
        console.log(allKeys);
        printAllKeys();

        return;
    } else {
        console.log("else");
        console.log(tableftandNon);
        MakedAtributes = tableftandNon.valueOf();
        console.log("tableftandNon.valueOf();");
        console.log(tableftandNon);
        console.log(MakedAtributes);

        addCombinisionMiddleAndTest(tabMiddle);
    }

}


function addCombinisionMiddleAndTest(tabMiddle) {
    console.log("what now ");
    console.log("MakedAtributes");
    console.log(MakedAtributes);
    let akeyFonded = false;
    for (let nbrElementsOfCombination = 1; nbrElementsOfCombination <= tabMiddle.length; nbrElementsOfCombination++) {
        getCombn(tabMiddle, nbrElementsOfCombination - 1);

        for (let i = 0; i < combinisions.length; i++) {
            console.log("combinisions[i]");
            console.log(combinisions[i]);
            MakedAtributes = MakedAtributes.concat(combinisions[i]);
            if (testAndPrintResults()) {
                console.log("MakedAtributes");
                console.log(MakedAtributes);
                allKeys.push(MakedAtributes.slice(0));
                //  allKeys.push(MakedAtributes.slice(0));
                console.log("   allKeys.push(MakedAtributes);");
                console.log(allKeys);
                akeyFonded = true;
            }
            MakedAtributes.splice(-nbrElementsOfCombination);
            console.log("-------------------------------------------------------------------");
        }
        combinisions.splice(0);
        if (akeyFonded) {
            printAllKeys();
            return;
        }
    }
}

function printAllKeys() {
    // console.log("allKeys");
    // console.log(allKeys);
    document.getElementById("restext").innerHTML = `Key1:{${allKeys[0]}};\n`;
    for (let i = 1; i < allKeys.length; i++)
        document.getElementById("restext").innerHTML += `Key${i + 1}:{${allKeys[i]}};\n`;
    document.getElementById("restext").innerHTML += "-----------------------------end\n";

    for (let i = 0; i < allKeys.length; i++)
        document.getElementById("restextH").innerHTML += `Key${i + 1}:{${allKeys[i]}};\n`;
    document.getElementById("restextH").innerHTML += "----------------------------end\n";


}

function testAndPrintResults() {
    let isenyresult = false;

    console.log("1===MakedAtributes");
    console.log(MakedAtributes);
    cluser_atribute = MakedAtributes.slice(0);
    console.log("2---MakedAtributes");
    console.log(MakedAtributes);
    console.log("I maked this one:");
    console.log(cluser_atribute);
    cluser_calculator();
    console.log("the result after the calculation of the cluser ''''");
    console.log(cluser_atribute);
    if (print_results(MakedAtributes.join(","))) {
        isenyresult = true;
    }

    cluser_atribute.splice(0);


    return isenyresult;

}





function getCombn(array, nbrFirstElements) {

    if (array.length < nbrFirstElements + 1) return;

    if (nbrFirstElements === 0) {
        combinisions = array.slice(0);
        console.log("combinisions in if if");
        console.log(combinisions);
        return;
    }
    console.log("the hardest partttttttttttttttttttt");
    let firstElement = array.slice(0, nbrFirstElements);
    let restElements = array.slice(nbrFirstElements);
    let nextArray = array.slice(1);
    for (let i = 0; i < restElements.length; i++) {
        combinisions.push(firstElement.concat(restElements[i]));
    }
    getCombn(nextArray, nbrFirstElements);
}



// atribute0 pour l'entre meais nous avons pas now
function print_results(MakedAtributeselement) {
    document.getElementById("resultblq").style.visibility = "visible";
    for (var i = 0; i < atributes_tab.length; i++) {
        if (cluser_atribute.indexOf(atributes_tab[i]) == -1) {
            // not the key
            // document.getElementById("restext").innerHTML += "{" + MakedAtributeselement + "}+ =(" + cluser_atribute + "). \nyour atribut is not the Key because we did not get '" + atributes_tab[i] + "' as an example.\n";
            return false;
        }
    }
    // the key
    // document.getElementById("restext").innerHTML += "{" + MakedAtributeselement + "}+ =(" + cluser_atribute + "). \nyour atribut is actualy the Key of the Rolation.\n";
    return true;
}




function cluser_calculator() {
    let nbr_FDependency = FDependency_left.length;
    let newatributes = true;
    let j;
    let indxused = [];  // to not repet check the same function dependencie;
    while (newatributes) {
        newatributes = false;
        for (let i = 0; i < nbr_FDependency; i++) {
            if (indxused.indexOf(i) != -1) {
                continue;
            }
            let tmp = FDependency_left[i].split(',');
            for (j = 0; j < tmp.length; j++) {
                if (cluser_atribute.indexOf(tmp[j]) < 0) {
                    break;
                }
            }
            if (j == tmp.length) {
                indxused.push(i);
                console.log("j == tmp.length");
                addToCluser_atribute(FDependency_right[i]);
                newatributes = true;
            }
        }
    }
}

function addToCluser_atribute(FDependency_right) {
    let tmp = FDependency_right.split(",");
    for (let i = 0; i < tmp.length; i++) {
        if (cluser_atribute.indexOf(tmp[i]) < 0) {
            cluser_atribute.push(tmp[i]);
        }
    }

}

function isFDependency_correct() {

    for (let i = 0; i < FDependency_left.length; i++) {
        let temp = FDependency_left[i].split(",");
        for (let j = 0; j < temp.length; j++) {
            if (atributes_tab.indexOf(temp[j]) == -1) {
                document.getElementById("FDependency2").style.border = "20px ridge red";
                alert("'" + temp[j] + "' is not in the rolation.")
                return 0;
            }
        }
    }
    for (let i = 0; i < FDependency_right.length; i++) {
        let temp = FDependency_right[i].split(",");
        for (let j = 0; j < temp.length; j++) {
            if (atributes_tab.indexOf(temp[j]) == -1) {
                document.getElementById("FDependency2").style.border = "20px ridge red";
                alert("'" + temp[j] + "' is not in the rolation.")
                return 0;
            }
        }
    }
    return 1;
}

function popLeftAndRight_cluser_atribute() {
    FDependency_left.splice(0);
    FDependency_right.splice(0);
    cluser_atribute.splice(0);
    atributes_tab.splice(0);
    MakedAtributes.splice(0);
    combinisions.splice(0);
    allKeys.splice(0);
}



