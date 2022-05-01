import React from 'react';
import {Categories, SortPopup, PizzaBlock} from "../components";

const Home = ({items}) => {
    return (
        <div className="container">
            <div className="content__top">
                <Categories items={['Мясные','Вегетариские','Гриль','Острые','Зактрытые']}/>
                <SortPopup items={['популярности', 'цене', 'бичевости']}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
                }
                <PizzaBlock/>
            </div>
        </div>
    );
};

export default Home;
