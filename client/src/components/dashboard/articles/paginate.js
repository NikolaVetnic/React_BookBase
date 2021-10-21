import React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import Moment from 'react-moment';
import Loading from '../../../utils/loader';


const PaginationComponent = ({
    arts, prev, next, searchTerm, searchAuthor, searchGenre, handleStatusChange, editArtsAction, handleShow
}) => {

    const goToPrevPage = (page) => {
        prev(page)
    }

    const goToNextPage = (page) => {
        next(page)
    }
 
    return(
        <>
            { arts && arts.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            { arts.docs.filter(d => 
                                d.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                                d.director.toLowerCase().includes(searchAuthor.toLowerCase()) &&
                                d.actors.join(' ').toLowerCase().includes(searchGenre.toLowerCase())
                                
                                ).map((item)=>(
                                
                                    <tr key={item._id}>
                                        <td><Moment to={item.date}></Moment></td>
                                        <td>{item.title}</td>
                                        <td>{item.score}</td>
                                        <td className="action_btn remove_btn"
                                            onClick={()=> handleShow(item._id)}
                                        >
                                            Remove
                                        </td>
                                        <td className="action_btn edit_btn"
                                            onClick={()=> editArtsAction(item._id)}
                                        >
                                            Edit
                                        </td>
                                        <td className="action_btn status_btn"
                                            onClick={()=> handleStatusChange(item.status,item._id)}
                                        >
                                            {item.status}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                    <Pagination>
                        {arts.hasPrevPage ?
                            <>
                                <Pagination.Prev onClick={()=> goToPrevPage(arts.prevPage)}/> 
                                <Pagination.Item onClick={()=> goToPrevPage(arts.prevPage)}>
                                    {arts.prevPage}
                                </Pagination.Item>
                            </>
                            :null
                        }
                        <Pagination.Item active>{arts.page}</Pagination.Item>
                        {arts.hasNextPage ?
                            <>
                                
                                <Pagination.Item onClick={()=> goToNextPage(arts.nextPage)}>
                                    {arts.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=> goToNextPage(arts.nextPage)}/> 
                            </>
                            :null
                        }
                    </Pagination>
                </>
                :
                <Loading/>
            }
        </>
    )
}

export default PaginationComponent;