import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DragNDrop from './DragNDrop';




const Cartes = () => {
    
  const [stories, setStories] = useState([]);
 

  useEffect(() => {
    
    const token = localStorage.getItem('authToken');

    axios
      .get('http://localhost:5000/stories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setStories(response.data);
        
    
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

  //const newTableData = stories.map(story => ({
   // id: story._id,
   // title: story.titre,
   // description: story.description,
   // duration: story.duree,
   // color: story.couleur,
   // code: story.code
   // day: story.code
//}));

const filteredIds0 = stories.filter(item => item.day === 0 && item.hasOwnProperty("day")).map(item => item);
const filteredIds1 = stories.filter(item => item.day === 1 && item.hasOwnProperty("day")).map(item => item);
const filteredIds2 = stories.filter(item => item.day === 2 && item.hasOwnProperty("day")).map(item => item);
const filteredIds3 = stories.filter(item => item.day === 3 && item.hasOwnProperty("day")).map(item => item);
const filteredIds4 = stories.filter(item => item.day === 4 && item.hasOwnProperty("day")).map(item => item);
const filteredIds5 = stories.filter(item => item.day === 5 && item.hasOwnProperty("day")).map(item => item);
const filteredIds6 = stories.filter(item => item.day === 6 && item.hasOwnProperty("day")).map(item => item);



 
return (
    <div>
      {stories.length > 0 && (
        <DragNDrop data={[{title: "Matieres", items: filteredIds0 },{title: "Lundi", items: filteredIds1 },{title: "Mardi", items: filteredIds2 },{title: "Mercredi", items: filteredIds3 },{title: "Jeudi", items: filteredIds4 },{title: "Vendredi", items: filteredIds5},{title: "Samedi", items: filteredIds6 }]} />
      )}
    </div>
  );
  
}

export default Cartes;
