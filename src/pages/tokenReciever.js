import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TokenReciever() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/';
    }
  }, [token, navigate]);
}
