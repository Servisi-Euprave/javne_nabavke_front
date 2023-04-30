import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './tokenReciever.css'

export default function TokenReciever(){
    const navigate = useNavigate();  
    const searchParams = new URLSearchParams(document.location.search);
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
          localStorage.setItem('token', token);
          navigate('/');
        }
      }, [token, navigate]);
}
