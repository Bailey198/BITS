import React, { useState } from 'react'

export const CommentForm = ({submitLabel, handleSubmit, 
    hasCancelButton = false,
    handleCancel,
    initialText = "",}) => {
    const [text, setText] = useState(initialText);
    const isDisable = text.length === 0;

    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text)
        setText("")
    }
  return (
    <div className='mt-3 ms-6'>
        <form className="mb-6" onSubmit={onSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label for="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    required></textarea>
            </div>
            <button type="submit"
                disabled = {isDisable}
                className="inline-flex btn items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                {submitLabel}
            </button>
            {hasCancelButton && <button onClick={handleCancel}
            className="inline-flex btn items-center ms-3 py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Cancel</button>}
        </form>
    </div>
  )
}
