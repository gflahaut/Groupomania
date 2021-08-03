import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveComponent from "react-responsive-component";
import './Login.css';

function Logout(){
    // let history = useHistory();
    localStorage.clear();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    history.push(document.location.href = '/login');
    

return(
            <div className="col-xs-offset-2 col-xs-10">
                <button type="submit" className="btn btn-secondary mt-4" onClick={Logout}>Login</button>
            </div>
);

}

export default Logout;