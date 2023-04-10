import Matrix from '../Matrix';
import { cal_cramer_rule } from '../calculate/cramer';

function CramerRule(){    
    return (
      <Matrix header={"Cramer's rule"} calculate={cal_cramer_rule}/> 
    )
}


export default CramerRule;