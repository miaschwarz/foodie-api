
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'restaurants',
})
export class Restaurant extends Model {

  @Column
  public name: string;
  @Column
  public key: string;
  @Column
  public lat: number;
  @Column
  public lng: number;
  

}

