import React from 'react'
import { CommentForm } from './CommentForm';

const Comment = (props) => {
    const {comment, replies, userId, deleteComment, 
        activeComment, setActiveComment, addComment, updateComment, parentId=null} = props;
    const canReply = Boolean(userId)
    const canEdit = userId === comment.userId
    const canDelete = userId === comment.userId
    const replyId = parentId ? parentId : comment.id;

    const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

    const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

    const createdAt = new Date(comment.created_at).toLocaleDateString();
    return (
        <div>
            <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            class="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"/>{comment.userName}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate>{createdAt}</time></p>
                    </div>
                    
                </footer>
                {!isEditing && <p class="text-gray-500 dark:text-gray-400">{comment.body}</p>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment)}
                        handleCancel={() => {
                        setActiveComment(null);
                        }}
                    />
                )}
                <div class="flex items-center mt-4 space-x-4">
                    {canReply && <button type="button"
                        onClick={() => {setActiveComment({id:comment.id, type:"replying"})}}
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>
                        Reply
                    </button>}
                    {canEdit && <button type="button"
                        onClick={() => {setActiveComment({id:comment.id, type:"editing"})}}
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        Edit
                    </button>}
                    {canDelete && <button type="button"
                        onClick={() => deleteComment(comment.id)}
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        Delete
                    </button>}
                </div>
            </article>
            {isReplying && (
                <CommentForm 
                submitLabel="Reply"
                handleSubmit={(text) => addComment(text, replyId)}
                />
            )}
            {replies.length > 0 && (
                <div className='p-6 ml-6 lg:ml-12'>
                    {replies.map(reply => (
                        <div className='mt-3'>
                            <Comment comment={reply} 
                            key={reply.id} 
                            replies={[]} 
                            userId={userId}
                            setActiveComment={setActiveComment}
                            activeComment={activeComment}
                            deleteComment={deleteComment}
                            addComment={addComment}
                            parentId={comment.id}/>
                        </div>
                        
                    ))}
                </div>
            )}        
        </div>
    )
}

export default Comment;