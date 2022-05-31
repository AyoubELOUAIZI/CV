let atributes_tab = [];
let FDependency_left = [];
let FDependency_right = [];
let cluser_atribute = [];


document.getElementById("btn1").onclick = function () {
    console.clear();
    popLeftAndRight_cluser_atribute();   // to make all tables empty befor start work //
    document.getElementById("FDependency2").style.border = "1px solid black";
    document.getElementById("atribute").style.border = "1px solid black";

    let atributes_text = document.getElementById("atributes").value;
    let atributes_tab1 = atributes_text.split(" ");

    atributes_tab = atributes_tab1.filter(function (el) {
        return (el != "") ? true : false;
    });

    if (atributes_tab.length == 0) {
        alert("Please you did not enter any atributes")
        return;
    }
    ///////////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////////
    console.log("FDependency_left=");
    console.log(FDependency_left);
    console.log("FDependency_right=");
    console.log(FDependency_right);
    if (!isFDependency_correct()) {
        return;
    }
    let atribute0 = document.getElementById("atribute").value;
    let tmp_atribute = atribute0.split(' ');

    cluser_atribute = tmp_atribute.filter(function (el) {
        return (el != "") ? true : false;
    });

    if (!iscluser_atributeCorrect(cluser_atribute, atributes_tab)) {
        return;
    }
    atribute0 = cluser_atribute.join(",");   // pour une bon prisentation

    if (cluser_atribute == '') {
        document.getElementById("atribute").style.border = "20px ridge red";
        alert("Please you did not enter the attribute");
        return;
    }

    console.log(cluser_atribute);
    cluser_calculator();
    console.log(cluser_atribute);
    print_results(atribute0);

    // the end //
}



function iscluser_atributeCorrect(cluser_atribute, atributes_tab) {
    for (var i = 0; i < cluser_atribute.length; i++) {
        if (atributes_tab.indexOf(cluser_atribute[i]) == -1) {
            document.getElementById("atribute").style.border = "20px ridge red";
            alert("'" + cluser_atribute[i] + "' is not in the Rolation.");
            return 0;
        }
    }
    return 1;
}

function print_results(atribute0) {
    document.getElementById("resultblq").style.visibility = "visible";
    for (var i = 0; i < atributes_tab.length; i++) {
        if (cluser_atribute.indexOf(atributes_tab[i]) == -1) {
            document.getElementById("restext").innerHTML = "{" + atribute0 + "}+ =(" + cluser_atribute + "). \nyour atribut is not the Key because we did not get '" + atributes_tab[i] + "' as an example.";
            return;
        }
    }
    document.getElementById("restext").innerHTML = "{" + atribute0 + "}+ =(" + cluser_atribute + "). \nyour atribut is actualy the Key of the Rolation.";
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
                addToCluser_atribute(FDependency_right[i], cluser_atribute);
                newatributes = true;
            }
        }
    }
}

function addToCluser_atribute(FDependency_right, cluser_atribute) {
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
    FDependency_left.splice(0);  // suprime toutes les element des table
    FDependency_right.splice(0);
    cluser_atribute.splice(0);
}






