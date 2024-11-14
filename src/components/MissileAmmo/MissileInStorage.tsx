import {FC} from 'react'
import { IResources } from '../../types/Types'

interface MissileProps{
  Missile: IResources
}

const MissileInStorage:FC<MissileProps> = ({Missile}) => {
  return (
    <div className='missile-container' onClick={()=>{}}>
        <h3>{Missile.name} <span> ✕ {Missile.amount}</span></h3>
    </div>
  )
}

export default MissileInStorage