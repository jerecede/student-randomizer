const fs = require('fs');
//libreria di node deve essere richiesta, require
//tramite varibile fs chiameremo i metodi

function betterSplice(array, index = 0, removals = 1) {
    const newArray = [...array];
    newArray.splice(index, removals);
    return newArray;
}

function randomArrayIndex(array) {
    const randomIndex = Math.round(Math.random()*(array.length - 1));
    return randomIndex;
}

function createStudentCouples(studentsArray) {
    let clone = [...studentsArray];
    const arrayCouples = [];

    if(clone.length % 2 === 0){
        while (clone.length > 0) {
            let couple = [];

            let index = randomArrayIndex(clone);
            couple.push(clone[index].name);
            clone = betterSplice(clone, index, 1);

            index = randomArrayIndex(clone);
            couple.push(clone[index].name);
            clone = betterSplice(clone, index, 1);

            arrayCouples.push(couple);
        }
    }
    
    return arrayCouples;
}

function printStudentCouples(studentCouples){
    let studentCouplesString = "";
    for (let i = 0; i < studentCouples.length; i++) {
        const couple = studentCouples[i];
        studentCouplesString += `${i+1}) ${couple[0]} - ${couple[1]} \n`;
    }
    return studentCouplesString;
}

function getStudentsFromJsonFile(filename) {
    const stringJSON = fs.readFileSync('./' + filename, 'utf8');
    return JSON.parse(stringJSON);
} //asincrono legge tutto il file, default asincrono

//student randomizer
function main() {
    //0:recupera le informazioni degli studenti dal file students.json
    const allStudents = getStudentsFromJsonFile("students.json");
    console.log(allStudents);
    //1: dall'array di studenti estrai un array di coppie di studenti
    const studentCouples = createStudentCouples(allStudents);
    console.log(studentCouples);
    //2:fare console log delle coppie di studenti generate
    const studentCoupleString = printStudentCouples(studentCouples);
    console.log(studentCoupleString);   
}

main();