import {FC} from 'react'
import { IResources } from '../../types/Types'
import { StartSocket } from '../../services/socketFront'

interface MissileProps{
  Missile: IResources,
  org: string
}

const MissileInStorage:FC<MissileProps> = ({Missile, org}) => {

  const {StartAttack} = StartSocket()

  return (
    <div className='missile-container' onClick={()=>{StartAttack(Missile.name,  org)}}>
        <h3>{Missile.name} <span> ✕ {Missile.amount}</span></h3>
    </div>
  )
}

export default MissileInStorage