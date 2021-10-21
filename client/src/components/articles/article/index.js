import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getArticle } from '../../../store/actions/article_actions';
import { clearCurrentArticle } from '../../../store/actions/index';
import Loader from '../../../utils/loader';
import ScoreCard from '../../../utils/scoreCard';

import { getArticles } from '../../../store/actions/article_actions';

import { Table } from 'react-bootstrap';

import Moment from 'react-moment';

const initialSort = {sortBy:"_id",order:"desc",limit:8,skip:0};

const Article = (props) => {

    const { current } = useSelector( state => state.articles );
    const dispatch = useDispatch();

    useEffect(()=>{
        /// props.match.params.id   
        dispatch(getArticle(props.match.params.id))
    },[dispatch, props.match.params]);

    useEffect(()=>{
        return()=>{
           dispatch(clearCurrentArticle())
        }
    },[dispatch])


    const articles = useSelector(state => {
        // console.log('CURRENT : ' + JSON.stringify(state.articles.current, null, 4));
        // console.log('AUTHOR : '  + state.articles.current.director);
        // console.log('OTHER : '   + state.articles.articles.length);
        // console.log('ARTICLE : ' + JSON.stringify(state.articles.articles[0].director, null, 4));
        // console.log('VALUES : '  + Object.values(state.articles.current)[7]);
        return state.articles;
    });

    useEffect(()=>{
        // trigger only on first render
        if(articles && !articles.articles){
          ///dispatch 
          dispatch(getArticles(initialSort))
        }
    }, [dispatch, articles]);

    return(
        <>
         { current ? 
            <div className="article_container">
                <div
                    style={{
                        background:`url(https://picsum.photos/1920/1080)`
                    }}
                    className="image"
                >
                </div>
                <h1>{current.title}</h1>
                <div className="mt-3 content">
                    <div dangerouslySetInnerHTML={
                        {__html: current.content}
                    }>
                    </div>
                </div>
                <ScoreCard current={current}/>
                <br/>
                <h3>More by same author</h3>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articles.articles.filter(a => a.director === Object.values(articles.current)[7]).map((item) => {
                                    return (
                                        <tr key={item._id}>
                                        <td><Moment to={item.date}></Moment></td>
                                        <td>{item.title}</td>
                                        <td>{item.score}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                </Table>
            </div>
        :
            <Loader/>
        }

        </>
    )
}

export default Article;