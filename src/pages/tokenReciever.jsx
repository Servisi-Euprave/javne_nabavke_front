import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function TokenReciever(){
    const {token} = useParams();
    const navigate = useNavigate();  

    const handleClick = () => {
        localStorage.setItem("token", token)
        navigate("/");
    }

    return(
        <div className="tokenReciever">
            <h1>Portal javnih nabavki</h1>
            <button onClick={handleClick}>Nastavi</button>
        </div>

    )
}