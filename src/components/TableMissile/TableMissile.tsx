import { FC } from "react";
import "../MissileAmmo/Missile.css";
import { IMissile } from "../../types/Types";
interface TableProps {
  Missile: IMissile;
  area: boolean| undefined
}

const TableMissile: FC<TableProps> = ({ Missile, area }) => {

  

  return (
    <div>
      <tbody>
        <tr className="tr">
          <td className="td">{Missile.name}</td>
          <td>{Missile.speed}</td>
          <td>{Missile.status}{area ? '✖️' : ''}</td>
        </tr>
      </tbody>
    </div>
  );
};

export default TableMissile;
