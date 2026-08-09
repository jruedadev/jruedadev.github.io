import { useNavigate } from 'react-router-dom';

export const useNavigateToSection = () => {
  const navigate = useNavigate();

  const goToSection = (sectionId: string) => {
    // Siempre navegamos actualizando el hash para que el navbar refleje la sección activa
    navigate(`/#${sectionId}`);
  };

  return goToSection;
};