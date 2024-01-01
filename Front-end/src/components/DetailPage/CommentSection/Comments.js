import React, { useEffect, useState } from 'react'
import requestApi from '../../../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import { CommentForm } from './CommentForm';
import Comment from './Comment';

const Comments = ({ currentUserId, productId }) => {
    const dispatch = useDispatch();
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [numOfPage, setNumOfPage] = useState(1);
    const [totalComments, setTotalComments] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [refresh, setRefresh] = useState(Date.now());

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?itemsPerPage=${itemsPerPage}&page=${currentPage}`
        requestApi(`/comments${query}`, 'GET', []).then(response => {
            console.log(response)
            setBackendComments(response.data.data)
            setNumOfPage(response.data.lastPage)
            setTotalComments(response.data.total)
            dispatch(actions.controlLoading(false))

        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [currentPage, itemsPerPage, refresh])

    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null &&
            backendComment.productId === productId
    )

    const getReplies = parentCommentId => {
        return backendComments
            .filter(backendComment => backendComment.parentId === parentCommentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    }

    const addComment = async (text, parentId) => {
        console.log('handle submit', text, parentId)
        const data = { body: text, parentId: parentId, productId: productId }
        const res = await requestApi('/comments', 'POST', data)
        setRefresh(Date.now())
        setActiveComment(null)
    };

    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to remove your review?")) {
            const res = await requestApi(`/comments/${commentId}`, 'DELETE', [])
            console.log('Delete comment=>', res)
            setRefresh(Date.now())
        }
    };

    const updateComment = async (text, comment) => {
        const data = { body: text, parentId: comment.parentId, productId: productId }
        const res = await requestApi(`/comments/${comment.id}`, 'PUT', data)
        console.log('update comment=>', res)
        setActiveComment(null);
        setRefresh(Date.now())
    };

    return (
        <div>
            <CommentForm submitLabel="Post Review" handleSubmit={addComment} />
            <center>-------------------------------</center>
            {rootComments.map((rootComment) => (
                <div className='mt-6'>
                    <Comment key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        userId={currentUserId}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                </div>
            ))}
        </div>
    )
}

export default Comments;