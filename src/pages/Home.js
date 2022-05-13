import React, {useCallback, useEffect} from 'react';
import {Categories, SortPopup, PizzaBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import {LoadingBlock} from "../components/index";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = ['Мясные','Вегетариские','Гриль','Острые','Зактрытые'];
const cortItems = [
    {name: 'популярности', type: 'rating'},
    {name: 'цене', type: 'price'},
    {name: 'алфавиту', type: 'name'}
];

const Home = () => {

    const items = useSelector(({pizzas}) => pizzas.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);
    const cartItems = useSelector(({cart}) => cart.items)

    const dispatch = useDispatch();
    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    }, [])
    const onClickSortType = useCallback((type) => {
        dispatch(setSortBy(type));
    }, [])
    useEffect(() => {
        dispatch(fetchPizzas(category, sortBy)) ;
    }, [category, sortBy]);

    const handleAddPizza = (obj) =>{
        dispatch(addPizzaToCart(obj));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickItem={onSelectCategory}
                            activeCategory={category}
                            items={categoryNames}/>
                <SortPopup items={cortItems}
                           activeSortType={sortBy.type}
                           onClickSortType={onClickSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                        <PizzaBlock
                            onClickAddPizza={(obj) => handleAddPizza(obj)}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}/>
                        ))
                    : Array(10)
                        .fill(0)
                        .map((_, index) => <LoadingBlock key={index}/>)
                }
            </div>
        </div>
    );
};

export default Home;
