import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

const MainScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/catalog/page_1');
  }, [navigate]);

  return <h2 className="visually-hidden">Главная страница</h2>;
};

export default MainScreen;
