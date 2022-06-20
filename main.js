// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


function pAequorFactory(num, dnaArray) {
  return {
    _specimenNum: num,
    _dna: dnaArray,
    mutate() {
      // creata a random index
      const randIndex = Math.floor(Math.random() * 15);
      let newGen = returnRandBase();
      // verify is not equal
      while (this._dna[randIndex] === newGen) {
        newGen = returnRandBase();
      } // write on dna
      this._dna[randIndex] = newGen
      return this._dna 
      
    },
    compareDna(anotherPAequor) {
      let similarites  = 0;
      anotherPAequor._dna.forEach((value, i) => {
        if (value === this._dna[i]) {
          similarites++;
        }
      });
      let percentage = (similarites / this._dna.length)*100
      return 'Specimen #' + this._specimenNum + ' and specimen #' + anotherPAequor._specimenNum 
                + ' have ' + percentage.toFixed() + '% DNA in common'
      },
      willSurvive() {
        let sum  = 0;
        this._dna.forEach((value) => {
          if (value === 'G' || value === 'C') {
            sum++;
          }});
        if (sum >= 9) {
          return true;
        } else {
          return false;
        }
      }

    }
}
// testing
const example = pAequorFactory(1, mockUpStrand()) // should return an object
const example2 = pAequorFactory(2, mockUpStrand())// should return an object

console.log(example.compareDna(example2)) // should return % of DNA shared
console.log(example.willSurvive()) // Should return if the organism will survive (boolean)


function createSpecimens(numberToCreate) {
  let specimensArray = []
  i=0
  while (i < numberToCreate) {
    let specimen = pAequorFactory(i,mockUpStrand())
    // check if they will survive
    if (specimen.willSurvive() === true) {
      specimensArray.push(specimen);
      i++;
    }
  }
  return specimensArray
}

const specimens = createSpecimens(30) //shold creat 30 specimens that will survive
console.log(specimens)

