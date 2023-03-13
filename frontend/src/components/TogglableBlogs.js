import React from 'react'
import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const TogglableBlogs = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hideWhenVisible} className='childrenNotVisible'>
        <div id='blog_element'>
          {props.blog.title} {props.blog.author} &nbsp;
          <button onClick={toggleVisibility} id='togglable_blog'>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={showWhenVisible} className='childrenVisible'>
        <div>
          {props.blog.title} {props.blog.author} &nbsp;
          <button onClick={toggleVisibility}>hide</button>
          {props.children}
        </div>
      </div>
    </div>
  )
})

TogglableBlogs.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

TogglableBlogs.displayName = 'TogglableBlogs'

export default TogglableBlogs