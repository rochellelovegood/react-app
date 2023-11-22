import React,{useState} from 'react'

const Form = ({submitTask}) => {
  const [userTask,setUserTask]= useState('');
 
  return (
    <div className='mt-5 mx-auto'>
        <h3>React To Do List</h3>
        <div className="row">
            <div className="col">
                <input value={userTask} onChange={e => setUserTask(e.target.value)}
                 className='form-control w-100' type="text" name="" placeholder='add text' id="" />
            </div>
            <div className="col">
                <button onClick={()=> submitTask(userTask)} className='btn btn-primary'> <i className='fa-solid fa-plus'></i></button>
            </div>
        </div>
    </div>
  )
}

export default Form