import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { GetOrganizations } from '../../store/AllResurces/GetOrganization';

const DefendPage:FC = () => {
    
    const dispatch = useDispatch<AppDispatch>();
  const { error, organizations, status } = useSelector((state: RootState) => state.AllOrganizations);
  const { User } = useSelector((state: RootState) => state.Login);

  useEffect(() => {
        dispatch(GetOrganizations(`IDF - ${User?.area}`))
        console.log(organizations?.resources)
  }, []);
 
   if(status === "pending"){
       return <div>Loading...</div>
   }

  return (
    <div>
        <h1>Organization {organizations?.name}</h1>
        <div>
        <h2>Available Ammo</h2>
        <div>
            {error ? organizations?.resources.map((res)=>{return <h3>{res}</h3>}): error}
        </div>
        </div>
    </div>
  )
}

export default DefendPage