import { FC } from "react";
import "../MissileAmmo/Missile.css";
import { IMissile } from "../../types/Types";

interface TableProps {
  Missile: IMissile;
}

const TableMissile: FC<TableProps> = ({ Missile }) => {
  return (
    <div>
      <tbody>
        <tr>
          <td>{Missile.name}</td>
          <td>{Missile.speed}</td>
          <td>{Missile.status}</td>
        </tr>
      </tbody>
    </div>
  );
};

export default TableMissile;
