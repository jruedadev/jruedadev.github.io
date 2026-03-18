import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      // Ya estamos en index, solo hacemos scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navegamos a index con el hash
      navigate(`/#${sectionId}`);
    }
  };

  return goToSection;
};