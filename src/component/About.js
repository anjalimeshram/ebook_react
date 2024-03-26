import React from 'react';
import noteContext1 from '../context/noteContext1';
const About = () => {
    const a=useContext(noteContext1)
    useEffect(()=>{
      a.update()
    },[])
  return (
    <div>
      about {a.state.name}----{a.state.age}
      
    </div>
  );
}

export default About;

