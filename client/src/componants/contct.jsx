import react from 'react';
import { HashLoader } from "react-spinners";

const Contact=()=>{

return (
<>

<div className='d-flex justify-content-center align-items py-5 my-lg-5'>
                <HashLoader
                color="#f72585"
                loading="false"
                size="100"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              </div>
</>


)


}

export default Contact