
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUserForm'
import NewUser from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
// import Prefetch from './features/auth/Prefetch'
// import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
// import useTitle from './hooks/useTitle';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './features/users/userSlice';
import { getNotes } from './features/notes/noteSlice';




function App() {
  // useTitle('Dan D. Repairs')


  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getUsers())
      dispatch(getNotes())
  },[dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        {/* <Route element={<PersistLogin />}> */}
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            {/* <Route element={<Prefetch />}> */}
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

              </Route>{/* End Dash */}
            {/* </Route> */}
          </Route>
        {/* </Route> End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;






// import {Routes,Route} from 'react-router-dom';
// import Layout from './components/Layout';
// import Public from './components/Public';
// import Login from './features/auth/Login';
// import DashLayout from './components/DashLayout';
// import Welcome from './features/auth/Welcome';
// import NotesList from './features/notes/NotesList';
// import UsersList from './features/users/UsersList';
// import EditUser from './features/users/EditUser';
// import NewUser from './features/users/NewUser';
// import EditNote from './features/notes/EditNote';
// import NewNote from './features/notes/NewNote';


// function App() {

//   return (
//     <Routes>
//       <Route path = "/" element = {<Layout/>}>
//           <Route index element = {<Public/>} />
//           <Route path = "login" element = {<Login/>} />


//           <Route path = 'dash' element = {<DashLayout/>}>

//             <Route index element = {<Welcome/>}/>

//             <Route path ='notes'>
//               <Route index element ={<NotesList />}/>
//               <Route path="new" element = {<NewNote/>}></Route>
//               <Route path=":id" element = {<EditNote/>}></Route>
//             </Route>

//             <Route path ='users'>
//               <Route index element ={  <UsersList />}/>
//               <Route path=":id" element={<EditUser />} />
//               <Route path="new" element ={ <NewUser />}/>
//             </Route>



        
//           </Route>
          
//       </Route>
//     </Routes>
//   );
// }

// export default App;


