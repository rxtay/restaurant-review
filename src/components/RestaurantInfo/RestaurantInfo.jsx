import { useParams } from "react-router";
import React, {useEffect, useContext, useState} from "react";
import CommentForm from './modals/CommentForm'
import DescriptionForm from './modals/DescriptionForm'
import Description from "./description/Description";
import Comment from "./comment/Comment";
import AppContext from "../../context/AppContext";

const RestaurantInfo = () => {
    const { id } = useParams();
    const {authUser} = useContext(AppContext)
    const [description, setDescription] = useState([])
    const [comments, setComments] = useState([])

    useEffect(()=> {
        authUser()   
    }, [])

    return (
        <React.Fragment>
            <section className="bg-dark-grey">
                <div className="restaurantInfo">
                    <Description id={id} description={description} setDescription={setDescription}/>
                    <Comment id={id} comments={comments} setComments={setComments}/>  
                </div>
                <CommentForm setState={setComments}/>          
                <DescriptionForm setState={setDescription}/> 
            </section>
        </React.Fragment>
    )
}

export default RestaurantInfo;