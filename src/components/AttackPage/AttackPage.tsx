import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import MissileInStorage from "../MissileAmmo/MissileInStorage";
import { IMissile, IUser } from "../../types/Types";
import TableMissile from "../TableMissile/TableMissile";
import { GetMissile } from "../../store/AllResurces/GetMissiles";
import "../MissileAmmo/Missile.css";
import { GetOrganizations } from "../../store/AllResurces/GetOrganization";

const AttackPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [List, setList] = useState<IMissile[]>()
  const [location, setLocation] = useState<string>("")

  const { organizations, status, error } = useSelector(
    (state: RootState) => state.AllOrganizations
  );

  const { Missiles } = useSelector(
    (state: RootState) => state.AllMissile
  );


  const handleMissile = () =>{
    if (Missiles) {
      const newList = Missiles.filter( (mis) => mis.status == "idle")
      if (newList) {
        setList(newList)
      }
    }
  }

  useEffect(() => {
    const strUser = localStorage.getItem("correctUser");
    if (strUser) {
      const user: IUser = JSON.parse(strUser);
      dispatch(GetOrganizations(user.nameOrg));
      dispatch(GetMissile())
      handleMissile()
    }
  }, []);

  if (status === "pending") {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {organizations ? (
        <div>
          <h1>Organization {organizations.name}</h1>
          <h2>Available Ammo</h2>
          <div className="Ammo">
            
          <select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>

            {organizations.resources.map((res) => (
              <MissileInStorage Missile={res} org={organizations.name} key={res._id} />
            ))}
          </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
      <h2>Launched Rockets</h2>
      <table>
        
          <thead>
        <tr>
          <th>Rocket</th>
          <th>TimToHit</th>
          <th>Status</th>
        </tr>
          </thead>
          
          <tbody>
        {List ? List.map((mis)=>{return <TableMissile area={false} Missile={mis} key={mis._id}/>}): <tr><td><h2>Loading...</h2></td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AttackPage;
