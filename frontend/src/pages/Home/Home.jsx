import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

export default function Home() {
    const [category, setCategory] = useState('All')
    return (
        <div>
            <Header />
            <ExploreMenu category = {category} setCategory = {setCategory} />
            <FoodDisplay category = {category}/>
            <AppDownload />
        </div>
    )
}
