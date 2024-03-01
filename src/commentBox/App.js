import React from 'react';
import './style.css';
import CommentBox from './commentBox.js'

export default function App() {
  var data = [
    { text: 'Some mean comment :)', comments: [] },
    {
      text: 'Lorem, ipsum',
      comments: [
        {
          text: 'none1',
          comments: [
            { text: 'none11', comments: [{ text: 'none111', comments: [] }] },
          ],
        },
        { text: 'none2', comments: [] },
      ],
    },
    { text: 'some', comments: [] },
  ];

 

  

  return <div>
    {
      data.map((comment, index) => {
        return <CommentBox comment={comment} key={index}/>
      })
    }</div>;
}