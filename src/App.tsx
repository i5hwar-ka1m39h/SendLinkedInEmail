import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import type {  PostData } from './types/allTypes'
import { PostCard } from './components/postCard'

function App() {
  
 

  
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/setup' element={<Setup/>}/>
      <Route path='/details' element={<PostCard/>}/>
    </Routes>
   </Router>
  )
}

export default App

// {
//     "message": "response created successfully",
//     "data": {
//         "companyName": "Republic World",
//         "emailBody": "Dear Anurag Alambayan,I am writing to express my keen interest in the Mobile App Developer (React Native) position at Republic World. With my experience in app development, I am confident I can contribute effectively to your team.My resume is attached for your kind consideration. Thank you for your time.Sincerely,Ishwar Kalmegh",
//         "emailSubject": "Application for Mobile App Developer (React Native) - Ishwar Kalmegh",
//         "experience": 4,
//         "hrEmailIds": [
//             "anurag.alambayan@republicworld.com"
//         ],
//         "jobRequirements": [
//             "Mobile App Development",
//             "React Native"
//         ],
//         "jobTitle": "Mobile App Developer (React Native)",
//         "postBy": "Anurag Alambayan"
//     }
// }