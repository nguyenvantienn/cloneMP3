
import React,{ useCallback, useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Routes,Route,Link} from 'react-router-dom'

import {Home,Login,Public,Personal,Album ,WeekRank,ZingChart,Search,SearchSong,SearchAll , Singer , SearchPlaylist ,Follow} from '../src/containers/public';
import path from './ultis/path';
import * as actions from './store/actions'

function App() {
  const [currentWidth ,setCurrentWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(actions.getHome())
  },[])

  //Set width khi resize
  // const setWidth= useCallback((e)=>{
  //   setCurrentWidth(e.target.innerWidth)
  // },[e.target.innerWidth])
  const setWidth =(e) =>{
    setCurrentWidth(e.target.innerWidth);
  }

  //Set lai width khi resize
  useEffect(()=>{
    window.addEventListener('resize',setWidth);
    return ()=>{
      window.removeEventListener('resize',setWidth);
    }
  })
  useEffect(()=>{
    dispatch(actions.setCurrentWidth(currentWidth))
  },[currentWidth,dispatch]);

  return (
    <>
      <div className="">
        <Routes>
            <Route path={path.PUBLIC} element={<Public/>} >
              <Route path={path.HOME} element={<Home/>} />
              <Route path={path.LOGIN} element={<Login/>}/>
              <Route path={path.MY_MUSIC} element={<Personal/>}/>
              <Route path={path.ALBUM__TITLE_PID} element={<Album/>}/>
              <Route path={path.PLAYLIST__TITLE_PID} element={<Album/>}/>
              <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank/>} />
              <Route path={path.ZING_CHART} element={<ZingChart/>} />
              <Route path={path.FOLLOW} element={<Follow/>} />
              <Route path={path.HOME__SINGER} element={<Singer/>} />
              <Route path={path.HOME__SINGER__2} element={<Singer/>} />
              <Route path={path.SEARCH} element={<Search/>} > 
                <Route path={path.ALL} element={<SearchAll/>} />
                <Route path={path.SONG} element={<SearchSong/>} />
                <Route path={path.PLAYLIST} element={<SearchPlaylist/>} />

              </Route>


              <Route path={path.STAR} element={<Home/>}/>
            </Route>
        </Routes>
      </div>
    
    </>
  );
}

export default App;
