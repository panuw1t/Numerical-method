import Matrix from '../Matrix';
import { det, subset, index, range } from 'mathjs';

function CramerRule(){    
    return (
      <Matrix header={"Cramer's rule"} calculate={cal_cramer_rule}/> 
    )
}

const cal_cramer_rule = (obj) =>{
  const a = obj.matrix;
  const b = obj.vector;
  const deta = det(a);
  const answer = [];
  
  for (let i = 0; i < a.length; i++) {
    const matrixCopy = subset(a, index(range(0, a.length), range(0, a.length))); // Create a copy of the matrix
    subset(matrixCopy, index(range(0, a.length), i), b); // Replace the i-th column of the matrix with the vector
    const detAi = det(matrixCopy);
    const solution = detAi / deta;
    answer.push(solution);
  }

  return answer;
}


export default CramerRule;