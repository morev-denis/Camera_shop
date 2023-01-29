import { useState } from 'react';

import { Camera } from '../../types/camera';

import { Tab } from '../../const';

type TabType = keyof typeof Tab;

type Props = {
  camera: Camera;
};

const Tabs = ({ camera }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>(Tab.Description);

  const clickHandle = (evt: React.MouseEvent, tabName: TabType) => {
    evt.preventDefault();

    setActiveTab(tabName);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={activeTab === Tab.Specification ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
          onClick={(evt) => clickHandle(evt, Tab.Specification)}
        >
          Характеристики
        </button>
        <button
          className={activeTab === Tab.Description ? 'tabs__control is-active' : 'tabs__control'}
          type="button"
          onClick={(evt) => clickHandle(evt, Tab.Description)}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className={activeTab === Tab.Specification ? 'tabs__element is-active' : 'tabs__element'}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{camera.vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div
          className={activeTab === Tab.Description ? 'tabs__element is-active' : 'tabs__element'}
        >
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
