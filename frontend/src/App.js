import {useState, useRef, useEffect} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Time from './Time/Time';

const App = () => {
  const [stopWatch, setstopWatch] = useState(0)// S-U start fr 0 sekunder.
  const [isActive, setIsActive] = useState(false) // Är S-U aktivt?
  const[isPaused, setIsPaused] = useState(false) //Är S-U pausat?
  const[times, setTimes] = useState([]) //Håller tiderna
  const countRef = useRef(null) 
  //useRef kontrollerar alla elements referenser.

 useEffect(() => {
  fetch('http://localhost:5000/api/stopwatch')
  .then(res => res.json())
  .then(data => setTimes(data))
 }, [])

  const handleStart = () => {

    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() =>{
      setstopWatch((stopWatch) => stopWatch +1
    )}, 1000)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleContinue = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setstopWatch((stopWatch) => stopWatch +1)
    },1000)
  }

  const handleClear = () => {

    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setstopWatch(0)
  }

  const handleSaveTime = async() => {
    const data = {time: stopWatch}
    await fetch ('http://localhost:5000/api/stopwatch', {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    fetch('http://localhost:5000/api/stopwatch')
    .then(res => res.json())
    .then(data => setTimes(data))
  }

  return (
    <div className='app-container'>
      <div>
        <h1>{stopWatch}</h1> 
        <div className='button-container'>
          <Stack direction="row" justifyContent="center" spacing={2}>
          {
            !isActive && !isPaused ?
          <Button variant='outlined' onClick={handleStart}>Start</Button> :
          (isPaused ? <Button onClick={handlePause}>Pause</Button> :
          <Button variant='outlined' onClick={handleContinue}>Continue</Button>
          )
}
          <Button variant='outlined' color='error' onClick={handleClear} disabled={!isActive}>Clear</Button>
          <Button variant='outlined' onClick={handleSaveTime} disabled={!isActive || isPaused} >Save time</Button>
       
        </Stack>
           <div>
        {times.map((time)=>
          <Time key={time.id} time={time} setTimes={setTimes}/>
        )}

        </div>
        </div>

      </div>
    </div>
  );

}

export default App;
